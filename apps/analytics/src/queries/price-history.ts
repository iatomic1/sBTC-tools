import type { PriceData } from '@/types/price-history';

export default async function getPriceHistory(): Promise<{
  success: boolean;
  data: PriceData[];
} | null> {
  try {
    const response = await fetch(
      'https://kraxel.io/api/v3/candle?contract=SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token&timeframe=15m&limit=2000',
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
