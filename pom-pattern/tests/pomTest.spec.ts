import { test, expect } from "@playwright/test";
import { Login } from "../page-objects/login";

test("Login as standard user uisng POM", async ({ page }) => {
  const login = new Login(page);
  await login.goto();
  await login.signIn("standard_user", "secret_sauce");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(login.getHeader()).toHaveText("Swag Labs");
});
