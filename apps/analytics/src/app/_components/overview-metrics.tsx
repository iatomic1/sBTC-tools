'use client';

import { ArrowDownUp, BarChart3, TrendingUp, Wallet } from 'lucide-react';

import type { SbtcDataResponse } from '@/types/sbtc';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';

export function OverviewMetrics({
  sbtcData,
  transactions,
}: {
  sbtcData: SbtcDataResponse['data'];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  transactions: any;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total sBTC Supply
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Number.parseFloat(sbtcData.stats.total_supply).toFixed(2)} sBTC
          </div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Holders</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Number(sbtcData.stats.total_holders).toLocaleString()}
          </div>
          {/* <p className="text-xs text-muted-foreground"> */}
          {/*   +18.2% from last month */}
          {/* </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Transfers</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {transactions.todayTransfers}
          </div>
          <p className="text-xs text-muted-foreground">
            {' '}
            {transactions.trend === 'increase' ? '↑' : '↓'}{' '}
            {transactions.percentageIncrease}% since yesterday
          </p>
        </CardContent>
      </Card>
      {/* <Card> */}
      {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
      {/*     <CardTitle className="text-sm font-medium">DeFi TVL</CardTitle> */}
      {/*     <BarChart3 className="h-4 w-4 text-muted-foreground" /> */}
      {/*   </CardHeader> */}
      {/*   <CardContent> */}
      {/*     <div className="text-2xl font-bold">89.4 sBTC</div> */}
      {/*     <p className="text-xs text-muted-foreground">+5.7% from last week</p> */}
      {/*   </CardContent> */}
      {/* </Card> */}
    </div>
  );
}
