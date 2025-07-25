import 'dotenv/config';
import cron from 'node-cron';
import { getPendingJobs, markJobSent } from './data/jobStore.ts';
import { runMakePostJob } from './jobs/runPostJob.ts';

console.log('🚀 Scheduler started…');

cron.schedule('*/2 * * * *', async () => {
  console.log('Checking for scheduled posts…');
  const pending = getPendingJobs();

  for (const job of pending) {
    try {
      console.log(`📝 Running job ${job.id}…`);
      await runMakePostJob(job);
      markJobSent(job.id);
      console.log(`✅ Job ${job.id} posted.`);
    } catch (err) {
      console.error(`❌ Job ${job.id} failed:`, err);
    }
  }
});
