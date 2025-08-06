import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { allure } from 'allure-playwright';
import { SystemUsersPage } from '../pages/admin/system-users-page';

export { expect } from '@playwright/test';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  systemUserPage: SystemUsersPage;
  allure: typeof allure;
};

export const test = baseTest.extend<MyFixtures>({
  // allure: ({ }, use) => {
  //   // Loại bỏ async vì allure là module tĩnh, không cần chờ
  //   use(allure);
  // },
  loginPage: async ({ page }, use) => {
    // Đảm bảo page đã tải xong trước khi khởi tạo
    await page.waitForLoadState('load');
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new HomePage(page));
  },
  systemUserPage: async ({ page }, use) => {
    await page.waitForLoadState('load');
    await use(new SystemUsersPage(page));
  },
});