'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function RecentActivity() {
  const transactions = [
    {
      id: 'tx1',
      type: 'send',
      amount: '1.25 sBTC',
      from: 'SP1QK1A...',
      to: 'SP2B3XY...',
      time: '5 mins ago',
    },
    {
      id: 'tx2',
      type: 'receive',
      amount: '0.75 sBTC',
      from: 'SP3C4Z9...',
      to: 'SP1QK1A...',
      time: '12 mins ago',
    },
    {
      id: 'tx3',
      type: 'send',
      amount: '2.5 sBTC',
      from: 'SP1QK1A...',
      to: 'SP5D6E7...',
      time: '34 mins ago',
    },
    {
      id: 'tx4',
      type: 'receive',
      amount: '0.42 sBTC',
      from: 'SP8F9G0...',
      to: 'SP1QK1A...',
      time: '1 hour ago',
    },
    {
      id: 'tx5',
      type: 'send',
      amount: '1.8 sBTC',
      from: 'SP1QK1A...',
      to: 'SP7H8I9...',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div className="flex items-center" key={transaction.id}>
          <div
            className={`mr-4 rounded-full p-2 ${
              transaction.type === 'receive'
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
            }`}
          >
            {transaction.type === 'receive' ? (
              <ArrowDownRight className="h-4 w-4" />
            ) : (
              <ArrowUpRight className="h-4 w-4" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.amount}
            </p>
            <p className="text-xs text-muted-foreground">
              {transaction.type === 'receive' ? 'From: ' : 'To: '}
              {transaction.type === 'receive'
                ? transaction.from
                : transaction.to}
            </p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {transaction.time}
          </div>
        </div>
      ))}
    </div>
  );
}
