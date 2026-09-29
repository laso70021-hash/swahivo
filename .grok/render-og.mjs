import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const html = pathToFileURL(resolve("/workspace/.grok/og-card.html")).href;
const outPng = "/workspace/.grok/card-raw.png";

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(html, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-ready") === "1",
    { timeout: 15000 },
  );
  await page.waitForTimeout(200);
  await page.screenshot({
    path: outPng,
    type: "png",
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  console.log(JSON.stringify({ ok: true, screenshot: outPng, html }));
} finally {
  await browser.close();
}
