import { test, expect } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';
import { productsLocators } from '../locators/productsLocators';
import { testData } from '../data/testData';

test.describe('Sauce Demo Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(testData.loginUrl);
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await page.fill(loginLocators.usernameInput, testData.users.standard_user.username);
        await page.fill(loginLocators.passwordInput, testData.users.standard_user.password);
        await page.click(loginLocators.loginButton);
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator(productsLocators.inventoryList)).toBeVisible();
    });

    test('should display login page with all required fields', async ({ page }) => {
        await expect(page.locator(loginLocators.usernameInput)).toBeVisible();
        await expect(page.locator(loginLocators.passwordInput)).toBeVisible();
        await expect(page.locator(loginLocators.loginButton)).toBeVisible();
    });

    // added: unsuccessful login (locked out user)
    test('should not login with locked out user', async ({ page }) => {
        await page.goto(testData.loginUrl);
        await page.fill(loginLocators.usernameInput, testData.users.locked_out_user.username);
        await page.fill(loginLocators.passwordInput, testData.users.locked_out_user.password);
        await page.click(loginLocators.loginButton);

        // Use a single, specific locator (role + accessible name) to avoid strict-mode violation
        await expect(page.getByRole('heading', { level: 3, name: /Epic sadface: Sorry, this user has been locked out\./i })).toBeVisible();
    });
});

test.describe('Sauce Demo Products & Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(testData.loginUrl);
        await page.fill(loginLocators.usernameInput, testData.users.standard_user.username);
        await page.fill(loginLocators.passwordInput, testData.users.standard_user.password);
        await page.click(loginLocators.loginButton);
        await page.waitForURL(/.*inventory.html/);
    });

    test('should display products list', async ({ page }) => {
        await expect(page.locator(productsLocators.inventoryList)).toBeVisible();
        await expect(page.locator(productsLocators.inventoryItem).first()).toBeVisible();
    });

    test('should display product information correctly', async ({ page }) => {
        await expect(page.locator(productsLocators.productName).first()).toBeVisible();
        await expect(page.locator(productsLocators.productPrice).first()).toBeVisible();
        await expect(page.locator(productsLocators.productDescription).first()).toBeVisible();
    });

    test('should add product to cart', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
    });

    test('should remove product from cart', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
        await firstItem.locator(productsLocators.removeButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveCount(0);
    });

    // added: add additional product and continue shopping tests
    test('should add additional product to cart', async ({ page }) => {
        // Add first product
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');

        // Add second product
        const secondItem = page.locator(productsLocators.inventoryItem).nth(1);
        await secondItem.locator(productsLocators.addToCartButton).click();

        // Verify cart badge shows 2 items
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('2');
    });

    test('should continue shopping from cart and add another product', async ({ page }) => {
        // Add one product and open cart
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await page.click(productsLocators.cartIcon);
        await expect(page).toHaveURL(/.*cart.html/);
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');

        // Continue shopping (safe selector handling)
        const continueBtn = page.locator('button[data-test="continue-shopping"], #continue-shopping');
        if (await continueBtn.count() > 0) {
            await continueBtn.first().click();
        } else {
            await page.getByText('Continue Shopping').first().click();
        }
        await expect(page).toHaveURL(/.*inventory.html/);

        // Add another product after returning to products
        const anotherItem = page.locator(productsLocators.inventoryItem).nth(1);
        await anotherItem.locator(productsLocators.addToCartButton).click();

        // Verify cart badge shows 2 items
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('2');
    });

    test('should go to checkout after adding product to cart', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
        await page.click(productsLocators.cartIcon);
        await expect(page).toHaveURL(/.*cart.html/);
        await page.click('button[data-test="checkout"]');
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await expect(page.locator('.checkout_info')).toBeVisible();
    });

    test('should fill checkout info and continue', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');

        // Open cart and proceed to checkout
        await page.click(productsLocators.cartIcon);
        await expect(page).toHaveURL(/.*cart.html/);
        await page.click('button[data-test="checkout"]');
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await expect(page.locator('.checkout_info')).toBeVisible();

        // Fill checkout info
        await page.fill('#first-name', 'testfirstname1');
        await page.fill('#last-name', 'testsurname1');
        await page.fill('#postal-code', '11110');

        // Continue to overview
        await page.click('input[data-test="continue"]');
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.locator('.checkout_summary_container')).toBeVisible();
    });

    // added: finish checkout and verify confirmation
    test('should finish checkout and show confirmation', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();

        // Add item and go to cart
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
        await page.click(productsLocators.cartIcon);
        await expect(page).toHaveURL(/.*cart.html/);

        // Checkout flow
        await page.click('button[data-test="checkout"]');
        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        // Fill checkout info and continue
        await page.fill('#first-name', 'testfirstname1');
        await page.fill('#last-name', 'testsurname1');
        await page.fill('#postal-code', '11110');
        await page.click('input[data-test="continue"]');
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

        // Finish checkout
        await page.click('button[data-test="finish"]');

        // Verify order complete
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('.checkout_complete_container')).toBeVisible();

    });
    // added: cancel checkout and return to cart
    test('should cancel checkout and return to cart', async ({ page }) => {
        const firstItem = page.locator(productsLocators.inventoryItem).first();

        // Add item and open cart
        await firstItem.locator(productsLocators.addToCartButton).click();
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
        await page.click(productsLocators.cartIcon);
        await expect(page).toHaveURL(/.*cart.html/);

        // Proceed to checkout then cancel (robust selector)
        await page.click('button[data-test="checkout"]');
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        const cancelBtn = page.locator('button[data-test="cancel"], input[data-test="cancel"]');
        if (await cancelBtn.count() > 0) {
            await cancelBtn.first().click();
        } else {
            await page.getByText('Cancel').first().click();
        }

        // Verify returned to cart and item still present
        await expect(page).toHaveURL(/.*cart.html/);
        await expect(page.locator(productsLocators.cartBadge)).toHaveText('1');
    });
});