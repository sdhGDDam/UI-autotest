import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import path from "path";

export class CreateAdPage extends BasePage {
    protected pageName = "Создание объявления";

    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly addPhotoButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.titleInput = page.locator("[data-marker=\"title-input\"]");
        this.descriptionInput = page.locator("[data-marker=\"description-input\"]");
        this.addPhotoButton = page.locator("[data-marker=\"add-photo-button\"]");
        this.submitButton = page.locator("[data-marker=\"submit-button\"]");
    }

    protected root(): Locator {
        return this.titleInput;
    }

    async fillTitle(title: string) {
        await this.titleInput.fill(title);
    }

    async fillDescription(description: string) {
        await this.descriptionInput.fill(description);
    }

    async uploadPhoto(filePath: string) {
        const absolutePath = path.resolve(process.cwd(), filePath);
        await this.addPhotoButton.click();
        const fileInput = this.page.locator("input[type='file']").first();
        await fileInput.setInputFiles(absolutePath);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async createAd(title: string, description: string, photoPath: string) {
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.uploadPhoto(photoPath);
        await this.clickSubmit();
    }
}
