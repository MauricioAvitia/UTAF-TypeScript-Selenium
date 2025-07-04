import { By, WebDriver, until, WebElement } from 'selenium-webdriver';
import { Driver } from '../../driver/driver';

export class InventoryPage {
    private driver: Driver;
    
    constructor(driver: Driver) {
        this.driver = driver;
    }

    // Element selectors

    public async inventoryItemByName(itemName: string): Promise<WebElement> {
        return this.driver.instance.findElement(By.xpath(`//div[@class="inventory_item_name" and contains(text(), "${itemName}")]`));
    }

    public get cartButton(): WebElement {
        return this.driver.instance.findElement(By.xpath('//a[@class="shopping_cart_link"]'));
    }

    public get hamburgerMenuButton(): WebElement {
        return this.driver.instance.findElement(By.xpath('//button[@id="react-burger-menu-btn"]'));
    }

    public get allItemsLink(): WebElement {
        return this.driver.instance.findElement(By.xpath('//a[@id="inventory_sidebar_link"]'));
    }

    public get aboutLink(): WebElement {
        return this.driver.instance.findElement(By.xpath('//a[@id="about_sidebar_link"]'));
    }

    public get logoutLink(): WebElement {
        return this.driver.instance.findElement(By.xpath('//a[@id="logout_sidebar_link"]'));
    }

    public get resetAppStateLink(): WebElement {
        return this.driver.instance.findElement(By.xpath('//a[@id="reset_sidebar_link"]'));
    }

    public get cartItemCount(): Promise<string> {
        return this.driver.instance.findElement(By.xpath('//span[@class="shopping_cart_badge"]')).getText();
    }

    public get closeSideMenuButton(): WebElement {
        return this.driver.instance.findElement(By.xpath('//button[@id="react-burger-cross-btn"]'));
    }

    public async firstItemAddToCartButton(): Promise<WebElement> {
        const firstItem = await this.driver.instance.findElement(By.xpath('//div[@class="inventory_item"]'));
        return firstItem.findElement(By.xpath('.//button[contains(text(), "Add to cart")]'));
    }

    public async firstItemRemoveButton(): Promise<WebElement> {
        const firstItem = await this.driver.instance.findElement(By.xpath('//div[@class="inventory_item"]'));
        return firstItem.findElement(By.xpath('.//button[contains(text(), "Remove")]'));
    }

    // Page actions
    
    public async addItemToCart(itemName: string): Promise<void> {
        const item = await this.inventoryItemByName(itemName);
        const addToCartButton = item.findElement(By.xpath('.//button[contains(text(), "Add to cart")]'));
        await this.driver.waitForElementToBeVisible(addToCartButton, `Add to cart button for ${itemName}`);
        await this.driver.clickElement(addToCartButton, `Add to cart button for ${itemName}`);
    }

    public async removeItemFromCart(itemName: string): Promise<void> {
        const item = await this.inventoryItemByName(itemName);
        const removeButton = item.findElement(By.xpath('.//button[contains(text(), "Remove")]'));
        await this.driver.waitForElementToBeVisible(removeButton, `Remove button for ${itemName}`);
        await this.driver.clickElement(removeButton, `Remove button for ${itemName}`);
    }

    public async goToCart(): Promise<void> {
        await this.driver.waitForElementToBeVisible(this.cartButton, "Cart button");
        await this.driver.clickElement(this.cartButton, "Cart button");
    }
}