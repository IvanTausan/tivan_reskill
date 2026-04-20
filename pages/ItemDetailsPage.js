import { expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";

export class ItemDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    //Locators
    this.header = new HeaderComponent(page);

    this.itemImage = page.getByRole("img", { name: "Sauce Labs Backpack" });
    this.itemTitle = page.getByTestId("inventory-item-name").filter({ hasText: "Sauce Labs Backpack" });
    this.itemDescription = page.getByTestId("inventory-item-desc");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.itemAddToCartButton = page.getByRole("button", {
      name: "Add to cart",
    });
  }
}
