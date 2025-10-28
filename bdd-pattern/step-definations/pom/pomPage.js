import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage.js";

let loginPage;

Given("the user is on login page", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto("https://www.saucedemo.com/");
});

When("user enter valid credentials", async function () {
  await loginPage.signIn("standard_user", "secret_sauce");
});

Then("dashboard page appears", async function () {
  await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(loginPage.getHeader()).toHaveText("Swag Labs");
  await this.page.waitForTimeout(1000);
});
