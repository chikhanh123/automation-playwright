import { test, expect } from "@playwright/test";
// import { numbers } from "../data/login-data";



test.describe('Data-driven login test', () => {
    test('login', async ({ page }) => {
        await page.goto('https://keycloak-test.bic.tech/realms/business-employee-portal/protocol/openid-connect/auth?client_id=bep-web-client&redirect_uri=https%3A%2F%2Fbep.dev.int.bic.tech%2Frdb-customer%2Fekyc%2Fall-ekyc&state=7920a911-2fa9-4574-8ac9-ce0b82631262&response_mode=fragment&response_type=code&scope=openid&nonce=37f0c4b3-b0ff-4926-ac87-07d7780517f9&code_challenge=GpyPJFss43PuKCCBVwIWmQfBE4BkZ7kKvfY3yKZwe04&code_challenge_method=S256');
        await page.getByRole('link', { name: 'azure Login with iTech' }).click();
        await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
        await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('khanh.huynh@itech.asia');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByRole('textbox', { name: 'Enter the password for khanh.' }).fill('7NTMKQ1@');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.getByRole('button', { name: 'Yes' }).click();
        await page.context().storageState({ path: 'auth.json' });
    });

    for (const data of numbers) {
        test(`${data}`, async ({ page }) => {
            await page.goto('https://bep.dev.int.bic.tech/rdb-customer/ekyc/all-ekyc');
            await page.getByRole('link', { name: 'azure Login with iTech' }).click();
            
            
            await page.locator('xpath=//*[text()="khanh.huynh@itech.asia"]').click();
            await page.getByRole('button', { name: 'Accept' }).click();
            await page.getByRole('textbox', { name: 'Phone Number' }).click();
            await page.getByRole('textbox', { name: 'Phone Number' }).fill(data.toString());
            await page.getByRole('button', { name: 'Apply' }).click();
            await page.getByRole('button', { name: 'Review' }).click();
            await page.getByRole('button', { name: 'Next' }).click();
            await page.getByRole('button', { name: 'Submit' }).click();
        });
    }

})