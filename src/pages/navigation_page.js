const { expect } = require('@playwright/test');

exports.NavigationPage = class NavigationPage {

    constructor(page){
        this.page=page;
        this.dataConsentAgree = page.getByLabel('Consent', { exact: true });
        
        // Navigation
        this.productsBtnLocator = page.getByRole('link', { name: 'Products' });
        this.cartBtnLocator = page.getByRole('link', { name: ' Cart' });
        this.loginPageLocator =  page.getByRole('link', { name: ' Signup / Login' });
        this.loggedInUserLocator = page.getByText('Logged in as');
        this.logoutBtnLocator = page.getByRole('link', { name: 'Logout' });
    }

    // Assertions
    async verifyUserIsLoggedInAs(username){
        await expect(this.loggedInUserLocator).toContainText(username);
    }

    async verifyUserIsLoggedOut(){
        await expect(this.loginPageLocator).toBeVisible();
    }

    // Actions
    getNavigationLocator(pageName) {
        switch(pageName.toLowerCase()) {
            case 'products':
                return this.productsBtnLocator;
            case 'cart':
                return this.cartBtnLocator;
            case 'login':
                return this.loginPageLocator;
            default:
                throw new Error(`Page "${pageName}" not supported`);
        }
    }

    async navigateToPage(pageName) {
        await this.getNavigationLocator(pageName).click();
    }
    
    async gotoMainPage(){
        await this.page.goto('/');
        try {
            await this.dataConsentAgree.click();
        } catch (error) {
            console.log('No consent button found');
        }
    }
}

