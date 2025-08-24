import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { Logger } from "../../utils/logger";

export class YourCartPage extends BasePage {
    readonly yourCartTxt: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly itemsName: Locator;
    readonly itemsPrice: Locator;
    readonly iTemsTitle: Locator;
    readonly removeButtons: Locator;


    constructor(page: Page) {
        super(page);
        this.yourCartTxt = page.locator('[data-test="title"]')
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.itemsName = page.locator('.inventory_item_name');
        this.itemsPrice = page.locator('.inventory_item_price');
        this.iTemsTitle = page.locator("xpath=//div[@class='inventory_item_desc']");
        this.removeButtons = page.locator('[data-test^="remove"]');
    }

    // Verify the cart page is displayed
    async cartPageIsDisplayed() {
        await this.expectEqualText(this.yourCartTxt, 'Your Cart');
    }

    // Get the count of items in the cart
    async getCartItemCount(): Promise<number> {
        return await this.itemsName.count();
    }


    async getAllItemsName(): Promise<string[]> {
        const items = await this.itemsName.allTextContents();
        return items.map(item => item.trim());
    }
    async verifyAllItemsName(expectedNames: string[]) {
        const actualNames = await this.getAllItemsName();
        expect(actualNames).toEqual(expectedNames);
    }

    async getAllItemsPrice(): Promise<string[]> {
        const prices = await this.itemsPrice.allTextContents();
        return prices.map(price => price.trim());
    }
    async verifyAllItemsPrice(expectedPrices: string[]) {
        const actualPrices = await this.getAllItemsPrice();
        expect(actualPrices).toEqual(expectedPrices);
    }
    async getAllItemsTitle(): Promise<string[]> {
        const titles = await this.iTemsTitle.allTextContents();
        return titles.map(title => title.trim());
    }
    async verifyAllItemsTitle(expectedTitles: string[]) {
        const actualTitles = await this.getAllItemsTitle();
        expect(actualTitles).toEqual(expectedTitles);
    }
    // Proceed to checkout
    async clickOnCheckout() {
        await this.click(this.checkoutButton);
    }

    // Continue shopping
    async continueShopping() {
        await this.click(this.continueShoppingButton);
    }

    async verifyNumberItemsInYourCartPage(numberItem: number) {
        await this.expectToHaveCount(this.itemsName, numberItem);
    }
    async verifyItemIsRemovedFromCart(cartName: string) {
        const itemsName = await this.getAllItemsName();
        const isItemRemoved = !itemsName.includes(cartName);
        if (!isItemRemoved) {
            throw new Error(`Item "${cartName}" was not removed from the cart.`);
        }
    }

    async removeItemFromCartAndVerifyItemIsRemoved(numberItem: number) {
        const itemsName = await this.getAllItemsName();
        for (let i = 0; i < numberItem; i++) {
            const itemsName = await this.getAllItemsName();
            await this.click(this.removeButtons.nth(0));
            Logger.info(`Item removed: ${itemsName[0]}`);
            await this.verifyItemIsRemovedFromCart(itemsName[0]);
        }
    }
}