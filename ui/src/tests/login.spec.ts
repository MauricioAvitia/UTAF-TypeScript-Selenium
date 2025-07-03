import { assert, expect } from 'chai';
import { LoginPage } from '../pageObjects/loginPage';
import { Driver } from '../../driver/driver';
import { Browser, Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { DriverCapabilities } from '../../driver/capabilities';
import { error } from 'console';

describe('LogIn', async function () {
    let driver: Driver;
    let loginPage: LoginPage;
    let capabilities: DriverCapabilities = new DriverCapabilities();
    
    beforeEach(async () => {
        driver = new Driver(await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeService(new chrome.ServiceBuilder(capabilities.getChromeDriverPath()))
        .setChromeOptions(new chrome.Options(capabilities.getCapabilities()))
        .build());
        
        loginPage = new LoginPage(driver);
    });

    it('UI Test 1.1 - LogIn with valid credentials', async function () { try {
        // Navigate to the login page
        await driver.goToPage();
        // Check if the login title is displayed
        assert.isTrue(await loginPage.title.isDisplayed(), 'Login title is not displayed');
        
        // Perform login with valid credentials
        await loginPage.logIn('standard_user', 'secret_sauce');
        // Verify that the URL is correct after login
        assert.equal(await driver.instance.getCurrentUrl(), 'https://www.saucedemo.com/inventory.html');

    } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});

    it('UI Test 1.2 - LogIn with invalid credentials', async function () { try {
        await driver.goToPage();
        assert.isTrue(await loginPage.title.isDisplayed(), 'Login title is not displayed');
        
        await loginPage.logIn('invalid_user', 'invalid_password');
        assert.isTrue(await loginPage.loginErrorMessage.isDisplayed(), 'Login error message is not displayed');

    } catch (error) {
        console.error('Test failed with error:', error); throw error;
    }});

    this.afterEach(async () => {
        if (driver.instance) {
            await driver.instance.quit();
        }
    });
});