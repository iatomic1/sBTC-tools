import { text } from '@clack/prompts';

export async function waitForInput() {
  await text({
    message: 'Press Enter to continue',
    placeholder: ' ',
    defaultValue: ' ',
  });
  console.clear();
}
