import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class YourCartPage extends BasePage {
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    // Verify the cart page is displayed
    async cartPageIsDisplayed() {
        await this.expectVisible(this.cartItems);
    }

    // Get the count of items in the cart
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    // Proceed to checkout
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // Continue shopping
    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}