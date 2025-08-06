
// import { test } from '../utils/base-test';
// import { Tag } from '../utils/test-tags';
// import { loginTestData } from '../data/login-data';
// import { config } from '../configs/dev';
// test.describe('Admin tab query data', () => {

//     test(`[${Tag.ADMIN}] admin page is displayed`, async ({ loginPage, systemUserPage, allure }) => {
//         allure.epic('Admin');
//         allure.feature('query data');
//         allure.severity('critical');
//         allure.tag(Tag.ADMIN);

//         await test.step('Login to Admin page', async () => {
//             await loginPage.goto(config.baseURL);
//             await loginPage.login(config.validCredentials.username, config.validCredentials.password);

//             await test.step('Navigate to Admin page', async () => {
//                 await loginPage.goto(config.adminUrl);
//             });

//             await test.step('Verify Admin page is displayed', async () => {
//                 await systemUserPage.verifySystemUsersPageIsDisplayed();
//             });
//         });
//     })}
// );