import { confirm, note, spinner, text } from '@clack/prompts';
import color from 'picocolors';
import { transfer } from '../services/blockchain';
import { getConfig } from '../utils/config';
import { waitForInput } from '../utils/prompts';

export async function transferSBTC() {
  const s = spinner();
  const config = await getConfig();

  try {
    if (!config.WALLET_ADDRESS || !config.PRIVATE_KEY) {
      note('No wallet found - generate one first!', color.red('Error'));
      await waitForInput();
      return;
    }

    const recipient = await text({
      message: 'Recipient STX address:',
      validate: (value) => {
        if (!value.match(/^ST[A-Z0-9]{28,41}$/)) return 'Invalid STX address!';
      },
    });

    const amount = await text({
      message: 'Amount (in sBTC):',
      validate: (value) => {
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Invalid amount!';
        if (Number(value) <= 0) return 'Amount must be greater than 0';
      },
    });

    const fee = await text({
      message: 'Transaction fee (in STX, default 0.0001):',
      defaultValue: '0.0001',
      validate: (value) => {
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Invalid fee amount!';
      },
    });

    const memo = await text({
      message: 'Memo (optional, max 34 characters):',
      placeholder: 'Enter memo text or leave blank',
      validate: (value) => {
        if (value.length > 34) return 'Memo too long (max 34 characters)';
      },
    });

    const confirmed = await confirm({
      message: `Confirm sending ${color.yellow(
        amount.toString(),
      )} sBTC to ${color.cyan(recipient as string)} with fee ${color.yellow(
        fee.toString(),
      )} STX?`,
    });

    if (!confirmed) {
      s.stop('Transaction cancelled');
      await waitForInput();
      return;
    }

    s.start('Processing transaction...');

    const result = await transfer(
      amount.toString(),
      recipient as string,
      fee.toString(),
      memo as string,
      config,
    );

    s.stop(`${color.green('Success!')} Transaction submitted`);

    console.log(`
${color.bold('Transaction Details')}
${color.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━')}
${color.yellow('Tx ID:')} ${result.txid}
${color.yellow('Explorer:')} ${getExplorerLink(config.NETWORK, result.txid)}
    `);
  } catch (error) {
    s.stop(color.red('Transaction failed'));
    note(
      error instanceof Error ? error.message : 'Unknown error',
      color.red('Error'),
    );
  }

  await waitForInput();
}

function getExplorerLink(network: string | undefined, txid: string): string {
  const base =
    network === 'mainnet'
      ? 'https://explorer.hiro.so/txid'
      : 'https://explorer.hiro.so/txid?chain=testnet';
  return `${base}/${txid}`;
}
