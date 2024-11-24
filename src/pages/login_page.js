const { expect } = require('@playwright/test');
const TestHelpers = require('../utils/test-helpers');

exports.LoginPage = class LoginPage {

    constructor(page){
        this.page = page;
        
        // Login form
        this.loginForm = page.locator('form').filter({ hasText: 'Login' });
        this.loginEmailInputLocator = this.loginForm.getByPlaceholder('Email Address');
        this.loginPswdInputLocator = this.loginForm.getByPlaceholder('Password');
        this.loginBtnLocator = this.loginForm.getByRole('button', { name: 'Login' });

        // Signup form
        this.signupForm = page.locator('form').filter({ hasText: 'Signup' });
        this.signupNameInputLocator = this.signupForm.getByPlaceholder('Name');
        this.signupEmailInputLocator = this.signupForm.getByPlaceholder('Email Address');
        this.signupBtnLocator = this.signupForm.getByRole('button', { name: 'Signup' });

        // Variables
        this.testEmail = 'testAutomation@robot.com';
        this.testPswd = '123321';
    }

    // Actions
    async fullLogin(usr, pswd){
        await this.enterLoginCredentials(usr, pswd);
        await this.loginBtnLocator.click();
    }

    async enterLoginCredentials(email, pswd){
        await this.loginEmailInputLocator.fill(email);
        await this.loginPswdInputLocator.fill(pswd);
    }

    // Takes only the name since the email needs to be generated
    async fillFirstSignupForm(name){
        let randomEmail = await TestHelpers.generateTestEmail(7);

        await this.enterSignupCredentials(name, randomEmail);
        await this.signupBtnLocator.click();
    }

    async enterSignupCredentials(name, email){
        await this.signupNameInputLocator.fill(name);
        await this.signupEmailInputLocator.fill(email);
    }
}

