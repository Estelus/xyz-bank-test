import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Arrange
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/');
});

const mainPageHomeButton = 'Home'
const newUserName = 'Tester'
const newUserLastName = 'Testerski'
const newUserPostalCode = '111-1'
const buttonHomeText = 'Home'
const buttonCustomerLoginText = 'Customer Login'
const welcomeMessage = 'Welcome Tester Testerski !!'

test('Login as a Bank', async ({ page }) => {
  // Act
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  // Assert 
  await expect(page.getByRole('button', { name: 'Home' })).toHaveText(mainPageHomeButton)
});

test('Add a new customer', async ({ page }) => {
  // Act- creating a new user
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill(newUserName);
  await page.getByPlaceholder('Last Name').fill(newUserLastName);
  await page.getByPlaceholder('Post Code').fill(newUserPostalCode);
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  // Act- Going to search page to verify if new customer Tester was created
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.getByPlaceholder('Search Customer').fill('tes');

  // Assert 
  await expect(page.getByRole('cell', { name: 'Tester', exact: true })).toHaveText(newUserName)
  await expect(page.getByRole('cell', { name: 'Testerski', exact: true })).toHaveText(newUserLastName)

});

test('Open account for a new user', async ({ page }) => {
  // Act- creating a new user
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill(newUserName);
  await page.getByPlaceholder('Last Name').fill(newUserLastName);
  await page.getByPlaceholder('Post Code').fill(newUserPostalCode);
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  // Act- Going to open account page
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.locator('#currency').selectOption('Dollar');

  await page.getByRole('button', { name: 'Process' }).click();
  await page.getByRole('button', { name: 'Customers' }).click();
  page.getByRole('button', { name: 'Process' }).click();

  // Assert- Verify if account for a new user have been created
  await expect(page.getByRole('cell', { name: 'Tester', exact: true })).toHaveText(newUserName)
  await expect(page.getByRole('cell', { name: 'Testerski', exact: true })).toHaveText(newUserLastName)
  await expect(page.getByRole('cell', { name: '1016', exact: true })).toHaveText('1016')

});

test('Return to the main page after creating a new account', async ({ page }) => {
  // Act- creating a new user
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill(newUserName);
  await page.getByPlaceholder('Last Name').fill(newUserLastName);
  await page.getByPlaceholder('Post Code').fill(newUserPostalCode);
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  // Act- Going to open account page
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.locator('#currency').selectOption('Dollar');
  // Act- Return to the home page
  await page.getByRole('button', { name: 'Home' }).click();
 
  // Assert- verify if user navigate to the home page 
  await expect(page.getByRole('button', { name: 'Home' })).toHaveText(buttonHomeText)
  await expect(page.getByRole('button', { name: 'Customer Login'})).toHaveText(buttonCustomerLoginText)
  
});
test('LogIn as a new user', async ({ page }) => {
  // Act- creating a new user
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill(newUserName);
  await page.getByPlaceholder('Last Name').fill(newUserLastName);
  await page.getByPlaceholder('Post Code').fill(newUserPostalCode);
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  // Act- Going to open account page
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.locator('#currency').selectOption('Dollar');
  // Act- Return to the home page
  await page.getByRole('button', { name: 'Home' }).click();
  // Act- Login as a new user
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.getByRole('button', { name: 'Login' }).click();
 
  // Assert- verify if user navigate to the home page 
  await expect(page.getByText('Welcome Tester Testerski !!')).toHaveText(welcomeMessage)
  
});
test('Perform few transactions as a new user', async ({ page }) => {
  // Act- creating a new user
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill(newUserName);
  await page.getByPlaceholder('Last Name').fill(newUserLastName);
  await page.getByPlaceholder('Post Code').fill(newUserPostalCode);
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Act- Going to open account page
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.locator('#currency').selectOption('Dollar');
  await page.getByRole('button', { name: 'Process' }).click();
  // Act- Return to the home page
  await page.getByRole('button', { name: 'Home' }).click();
  // Act- Login as a new user
  await page.getByRole('button', { name: 'Customer Login' }).click();
  await page.locator('#userSelect').selectOption('6');
  await page.getByRole('button', { name: 'Login' }).click();
  // Act- Perform few credit and debit operations
  // Act- Perform 1st credit
  await page.getByRole('button', { name: 'Deposit' }).click();
  await page.getByPlaceholder('amount').fill('50');
  await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();

  // Act- Perform 2nd credit
  await page.getByPlaceholder('amount').fill('100');
  await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();

  // Act- Perform 1nd debit
  await page.getByRole('button', { name: 'Withdrawl' }).click();
  await page.getByPlaceholder('amount').fill('50');
  await page.getByRole('button', { name: 'Withdraw', exact: true }).click();

  // Act- Perform 2nd debit
  await page.getByRole('button', { name: 'Withdrawl' }).click();
  await page.getByPlaceholder('amount').fill('100');
  await page.getByRole('button', { name: 'Withdraw', exact: true }).click();

  //Act- Navigate to transation history
  await page.getByRole('button', { name: 'Transactions' }).click();
  // Assert- Verify if user navigated to transaction history
  await expect(page.getByText('Back Reset Date-Time Amount')).not.toBeNull

});

