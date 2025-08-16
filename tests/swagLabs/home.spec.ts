import { test } from '../../utils/base-test';
import { Tag } from '../../utils/test-tags';


test.describe('Swag Labs Tests', () => {
    test.beforeEach(async ({ loginPage, homePage }) => {
        await loginPage.goto('https://www.saucedemo.com/');
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

    test(`[${Tag.SWAGLABS}] fillter item A to Z`, async ({ homePage }) => {
        await test.step(' filter items A to Z', async () => {
            await homePage.selectSort("az");
        });
        await test.step('verify items are sorted A to Z', async () => {
            homePage.verifySortedItems('az');
        });
    })

    test(`[${Tag.SWAGLABS}] fillter item Z to A`, async ({ homePage }) => {
        await test.step(' filter items Z to A', async () => {
            await homePage.selectSort("za");
        });
        await test.step('verify items are sorted Z to A', async () => {
            homePage.verifySortedItems('za');
        });
    })
});
