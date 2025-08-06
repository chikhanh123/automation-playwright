// import test, { expect } from "@playwright/test";
// import { LoginPage } from "../../pages/login-page";
// import { HomePage } from "../../pages/home-page";
// import { config } from "../../utils/env";



// test.describe('OrangeHRM login', () => {
//     let loginPage: LoginPage;
//     let homePage: HomePage;
//     test.beforeEach(async ({ page }) => {
//         loginPage = new LoginPage(page);
//         homePage = new HomePage(page);
//     });

//     test('login successfully', async ({ }) => {
//         await loginPage.goto(config.baseURL);
//         await loginPage.login('Admin', 'admin123');
//         await homePage.homePageIsDisplayed();
//     })

//     test('login failed', async ({ }) => {
//         await loginPage.goto(config.baseURL);
//         await loginPage.login('Admin', 'admin');
//         await loginPage.errorLoginFailed();
//     })
// })