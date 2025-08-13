import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    }

    async verifyDashboardPageIsDisplayed() {
        await expect(this.dashboardHeading).toBeVisible();
    }
}