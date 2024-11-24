const {test} = require('../fixtures/base');

test.beforeEach("Navigate to the Signup/Login page", async ({navPage}) => {
    await navPage.gotoMainPage();
    await navPage.navigateToPage('Login');
});

test('Validate User Registration Process', async ({ loginPage, signupPage, navPage }) => {
    // Input name for future debugging
    await loginPage.fillFirstSignupForm('Tester');

    await signupPage.fillAccountInfoForm('Tester');

    await signupPage.fillAddressInfoForm('Tester');

    await signupPage.createAccountBtnLocator.click();

    await signupPage.verifyNewUserIsCreated('Tester');

    await navPage.verifyUserIsLoggedInAs('Tester');
});