import { Page } from 'playwright';
import { LOGIN_URL, ROOT_URL } from '../utils/constants';
import { loginSelectors } from '../utils/selectors';

export async function ensureLoggedIn(page: Page) {
    await page.goto(ROOT_URL, { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(1000);

    if (page.url() === ROOT_URL) {
        await login(page);
    }

    await page.waitForTimeout(3000);
}

const {EMAIL, PASSWORD } = process.env;

export async function login(page: Page): Promise<void> {
    if (!EMAIL?.trim() || !PASSWORD?.trim()) throw Error("Email and Password are both required");

    await page.goto(LOGIN_URL, {
        waitUntil: "domcontentloaded",
    });

    page.waitForTimeout(1000);

    await enterEmailAndPassword(page);

     page.waitForTimeout(1000);

    await loginSelectors.signInButton(page).click();
}

export async function enterEmailAndPassword(page: Page) : Promise<void>{
     await loginSelectors.emailInput(page).pressSequentially(EMAIL as string, {
        delay: 75
    });
    await loginSelectors.passwordInput(page).pressSequentially(PASSWORD as string, {
        delay: 75
    });
}