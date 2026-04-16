import { test } from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";
import { SearchPage } from "../../pages/searchPage/searchPage.ts";

test.describe("Поиск", () => {
    test("Поиск несуществующего объявления показывает заглушку", async ({ page }) => {
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        await mainPage.openMainPage();
        await mainPage.search("абвгд 123");

        await searchPage.assertNoSearchResults();
        await searchPage.assertEmptyStateVisible();
    });
});
