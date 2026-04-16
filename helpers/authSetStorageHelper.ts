import { Page } from "@playwright/test";
import { AuthResponse } from "./types";

const DEFAULT_BASE_URL = process.env.BASE_URL || "https://testboard.avito.com";

export async function applyAuthToLocalStorage(
    page: Page,
    auth: AuthResponse,
    baseURL: string = DEFAULT_BASE_URL
) {
    const authStorageValue = JSON.stringify({
        state: {
            user: auth.user,
            token: auth.token,
        },
        version: 0,
    });

    const userStorageValue = JSON.stringify(auth.user);

    await page.addInitScript(
        ({ authStorageValue, userStorageValue, token }) => {
            localStorage.setItem("auth-storage", authStorageValue);
            localStorage.setItem("auth_user", userStorageValue);
            localStorage.setItem("auth_token", token);
        },
        {
            authStorageValue,
            userStorageValue,
            token: auth.token,
        }
    );

    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
}
