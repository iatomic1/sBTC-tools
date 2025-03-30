interface FunctionArg {
  hex: string;
  repr: string;
  name: string;
  type: string;
}

export interface DailyTransfer {
  date: string;
  transfers: number;
}
interface ContractCall {
  contract_id: string;
  function_name: string;
  function_signature: string;
  function_args: FunctionArg[];
}

interface TxResult {
  hex: string;
  repr: string;
}

interface TransactionDetails {
  tx_id: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  post_condition_mode: string;
  anchor_mode: string;
  block_hash: string;
  block_height: number;
  block_time: number;
  block_time_iso: string;
  burn_block_time: number;
  canonical: boolean;
  tx_index: number;
  tx_status: string;
  tx_result: TxResult;
  event_count: number;
  tx_type: string;
  contract_call?: ContractCall;
}

export interface Transaction {
  tx: TransactionDetails;
  stx_sent: string;
  stx_received: string;
  events: {
    stx: { transfer: number; mint: number; burn: number };
    ft: { transfer: number; mint: number; burn: number };
    nft: { transfer: number; mint: number; burn: number };
  };
}

interface ApiResponse {
  limit: number;
  offset: number;
  total: number;
  results: Transaction[];
}

interface AnalysisResult {
  todayTransfers: number;
  yesterdayTransfers: number;
  percentageIncrease: string;
  trend: 'increase' | 'decrease';
  todayTransactions: Transaction[];
  yesterdayTransactions: Transaction[];
  error?: string;
}

export async function fetchAndAnalyzeTransactions(): Promise<AnalysisResult> {
  try {
    const transactions = await fetchAllRecentTransactions();

    if (transactions.length === 0) {
      return emptyResult('No transactions found');
    }

    // Get dates in UTC
    const now = new Date();
    const today = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const todayTimestamp = Math.floor(today.getTime() / 1000);
    const yesterdayTimestamp = Math.floor(yesterday.getTime() / 1000);

    const filterTransfer = (tx: Transaction) =>
      tx.tx.tx_type === 'contract_call' &&
      tx.tx.contract_call?.function_name === 'transfer';

    const todayTransactions = transactions.filter(
      (tx) => tx.tx.block_time >= todayTimestamp && filterTransfer(tx),
    );

    const yesterdayTransactions = transactions.filter(
      (tx) =>
        tx.tx.block_time >= yesterdayTimestamp &&
        tx.tx.block_time < todayTimestamp &&
        filterTransfer(tx),
    );

    const todayTransfersCount = todayTransactions.length;
    const yesterdayTransfersCount = yesterdayTransactions.length;

    let percentageIncrease = 0;
    if (yesterdayTransfersCount > 0) {
      percentageIncrease =
        ((todayTransfersCount - yesterdayTransfersCount) /
          yesterdayTransfersCount) *
        100;
    } else if (todayTransfersCount > 0) {
      percentageIncrease = 100;
    }

    return {
      todayTransfers: todayTransfersCount,
      yesterdayTransfers: yesterdayTransfersCount,
      percentageIncrease: percentageIncrease.toFixed(2),
      trend: percentageIncrease >= 0 ? 'increase' : 'decrease',
      todayTransactions,
      yesterdayTransactions,
    };
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return emptyResult(
      error instanceof Error ? error.message : 'Unknown error occurred',
    );
  }
}

function emptyResult(error?: string): AnalysisResult {
  return {
    todayTransfers: 0,
    yesterdayTransfers: 0,
    percentageIncrease: '0.00',
    trend: 'decrease',
    todayTransactions: [],
    yesterdayTransactions: [],
    ...(error ? { error } : {}),
  };
}

export async function fetchAllRecentTransactions(
  days = 15,
): Promise<Transaction[]> {
  const contractAddress =
    'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token';
  const nDaysAgo = Date.now() - days * 24 * 60 * 60 * 1000;
  const nDaysAgoTimestamp = Math.floor(nDaysAgo / 1000);

  let allTransactions: Transaction[] = [];
  let offset = 0;
  const limit = 50;
  let hasMoreTransactions = true;

  while (hasMoreTransactions) {
    const apiUrl = `https://api.hiro.so/extended/v2/addresses/${contractAddress}/transactions?limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data: ApiResponse = await response.json();

      if (!data.results?.length) {
        hasMoreTransactions = false;
        break;
      }

      const relevantTransactions = data.results.filter(
        (tx) => tx.tx.block_time >= nDaysAgoTimestamp,
      );

      allTransactions = [...allTransactions, ...relevantTransactions];

      if (
        data.results.some((tx) => tx.tx.block_time < nDaysAgoTimestamp) ||
        data.results.length < limit
      ) {
        hasMoreTransactions = false;
      }

      offset += limit;

      if (offset > 1000) {
        // Increased safety limit for 15 days
        console.warn('Safety stop triggered at 1000 transactions');
        hasMoreTransactions = false;
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      hasMoreTransactions = false;
    }
  }

  return allTransactions;
}

export async function fetch15DayTransfers(): Promise<DailyTransfer[]> {
  try {
    const transactions = await fetchAllRecentTransactions(15);
    return processDailyTransfers(transactions);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

function processDailyTransfers(transactions: Transaction[]): DailyTransfer[] {
  // Create empty array for 15 days
  const daysArray = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 14 + i); // Fill from oldest to newest
    return dateToYMD(date);
  });

  // Initialize daily counts
  const dailyCounts = new Map<string, number>(
    daysArray.map((date) => [date, 0]),
  );

  // Count transfers - replacing forEach with for...of loop
  for (const tx of transactions) {
    if (
      tx.tx.tx_type === 'contract_call' &&
      tx.tx.contract_call?.function_name === 'transfer'
    ) {
      const date = dateToYMD(new Date(tx.tx.block_time * 1000));
      if (dailyCounts.has(date)) {
        dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
      }
    }
  }

  // Convert to sorted array
  return Array.from(dailyCounts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, transfers]) => ({
      date,
      transfers,
    }));
}

function dateToYMD(date: Date): string {
  return date.toISOString().split('T')[0] as string;
}
