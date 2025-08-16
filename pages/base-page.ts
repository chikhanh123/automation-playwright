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
    async selectOptionInDropdown(locator: Locator, value: string) {
        await locator.selectOption(value);
    }

    async selectItemFromDropdown(dropdown: Locator, itemLocator: Locator, textToSelect: string) {
        await this.click(dropdown);
        const allTexts = await itemLocator.allTextContents();
        const index = allTexts.findIndex(text => text.trim().toLowerCase() === textToSelect.trim().toLowerCase());
        if (index === -1) {
          throw new Error(`Item with text "${textToSelect}" not found in dropdown. Available items: ${allTexts.join(', ')}`);
        }
        await itemLocator.nth(index).click();
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

    async waitForLoadCompleted(locator: Locator, timeout: number = 10000) {
        await expect(locator)
            .toBeHidden({ timeout });
    }




}