import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class AdPage extends BasePage {
    protected pageName = "Карточка объявления";

    readonly title: Locator;
    readonly description: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator("[data-marker=\"ad-title\"]");
        this.description = page.locator("[data-marker=\"ad-description\"]");
    }

    protected root(): Locator {
        return this.title;
    }

    async assertTitleEquals(expected: string) {
        await expect(this.title).toHaveText(expected);
    }

    async assertDescriptionEquals(expected: string) {
        await expect(this.description).toHaveText(expected);
    }

    async assertPhotoIsVisible(expectedTitle: string) {
        const photo = this.page.locator(`img[alt*="${expectedTitle} - фото"]`).first();
        await expect(photo).toBeVisible();
        await expect(photo).toHaveAttribute("src", /.+/);
    }
}
