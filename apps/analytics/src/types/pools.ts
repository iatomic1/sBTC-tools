export type PoolItem = {
  pool_id: string;
  platform: string;
  liquidity_usd: number;
  token_x_price_usd: number;
  base_token: {
    contract_id: string;
    image_url: string;
    symbol: string;
  };
  target_token: {
    contract_id: string;
    image_url: string;
    symbol: string;
  };
  metrics: {
    swap_count: number;
    volume_1d_usd: number;
    volume_7d_usd: number;
    price_change_1d: number;
    price_change_7d: number;
    price_change_30d: number;
  };
};
