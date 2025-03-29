import { confirm, spinner, text } from '@clack/prompts';
import color from 'picocolors';
import { getConfig } from '../utils/config';
import { waitForInput } from '../utils/prompts';

export async function transferSBTC() {
  const s = spinner();
  const config = await getConfig();

  try {
    const recipient = await text({
      message: 'Recipient STX address:',
      validate: (value) => {
        if (!value.match(/^ST[A-Z0-9]{28,41}$/)) return 'Invalid STX address!';
      },
    });

    const amount = await text({
      message: 'Amount (in STX):',
      validate: (value) => {
        if (!/^\d+(\.\d+)?$/.test(value)) return 'Invalid amount!';
      },
    });

    const confirmed = await confirm({
      message: `Send ${color.yellow(amount)} STX to ${color.cyan(
        recipient as string,
      )}?`,
    });

    if (confirmed) {
      s.start('Processing transaction...');
      // Actual transaction logic would go here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      s.stop(`${color.green('Success!')} Transaction sent`);
    } else {
      s.stop('Transaction canceled');
    }
  } catch (error) {
    s.stop('Transaction failed');
    console.error(error);
  }

  await waitForInput();
}
