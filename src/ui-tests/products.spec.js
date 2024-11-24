const {test} = require('../fixtures/base');

test.beforeEach("Navigate to the Products page", async ({navPage}) => {
    await navPage.gotoMainPage();
    await navPage.navigateToPage('Products');
})

test('Search and Add a Product to Cart', async ({productsPage, navPage, cartPage}) => {
    await productsPage.searchForProduct('T-shirt');

    const productDesc = await productsPage.addFirstProductToCart();
    
    await navPage.navigateToPage('Cart');
    
    await cartPage.verifyProductInCart(productDesc.name, productDesc.price);
});