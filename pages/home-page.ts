import { expect, Locator, Page } from "@playwright/test";


export class HomePage {
    readonly page: Page;
    readonly dashboard: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dashboard = page.getByRole('heading', { name: 'Dashboard' });
    }

    async homePageIsDisplayed() {
        await expect(this.dashboard).toHaveText('Dashboard');
    }
}


