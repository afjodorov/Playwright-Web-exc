const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    constructor(page) {
        this.page = page;
        
        this.cartItemDescriptionLocator = page.locator('td.cart_description');
        this.productNameLocator = this.cartItemDescriptionLocator.locator('h4 a');

        this.cartItemPriceLocator = page.locator('td.cart_price');
        this.productPriceLocator = this.cartItemPriceLocator.locator('p');
    }

    // Assertions
    async verifyProductInCart(productName, productPrice){
        await expect(this.productNameLocator).toHaveText(productName);
        await expect(this.productPriceLocator).toHaveText(productPrice);
    }
}
