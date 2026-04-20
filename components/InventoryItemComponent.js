import { expect } from "@playwright/test";

export class InventoryItemComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(locator) {
    this.root = locator;

    this.itemPrice = locator.getByTestId("inventory-item-price");
    this.itemName = locator.getByTestId("inventory-item-name");
    this.itemDescription = locator.getByTestId("inventory-item-desc");
    this.itemPrice = locator.getByTestId("inventory-item-price");
    this.itemAddButton = locator.getByRole("button", { name: "Add to cart" });
  }

  async getItemName() {
    return await this.itemName.innerText();
  }

  async clickOnItem() {
    await this.itemName.click();
  }
}
