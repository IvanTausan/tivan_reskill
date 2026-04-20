// @ts-nocheck
import { test } from "../../fixtures/testFixtures";

test("Checkout", async ({ checkoutPage }) => {
  // await cartDetailsPage.cartCheckoutButton.click();
  await checkoutPage.populateInputFields("Tester", "testing", "31000");
  await checkoutPage.continueButton.click();
});
