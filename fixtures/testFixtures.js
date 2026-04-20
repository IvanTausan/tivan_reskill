// @ts-nocheck
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartDetailsPage } from "../pages/CartDetailsPage";
import { expect } from "@playwright/test";
import { users } from "../test-data/users";
import { CheckoutPage } from "../pages/CheckoutPage";

export const test = base.extend({
  user: async ({}, use) => {
    await use(users.standard);
  },
  inventoryPage: async ({ page, user }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(user.username, user.password);
    await page.waitForURL(/inventory/);
    await use(new InventoryPage(page));
  },

  cartDetailsPage: async ({ inventoryPage }, use) => {
    await inventoryPage.addItemToCartByName("Sauce Labs Bike Light");
    const cartDetailsPage = await inventoryPage.openCart();
    await use(cartDetailsPage);
  },

  checkoutPage: async ({ cartDetailsPage }, use) => {
    const checkoutPage = await cartDetailsPage.startCheckout();
    await use(checkoutPage);
  },
});
