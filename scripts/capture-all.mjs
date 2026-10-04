import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/anishkumar/.gemini/antigravity/brain/5c1263da-1e20-4858-88d1-15559c7eb00a/screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const list = await listRes.json();
  const pageTarget = list.find((t) => t.type === 'page');
  if (!pageTarget) {
    throw new Error('No page target found');
  }
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, { resolve });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  async function captureSection(sectionId, filename, width, height) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });

    // Navigate fresh with cachebuster to force reload of newest JS/CSS
    await send('Page.navigate', { url: `http://localhost:4173/?v=${Date.now()}&_sec=${sectionId}#${sectionId}` });
    await new Promise((r) => setTimeout(r, 1600));

    if (sectionId && sectionId !== 'hero-portal') {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById("${sectionId}");
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
            }
          })()
        `,
      });
      await new Promise((r) => setTimeout(r, 800));
    } else {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 0, behavior: 'instant' });`,
      });
      await new Promise((r) => setTimeout(r, 600));
    }

    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(data, 'base64');
    const dest = path.join(SCREENSHOT_DIR, filename);
    fs.writeFileSync(dest, buffer);
    console.log(`Saved ${filename} (${buffer.length} bytes)`);
  }

  try {
    console.log('--- Capturing 1440px desktop sections ---');
    await captureSection('hero-portal', 'section-hero-1440.png', 1440, 900);
    await captureSection('how-it-works', 'section-journey-1440.png', 1440, 900);
    await captureSection('who-keeps-the-money', 'section-money-1440.png', 1440, 900);
    await captureSection('fair-price', 'section-calculator-1440.png', 1440, 900);
    await captureSection('artisan-vault', 'section-crafts-1440.png', 1440, 900);
    await captureSection('craft-map', 'section-map-1440.png', 1440, 900);
    await captureSection('charter', 'section-footer-1440.png', 1440, 900);

    console.log('--- Capturing 390px mobile sections ---');
    await captureSection('hero-portal', 'section-hero-390.png', 390, 844);
    await captureSection('how-it-works', 'section-journey-390.png', 390, 844);
    await captureSection('who-keeps-the-money', 'section-money-390.png', 390, 844);
    await captureSection('fair-price', 'section-calculator-390.png', 390, 844);
    await captureSection('artisan-vault', 'section-crafts-390.png', 390, 844);
    await captureSection('craft-map', 'section-map-390.png', 390, 844);

    console.log('All screenshots captured successfully!');
  } finally {
    ws.close();
  }
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
