const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../src/pages/LoginPage');
const fs = require('fs');
const path = require('path');
const testData = require('../test-data/users.json');

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate user session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  
  await page.waitForURL('**/inventory.html');
  
  // Ensure storage state directory exists
  const dir = path.dirname(authFile);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.context().storageState({ path: authFile });
});
