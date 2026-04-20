import { expect } from "@playwright/test";

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.appLogo = page.locator(".app_logo");
    this.menuIcon = page.getByRole("button", { name: "Open Menu" });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
  }
}
