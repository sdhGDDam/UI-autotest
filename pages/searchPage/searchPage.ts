import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class SearchPage extends BasePage {
    protected pageName = "Результаты поиска";

    readonly advertisementCards: Locator;

    constructor(page: Page) {
        super(page);
        this.advertisementCards = page.locator("[data-marker=\"advertisement-card\"]");
    }

    protected root(): Locator {
        return this.page.locator("body");
    }

    async assertNoSearchResults() {
        await expect(this.advertisementCards).toHaveCount(0);
    }

    async assertEmptyStateVisible() {
        const emptyMessage = this.page.getByText("Ничего не найдено", { exact: false });
        await expect(emptyMessage, "Сообщение о пустом поиске не отображается").toBeVisible();
    }
}
