#!/usr/bin/env node

import { createServer } from 'node:http';
import { readdir, readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { basename, extname, join, resolve, dirname } from 'node:path';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = process.env.PPT_AGENT_PACKAGE_ROOT || resolve(__dirname, '..');

// Lazy imports – loaded on first use
let express;
let screenshotMod;
let analyzeMod;

async function loadDeps() {
  if (!express) {
    express = (await import('express')).default;
  }
  if (!screenshotMod) {
    screenshotMod = await import('../src/editor/screenshot.js');
  }
  if (!analyzeMod) {
    analyzeMod = await import('../src/vlm/analyze.js');
  }
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const DEFAULT_PORT = 3456;
const DEFAULT_PROVIDER = 'google';
const DEFAULT_MODEL = 'gemini-2.0-flash';
const DEFAULT_AGENT = 'claude';
const SLIDE_FILE_PATTERN = /^slide-.*\.html$/i;

function printUsage() {
  console.log(`Usage: ppt-agent edit [options]

Options:
  --port <number>      Server port (default: ${DEFAULT_PORT})
  --provider <name>    VLM provider: google | anthropic | openai (default: ${DEFAULT_PROVIDER})
  --model <name>       VLM model name (default: ${DEFAULT_MODEL})
  --agent <name>       Agent CLI: claude | codex | "custom-command" (default: ${DEFAULT_AGENT})
  -h, --help           Show this help message
`);
}

function parseArgs(argv) {
  const opts = {
    port: DEFAULT_PORT,
    provider: DEFAULT_PROVIDER,
    model: DEFAULT_MODEL,
    agent: DEFAULT_AGENT,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') { opts.help = true; continue; }
    if (arg === '--port') { opts.port = Number(argv[++i]); continue; }
    if (arg === '--provider') { opts.provider = argv[++i]; continue; }
    if (arg === '--model') { opts.model = argv[++i]; continue; }
    if (arg === '--agent') { opts.agent = argv[++i]; continue; }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Agent execution
// ---------------------------------------------------------------------------
const AGENT_COMMANDS = {
  claude: (prompt) => ['claude', ['-p', prompt]],
  codex: (prompt) => ['codex', ['--prompt', prompt]],
};

function parseCustomAgent(agentStr, prompt) {
  const parts = agentStr.split(/\s+/);
  const cmd = parts[0];
  const args = [...parts.slice(1), prompt];
  return [cmd, args];
}

function spawnAgent(agentName, prompt, cwd) {
  const [cmd, args] = AGENT_COMMANDS[agentName]
    ? AGENT_COMMANDS[agentName](prompt)
    : parseCustomAgent(agentName, prompt);

  return new Promise((resolveP, rejectP) => {
    const child = spawn(cmd, args, { cwd, stdio: 'pipe' });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('close', (code) => resolveP({ code, stdout, stderr }));
    child.on('error', rejectP);
  });
}

// ---------------------------------------------------------------------------
// SSE client management
// ---------------------------------------------------------------------------
const sseClients = new Set();

function broadcastSSE(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) {
    res.write(payload);
  }
}

// ---------------------------------------------------------------------------
// Playwright browser (singleton, lazy)
// ---------------------------------------------------------------------------
let _browserPromise = null;

async function getScreenshotPage() {
  if (!_browserPromise) {
    _browserPromise = screenshotMod.createScreenshotBrowser();
  }
  return _browserPromise;
}

async function closeBrowser() {
  if (_browserPromise) {
    const { browser } = await _browserPromise;
    _browserPromise = null;
    await browser.close();
  }
}

// ---------------------------------------------------------------------------
// Slide helpers
// ---------------------------------------------------------------------------
function slidesDir() {
  return join(process.cwd(), 'slides');
}

async function listSlideFiles() {
  const entries = await readdir(slidesDir(), { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && SLIDE_FILE_PATTERN.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
      return numA - numB || a.localeCompare(b);
    });
}

// ---------------------------------------------------------------------------
// VLM feedback prompt
// ---------------------------------------------------------------------------
function buildVlmFeedbackPrompt(slideFile, userFeedback) {
  return [
    'You are a presentation design assistant.',
    `The user has feedback about slide "${slideFile}":`,
    '',
    userFeedback,
    '',
    'Based on the screenshot and the user feedback, provide a concrete, actionable checklist of HTML/CSS changes to fix the issues.',
    'Format your response as a markdown checklist:',
    '- Each item should describe a specific change (element selector, property, old value → new value)',
    '- Be precise: reference exact CSS properties, colors, sizes, or HTML structure',
    '- Keep the 720pt × 405pt slide dimensions',
    '- Only suggest changes that address the user feedback',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Main server
// ---------------------------------------------------------------------------
async function startServer(opts) {
  await loadDeps();

  const app = express();
  app.use(express.json());

  const editorHtmlPath = join(PACKAGE_ROOT, 'src', 'editor', 'editor.html');

  // GET / — serve editor UI
  app.get('/', async (_req, res) => {
    try {
      const html = await readFile(editorHtmlPath, 'utf-8');
      res.type('html').send(html);
    } catch (err) {
      res.status(500).send(`Failed to load editor: ${err.message}`);
    }
  });

  // GET /slides/:file — serve individual slide HTML
  app.get('/slides/:file', async (req, res) => {
    const file = basename(req.params.file); // prevent path traversal
    if (!SLIDE_FILE_PATTERN.test(file)) {
      return res.status(400).send('Invalid slide filename');
    }
    const filePath = join(slidesDir(), file);
    try {
      const html = await readFile(filePath, 'utf-8');
      res.type('html').send(html);
    } catch (err) {
      res.status(404).send(`Slide not found: ${file}`);
    }
  });

  // GET /api/slides — list slide filenames
  app.get('/api/slides', async (_req, res) => {
    try {
      const files = await listSlideFiles();
      res.json(files);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/vlm-feedback — screenshot + VLM analysis
  app.post('/api/vlm-feedback', async (req, res) => {
    const { slide, feedback } = req.body;
    if (!slide || !feedback) {
      return res.status(400).json({ error: 'Missing slide or feedback' });
    }

    try {
      // Take screenshot
      const tmpDir = await mkdtemp(join(tmpdir(), 'editor-ss-'));
      const screenshotPath = join(tmpDir, 'slide.png');
      const { page } = await getScreenshotPage();

      // Screenshot via HTTP so the slide can load relative assets
      const slideUrl = `http://localhost:${opts.port}/slides/${slide}`;
      await screenshotMod.captureSlideScreenshot(page, slide, screenshotPath, `http://localhost:${opts.port}/slides`, { useHttp: true });

      // VLM call
      const prompt = buildVlmFeedbackPrompt(slide, feedback);
      const vlmResult = await analyzeMod.analyzeImage(screenshotPath, prompt, {
        provider: opts.provider,
        model: opts.model,
        temperature: 0.2,
        maxTokens: 2000,
      });

      // Cleanup temp
      await rm(tmpDir, { recursive: true, force: true }).catch(() => {});

      res.json({
        changeSpec: vlmResult.content,
        usage: vlmResult.usage,
      });
    } catch (err) {
      console.error('[vlm-feedback]', err);
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/apply — spawn agent to edit slide
  app.post('/api/apply', async (req, res) => {
    const { slide, changeSpec } = req.body;
    if (!slide || !changeSpec) {
      return res.status(400).json({ error: 'Missing slide or changeSpec' });
    }

    const prompt = [
      `Edit the file slides/${slide} according to these changes:`,
      '',
      changeSpec,
      '',
      'Rules:',
      '- Only modify the specified file',
      '- Keep all existing content that isn\'t mentioned in the changes',
      '- Maintain the 720pt × 405pt slide dimensions',
    ].join('\n');

    try {
      console.log(`[apply] Spawning ${opts.agent} for ${slide}...`);
      const result = await spawnAgent(opts.agent, prompt, process.cwd());
      console.log(`[apply] Agent exited with code ${result.code}`);

      if (result.code === 0) {
        res.json({ success: true, message: 'Changes applied successfully' });
      } else {
        res.json({
          success: false,
          message: `Agent exited with code ${result.code}`,
          stderr: result.stderr.slice(0, 500),
        });
      }
    } catch (err) {
      console.error('[apply]', err);
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/events — SSE stream
  app.get('/api/events', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('event: connected\ndata: {}\n\n');

    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
  });

  // -------------------------------------------------------------------------
  // File watcher (debounced)
  // -------------------------------------------------------------------------
  let debounceTimer = null;
  const watcher = watch(slidesDir(), { persistent: false }, (_eventType, filename) => {
    if (!filename || !SLIDE_FILE_PATTERN.test(filename)) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[watch] File changed: ${filename}`);
      broadcastSSE('fileChanged', { file: filename });
    }, 300);
  });

  // -------------------------------------------------------------------------
  // Start listening
  // -------------------------------------------------------------------------
  const server = app.listen(opts.port, () => {
    console.log(`\n  ppt-agent editor`);
    console.log(`  ─────────────────────────────────────`);
    console.log(`  Local:     http://localhost:${opts.port}`);
    console.log(`  VLM:       ${opts.provider} / ${opts.model}`);
    console.log(`  Agent:     ${opts.agent}`);
    console.log(`  Slides:    ${slidesDir()}`);
    console.log(`  ─────────────────────────────────────\n`);
  });

  // -------------------------------------------------------------------------
  // Graceful shutdown
  // -------------------------------------------------------------------------
  async function shutdown() {
    console.log('\n[editor] Shutting down...');
    watcher.close();
    for (const client of sseClients) {
      client.end();
    }
    sseClients.clear();
    server.close();
    await closeBrowser();
    process.exit(0);
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = parseArgs(args);

if (opts.help) {
  printUsage();
  process.exit(0);
}

startServer(opts).catch((err) => {
  console.error('[editor] Fatal:', err);
  process.exit(1);
});
