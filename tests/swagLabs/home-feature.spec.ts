import path from 'path';
import { test } from '../../utils/base-test';
import { Tag } from '../../utils/test-tags';
import { config } from '../../configs/swaglabs';


test.describe('Swag Labs Tests', () => {
    test.beforeEach(async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await loginPage.login('standard_user', 'secret_sauce');
        await homePage.homePageIsDisplayed();
    });
  

    test(`[${Tag.SWAGLABS}] verify cart display number is selected`, async ({ homePage }) => {
        const numberOfItems = 3;
        await test.step(`add ${numberOfItems}  item.`, async () => {
            for (let i = 0; i < numberOfItems; i++) {
                await homePage.addItemToCartByIndex(i);
            }
        })
        await test.step('verify cart badge count', async () => {
            await homePage.verifyCartBadgeCount(numberOfItems);
        });
    })

    test(`[${Tag.SWAGLABS}] sort item A to Z`, async ({ homePage }) => {
        await test.step('sort items A to Z', async () => {
            await homePage.selectSort("az");
        });
        await test.step('verify items are sorted A to Z', async () => {
            homePage.verifySortedItems('az');
        });
    })

    test(`[${Tag.SWAGLABS}] sort item Z to A`, async ({ homePage }) => {
        await test.step('sort items Z to A', async () => {
            await homePage.selectSort("za");
        });
        await test.step('verify items are sorted Z to A', async () => {
            homePage.verifySortedItems('za');
        });
    })

    test(`[${Tag.SWAGLABS}] sort item low to high`, async ({ homePage }) => {
        await test.step('sort items low to high', async () => {
            await homePage.selectSort("lohi");
        });
        await test.step('verify items are sorted low to high', async () => {
            homePage.verifySortedItemsFollowingPrice('lohi');
        });
    })

    test(`[${Tag.SWAGLABS}] sort item high to low`, async ({ homePage }) => {
        await test.step('sort items high to low', async () => {
            await homePage.selectSort("hilo");
        });
        await test.step('verify items are sorted high to low', async () => {
            homePage.verifySortedItemsFollowingPrice('hilo');
        });
    })
});
