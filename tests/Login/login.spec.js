// @ts-nocheck
import { LoginPage } from "../../pages/LoginPage";
import { test } from "../../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { users } from "../../fixtures/testFixtures";
//import users from "../test-data/users.json" assert { type: "json" };

test("Validate Login page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await expect(loginPage.loginPageTitle).toBeVisible();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
});

for (const user of Object.values(users)) {
  test.use({ user });
  test(`Validate Login for ${user.username}`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const loginPage = new LoginPage(page);
    await loginPage.login(user.username, user.password);

    if (user.shouldLogin) {
      await expect(page).toHaveURL(/inventory/);
      await loginPage.logout();
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    } else {
      await expect(loginPage.errorMessage).toContainText(user.expectedErrorMessage);
    }
  });
}
