// Usage: node render.js post.json outdir
// post.json: {"slug":"vijf-tips","slides":[{type:"cover"|"point"|"cta", eyebrow, title, body, num, quote, button, url}]}
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
(async () => {
  const [, , input, outDir] = process.argv;
  const post = JSON.parse(fs.readFileSync(input, "utf8"));
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(__dirname, "template.html"));
  await page.evaluate(() => document.fonts.ready);
  const n = post.slides.length, files = [];
  for (let i = 0; i < n; i++) {
    await page.evaluate(([s, i, n]) => window.renderSlide(s, i, n), [post.slides[i], i, n]);
    await page.waitForTimeout(150);
    const file = path.join(outDir, `${post.slug}-${String(i + 1).padStart(2, "0")}.jpg`);
    await page.locator("#slide").screenshot({ path: file, type: "jpeg", quality: 92 });
    files.push(file);
  }
  await browser.close();
  console.log(JSON.stringify(files));
})();
