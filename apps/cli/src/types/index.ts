import type { Account, Wallet } from '@stacks/wallet-sdk';

export interface Config {
  WALLET_ADDRESS?: string;
  MNEMONIC?: string;
  PRIVATE_KEY?: string;
  NETWORK?: 'mainnet' | 'testnet';
}

export type MenuOption = {
  label: string;
  value: string;
  handler?: () => Promise<void>;
};

// Re-export SDK types
export type { Wallet, Account };
