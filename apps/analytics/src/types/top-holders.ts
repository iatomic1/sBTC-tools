export type TopHoldersItem = {
  balance: string;
  debits: string;
  credits: string;
  total_spent_usd: null | string;
  total_received_usd: null | string;
  total_buys: null | string;
  total_sells: null | string;
  total_pnl_usd: null | string;
  wallet: {
    address: string;
    bns: null | string;
    tags: [];
  };
  rank: number;
};
