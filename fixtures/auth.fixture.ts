import {
    test as base,
    expect,
    Page,
    request as pwRequest,
    APIRequestContext,
} from "@playwright/test";
import { login } from "../helpers/authHelper";
import { applyAuthToLocalStorage } from "../helpers/authSetStorageHelper";
import { AuthResponse } from "../helpers/types";

type Fixtures = {
    api: APIRequestContext;
    auth: AuthResponse;
    authedPage: Page;
};

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
    throw new Error("Missing BASE_URL environment variable. Please set BASE_URL in .env");
}

export const test = base.extend<Fixtures>({
    api: async ({ request: _request }, use) => {
        const api = await pwRequest.newContext({
            baseURL: BASE_URL,
            extraHTTPHeaders: {
                "Content-Type": "application/json",
            },
        });

        await use(api);
        await api.dispose();
    },
    auth: async ({ api }, use) => {
        const email = process.env.E2E_USER_EMAIL;
        const password = process.env.E2E_USER_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "Missing env creds: set E2E_USER_EMAIL and E2E_USER_PASSWORD in .env"
            );
        }

        const auth = await login(api, { email, password });
        await use(auth);
    },

    authedPage: async ({ page, auth }, use) => {
        console.log("fixture page.url() before auth =", page.url());
        await applyAuthToLocalStorage(page, auth, BASE_URL);
        console.log("fixture page.url() after auth =", page.url());
        await use(page);
    },
});

export { expect };
