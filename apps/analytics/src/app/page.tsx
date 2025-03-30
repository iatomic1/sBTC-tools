import getPriceHistory from '@/queries/price-history';
import getSbtcData from '@/queries/sbtc';
import getTopHolders from '@/queries/top-holders';
import {
  calculateTransferStats,
  fetchAndAnalyzeTransactions,
} from '@/queries/transactions';
import type { SbtcDataResponse } from '@/types/sbtc';
import type { TopHoldersItem } from '@/types/top-holders';
import { Button } from '@ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/components/ui/tabs';
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
import { TableSkeleton } from './components/skeletons/table-skeleton';
export const metadata: Metadata = {
  title: 'sBTC Analytics Dashboard',
  description:
    'Comprehensive analytics for sBTC transactions, holders, and DeFi integrations',
};

export default async function DashboardPage() {
  const sbtcData = await getSbtcData();
  const priceHistory = await getPriceHistory();
  const topHolders = await getTopHolders();
  const transactions = await fetchAndAnalyzeTransactions();
  const transferStats = await calculateTransferStats();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">sBTC Analytics</h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/advanced-analytics">Advanced Analytics</Link>
            </Button>
            <Button variant="outline">Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverviewMetrics
              transactions={transactions}
              sbtcData={sbtcData?.data as SbtcDataResponse['data']}
            />

            {/* First row: BTC-sBTC Flow and Price History side by side */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="!p-0 border-none shadow-none">
                <Suspense fallback={<PriceHistorySkeleton />}>
                  <BtcSbtcFlowVisualization />
                </Suspense>
              </Card>
              <Card className="!p-0 border-none shadow-none">
                <PriceHistory priceData={priceHistory?.data} />
              </Card>
            </div>

            {/* Second row: Top Holders and Recent Activity side by side */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Holders</CardTitle>
                  <CardDescription>
                    Addresses with the largest sBTC balances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<p>Loading ...</p>}>
                    <TopHolders
                      topHolders={topHolders?.data as TopHoldersItem[]}
                    />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest sBTC transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>

            {/* Third row: Daily Transfers full width */}
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily sBTC Transfers</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <DailyTransfers />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Transfer Volume</CardTitle>
                  <CardDescription>
                    Daily and monthly sBTC transfer amounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <TransferVolume />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Transfer Statistics</CardTitle>
                  <CardDescription>
                    Key metrics about sBTC transfers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Avg Transfer
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {transferStats.avgTransfer} sBTC
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {transferStats.percentageChange}% from last month
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Largest Transfer in the past 30 days
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Top sBTC Holders</CardTitle>
                  <CardDescription>
                    Addresses with the largest sBTC balances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TopHolders
                    topHolders={topHolders?.data as TopHoldersItem[]}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Holder Distribution</CardTitle>
                  <CardDescription>
                    Distribution of sBTC by holder size
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <WalletAgeDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="space-y-4">
            <DeFiProjects />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
