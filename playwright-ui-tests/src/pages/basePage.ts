export class BasePage {
    protected page: any;

    constructor(page: any) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }
}