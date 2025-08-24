import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class YourInformationPage extends BasePage {
    readonly yourInformationTxt: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    constructor(page: Page) {
        super(page);
        this.yourInformationTxt = page.locator('[data-test="title"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async yourInformationPageIsDisplayed() {
        await this.expectEqualText(this.yourInformationTxt, 'Checkout: Your Information');
    }
    async enterYourInformation(firstName: string, lastName: string, postalCode: string) {
        await this.sendkey(this.firstNameInput, firstName);
        await this.sendkey(this.lastNameInput, lastName);
        await this.sendkey(this.postalCodeInput, postalCode);
    }
    async clickContinue() {
        await this.click(this.continueButton);
    }
    async clickCancel() {
        await this.click(this.cancelButton);
    }
    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
    }
}