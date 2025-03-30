'use client';

import { EXPLORER_URL } from '@/lib/constants';
import { fetchAllRecentTransactions } from '@/queries/transactions';
import { Badge } from '@ui/components/ui/badge';
import { Button } from '@ui/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function RecentActivity() {
  const [transactions, setTransactions] = useState<
    Array<{
      id: string;
      amount: string;
      from: string;
      to: string;
      time: string;
      status: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const txs = await fetchAllRecentTransactions(1);
        const processed = txs
          .filter(
            (tx) =>
              tx.tx.tx_type === 'contract_call' &&
              tx.tx.contract_call?.function_name === 'transfer' &&
              tx.tx.contract_call.function_args?.length >= 3,
          )
          .slice(0, 5)
          .map((tx) => {
            const contractCall = tx.tx.contract_call;
            if (!contractCall || !contractCall.function_args) {
              return null;
            }

            const amountArg = contractCall.function_args[0];
            const toAddressArg = contractCall.function_args[2];

            if (!amountArg || !toAddressArg) {
              return null;
            }

            const amountValue =
              Number.parseFloat(amountArg.repr.slice(1)) / 100_000_000;

            // Format addresses
            const fromAddress = tx.tx.sender_address;
            const toAddress = toAddressArg.repr.startsWith("'")
              ? toAddressArg.repr.slice(1)
              : toAddressArg.repr;

            return {
              id: tx.tx.tx_id,
              amount: `${amountValue} sBTC`,
              from: fromAddress,
              to: toAddress,
              time: formatDistanceToNow(new Date(tx.tx.block_time * 1000), {
                addSuffix: true,
              }),
              status: tx.tx.tx_status,
            };
          })
          .filter((tx): tx is NonNullable<typeof tx> => tx !== null);

        setTransactions(processed);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return <div className="space-y-8">Loading recent activity...</div>;
  }

  if (!transactions.length) {
    return <div className="space-y-8">No recent transfers found</div>;
  }

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div className="flex items-center" key={transaction.id}>
          <div className="mr-4 rounded-full p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Button
                className="text-sm font-medium leading-none p-0 h-0"
                variant={'link'}
                asChild
              >
                <a href={`${EXPLORER_URL}txid/${transaction.id}`}>
                  {transaction.amount}
                </a>
              </Button>
              <Badge>{transaction.status}</Badge>
            </div>

            <Button
              className="text-xs text-muted-foreground p-0 h-0"
              variant={'link'}
              asChild
            >
              <a href={`${EXPLORER_URL}address/${transaction.from}`}>
                <p>From: {truncateAddress(transaction.from)}</p>
              </a>
            </Button>
          </div>
          <div className="ml-auto text-xs text-muted-foreground flex flex-col items-end gap-1">
            <p>{transaction.time}</p>
            <Button
              className="text-xs text-muted-foreground p-0 py-1 h-0"
              variant={'link'}
              asChild
            >
              <a href={`${EXPLORER_URL}address/${transaction.to}`}>
                <p>To: {truncateAddress(transaction.to)}</p>
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function truncateAddress(address: string, length = 6): string {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}
