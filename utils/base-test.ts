import { test as baseTest } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/swagLabs/login-page';
import { HomePage } from '../pages/swagLabs/home-page';

export { expect } from '@playwright/test';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage; // Assuming HomePage is defined similarly to LoginPage

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
});