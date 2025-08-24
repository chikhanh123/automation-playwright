import { test as baseTest } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/swagLabs/login-page';
import { HomePage } from '../pages/swagLabs/home-page';
import { YourCartPage } from '../pages/swagLabs/your-cart-page';
import { YourInformationPage } from '../pages/swagLabs/yourInformation-page';

export { expect } from '@playwright/test';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  yourCartPage: YourCartPage;
  yourInformationPage: YourInformationPage;

  allure: typeof allure;
};

export const test = baseTest.extend<MyFixtures>({
  // allure: ({ }, use) => {
  //   // Loại bỏ async vì allure là module tĩnh, không cần chờ
  //   use(allure);
  // },
  //swagLabs
  loginPage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new HomePage(page));
  },
  yourCartPage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new YourCartPage(page));
  },
  yourInformationPage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new YourInformationPage(page));
  },
});