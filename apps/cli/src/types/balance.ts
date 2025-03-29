/**
 * GET request that returns address balances
 */
export interface AddressBalanceResponse {
  stx: StxBalance;
  fungible_tokens: {
    [k: string]: FtBalance;
  };
  non_fungible_tokens: {
    [k: string]: NftBalance;
  };
  token_offering_locked?: AddressTokenOfferingLocked;
}
export interface StxBalance {
  balance: string;
  total_sent: string;
  total_received: string;
  total_fees_sent: string;
  total_miner_rewards_received: string;
  /**
   * The transaction where the lock event occurred. Empty if no tokens are locked.
   */
  lock_tx_id: string;
  /**
   * The amount of locked STX, as string quoted micro-STX. Zero if no tokens are locked.
   */
  locked: string;
  /**
   * The STX chain block height of when the lock event occurred. Zero if no tokens are locked.
   */
  lock_height: number;
  /**
   * The burnchain block height of when the lock event occurred. Zero if no tokens are locked.
   */
  burnchain_lock_height: number;
  /**
   * The burnchain block height of when the tokens unlock. Zero if no tokens are locked.
   */
  burnchain_unlock_height: number;
}
export interface FtBalance {
  balance: string;
  total_sent: string;
  total_received: string;
}
export interface NftBalance {
  count: string;
  total_sent: string;
  total_received: string;
}
/**
 * Token Offering Locked
 */
export interface AddressTokenOfferingLocked {
  /**
   * Micro-STX amount still locked at current block height.
   */
  total_locked: string;
  /**
   * Micro-STX amount unlocked at current block height.
   */
  total_unlocked: string;
  unlock_schedule: AddressUnlockSchedule[];
}
/**
 * Unlock schedule amount and block height
 */
export interface AddressUnlockSchedule {
  /**
   * Micro-STX amount locked at this block height.
   */
  amount: string;
  block_height: number;
}
