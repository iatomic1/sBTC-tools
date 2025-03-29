import { select } from '@clack/prompts';
import color from 'picocolors';
import type { Config } from '../types';
import { getConfig } from '../utils/config';
import { showAddress } from './address';
import { showBalance } from './balance';
import { generateWallet } from './generate';
import { transferSBTC } from './transfer';

export async function mainMenu() {
  let config = await getConfig();

  while (true) {
    console.clear();
    const options: { value: string; label: string }[] = [];

    if (!config.WALLET_ADDRESS) {
      options.push({
        value: 'generate',
        label: '1. Generate New Wallet',
      });
    }

    if (config.WALLET_ADDRESS) {
      options.push(
        { value: 'balance', label: '2. Display Balance' },
        { value: 'address', label: '3. Display STX Address' },
        { value: 'transfer', label: '4. Transfer sBTC' },
      );
    }

    options.push({
      value: 'exit',
      label: config.WALLET_ADDRESS ? '5. Exit' : '2. Exit',
    });

    const choice = await select({
      message: `${color.green('Main Menu')} ${color.dim(
        `(Network: ${config.NETWORK || 'none'})`,
      )}`,
      options,
    });

    console.clear();

    switch (choice) {
      case 'generate':
        await generateWallet();
        config = await getConfig();
        break;
      case 'balance':
        await showBalance(config as Config);
        break;
      case 'address':
        await showAddress();
        break;
      case 'transfer':
        await transferSBTC();
        break;
      case 'exit':
        return;
    }
  }
}
