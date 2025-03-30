export type SbtcDataResponse = {
  status: string;
  data: {
    token: {
      contract_principal: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token';
      asset_identifier: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token';
      name: 'sBTC';
      symbol: 'sBTC';
      image_uri: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token/1.png';
      decimals_from_contract: '8';
      total_supply_from_contract: string;
      metadata_valid: boolean;
      updated_at: string;
    };
    stats: {
      total_holders: string;
      top_10_balance: string;
      top_10_percentage: string;
      top_50_balance: string;
      top_50_percentage: string;
      top_100_balance: string;
      top_100_percentage: string;
      top_1000_balance: string;
      top_1000_percentage: string;
      total_supply: string;
      active_holders: string;
      total_transactions: string;
      max_transaction_volume: string;
      average_transaction_volume: string;
      total_volume: string;
      max_tx_id: null | string;
      max_tx_timestamp: string;
      top_10_address_total_volume: string;
    };
    holders: {
      contract_principal: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token';
      address: string;
      balance: string;
      created_at: string;
      updated_at: string;
    }[];
    topVolumes: {
      address: string;
      total_address_volume: string;
    }[];
    totalPages: number;
    totalHolders: string;
  };
};
