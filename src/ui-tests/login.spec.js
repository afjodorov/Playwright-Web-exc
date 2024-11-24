const {test} = require('../fixtures/base');

test.beforeEach("Navigate to the Login page", async ({navPage}) => {
    await navPage.gotoMainPage();
    await navPage.navigateToPage('Login');
})

test('Test Login and Logout Functionality', async ({loginPage, navPage}) => {
    await loginPage.fullLogin(loginPage.testEmail, loginPage.testPswd);

    await navPage.verifyUserIsLoggedInAs('Robot');
    
    await navPage.logoutBtnLocator.click();

    await navPage.verifyUserIsLoggedOut();
});