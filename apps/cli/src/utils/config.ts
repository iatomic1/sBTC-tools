import fs from 'node:fs/promises';
import path from 'node:path';
import { parse, stringify } from 'envfile';
import type { Config } from '../types';

export const CONFIG_PATH = path.join(process.cwd(), '.env');

export async function checkOrCreateConfig(): Promise<void> {
  try {
    await fs.access(CONFIG_PATH);
  } catch {
    await fs.writeFile(CONFIG_PATH, '');
  }
}

export async function updateConfig(values: Partial<Config>): Promise<void> {
  const current = await fs.readFile(CONFIG_PATH, 'utf-8');
  const parsed = parse(current);
  const updated = { ...parsed, ...values };
  await fs.writeFile(CONFIG_PATH, stringify(updated));
}

export async function getConfig(): Promise<Config> {
  const content = await fs.readFile(CONFIG_PATH, 'utf-8');
  return parse(content) as unknown as Config;
}
