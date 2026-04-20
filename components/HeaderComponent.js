import { expect } from "@playwright/test";

export class HeaderComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, title) {
    this.page = page;

    this.shopingCartIcon = page.locator("#shopping_cart_container");
    this.inventoryPageTitle = page.getByTestId("title");
    this.sortingFilter = page.getByTestId("product-sort-container");
    this.backButton = page.getByRole("button", { name: "Go back Back to products" });
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.activeSortingOption = page.getByTestId("active-option");
  }

  async clickOnCart() {
    await this.shopingCartIcon.click();
  }

  async validateCartBadgeNumber(count) {
    await expect(this.cartBadge).toHaveText(count.toString());
  }
}
