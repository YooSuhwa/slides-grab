#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const packageJsonPath = resolve(projectRoot, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

function runNodeScript(relativePath, args = []) {
  return new Promise((resolvePromise, rejectPromise) => {
    const scriptPath = resolve(projectRoot, relativePath);
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: projectRoot,
      stdio: 'inherit',
      env: process.env
    });

    child.on('error', rejectPromise);
    child.on('close', (code, signal) => {
      if (signal) {
        rejectPromise(new Error(`Command terminated by signal ${signal}`));
        return;
      }
      resolvePromise(code ?? 0);
    });
  });
}

async function runCommand(relativePath, args = []) {
  try {
    const code = await runNodeScript(relativePath, args);
    if (code !== 0) {
      process.exitCode = code;
    }
  } catch (error) {
    console.error(`[ppt-agent] ${error.message}`);
    process.exitCode = 1;
  }
}

const program = new Command();

program
  .name('ppt-agent')
  .description('CLI for ppt-team-agent workflows')
  .version(packageJson.version);

program
  .command('build-viewer')
  .description('Run scripts/build-viewer.js')
  .argument('[args...]', 'Arguments to pass through')
  .action(async (args = []) => {
    await runCommand('scripts/build-viewer.js', args);
  });

program
  .command('validate')
  .description('Run scripts/validate-slides.js')
  .argument('[args...]', 'Arguments to pass through')
  .action(async (args = []) => {
    await runCommand('scripts/validate-slides.js', args);
  });

program
  .command('convert')
  .description('Run convert.cjs')
  .argument('[args...]', 'Arguments to pass through')
  .action(async (args = []) => {
    await runCommand('convert.cjs', args);
  });

await program.parseAsync(process.argv);
