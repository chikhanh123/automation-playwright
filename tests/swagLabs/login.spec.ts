import { test } from '../../utils/base-test';
import { Tag } from '../../utils/test-tags';
import { config } from '../../configs/swaglabs';
import { Logger } from '../../utils/logger';

test.describe('Swaglabs login feature', () => {
    

    test(`[${Tag.SWAGLABS}] login successfully`, async ({ loginPage, homePage }) => {
        test.info().annotations.push(
            { type: 'epic', description: 'Authentication' },
            { type: 'feature', description: 'Login' },
            { type: 'severity', description: 'critical' },
            { type: 'tag', description: Tag.SWAGLABS }
        );
        await test.step('Login page', async () => {
            await loginPage.goto(config.baseURL);
           Logger.info('✅ config.baseURL =' + config.baseURL);
           Logger.info('✅ config.userName =' + config.validCredentials.username);
           Logger.info('✅ config.passWord =' + config.validCredentials.password);
        })

        await test.step('input valid userName and passWord', async () => {
            await loginPage.login(config.validCredentials.username, config.validCredentials.password);
        })

        await test.step('verify login successfully', async () => {
            await homePage.homePageIsDisplayed();
        })
    })

    test(`[${Tag.LOGIN}] login failed`, async ({ loginPage }) => {
        await loginPage.goto(config.baseURL);
        await test.step('input invalid userName and passWord', async () => {
            await loginPage.login(config.invalidCredentials.username, config.invalidCredentials.password);
        })
        await test.step('verify login failed', async () => {
            await loginPage.verifyErrorLoginFailed();
        })
    })
    test(`[${Tag.SWAGLABS}] login with problem user`, async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await test.step('input problem userName and passWord', async () => {
            await loginPage.login(config.problemCredentials.username, config.problemCredentials.password);
        })
        await test.step('verify login successfully', async () => {
            await homePage.homePageIsDisplayed();
        })
    })
    test(`[${Tag.SWAGLABS}] login with performance glitch user`, async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await test.step('input performance glitch userName and passWord', async () => {
            await loginPage.login(config.performanceCredentials.username, config.performanceCredentials.password);
        })
        await test.step('verify login successfully', async () => {
            await homePage.homePageIsDisplayed();
        })
    })
    test(`[${Tag.SWAGLABS}] login with error user`, async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await test.step('input error userName and passWord', async () => {
            await loginPage.login(config.errorCredentials.username, config.errorCredentials.password);
        })
        await test.step('verify login failed', async () => {
            await homePage.homePageIsDisplayed();
        })
    })
    test(`[${Tag.SWAGLABS}] login with visual user`, async ({ loginPage, homePage }) => {
        await loginPage.goto(config.baseURL);
        await test.step('input visual userName and passWord', async () => {
            await loginPage.login(config.visualCredentials.username, config.visualCredentials.password);
        }   )
        await test.step('verify login successfully', async () => {
            await homePage.homePageIsDisplayed();
        })
    })  
})