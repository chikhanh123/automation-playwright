import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";



export class LoginPage extends BasePage {
    [x: string]: any;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorLogin: Locator;

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorLogin = page.locator('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]')
    }

    //Methods single

    async fillUserName(userName: string) {
        await this.sendkey(this.usernameInput, userName);
    }

    async fillPassWord(passWord: string) {
        await this.sendkey(this.passwordInput, passWord);
    }

    async clickOnLogin() {
        await this.click(this.loginButton);
    }

    async goto(url: string) {
        await this.openUrl(url);
    }

    //Methods verify
    async errorLoginFailed() {
        await this.expectEqualText(this.errorLogin, 'Invalid credentials');
    }

    async loginPageIsDisplayed() {
        await this.expectVisible(this.usernameInput);
        await this.expectVisible(this.passwordInput);
        await this.expectVisible(this.loginButton);
    }

//Methods combine
    async login(userName: string, passWord: string) {
        await this.fillUserName(userName);
        await this.fillPassWord(passWord);
        await this.clickOnLogin();
    }
}


