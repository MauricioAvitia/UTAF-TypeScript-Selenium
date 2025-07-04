import { assert, expect } from 'chai';
import { LoginPage } from '../pageObjects/loginPage';
import { Driver } from '../../driver/driver';
import { Browser, Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { DriverCapabilities } from '../../driver/capabilities';
import { error } from 'console';
import { InventoryPage } from '../pageObjects/inventoryPage';

describe('LogIn', async function () {
    let driver: Driver;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage
    let capabilities: DriverCapabilities = new DriverCapabilities();

    beforeEach(async () => { try {
        // Initialize the WebDriver instance with Chrome capabilities
        driver = new Driver(await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeService(new chrome.ServiceBuilder(capabilities.getChromeDriverPath()))
        .setChromeOptions(new chrome.Options(capabilities.getCapabilities()))
        .build());
        
        // Initialize page objects
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        
        try {
            // Log into the application with valid credentials
            await driver.goToPage();
            await loginPage.logIn('standard_user', 'secret_sauce');
        } catch (error) {
            console.log('Already logged in, skipping login step');
        }

        } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});

    this.afterEach(async () => {
        if (driver.instance) {
            await driver.instance.quit();
        }
    });

    it('UI Test 3.1 Cart item count validation', async function () { try {
        // Verify that the inventory page is displayed
        assert.equal(await driver.instance.getCurrentUrl(), 'https://www.saucedemo.com/inventory.html', 'Inventory page is not displayed');
        
        // Add the first item to the cart
        await driver.clickElement(await inventoryPage.firstItemAddToCartButton(), 'First item Add to Cart button');
        
        // Verify that the cart item count is now 1
        assert.isTrue(await inventoryPage.cartItemCount == ('1'), 'Cart item count is not 1');
        
    } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});

    it('UI Test 3.2 Remove item from cart', async function () { try {
        // Verify that the inventory page is displayed
        assert.equal(await driver.instance.getCurrentUrl(), 'https://www.saucedemo.com/inventory.html', 'Inventory page is not displayed');

        // Add the first item to the cart
        await driver.clickElement(await inventoryPage.firstItemAddToCartButton(), 'First item Add to Cart button');
        
        // Verify that the cart item count is now 1
        assert.isTrue(await inventoryPage.cartItemCount == ('1'), 'Cart item count is not 1');
        
        // Remove the first item from the cart
        await driver.clickElement(await inventoryPage.firstItemRemoveButton(), 'First item Remove button');
        } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});
});