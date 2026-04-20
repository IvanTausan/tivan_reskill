// @ts-nocheck
import { test } from "../../fixtures/testFixtures";

test("Modify cart", async ({ cartDetailsPage }) => {
  await cartDetailsPage.validateCart();
  await cartDetailsPage.deleteItemFromCart("remove-sauce-labs-bike-light");
});
