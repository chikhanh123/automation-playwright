import { test } from "../../utils/base-test";

test.describe("Swag Labs Your Cart Feature", () => {
    test.beforeEach(async ({ loginPage, homePage }) => {
        await loginPage.goto('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await homePage.homePageIsDisplayed();
    });
    test("verify item is selected in cart", async ({ homePage }) => {
        const number = 6;
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step('verify item in your cart screen', async () => {
            await homePage.verifyCartBadgeCount(1);
        });
    })
})   