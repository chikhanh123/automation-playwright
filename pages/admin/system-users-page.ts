import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";


export class SystemUsersPage extends BasePage {
    readonly dashboard: Locator;
    readonly userNameInput: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly statusDropdown: Locator;
    readonly searchButton: Locator;
    readonly loadingIcon: Locator;


    constructor(page: Page) {
        super(page)
        this.dashboard = page.getByRole('heading', { name: 'Dashboard' });
        this.userNameInput = page.getByRole('textbox').nth(1);
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.statusDropdown = page.locator('div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text');
        this.searchButton = page.locator('xpath=//button[@type="submit"]');
        this.loadingIcon = page.locator('xpath=//div[@class="oxd-loading-spinner-container"]');
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

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async verifyAllRecordsIsquery(type: string, value: string) {
        await this.waitForLoadCompleted(this.loadingIcon);
        const xpath = `xpath=//div[@class='oxd-table']//div[@class='oxd-table-body']//div[@class='oxd-table-row oxd-table-row--with-border']/div[count(//div[@role='table']//div[text()='${type}']/preceding-sibling::div)+1]`;
        const records = this.page.locator(xpath).allTextContents();
        const allRecords = await records;
        console.log(allRecords);
        for (const record of allRecords) {
            if (record !== value) {
                throw new Error(`Record "${record}" does not match the expected value "${value}"`);
            }
        }
    }

}


