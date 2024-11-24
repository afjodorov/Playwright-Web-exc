const { expect } = require('@playwright/test');

exports.ProductsPage = class ProductsPage {

    constructor(page){
        this.page = page;

        this.searchInputLocator = page.getByPlaceholder('Search Product');
        this.searchBtnLocator = page.locator('#submit_search');
        this.addFirstItemToCartBtnLocator = page.locator('.overlay-content > .btn');
        this.productAddedTextLocator = page.getByText('Your product has been added');
        this.continueShoppingBtnLocator = page.getByRole('button', { name: 'Continue Shopping' });

        this.productCardsLocator = page.locator('.features_items').locator('.col-sm-4');
        this.productNameLocator = this.productCardsLocator.locator('.productinfo p');
        this.productPriceLocator = this.productCardsLocator.locator('.productinfo h2');
    }

    // Assertions
    async verifyProductCardsContainItem(itemName) {
        const count = await this.productCardsLocator.count();
        expect(count).toBeGreaterThan(0);
        
        for (let i = 0; i < count; i++) {
            const productName = await this.productNameLocator.nth(i).textContent();
            expect(productName.toLowerCase()).toContain(itemName.toLowerCase());
        }
    }

    // Actions
    async searchForProduct(searchInput){
        await this.searchInputLocator.fill(searchInput);
        await this.searchBtnLocator.click();
        await this.page.waitForLoadState('domcontentloaded');

        await this.verifyProductCardsContainItem(searchInput);
    }

    async addFirstProductToCart(){
        await this.productCardsLocator.first().hover();
        await this.addFirstItemToCartBtnLocator.first().click();
        await expect(this.productAddedTextLocator).toBeVisible();
        await this.continueShoppingBtnLocator.click();

        return {
            name: await this.productNameLocator.first().textContent(),
            price: await this.productPriceLocator.first().textContent()
        }
    }
}

