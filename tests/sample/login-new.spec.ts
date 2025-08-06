// import { test } from '../../utils/base-test';
// import { Tag } from '../../utils/test-tags';
// import { config } from '../../configs/dev';
// test.describe('OrangeHRM login', () => {
 
//     test(`[${Tag.SMOKE}] login successfully`, async ({ loginPage, homePage, allure }) => {
//         test.info().annotations.push(
//             { type: 'epic', description: 'Authentication' },
//             { type: 'feature', description: 'Login' },
//             { type: 'story', description: 'Đăng nhập thành công' },
//             { type: 'severity', description: 'critical' },
//             { type: 'tag', description: Tag.SMOKE }
//         );
//         allure.epic('Authentication');
//         allure.feature('Login');
//         allure.story('Đăng nhập thành công');
//         allure.severity('critical');
//         allure.tag(Tag.SMOKE);
//         allure.issue('RB-2739', 'RB-2739');


//         await test.step('Login page', async () => {
//             await loginPage.goto(config.baseURL);
//             // console.log('✅ config.baseURL =', config.baseURL);
//             // console.log('✅ config.userName =', config.username);
//             // console.log('✅ config.passWord =', config.password);
//         })

//         await test.step('input valid userName and passWord', async () => {
//             await loginPage.login(config.validCredentials.username, config.validCredentials.password);
//         })

//         await test.step('verify login successfully', async () => {
//             await homePage.homePageIsDisplayed();
//         })
//     })

//     test('login failed', async ({ loginPage }) => {
//         await loginPage.goto(config.baseURL);
//         await loginPage.login('Admin', 'admin');
//         await loginPage.errorLoginFailed();
//     })
// })