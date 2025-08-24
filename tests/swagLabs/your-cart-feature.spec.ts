import { config } from "../../configs/swaglabs";
import { test } from "../../utils/base-test";

test.describe("Swag Labs Your Cart Feature", () => {
    test.beforeEach(async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await loginPage.login('standard_user', 'secret_sauce');
        await homePage.homePageIsDisplayed();
    });
    test("verify number items is selected in cart", async ({ homePage, yourCartPage }) => {
        const number = 6;
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step(`verify ${number} item in your cart screen`, async () => {
            await yourCartPage.verifyNumberItemsInYourCartPage(number);
        });
    })

    test("verify items name, description and price in your cart page", async ({ homePage, yourCartPage }) => {
        const number = 6;
        let itemsName: string[] = [];
        let itemsPrice: string[] = [];
        let itemsTitle: string[] = [];
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });

        await test.step("get all data item name, description, price in Home page", async () => {
            itemsName = await homePage.getAllItemsName();
            itemsPrice = await homePage.getAllItemsPrice();
            itemsTitle = await homePage.getAllItemsDescription();

        })
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("verify items name and price in your cart page", async () => {
            await yourCartPage.verifyAllItemsName(itemsName);
            await yourCartPage.verifyAllItemsPrice(itemsPrice);
            await yourCartPage.verifyAllItemsTitle(itemsTitle);
        });
    });

    test("verify user can remove item from cart", async ({ homePage, yourCartPage }) => {
        const number = 6;
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("verify number items in your cart page", async () => {
            await yourCartPage.verifyNumberItemsInYourCartPage(number);
        });
        await test.step("remove item from cart and verify item is removed", async () => {
            await yourCartPage.removeItemFromCartAndVerifyItemIsRemoved(number);
        });
    });

    test("verify user can continue shopping and add item again from your cart page", async ({ homePage, yourCartPage }) => {
        const number = 6;
        let itemsName: string[] = [];
        let itemsPrice: string[] = [];
        let itemsTitle: string[] = [];
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("remove item from cart and verify item is removed", async () => {
            await yourCartPage.removeItemFromCartAndVerifyItemIsRemoved(number);
        });
        await test.step("continue shopping and verify user is back to home page", async () => {
            await yourCartPage.continueShopping();
            await homePage.homePageIsDisplayed();
        });
        await test.step(`add ${number} item to cart`, async () => {
            await homePage.addItemToCart(number);
        });
        await test.step("get all data item name, description, price in Home page", async () => {
            itemsName = await homePage.getAllItemsName();
            itemsPrice = await homePage.getAllItemsPrice();
            itemsTitle = await homePage.getAllItemsDescription();

        })
        await test.step("go to your cart page", async () => {
            await homePage.goToCart();
            await yourCartPage.cartPageIsDisplayed();
        });
        await test.step("verify items name and price in your cart page", async () => {
            await yourCartPage.verifyAllItemsName(itemsName);
            await yourCartPage.verifyAllItemsPrice(itemsPrice);
            await yourCartPage.verifyAllItemsTitle(itemsTitle);
        });
    });
});