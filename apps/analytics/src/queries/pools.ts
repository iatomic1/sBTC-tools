import { SBTC_CONTRACT_ID, STX_TOOLS_API_URL } from '@/lib/constants';
import type { PoolItem } from '@/types/pools';

export default async function getPools(): Promise<PoolItem[] | null> {
  try {
    const response = await fetch(
      `${STX_TOOLS_API_URL}tokens/${SBTC_CONTRACT_ID}/pools`,
    );

    if (!response) {
      throw new Error('Error while getting sBTC pools');
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
