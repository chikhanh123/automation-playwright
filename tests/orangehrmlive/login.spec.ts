
import { test } from '../../utils/base-test';
import { Tag } from '../../utils/test-tags';
import { loginTestData } from '../../data/login-data';
import { config } from '../../configs/dev';

test.describe('OrangeHRM login feature', () => {

    test(`[${Tag.LOGIN}] login successfully`, async ({ loginPage, homePage }) => {
        test.info().annotations.push(
            { type: 'epic', description: 'Authentication' },
            { type: 'feature', description: 'Login' },
            { type: 'severity', description: 'critical' },
            { type: 'tag', description: Tag.LOGIN }
        );
        // allure.epic('Authentication');
        // allure.feature('Login');
        // allure.severity('critical');
        // allure.tag(Tag.LOGIN);
        await test.step('Login page', async () => {
            await loginPage.goto(config.baseURL);
            console.log('✅ config.baseURL =', config.baseURL);
            console.log('✅ config.userName =', config.validCredentials.username);
            console.log('✅ config.passWord =', config.validCredentials.password);
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
        for (const tmp of loginTestData) {
            if (tmp.case === 'Sai password') {
                await loginPage.login(tmp.username, tmp.password);
                await loginPage.errorLoginFailed();
            }
        }
    })
})