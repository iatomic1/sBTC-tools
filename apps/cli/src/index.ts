import { intro, outro } from '@clack/prompts';
import color from 'picocolors';
import { mainMenu } from './commands/menu';
import { checkOrCreateConfig } from './utils/config';

async function bootstrap() {
  intro(color.bgMagenta(color.black(' Welcome to sBTC tools cli ')));

  await checkOrCreateConfig();

  await mainMenu();

  outro('Goodbye!');
}

bootstrap().catch(console.error);
