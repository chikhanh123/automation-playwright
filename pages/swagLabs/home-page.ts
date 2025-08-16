import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class HomePage extends BasePage {
    readonly productsTitle: Locator;
    readonly inventoryItems: Locator;
    readonly addToCartButtons: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly filterDropdown: Locator;
    readonly filterOptions: Locator;

    constructor(page: Page) {
        super(page);
        this.productsTitle = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.filterDropdown = page.locator('[data-test="product-sort-container"]');
        this.filterOptions = page.locator('xpath=//select/option');
    }

    // Verify the home page is displayed
    async homePageIsDisplayed() {
        await this.expectEqualText(this.productsTitle, 'Products');
    }

    // Get the count of inventory items
    async getInventoryItemCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    // Add an item to the cart by index
    async addItemToCartByIndex(index: number) {
        await this.addToCartButtons.nth(index).click();
    }

    async addItemToCart(itemCount: number) {
        for (let i = 0; i < itemCount; i++) {
            await this.addItemToCartByIndex(i);
        }
    }

    // Verify the cart badge count
    async verifyCartBadgeCount(expectedCount: number) {
        const badgeText = await this.cartBadge.textContent();
        expect(badgeText).toBe(expectedCount.toString());
    }

    // Navigate to the cart page
    async goToCart() {
        await this.cartIcon.click();
    }

    // Select a filter option
    async selectSort(option: string) {
        await this.selectOptionInDropdown(this.filterDropdown, option);
    }

    async verifySortedItems(order: string) {  
        const items = await this.inventoryItems.allTextContents();
        const sortedItems = [...items].sort((a, b) => {
            return order === 'az' ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(items).toEqual(sortedItems);
    }

    async verifySortedItemsFollowingPrice(order: string) {
        const prices = await this.inventoryItems.locator('.inventory_item_price').allTextContents();
        const sortedPrices = [...prices].map(price => parseFloat(price.replace('$', ''))).sort((a, b) => {
            return order === 'lohi' ? a - b : b - a;
        });
        expect(prices.map(price => parseFloat(price.replace('$', '')))).toEqual(sortedPrices);
    }
}


