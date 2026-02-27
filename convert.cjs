const PptxGenJS = require('pptxgenjs');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Inline a simplified version that uses Playwright Chromium (not Chrome)
const PT_PER_PX = 0.75;
const PX_PER_IN = 96;
const EMU_PER_IN = 914400;

async function convertSlide(htmlFile, pres, browser) {
  const filePath = path.isAbsolute(htmlFile) ? htmlFile : path.join(process.cwd(), htmlFile);

  const page = await browser.newPage();
  await page.goto(`file://${filePath}`);

  const bodyDimensions = await page.evaluate(() => {
    const body = document.body;
    const style = window.getComputedStyle(body);
    return {
      width: parseFloat(style.width),
      height: parseFloat(style.height),
    };
  });

  await page.setViewportSize({
    width: Math.round(bodyDimensions.width),
    height: Math.round(bodyDimensions.height)
  });

  // Take screenshot and add as full-slide image
  const screenshot = await page.screenshot({ type: 'png' });
  await page.close();

  // Resize to exact slide dimensions (13.33" x 7.5" at 150 DPI)
  const targetWidth = Math.round(13.33 * 150);
  const targetHeight = Math.round(7.5 * 150);

  const resized = await sharp(screenshot)
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .png()
    .toBuffer();

  const tmpPath = path.join(process.env.TMPDIR || '/tmp', `slide-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
  fs.writeFileSync(tmpPath, resized);

  const slide = pres.addSlide();
  slide.addImage({
    path: tmpPath,
    x: 0,
    y: 0,
    w: '100%',
    h: '100%'
  });

  return tmpPath;
}

async function main() {
  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_WIDE'; // 16:9

  const slidesDir = path.join(__dirname, 'slides');
  const files = fs.readdirSync(slidesDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  console.log(`Converting ${files.length} slides...`);

  // Launch Chromium (not Chrome)
  const browser = await chromium.launch();
  const tmpFiles = [];

  for (const file of files) {
    const filePath = path.join(slidesDir, file);
    console.log(`  Processing: ${file}`);
    try {
      const tmpPath = await convertSlide(filePath, pres, browser);
      tmpFiles.push(tmpPath);
      console.log(`    ✓ ${file} done`);
    } catch (err) {
      console.error(`    ✗ ${file} error: ${err.message}`);
    }
  }

  await browser.close();

  const outputFile = path.join(__dirname, 'AI-시대의-개인도구.pptx');
  await pres.writeFile({ fileName: outputFile });
  console.log(`\nSaved: ${outputFile}`);

  // Cleanup tmp files
  for (const f of tmpFiles) {
    try { fs.unlinkSync(f); } catch {}
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
