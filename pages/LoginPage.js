// @ts-check
import { expect } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.loginPageTitle = page.getByText("Swag Labs");
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByTestId("error");
    this.loginPageLogo = page.locator(".login_logo");
  }

  /**
   * @param {string} username
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.loginButton.click();
    //await this.page.waitForTimeout(3000);
    //return new InventoryPage(this.page);
  }

  async logout() {
    await this.menuIcon.click();
    await this.logoutButton.click();
  }
}
