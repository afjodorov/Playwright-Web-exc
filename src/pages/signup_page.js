const { expect} = require('@playwright/test');
const TestHelpers = require('../utils/test-helpers');

exports.SignupPage = class SignupPage {

    constructor(page){
        this.page = page;
        
        // Account information
        this.genderLocator = page.getByText('Mr.');
        this.nameInputLocator = page.getByLabel('Name *', { exact: true });
        this.passwordInputLocator = page.getByLabel('Password *');
        this.daysLocator = page.locator('#days');
        this.monthsLocator = page.locator('#months');
        this.yearsLocator = page.locator('#years');

        // Address information
        this.firstnameInputLocator = page.getByLabel('First name *');
        this.lastnameInputLocator = page.getByLabel('Last name *');
        this.companyInputLocator = page.getByLabel('Company', { exact: true });
        this.addressInputLocator = page.getByLabel('Address * (Street address, P.');
        this.countryLocator = page.getByLabel('Country *');
        this.stateInputLocator = page.getByLabel('State *');
        this.cityInputLocator = page.getByLabel('City *');
        this.zipcodeInputLocator = page.locator('#zipcode');
        this.mobileNumberInputLocator = page.getByLabel('Mobile Number *');

        // Successful signup
        this.createAccountBtnLocator = page.getByRole('button', { name: 'Create Account' });
        this.successMessageLocator = page.getByText('Account Created!');
        this.continueBtnLocator = page.getByRole('link', { name: 'Continue' });

        // Variables
        // Hardcoding values for testing, would rather keep in .env file.
        this.signupPswd = '123456';
        this.daysInput = '1';
        this.monthsInput = '1';
        this.yearsInput = '1990';
        this.lastnameInput = 'Auto';
        this.companyInput = 'Testing company';
        this.addressInput = 'Testing address';
        this.countryInput = 'United States';
        this.stateInput = 'Testing state';
        this.cityInput = 'Testing city';
        this.zipcodeInput = '12345';
        this.mobileNumberInput = '1234567890';
    }

    async fillAccountInfoForm(name){
        await this.genderLocator.click();
        await this.nameInputLocator.fill(name);
        await this.passwordInputLocator.fill(this.signupPswd);
        await this.daysLocator.selectOption(this.daysInput);
        await this.monthsLocator.selectOption(this.monthsInput);
        await this.yearsLocator.selectOption(this.yearsInput);
    }
    
    async fillAddressInfoForm(name){
        await this.firstnameInputLocator.fill(name);
        await this.lastnameInputLocator.fill(this.lastnameInput);
        await this.companyInputLocator.fill(this.companyInput);
        await this.addressInputLocator.fill(this.addressInput);
        await this.countryLocator.selectOption(this.countryInput);
        await this.stateInputLocator.fill(this.stateInput);
        await this.cityInputLocator.fill(this.cityInput);
        await this.zipcodeInputLocator.fill(this.zipcodeInput);
        await this.mobileNumberInputLocator.fill(this.mobileNumberInput);
    }

    async verifyNewUserIsCreated(){
        await expect(this.successMessageLocator).toBeVisible();
        await this.continueBtnLocator.click();
    }
}

