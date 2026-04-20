// @ts-check

import { expect } from "@playwright/test";
import { ItemDetailsPage } from "./ItemDetailsPage";
import { CartDetailsPage } from "./CartDetailsPage";
import { BasePage } from "./BasePage";
import { HeaderComponent } from "../components/HeaderComponent";
import { InventoryItemComponent } from "../components/InventoryItemComponent";

export class InventoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.header = new HeaderComponent(page);
    this.inventoryItemsColection = page.getByTestId("inventory-item");
  }

  /*function that goes trouh all inventory items listed on page 
   and verifies visibility of image, item name, item description, item price and button */
  async checkAllProductItems() {
    const count = await this.inventoryItemsColection.count();
    // use this expect to make sure its not an empty page
    await expect(this.inventoryItemsColection).not.toHaveCount(0);
    // go trough all inventory items
    for (let i = 0; i < count; i++) {
      const item = this.inventoryItemsColection.nth(i);
      const inventoryItem = new InventoryItemComponent(item);
      //check each item image, title, description, price, add to cart button
      await expect(inventoryItem.itemName).toBeVisible();
      await expect(inventoryItem.itemDescription).toBeVisible();
      await expect(inventoryItem.itemPrice).toBeVisible();
      await expect(inventoryItem.itemAddButton).toBeVisible();
    }
  }

  async getAllItemNames() {
    return await this.inventoryItemsColection.getByTestId("inventory-item-name").allInnerTexts();
  }

  async getAllItemPrices() {
    const prices = await this.inventoryItemsColection.getByTestId("inventory-item-price").allInnerTexts();
    return prices.map((p) => parseFloat(p.slice(1)));
  }

  async checkProductItemsSorting(sortType) {
    let activeOption = await this.header.activeSortingOption.innerText();
    const count = await this.inventoryItemsColection.count();

    switch (sortType) {
      case "Ascending A to Z":
        await this.header.sortingFilter.selectOption("az");
        const allNames1 = await this.getAllItemNames();
        const sortedNamesAsc = [...allNames1].sort((a, b) => a.localeCompare(b));
        expect(allNames1).toEqual(sortedNamesAsc);
        break;

      case "Descending Z to A":
        await this.header.sortingFilter.selectOption("za");
        const allNames2 = await this.getAllItemNames();
        const sortedNamesDesc = [...allNames2].sort((a, b) => a.localeCompare(b)).reverse();
        expect(allNames2).toEqual(sortedNamesDesc);
        break;

      case "Lowest price":
        await this.header.sortingFilter.selectOption("lohi");
        const allPrices1 = await this.getAllItemPrices();
        const sortedPricesAsc = [...allPrices1].sort((a, b) => a - b);
        expect(allPrices1).toEqual(sortedPricesAsc);
        break;

      case "Highest price":
        await this.header.sortingFilter.selectOption("hilo");
        const allPrices2 = await this.getAllItemPrices();
        const sortedPricesDesc = [...allPrices2].sort((a, b) => b - a);
        expect(allPrices2).toEqual(sortedPricesDesc);
        break;

      default:
        throw new Error("Invalid sorting option");
    }
  }

  async addItemToCartByName(...items) {
    const addedItemsNumber = items.length;
    for (const value of items) {
      const item = this.inventoryItemsColection.filter({ hasText: value });
      await item.getByRole("button", { name: "Add to cart" }).click();
    }
    return addedItemsNumber;
    await this.page.waitForTimeout(3000);
  }

  async openItemDetailsPage(itemDetailsPage) {
    const itemLocator = this.inventoryItemsColection.first(); //takes first item from page
    const inventoryItem = new InventoryItemComponent(itemLocator); //makes new component with that locator

    /* this can also be used to get item by name directly, not just first item from collection
    const itemLocator = this.inventoryItemsCollection
    .filter({ hasText: itemName });
     */
    await inventoryItem.clickOnItem();
    return new ItemDetailsPage(this.page);
  }

  async openCart() {
    await this.header.clickOnCart();
    return new CartDetailsPage(this.page);
  }
}
