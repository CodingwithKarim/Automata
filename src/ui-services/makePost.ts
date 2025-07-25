import { Locator, Page } from "playwright";
import { findButtonByInnerText, findMakePostButton, findStartPostButton } from "../utils/selectors";
import { Job } from "../data/jobStore";

export async function makePost(page: Page, job: Job): Promise<void> {
    await enterMakePostModal(page)

    await enterPostContent(page, job.content);

    await enterPostMedia(page, job);

    await clickMakePostButton(page)
}

 async function enterMakePostModal(page: Page): Promise<void> {
    const startPostButton: Locator = await findStartPostButton(page);

    await startPostButton.click();

    await page.waitForTimeout(1000);
}

 async function enterPostContent(page: Page, content: string) {
    const textbox: Locator = page.locator('div[role="textbox"][aria-placeholder="What do you want to talk about?"]');;

    await textbox.click();

    await textbox.pressSequentially(content, {
        delay: 75,
    })

    await page.waitForTimeout(1000)
}

 async function enterPostMedia(page: Page, job: Job) {
    if (job.media.length) {
        await enterPostPictures(page, job.media)
    }
    else if (job.pdf.path) {
        await enterPostDocuments(page, job.pdf)
    }
}

async function clickMakePostButton(page: Page): Promise<void> {
    const makePostButton: Locator = await findMakePostButton(page);

    await makePostButton.click();

    await page.waitForSelector("div[data-test-modal-id='sharebox']", {
        state: "detached",
        timeout: 10000
    })

    await page.waitForTimeout(5000);
}

 async function enterPostPictures(page: Page, media: string[]) {
    const mediaBtn = page.locator("button[aria-label='Add media']")

    await mediaBtn.click();

    const fileInput = page.locator('#media-editor-file-selector__file-input');

    await fileInput.setInputFiles(media);

    await page.waitForTimeout(1000);

    const nextBtn = await findButtonByInnerText(page, "Next")

    await nextBtn.click()

    await page.waitForTimeout(1000)
}

 async function enterPostDocuments(page: Page, document: { title: string; path: string; }) {
    const moreButton = page.locator("button[aria-label='More']");

    await moreButton.click();

    await page.waitForTimeout(500)

    const addDocumentButton = page.locator("button[aria-label='Add a document']")

    await addDocumentButton.click();

    const fileInput = page.locator('input[name="file"][type="file"]');

    await fileInput.setInputFiles(document.path);

    await page.waitForTimeout(2000);

    const descriptionInput = page.getByPlaceholder("Add a descriptive title to your document");

    await descriptionInput.pressSequentially(document.title, {
        delay: 75
    });

    await page.waitForTimeout(2000);

    const doneButton = page.locator("button[aria-label='Done']")
    await doneButton.click();

    await page.waitForTimeout(1000);
}

