import { chromium } from "@playwright/test";
import { Before, After } from "@cucumber/cucumber";
let browser;

Before(async function () {
  browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  await this.page.close();
  await browser.close();
});
