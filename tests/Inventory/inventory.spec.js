// @ts-nocheck
import { test } from "../../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { users } from "../../fixtures/testFixtures";

test.describe("Standard user tests", () => {
  test.use({ user: users.standard });
  test("Validate Inventory page", async ({ inventoryPage }) => {
    await expect(inventoryPage.appLogo).toHaveText("Swag Labs");
    await expect(inventoryPage.header.inventoryPageTitle).toHaveText("Products");
    await expect(inventoryPage.header.shopingCartIcon).toBeVisible();
    await expect(inventoryPage.header.sortingFilter).toBeVisible();
    await inventoryPage.checkAllProductItems();
  });

  test("Validate page sorting", async ({ inventoryPage }) => {
    await inventoryPage.checkProductItemsSorting("Ascending A to Z");
    await inventoryPage.checkProductItemsSorting("Descending Z to A");
    await inventoryPage.checkProductItemsSorting("Lowest price");
    await inventoryPage.checkProductItemsSorting("Highest price");
  });
});
