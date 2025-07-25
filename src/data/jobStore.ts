import fs from 'fs';
import path from 'path';

export interface Job {
  id: number;
  content: string;
  media:   string[];    
  pdf:    {"title": string, "path": string};    
  scheduleAt: string;
  status:  'pending' | 'sent';
  profile: string;
}

interface Store {
  posts:  Job[];
}

const FILE = path.resolve(process.cwd(), 'data.json');

export function getPendingJobs(): Job[] {
  const store = readStore();
  const now = new Date().toISOString();
  return store.posts.filter(j => j.status === 'pending' && j.scheduleAt <= now);
}

export function markJobSent(id: number): void {
  const store = readStore();
  const job = store.posts.find(j => j.id === id);
  if (job) {
    job.status = 'sent';
    writeStore(store);
  }
}

function readStore(): Store {
  try {
    const raw = fs.readFileSync(FILE, 'utf-8');
    return JSON.parse(raw) as Store;
  } catch {
    return { posts: [] };
  }
}

function writeStore(store: Store) {
  fs.writeFileSync(FILE, JSON.stringify(store, null, 2));
}
