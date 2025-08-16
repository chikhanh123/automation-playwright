import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";



export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorLogin: Locator;

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorLogin = page.locator('[data-test="error"]');
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
    async verifyErrorLoginFailed() {
        await this.expectEqualText(this.errorLogin, 'Epic sadface: Sorry, this user has been locked out.');
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


