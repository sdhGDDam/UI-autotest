import { test, expect } from "../../fixtures/auth.fixture";
import { MainPage } from "../../pages/mainPage/mainPage";
import { CreateAdPage } from "../../pages/createAdPage/createAdPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { AdPage } from "../../pages/adPage/adPage";
import { SearchPage } from "../../pages/searchPage/searchPage";

test.describe("Создание объявления", () => {
    const uniqueTitle = `test-${Date.now()}`;
    const description = "Описание тестового объявления";
    const photoPath = "tests/artifacts/test-photo.jpg";

    test("Создание объявления со всеми обязательными полями", async ({ authedPage }) => {
        const mainPage = new MainPage(authedPage);
        const createAdPage = new CreateAdPage(authedPage);
        const myAdsPage = new MyAdsPage(authedPage);
        const adPage = new AdPage(authedPage);
        const searchPage = new SearchPage(authedPage);

        await mainPage.openMainPage();
        await mainPage.openCreateAdPage();
        await createAdPage.createAd(uniqueTitle, description, photoPath);

        await myAdsPage.waitForOpen();

        const adCard = myAdsPage.getAdCardByTitle(uniqueTitle);
        await expect(adCard).toBeVisible({ timeout: 10000 });
        await myAdsPage.assertAdCardContains(adCard, uniqueTitle, description);

        const adLink = adCard.locator("a").first();
        await adLink.click();

        await adPage.waitForOpen();
        await adPage.assertTitleEquals(uniqueTitle);
        await adPage.assertDescriptionEquals(description);
        await adPage.assertPhotoIsVisible(uniqueTitle);

        await mainPage.openMainPage();
        await mainPage.search(uniqueTitle);
        await searchPage.waitForOpen();

        const searchResult = authedPage
            .getByRole("link")
            .filter({ has: authedPage.getByRole("heading", { name: uniqueTitle }) });

        await expect(searchResult).toBeVisible({ timeout: 10000 });
    });
});
