const { test, expect } = require('../src/fixtures/customFixtures');

test.describe('Advanced Network Interception', () => {
  test('should gracefully handle 500 server error on inventory route', async ({ page }) => {
    // Mock network layer to force a 500 error on resources fetching dynamic content
    await page.route('**/inventory.html', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'text/html',
        body: '<h1>Internal Server Error</h1>'
      });
    });

    await page.goto('/inventory.html');
    await expect(page.locator('h1')).toHaveText('Internal Server Error');
  });
});
