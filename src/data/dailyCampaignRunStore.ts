import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { DailyCampaignRunResult } from '../agents/dailyCampaignRuntime';

function storeDir(): string {
  return resolve(process.env.AIONSI_CAMPAIGN_STORE_DIR || './data/campaign-runs');
}

export async function saveDailyCampaignRun(result: DailyCampaignRunResult): Promise<void> {
  const dir = storeDir();
  await mkdir(dir, { recursive: true });
  const latest = join(dir, 'latest.json');
  const run = join(dir, `${result.runId}.json`);
  const temp = join(dir, `.latest-${result.runId}.tmp`);
  const payload = JSON.stringify(result, null, 2);
  await writeFile(run, payload, 'utf8');
  await writeFile(temp, payload, 'utf8');
  await rename(temp, latest);
}

export async function loadLatestDailyCampaignRun(): Promise<DailyCampaignRunResult | null> {
  try {
    const content = await readFile(join(storeDir(), 'latest.json'), 'utf8');
    return JSON.parse(content) as DailyCampaignRunResult;
  } catch {
    return null;
  }
}
