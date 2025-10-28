import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("the user is on the login page", async function () {
  await this.page.goto("https://www.saucedemo.com/");
});

When("the user enter valid credentials", async function () {
  await this.page.locator("#user-name").fill("standard_user");
  await this.page.locator("#password").fill("secret_sauce");
  await this.page.locator("#login-button").click();
});

Then("the dashboard page appears", async function () {
  await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = this.page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
  await this.page.waitForTimeout(1000);
});
