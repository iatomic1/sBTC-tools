import { generateSecretKey, generateWallet } from '@stacks/wallet-sdk';

export const generateNewWallet = async (password: string, network: string) => {
  const mnemonic = generateSecretKey();

  const wallet = await generateWallet({
    secretKey: mnemonic,
    password: password,
  });

  return { wallet, mnemonic };
};
