import { test, expect } from "@playwright/test";
import { materialUrl } from "../../configs/material";
import { registerData } from "../../data/material/register-page";




test.describe('Registration page', () => {
    test('register', async ({ page }) => {
        const data = registerData[0];
        await page.goto(materialUrl.registerPage);
        await page.getByRole('textbox', { name: 'Username:' }).fill(data.Username);
        await page.getByRole('textbox', { name: 'Email:' }).fill(data.Email);
        await page.getByRole('radio', { name: `${data.Gender}`, exact: true }).click();
        await page.getByRole('checkbox', { name: `${data.Hobbies}` }).click();
        await page.locator('#interests').selectOption('technology');

        // ham select dropdown
        await page.getByLabel('Country:').selectOption('canada');
        await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('1996-08-08');
        await page.getByRole('button', { name: 'Profile Picture:' }).setInputFiles(data.ProfilePicture);
        await page.getByRole('textbox', { name: 'Biography:' }).fill(data.Biography);
        await page.getByRole('slider', { name: 'Rate Us:' }).fill(data.RateUs);
    });



})