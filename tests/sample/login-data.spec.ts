// import test, { expect } from "@playwright/test";
// import { LoginPage } from "../../pages/login-page";
// import { HomePage } from "../../pages/home-page";
// import { loginTestData } from "../../data/login-data";
// import { config } from "../../utils/env";



// test.describe('Data-driven login test', () => {
//     let loginPage: LoginPage;
//     let homePage: HomePage;
//     test.beforeEach(async ({ page }) => {
//         loginPage = new LoginPage(page);
//         homePage = new HomePage(page);
//     });
//     for (const data of loginTestData) {
//         test(`${data.case}`, async ({ }) => {
//             await loginPage.goto(config.baseURL);
//             await loginPage.login(data.username, data.password);
//             if (data.expectedSuccess) {
//                 await homePage.homePageIsDisplayed();
//             } else {
//                 await loginPage.errorLoginFailed();
//             }

//         });
//     }

// })