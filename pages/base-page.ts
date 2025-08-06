import { Page, Locator, expect } from "@playwright/test"

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openUrl(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async sendkey(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    async expectVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async expectEqualText(locator: Locator, value: string) {
        await expect(locator).toHaveText(value);
    }




}