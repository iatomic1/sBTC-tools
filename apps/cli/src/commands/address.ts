import { note } from '@clack/prompts';
import color from 'picocolors';
import { getConfig } from '../utils/config';
import { waitForInput } from '../utils/prompts';

export async function showAddress() {
  const config = await getConfig();

  if (!config.WALLET_ADDRESS) {
    note('No wallet generated yet', 'Address:');
  } else {
    note(config.WALLET_ADDRESS, 'Your STX address:');
  }

  await waitForInput();
}
