import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly header: Locator;
    readonly mobileMenuButton: Locator;
    readonly loginButtonDesktop: Locator;
    readonly loginButtonMobile: Locator;
    readonly myAdsBtn: Locator;
    readonly userMenuBtn: Locator;
    readonly loginModal: Locator;

    readonly searchInput: Locator;
    readonly createAdButton: Locator;
    readonly profileLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.mobileMenuButton = page.locator("[data-marker=\"mobile-menu-button\"]");
        
        this.loginButtonDesktop = page.locator("[data-marker=\"login-button-desktop\"]");
        this.loginButtonMobile = page.locator("[data-marker=\"login-button-mobile\"]");
        
        this.myAdsBtn = page.locator("[data-marker=\"my-ads-link\"]");
        this.userMenuBtn = page.locator("[data-marker=\"user-menu-button\"]");
        this.loginModal = page.locator("[data-marker=\"login-modal-content\"]");

        this.searchInput = page.locator("[data-marker=\"search-input\"]");
        this.createAdButton = page.locator("[data-marker=\"create-ad-button-desktop\"]");
        this.profileLink = page.locator("[data-marker=\"profile-link\"]");
        this.logoutLink = page.locator("[data-marker=\"logout-button\"]");
    }

    protected root(): Locator {
        return this.header;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async openMyAdsPage() {
        await this.myAdsBtn.click();
    }

    async openLoginDesktop() {
        await this.loginButtonDesktop.click();
    }

    async openLoginMobile() {
        await this.loginButtonMobile.click();
    }

    async assertUserIsLoggedIn(timeout?: number) {
        await expect(this.userMenuBtn, "Пользователь не авторизован").toBeVisible({ timeout });
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.press("Enter");
    }

    async openCreateAdPage() {
        await this.createAdButton.click();
    }

    async openUserMenu() {
        await this.userMenuBtn.click();
    }

    async openProfile() {
        await this.openUserMenu();
        await this.profileLink.click();
    }

    async logout() {
        await this.openUserMenu();
        await this.logoutLink.click();
        await expect(this.loginButtonDesktop).toBeVisible({ timeout: 10000 });
    }
}
