import { KRAXEL_API_URL, SBTC_CONTRACT_ID } from '@/lib/constants';
import type { PriceData } from '@/types/price-history';

export default async function getPriceHistory(): Promise<{
  success: boolean;
  data: PriceData[];
} | null> {
  try {
    const response = await fetch(
      `${KRAXEL_API_URL}candle?contract=${SBTC_CONTRACT_ID}&timeframe=15m&limit=1000`,
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
