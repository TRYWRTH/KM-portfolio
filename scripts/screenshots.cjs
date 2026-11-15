// Captures the landing page and one curtain mid-transition from each side.
// Usage: npm run build && npm start   (in another terminal)
//        npm run screenshots [-- http://localhost:3000]
// Needs Playwright: uses a globally installed one, or `npm i -D playwright`.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "..", "screenshots");
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const MID_MS = 450; // ~half of the .9s wipe (+ the 120ms page-layer lag)

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, `${name}-landing.png`) });

    for (const [side, label] of [["left", "Reżyseria"], ["right", "Kontakt"]]) {
      await page.getByRole("link", { name: new RegExp(label) }).first().click();
      await page.waitForFunction(() => document.querySelector(".stage.open"));
      await page.waitForTimeout(MID_MS);
      await page.screenshot({ path: path.join(OUT, `${name}-curtain-${side}.png`) });
      await page.keyboard.press("Escape");
      await page.waitForURL(BASE.replace(/\/$/, "") + "/");
      await page.waitForTimeout(1500);
    }
    await page.close();
  }
  await browser.close();
  console.log("Saved to", OUT);
})().catch((e) => { console.error(e); process.exit(1); });
