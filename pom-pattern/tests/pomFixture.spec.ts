import { test, expect } from "../fixtures/login-fixture";

test("Login as standard user uisng POM", async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.signIn("standard_user", "secret_sauce");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(loginPage.getHeader()).toHaveText("Swag Labs");
});
