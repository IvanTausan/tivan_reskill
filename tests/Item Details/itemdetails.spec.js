// @ts-nocheck

import { test } from "../../fixtures/testFixtures";
import { expect } from "@playwright/test";

test("Validate item details page", async ({ inventoryPage }) => {
  const itemDetailsPage = await inventoryPage.openItemDetailsPage();
  await expect(itemDetailsPage.header.backButton).toBeVisible(); //using Header component here
  await expect(itemDetailsPage.itemImage).toBeVisible(); // using old implementation with locator in page
  await expect(itemDetailsPage.itemTitle).toBeVisible();
  await expect(itemDetailsPage.itemDescription).toBeVisible();
  await expect(itemDetailsPage.itemPrice).toBeVisible();
  await expect(itemDetailsPage.itemAddToCartButton).toBeVisible();
});
