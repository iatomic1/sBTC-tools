import getPools from '@/queries/pools';
import getPriceHistory from '@/queries/price-history';
import getSbtcData from '@/queries/sbtc';
import getTopHolders from '@/queries/top-holders';
import {
  calculateTransferStats,
  fetchAndAnalyzeTransactions,
} from '@/queries/transactions';
import type { PoolItem } from '@/types/pools';
import type { SbtcDataResponse } from '@/types/sbtc';
import type { TopHoldersItem } from '@/types/top-holders';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { BtcSbtcFlowVisualization } from './_components/btc-sbtc-flow-visualization';
import { DailyTransfers } from './_components/daily-transfers';
import { DeFiProjects } from './_components/defi-projects';
import { OverviewMetrics } from './_components/overview-metrics';
import { PriceHistory } from './_components/price-history';
import { RecentActivity } from './_components/recent-activity';
import { TopHolders } from './_components/top-holders';
import { TransferVolume } from './_components/transfer-volume';
import { WalletAgeDistribution } from './_components/wallet-age-distribution';
import { PriceHistorySkeleton } from './components/skeletons/price-history-skeleton';
import { TopHoldersSkeleton } from './components/skeletons/top-holders-skeleton';

export const metadata: Metadata = {
  title: 'sBTC Analytics Dashboard',
  description:
    'Comprehensive analytics for sBTC transactions, holders, and DeFi integrations',
};

export default async function DashboardPage() {
  // Fetch all data concurrently using Promise.all
  const [
    sbtcDataResponse,
    priceHistoryResponse,
    topHoldersResponse,
    transactionsResponse,
    transferStatsResponse,
    poolsResponse,
  ] = await Promise.all([
    getSbtcData(),
    getPriceHistory(),
    getTopHolders(),
    fetchAndAnalyzeTransactions(),
    calculateTransferStats(),
    getPools(),
  ]);

  const sbtcData = sbtcDataResponse?.data as SbtcDataResponse['data'];
  const priceHistory = priceHistoryResponse?.data;
  const topHolders = topHoldersResponse?.data as TopHoldersItem[];
  const transactions = transactionsResponse;
  const transferStats = transferStatsResponse;
  const pools = poolsResponse;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            sBTC Analytics
          </h2>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button asChild size="sm" className="sm:size-default">
              <Link href="/advanced-analytics">Advanced Analytics</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="sm:size-default"
              disabled
            >
              <span className="hidden sm:inline">Download Report</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="py-2 text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transfers" className="py-2 text-xs sm:text-sm">
              Transfers
            </TabsTrigger>
            <TabsTrigger value="holders" className="py-2 text-xs sm:text-sm">
              Holders
            </TabsTrigger>
            <TabsTrigger value="defi" className="py-2 text-xs sm:text-sm">
              DeFi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <OverviewMetrics transactions={transactions} sbtcData={sbtcData} />

            {/* First row: BTC-sBTC Flow and Price History */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card className="!p-0 border-none shadow-none">
                <Suspense fallback={<PriceHistorySkeleton />}>
                  <BtcSbtcFlowVisualization />
                </Suspense>
              </Card>
              <Card className="!p-0 border-none shadow-none">
                <PriceHistory priceData={priceHistory} />
              </Card>
            </div>

            {/* Second row: Top Holders and Recent Activity */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Top Holders</CardTitle>
                  <CardDescription>
                    Addresses with the largest sBTC balances
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <Suspense fallback={<TopHoldersSkeleton />}>
                    <TopHolders topHolders={topHolders} />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest sBTC transactions</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>

            {/* Third row: Daily Transfers full width */}
            <div className="grid gap-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Daily sBTC Transfers</CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                  <DailyTransfers />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Transfer Volume</CardTitle>
                  <CardDescription>
                    Daily and monthly sBTC transfer amounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                  <TransferVolume />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Transfer Statistics</CardTitle>
                  <CardDescription>
                    Key metrics about sBTC transfers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                          <CardTitle className="text-sm font-medium">
                            Avg Transfer
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-xl sm:text-2xl font-bold">
                            {transferStats.avgTransfer} sBTC
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {transferStats.percentageChange}% from last month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                          <CardTitle className="text-sm font-medium">
                            Largest Transfer
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-xl sm:text-2xl font-bold">
                            {transferStats.largestTransfer} sBTC
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {transferStats.largestTransferDate}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="holders" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Top sBTC Holders</CardTitle>
                  <CardDescription>
                    Addresses with the largest sBTC balances
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <TopHolders topHolders={topHolders} />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Holder Distribution</CardTitle>
                  <CardDescription>
                    Distribution of sBTC by holder size
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                  <WalletAgeDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="space-y-4">
            <DeFiProjects pools={pools as PoolItem[]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
