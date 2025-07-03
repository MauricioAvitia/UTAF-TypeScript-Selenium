import { By, Capabilities, Session, WebDriver, WebElement } from "selenium-webdriver";
import { Executor } from "selenium-webdriver/lib/command";
import { DriverCapabilities } from "./capabilities";
import dotenv from "dotenv";

/**
 * Driver class to manage the WebDriver instance for UI tests.
 */
export class Driver {
    public instance: WebDriver;
    private url: string;

    constructor(driver: WebDriver) {
        this.instance = driver;
        this.init();

        dotenv.config();
        this.url = process.env.UI_URL!;
    }

    /**
     * Performs asynchronous initialization tasks.
     */
    public async init(): Promise<void> {
        await this.instance.manage().setTimeouts({ implicit: 5000 });
    }

    // Element actions

    /**
     * Navigates to the saved URL.
     */
    public async goToPage() {
        await this.instance.get(this.url);
    }

    /**
     * Waits for a specified time.
     */
    public async wait(miliseconds: number): Promise<void> {
        await this.instance.sleep(miliseconds);
    }

    /**
     * Inputs text into a text field.
     * @param inputBox The locator of the text field.
     * @param elementName The name of the field to fill with text.
     * @param text The text to input.
     */
    public async inputText(inputBox: WebElement, elementName: string, text: string): Promise<void> {
        await this.wait(200);
        await inputBox.clear();
        console.log(`Inputting text "${text}" into element: ${elementName}`);
        await inputBox.sendKeys(text);
    }

    /**
     * Waits for an element to appear on the screen.
     * @param element The locator of the element to click.
     * @param elementName The name of the element to wait for.
     * @param timeout The maximum time to wait for the element to be visible.
     */
    public async waitForElementToBeVisible(element: WebElement, elementName: string, timeout: number = 5000): Promise<void> {
        await this.instance.wait(async () => {
            const isDisplayed = await element.isDisplayed();
            return isDisplayed;
        }, timeout, `Element ${elementName} not visible after ${timeout}ms`);
    }

    /**
     * Waits for an element to be present in the DOM.
     * @param element The locator of the element to find.
     * @param elementName The name of the element to wait for.
     * @param timeout The maximum time to wait for the element to be present.
     */
    public async waitForElementToBePresent(element: WebElement, elementName: string, timeout: number = 5000): Promise<void> {
        await this.instance.wait(async () => {
            const isPresent = await element.isEnabled();
            return isPresent;
        }, timeout, `Element ${elementName} not present after ${timeout}ms`);
    }

    /**
     * Waits for the page to load completely.
     * @param timeout The maximum time to wait for the condition to be met.
     */
    public async waitForPageToLoad(timeout: number = 5000): Promise<void> {
        await this.instance.wait(async () => {
            const readyState = await this.instance.executeScript("return document.readyState");
            return readyState === "complete";
        }, timeout, `Page did not load after ${timeout}ms`);
    }
    
    /**
     * Waits for an element to appear and be visible, then clicks it.
     * @param element The locator of the element to click.
     * @param elementName The name of the element to click.
     */
    public async clickElement(element: WebElement, elementName: string): Promise<void> {
        await this.wait(200);
        await this.waitForElementToBePresent(element, elementName);
        await this.waitForElementToBeVisible(element, elementName);
        console.log(`Clicking on element: ${elementName}`);
        await element.click();
    }
}