import { By, WebDriver, until, WebElement } from 'selenium-webdriver';
import { Driver } from '../../driver/driver';

export class LoginPage {
    private driver: Driver;
    
    constructor(driver: Driver) {
        this.driver = driver;
    }

    // Element selectors

    public get usernameInput(): WebElement {
        return this.driver.instance.findElement(By.xpath('//input[@id="user-name"]'));
    }

    public get passwordInput(): WebElement {
        return this.driver.instance.findElement(By.xpath('//input[@id="password"]'));
    }

    public get loginButton(): WebElement {
        return this.driver.instance.findElement(By.xpath('//input[@id="login-button"]'));
    }

    public get title(): WebElement {
        return this.driver.instance.findElement(By.xpath('//div[@class="login_logo" and contains(text(), "Swag Labs")]'));
    }

    public get loginErrorMessage(): WebElement {
        return this.driver.instance.findElement(By.xpath('//h3[@data-test="error"]'));
    }

    // Page actions
    
    /**
     * Logs in to the application.
     * @param username The username to log in with.
     * @param password The password to log in with.
     */
    public async logIn(username: string, password: string): Promise<void> {
        await this.driver.inputText(this.usernameInput, "Username text box", username);
        await this.driver.inputText(this.passwordInput, "Password text box", password);
        await this.driver.waitForElementToBeVisible(this.loginButton, "Login button");
        await this.driver.clickElement(this.loginButton, "Login button");
    }
}