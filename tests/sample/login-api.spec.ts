// import { test, expect, request } from '@playwright/test';

// test('Login bằng API rồi test UI', async ({ page, request }) => {
//     // 1. Gọi API login để lấy token
//     const loginRes = await request.post('https://reqres.in/api/login', {
//         headers: {
//             'Content-Type': 'application/json',
//             'x-api-key': 'reqres-free-v1'
//         },
//         data: {
//             email: 'eve.holt@reqres.in',
//             password: 'cityslicka'
//         }
//     });
//     expect(loginRes.ok()).toBeTruthy(); // ✅ Kiểm tra phản hồi thành công
//     const body = await loginRes.json();
//     const token = body.token;
//     expect(token).toBeDefined();

//     // 2. Inject token vào localStorage
//     await page.addInitScript(token => {
//         window.localStorage.setItem('authToken', token);
//     }, token);

//     // 3. Truy cập trang đã login
//     await page.goto('https://your-app.com/dashboard'); // 🟡 Đổi thành trang app thật của bạn

//     // 4. Xác minh đã login
//     await expect(page.getByText('Welcome')).toBeVisible(); // ✅ Xác thực UI sau khi login
// });
