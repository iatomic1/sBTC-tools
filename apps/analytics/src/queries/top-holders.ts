import { SBTC_CONTRACT_ID, STX_TOOLS_API_URL } from '@/lib/constants';
import type { TopHoldersItem } from '@/types/top-holders';

export default async function getTopHolders(): Promise<{
  success: boolean;
  data: TopHoldersItem[];
} | null> {
  try {
    const response = await fetch(
      `${STX_TOOLS_API_URL}tokens/${SBTC_CONTRACT_ID}/holders?page=0&size=50&sort=balance%2Cdesc`,
    );

    if (!response) {
      throw new Error('Error while getting price history');
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
