import { note, password, select, spinner, text } from '@clack/prompts';
import { privateKeyToAddress } from '@stacks/transactions';
import color from 'picocolors';
import { NETWORKS } from '../constants';
import { generateNewWallet } from '../services/wallet';
import { updateConfig } from '../utils/config';

export async function generateWallet() {
  const s = spinner();

  try {
    const pwd = await password({
      message: 'Set wallet encryption password:',
      mask: '*',
    });

    const network = (await select({
      message: 'Choose network:',
      options: [
        { value: 'mainnet', label: 'Mainnet' },
        { value: 'testnet', label: 'Testnet' },
      ],
    })) as 'mainnet' | 'testnet';

    s.start('Generating wallet...');
    const { wallet, mnemonic } = await generateNewWallet(
      pwd as string,
      network,
    );
    const account = wallet.accounts[0];
    const address = privateKeyToAddress(account.stxPrivateKey, network);

    await updateConfig({
      WALLET_ADDRESS: address,
      MNEMONIC: mnemonic,
      PRIVATE_KEY: account.stxPrivateKey,
      NETWORK: network,
    });

    s.stop('Wallet generated!');

    note(mnemonic, 'Your recovery phrase (SAVE THIS SECURELY):');
    note(address, 'Your STX address:');

    await text({
      message: 'Press Enter to continue',
      placeholder: ' ',
      defaultValue: ' ',
    });
  } catch (error) {
    s.stop('Error generating wallet');
    throw error;
  }
}
