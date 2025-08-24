import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class HomePage extends BasePage {
    readonly productsTitle: Locator;
    readonly inventoryItems: Locator;
    readonly inventoryItemsName: Locator;
    readonly inventoryItemsDescription: Locator;
    readonly inventoryItemsPrice: Locator;
    readonly addToCartButtons: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly filterDropdown: Locator;
    readonly filterOptions: Locator;

    constructor(page: Page) {
        super(page);
        this.productsTitle = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryItemsName = page.locator('.inventory_item_name');
        this.inventoryItemsDescription = page.locator('.inventory_item_desc');
        this.inventoryItemsPrice = page.locator('.inventory_item_price');
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

    async getAllItemsName(): Promise<string[]> {
        const items = await this.inventoryItemsName.allTextContents();
        return items.map(item => item.trim());
    }
    async getAllItemsDescription(): Promise<string[]> {
        const descriptions = await this.inventoryItemsDescription.allTextContents();
        return descriptions.map(desc => desc.trim());
    }
    async getAllItemsPrice(): Promise<string[]> {
        const prices = await this.inventoryItemsPrice.allTextContents();
        return prices.map(price => price.trim());
    }

    // Add an item to the cart by index
    async addItemToCartByIndex(index: number) {
        await this.click(this.addToCartButtons.nth(index));
    }

    async addItemToCart(itemCount: number) {
        for (let i = 0; i < itemCount; i++) {
            await this.addItemToCartByIndex(0);
        }
    }
    // Navigate to the cart page
    async goToCart() {
        await this.click(this.cartIcon);
    }

    // Select a filter option
    async selectSort(option: string) {
        await this.selectOptionInDropdown(this.filterDropdown, option);
    }


    // Verify the cart badge count
    async verifyCartBadgeCount(expectedCount: number) {
        const badgeText = await this.cartBadge.textContent();
        expect(badgeText).toBe(expectedCount.toString());
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


