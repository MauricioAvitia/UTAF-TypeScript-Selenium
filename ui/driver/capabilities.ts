import { Capabilities } from "selenium-webdriver";

/**
 * Class to define and manage the capabilities for the WebDriver instance.
 */
export class DriverCapabilities {
    private capabilities: Capabilities;

    /**
     * Constructor to initialize the driver capabilities.
     */
    constructor() {
        this.capabilities = new Capabilities();
        this.capabilities.set("browserName", "chrome");
        this.capabilities.set("goog:chromeOptions", {
            args: ["--guest", "--headless", "--disable-gpu", "--window-size=1920,1080"],
        });
    }
    
    /**
     * Method to get the defined capabilities.
     * @returns The capabilities object.
     */
    public getCapabilities(): Capabilities {
        return this.capabilities;
    }
}