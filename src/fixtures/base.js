const base  = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');
const { SignupPage } = require('../pages/signup_page');
const { NavigationPage } = require('../pages/navigation_page');
const { ProductsPage } = require('../pages/products_page');
const { CartPage } = require('../pages/cart_page');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    navPage: async ({ page }, use) => {
        await use(new NavigationPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});
exports.expect = base.expect;