import { note, spinner } from '@clack/prompts';
import color from 'picocolors';
import { getAddressBalance } from '../services/blockchain';
import { getConfig } from '../utils/config';
import { waitForInput } from '../utils/prompts';

export async function showBalance() {
  const s = spinner();
  const config = await getConfig();

  try {
    if (!config.WALLET_ADDRESS) {
      note('No wallet found - generate one first!', color.red('Error'));
      await waitForInput();
      return;
    }

    s.start('Fetching balances...');
    const balance = await getAddressBalance(config);

    if (!balance) {
      s.stop('Failed to fetch balances');
      note('Check your network connection', color.yellow('Warning'));
      await waitForInput();
      return;
    }

    s.stop();
    console.log(`
${color.bold('Account Balance')}
${color.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
${color.yellow('sBTC')}: ${color.green(
      (Number(balance.sBtcBal) / 100_000_000).toLocaleString(),
    )} sBTC
${color.yellow('STX')}: ${color.green(
      (Number(balance.stxBal) / 1_000_000).toLocaleString(),
    )} STX
    `);
  } catch (error) {
    s.stop('Failed to fetch balances');
    note(
      error instanceof Error ? error.message : 'Unknown error',
      color.red('Error'),
    );
  }

  await waitForInput();
}
