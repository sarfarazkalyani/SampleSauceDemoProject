class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productSortSelect = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(itemName) {
    const itemLocator = this.inventoryItems.filter({ hasText: itemName });
    await itemLocator.locator('button.btn_inventory').click();
  }

  async selectSortOption(value) {
    await this.productSortSelect.selectOption(value);
  }

  async getFirstItemPrice() {
    const firstItem = this.inventoryItems.first();
    const priceText = await firstItem.locator('.inventory_item_price').innerText();
    return parseFloat(priceText.replace('$', ''));
  }
}

module.exports = { InventoryPage };
