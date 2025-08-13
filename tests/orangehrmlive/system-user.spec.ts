import { test } from '../../utils/base-test';
import { Tag } from '../../utils/test-tags';
import { config } from '../../configs/dev';
test.describe('Admin tab query data', () => {
    test.beforeEach(async ({ loginPage, systemUserPage,dashboardPage }) => {
        await loginPage.goto(config.baseURL);
        await loginPage.login(config.validCredentials.username, config.validCredentials.password);

        await test.step('Verify Dashboard page is displayed', async () => {
            await dashboardPage.verifyDashboardPageIsDisplayed();   
         });
        await test.step('Navigate to Admin page', async () => {
            await loginPage.goto(config.adminUrl);
        });

        await test.step('Verify Admin page is displayed', async () => {
            await systemUserPage.verifySystemUsersPageIsDisplayed();
        });
    });

    test(`[${Tag.ADMIN}] query user name`, async ({ systemUserPage }) => {
        await test.step('Search user name', async () => {
            await systemUserPage.enterUserName('Admin');
            await systemUserPage.clickSearchButton();
        });
        await test.step('Verify user name is displayed', async () => {
            await systemUserPage.verifyAllRecordsIsquery('Username', 'Admin');
        });
    })
}
);


