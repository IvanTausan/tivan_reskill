import { expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { CheckoutPage } from "./CheckoutPage";

export class CartDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    //Locators
    this.quantityLabel = page.getByTestId("cart-quantity-label").filter({ hasText: "QTY" });
    this.descLabel = page.getByTestId("cart-quantity-label").filter({ hasText: "Description" });
    //locators that used fixed item values for name and for quantity. can be updated to accept name of item that was added to cart
    this.inventoryItemNames = page.getByTestId("inventory-item-name");
    this.itemQuantities = page.getByTestId("item-quantity");
    this.cartCheckoutButton = page.getByRole("button", { name: "Checkout" });
    this.cartRemoveItemButton = page.getByRole("button", { name: "Remove" });
  }

  async validateCart() {
    const cartDetaislPage = new CartDetailsPage(this.page);
    const count = await this.itemQuantities.count();

    await expect(this.header.inventoryPageTitle).toHaveText("Your Cart");

    for (let i = 0; i < count; i++) {
      await expect(this.itemQuantities.nth(i)).toHaveText("1");
      await expect(this.inventoryItemNames.nth(i)).toBeVisible();
      await expect(this.cartRemoveItemButton.nth(i)).toBeVisible();
    }
    await expect(this.cartCheckoutButton).toBeVisible();
  }

  async deleteItemFromCart(id) {
    const cartDetailsPage = new CartDetailsPage(this.page);
    await this.page.locator(`#${id}`).click();
  }

  async startCheckout() {
    await this.cartCheckoutButton.click();
    return new CheckoutPage(this.page);
  }
}
