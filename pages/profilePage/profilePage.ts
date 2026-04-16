import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class ProfilePage extends BasePage {
    protected pageName = "Профиль пользователя";

    constructor(page: Page) {
        super(page);
    }

    protected root(): Locator {
        return this.page.locator("body");
    }

    async assertEmailVisible(email: string) {
        const emailText = this.page.getByText(`Email: ${email}`, { exact: false });
        await expect(emailText, `Email ${email} не отображается на странице профиля`).toBeVisible();
    }

    async assertBirthDateVisible() {
        const birthDateText = this.page.getByText(/Дата рождения:/i);
        await expect(birthDateText, "Дата рождения не отображается").toBeVisible();
    }
}
