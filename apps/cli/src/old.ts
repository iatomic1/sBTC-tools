#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import * as p from '@clack/prompts';
import { publicKeyToAddress } from '@stacks/transactions';
import { Account, Wallet } from '@stacks/wallet-sdk';
import { parse } from 'dotenv';
import color from 'picocolors';
import { generateNewWallet } from './services/wallet';

async function main() {
  p.intro(`${color.bgMagenta(color.black(' Welcome to sBTC tools cli '))}`);

  const envPath = path.join(process.cwd(), '.env');

  // Create .env if it doesn't exist
  try {
    await fs.access(envPath);
    p.log.success('Found .env file');
  } catch (error) {
    await fs.writeFile(envPath, '');
    p.log.info('Created new .env file');
  }

  const action = (await p.select({
    message: 'Select action:',
    options: [
      { value: 'generate', label: 'Generate new wallet' },
      { value: 'exit', label: 'Exit' },
    ],
  })) as string;

  if (action === 'generate') {
    const password = (await p.password({
      message: 'Enter wallet encryption password:',
      mask: '*',
    })) as string;

    const network = (await p.select({
      message: 'Select network:',
      options: [
        { value: 'mainnet', label: 'Mainnet' },
        { value: 'testnet', label: 'Testnet' },
      ],
    })) as string;

    const spinner = p.spinner();
    spinner.start('Generating wallet...');

    try {
      const { wallet, mnemonic } = await generateNewWallet(password, network);
      const account = wallet.accounts[0];

      // Derive Stacks address
      const privateKey = account.stxPrivateKey;
      const address = publicKeyToAddress(privateKey);

      // Update .env file
      const envContents = await fs.readFile(envPath, 'utf-8');
      const envConfig = parse(envContents);

      envConfig.WALLET_ADDRESS = address;
      envConfig.MNEMONIC = mnemonic;
      envConfig.PRIVATE_KEY = account.stxPrivateKey;

      const newEnv = Object.entries(envConfig)
        .map(([k, v]) => `${k}="${v}"`)
        .join('\n');

      await fs.writeFile(envPath, newEnv);

      spinner.stop('Wallet generated and saved to .env!');

      p.outro(
        color.green(`
      Wallet created successfully!
      Address: ${color.yellow(address)}
      Mnemonic: ${color.yellow(mnemonic)}
      `),
      );
    } catch (error) {
      spinner.stop('Error generating wallet');
      p.outro(color.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  }
}

await main();
