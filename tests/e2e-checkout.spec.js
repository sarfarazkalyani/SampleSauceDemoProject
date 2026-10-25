const { test, expect } = require('../src/fixtures/customFixtures');
const testData = require('../test-data/users.json');

test.describe('E2E Commerce Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Automatically reuses saved session state configured in playwright.config.js
    await page.goto('/inventory.html');
  });

  test('should sort products and complete standard checkout', async ({ inventoryPage, cartPage, checkoutPage }) => {
    // 1. Validate sorting mechanism
    await inventoryPage.selectSortOption('lohi');
    const lowestPrice = await inventoryPage.getFirstItemPrice();
    
    await inventoryPage.selectSortOption('hilo');
    const highestPrice = await inventoryPage.getFirstItemPrice();
    
    expect(highestPrice).toBeGreaterThan(lowestPrice);

    // 2. Complete purchase journey
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.shoppingCartLink.click();

    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillInformation(
      testData.checkoutData.firstName,
      testData.checkoutData.lastName,
      testData.checkoutData.postalCode
    );
    
    await checkoutPage.completeOrder();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
