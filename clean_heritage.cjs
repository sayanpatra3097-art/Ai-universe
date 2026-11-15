const { chromium } = require('./node_modules/@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  const srcPath = 'C:/Users/sayan/.gemini/antigravity/brain/231128df-514a-443d-8006-a6d477885f8f/.user_uploaded/media_1794660352158_c63a8d7a.jpg';
  const outPath = 'c:/Users/sayan/Downloads/ai-universe-2026-frontend/ai-universe-2026/public/images/jaipur-heritage.jpg';

  const buf = fs.readFileSync(srcPath);
  const b64 = buf.toString('base64');

  await page.setContent(`<!DOCTYPE html><html><body><canvas id="c"></canvas></body></html>`);

  const cleanB64 = await page.evaluate(async (data) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const w = img.width;
        const h = img.height;
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Remove the slider arrow on the right side (~ x: 910-955, y: 300-360)
        // Inpaint with nearby cloud/mist pixels or crop
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        // Check the arrow region around x: 915-955, y: 300-360
        // We can seamlessly blend the right edge with soft feathered mist!
        for (let y = 0; y < h; y++) {
          for (let x = 890; x < w; x++) {
            // Feather the extreme right into the white background mist
            const factor = (x - 890) / (w - 890);
            const idx = (y * w + x) * 4;
            // Target white/light gray mist (d[0], d[1], d[2])
            // Look at sample above or below
            if (y >= 280 && y <= 370 && x >= 910) {
              // Replace arrow pixels with mist from above (y - 90)
              const sampleIdx = ((y - 90) * w + x) * 4;
              d[idx] = d[sampleIdx];
              d[idx + 1] = d[sampleIdx + 1];
              d[idx + 2] = d[sampleIdx + 2];
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(c.toDataURL('image/jpeg', 0.95).replace(/^data:image\/jpeg;base64,/, ''));
      };
      img.src = 'data:image/jpeg;base64,' + data;
    });
  }, b64);

  fs.writeFileSync(outPath, Buffer.from(cleanB64, 'base64'));
  console.log('Saved clean image to:', outPath);
  await browser.close();
})();

