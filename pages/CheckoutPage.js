import { expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { BasePage } from "./BasePage";

export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);

    //Locators
    this.pageTitle = page.getByTestId("title").filter({ hasText: "Checkout: Your Information" });
    this.firstNameTextBox = page.getByRole("textbox", { name: "First Name" });
    this.lastNameTextBox = page.getByRole("textbox", { name: "Last Name" });
    this.zipCodeTextbox = page.getByRole("textbox", { name: "Zip/Postal Code" });
    this.continueButton = page.getByRole("button", { name: "Continue" });

  }

  async populateInputFields(firstname, lastname, zip){
    await this.firstNameTextBox.fill(firstname);
    await this.lastNameTextBox.fill(lastname);
    await this.zipCodeTextbox.fill(zip);
  }

  
}
