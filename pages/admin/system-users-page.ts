import { expect, Locator, Page } from "@playwright/test";


export class SystemUsersPage {
    readonly page: Page;
    readonly dashboard: Locator;
    readonly userNameInput: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly statusDropdown: Locator;
    readonly searchButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dashboard = page.getByRole('heading', { name: 'Dashboard' });
        this.userNameInput = page.getByRole('textbox').nth(1);
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.statusDropdown = page.locator('div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
        this.searchButton = page.locator('xpath=//button[@type="submit"]');
    }

    async verifySystemUsersPageIsDisplayed() {
        await expect(this.userNameInput).toBeVisible();
        await expect(this.userRoleDropdown).toBeVisible();
        await expect(this.employeeNameInput).toBeVisible();
        await expect(this.statusDropdown).toBeVisible();
    }

    async enterUserName(userName: string) {
        await this.userNameInput.fill(userName);
    }
    async selectUserRole(role: string) {
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();
    }

    async enterEmployeeName(employeeName: string) {
        await this.employeeNameInput.fill(employeeName);
    }
    async selectStatus(status: string) {
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();
    }

}


