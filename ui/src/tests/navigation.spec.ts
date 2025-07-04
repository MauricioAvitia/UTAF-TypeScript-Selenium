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

    it('UI Test 2.1 Validate side menu', async function () { try {
        assert.isTrue(await inventoryPage.hamburgerMenuButton.isDisplayed(), 'Hamburger menu button is not displayed');
        await driver.clickElement(inventoryPage.hamburgerMenuButton, 'Hamburger menu button');

        // Verify that the side menu is displayed
        assert.isTrue(await inventoryPage.allItemsLink.isDisplayed(), 'All items link is not displayed');
        assert.isTrue(await inventoryPage.aboutLink.isDisplayed(), 'About link is not displayed');
        assert.isTrue(await inventoryPage.logoutLink.isDisplayed(), 'Logout link is not displayed');
        assert.isTrue(await inventoryPage.resetAppStateLink.isDisplayed(), 'Reset App State link is not displayed');
    } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});

    it('UI Test 2.2 Close side menu', async function () { try {
        assert.isTrue(await inventoryPage.hamburgerMenuButton.isDisplayed(), 'Hamburger menu button is not displayed');
        await driver.clickElement(inventoryPage.hamburgerMenuButton, 'Hamburger menu button');
        await driver.wait(1000); // Wait for the menu to open

        // Verify that the side menu is displayed
        assert.isTrue(await inventoryPage.allItemsLink.isDisplayed(), 'All items link is not displayed');

        // Close the side menu by clicking outside of it
        await driver.clickElement(inventoryPage.closeSideMenuButton, 'Close side menu button');
        
        // Verify that the side menu is closed
        assert.isFalse(await inventoryPage.allItemsLink.isDisplayed(), 'All items link is still displayed after closing the side menu');
    } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});
});