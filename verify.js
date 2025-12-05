const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///app/index.html');

  // Sprawdź polski
  let title = await page.title();
  assert.strictEqual(title, 'Czarna Dziura – Stranger Things');
  let footer = await page.textContent('footer[data-lang="pl"]');
  assert.strictEqual(footer.trim(), 'Daniel Trzeciński');

  // Przełącz na angielski
  await page.click('#langEN');

  // Sprawdź angielski
  title = await page.title();
  assert.strictEqual(title, 'Black Hole – Stranger Things');
  footer = await page.textContent('footer[data-lang="en"]');
  assert.strictEqual(footer.trim(), 'Daniel Trzeciński');

  await browser.close();
})();
