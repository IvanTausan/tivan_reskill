// @ts-nocheck
import { test } from "../../fixtures/testFixtures";

test("Add item to cart and verify", async ({ inventoryPage }) => {
  const count = await inventoryPage.addItemToCartByName(
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
  );
  await inventoryPage.header.validateCartBadgeNumber(count);
  const cartDetailsPage = await inventoryPage.openCart();
  await cartDetailsPage.validateCart();
});
