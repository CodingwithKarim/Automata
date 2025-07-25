import { Page, Locator } from 'playwright'

export const loginSelectors = {
    emailInput: (page: Page): Locator => {
        return page.getByLabel("Email or phone");
    },

    passwordInput: (page: Page): Locator => {
        return page.getByLabel("Password");
    },

    signInButton: (page: Page): Locator => {
        return page.getByRole("button", { name: "Sign in", exact: true });
    },
}

export const findStartPostButton = async (page: Page): Promise<Locator> => {
    return await findButtonByInnerText(page, "Start a post");
}

export const findMakePostButton = async (page: Page): Promise<Locator> => {
    return await findButtonByInnerText(page, "Post");
}

export async function findButtonByInnerText(page: Page, filterText: string): Promise<Locator> {
    try {
        const tagsToTry = ['button', 'div'] as const;

        for (const tag of tagsToTry) {
            const buttons = page.locator(tag)

            const count = await buttons.count();

            for (let i = 0; i < count; i++) {
                const button = buttons.nth(i);

                const buttonText = await button.innerText();

                if (buttonText.trim() === filterText) {
                    return button
                }
            }
        }
    }
    catch (error) {
        console.error("Error finding button by text:", error);
    }

    // If the desired button wasn't found, throw an error
    throw new Error("Start a post button not found. Skipping this run.")
}

