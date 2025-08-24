import { config } from "../../configs/swaglabs";
import { test } from "../../utils/base-test";

test.describe("Swag Labs Your Information Feature", () => {
    test.beforeEach(async ({ loginPage, homePage, yourCartPage }) => {
        await loginPage.goto(config.baseURL);
        await loginPage.login('standard_user', 'secret_sauce');
        await homePage.homePageIsDisplayed();
    });

    test("verify user can navigate to Your Information page", async ({ homePage, yourCartPage, yourInformationPage }) => {
        const number = 6;
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("go to your information page", async () => {
            await yourCartPage.clickOnCheckout();
            await yourInformationPage.yourInformationPageIsDisplayed();
        });
    });

    test("verify error message is displayed with null input", async ({ homePage, yourCartPage, yourInformationPage }) => {
        const number = 6;
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("go to your information page", async () => {
            await yourCartPage.clickOnCheckout();
            await yourInformationPage.yourInformationPageIsDisplayed();
        });

        await test.step("verify error message is displayed when first name is null", async () => {
            await yourInformationPage.enterYourInformation('', 'Doe', '12345');
            await yourInformationPage.clickContinue();
            await yourInformationPage.expectEqualText(yourInformationPage.errorMessage, 'Error: First Name is required');
        });
    }); 



});