import 'dotenv/config';
import { BrowserContext, chromium, Page } from 'playwright';
import { Job } from '../data/jobStore.ts';
import { ensureLoggedIn } from '../ui-services/auth.ts';
import { makePost } from '../ui-services/makePost.ts';
import { PROFILE_DIR } from '../utils/constants.ts';

export async function runMakePostJob(job: Job) {
    let browser: BrowserContext | null = null;

    try {
        browser = await chromium.launchPersistentContext(`${PROFILE_DIR}${job.profile}`, {
            headless: false
          });

        const browserPage: Page = await browser.newPage()

        await ensureLoggedIn(browserPage)

        await makePost(browserPage, job)
    } catch (err) {
        console.error('Fatal error:', err);
    } finally {
        console.log('Browser closing...');
        if (browser) await browser.close()
    }
};

