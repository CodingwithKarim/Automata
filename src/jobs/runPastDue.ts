import 'dotenv/config';
import { getPendingJobs, markJobSent } from '../data/jobStore';
import { runMakePostJob } from './runPostJob';

(async function runDue() {
  const pending = getPendingJobs();
  for (const job of pending) {
    try {
      console.log(`Running job ${job.id}…`);
      await runMakePostJob(job);
      markJobSent(job.id);
      console.log(`✅ Job ${job.id} done.`);
    } catch (err) {
      console.error(`❌ Job ${job.id} failed:`, err);
    }
  }
})();
