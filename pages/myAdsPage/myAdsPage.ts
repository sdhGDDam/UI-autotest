import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MyAdsPage extends BasePage {
    protected pageName = "Мои объявления";

    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.myAdsTitle = page.locator("[data-marker=\"my-ads-title\"]");
        this.emptyStateTitle = page.locator("[data-marker=\"empty-state-title\"]");
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async waitForOpen() {
        await expect(
            Promise.any([
                this.myAdsTitle.waitFor({ state: "visible" }),
                this.emptyStateTitle.waitFor({ state: "visible" }),
            ]),
            `Страница ${this.pageName} не открылась`
        ).resolves.not.toThrow();
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            "Заголовок заглушки отсутствия объявлений не отображается"
        ).toBeVisible();
    }

    getAdCardByTitle(title: string): Locator {
        const link = this.page
            .getByRole("link")
            .filter({ has: this.page.getByRole("heading", { name: title }) });
        return link.locator("..");
    }

    async assertAdCardContains(card: Locator, title: string, description: string) {
        const titleLocator = card.locator("[data-marker=\"my-ad-card-title\"]");
        const descLocator = card.locator("[data-marker=\"my-ad-card-description\"]");
        await expect(titleLocator).toHaveText(title);
        await expect(descLocator).toHaveText(description);
        const photo = card.locator("img").first();
        await expect(photo).toBeVisible();
        await expect(photo).toHaveAttribute("src", /.+/);
    }
}
