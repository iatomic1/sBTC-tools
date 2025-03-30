import { KRAXEL_API_URL, SBTC_CONTRACT_ID } from '@/lib/constants';
import type { SbtcDataResponse } from '@/types/sbtc';

export default async function getSbtcData(): Promise<SbtcDataResponse | null> {
  try {
    const response = await fetch(`${KRAXEL_API_URL}${SBTC_CONTRACT_ID}/token`);

    if (!response) {
      throw new Error('Error while getting sbtc data');
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
