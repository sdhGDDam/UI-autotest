import { test, expect } from "@playwright/test";
import { MainPage } from "../../pages/mainPage/mainPage";
import { LoginPopupPage } from "../../pages/loginPopupPage/loginPopupPage";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { ProfilePage } from "../../pages/profilePage/profilePage";

test.describe("Авторизация", () => {
    const email = process.env.E2E_USER_EMAIL!;
    const password = process.env.E2E_USER_PASSWORD!;

    test("Вход существующего пользователя", async ({ page }) => {
        const mainPage = new MainPage(page);
        const loginPopup = new LoginPopupPage(page);
        const myAdsPage = new MyAdsPage(page);
        const profilePage = new ProfilePage(page);

        await mainPage.openMainPage();

        await mainPage.openLoginDesktop();

        await loginPopup.login(email, password);

        await mainPage.assertUserIsLoggedIn();

        await mainPage.openMyAdsPage();
        await myAdsPage.waitForOpen();

        await mainPage.openMainPage();
        await mainPage.openUserMenu();
        await expect(mainPage.logoutLink).toBeVisible();

        await mainPage.openMainPage();
        await mainPage.openProfile();
        await profilePage.assertEmailVisible(email);
        await profilePage.assertBirthDateVisible();
    });
});
