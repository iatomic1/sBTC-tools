'use client';
import type { PoolItem } from '@/types/pools';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/components/ui/table';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import LiquidityDistributionChart from './liquidity-distribution-chart';

export function DeFiProjects({ pools }: { pools: PoolItem[] }) {
  // Sort pools by liquidity amount (highest first)
  const sortedPools = [...pools].sort(
    (a, b) => b.liquidity_usd - a.liquidity_usd,
  );

  // Calculate total liquidity across all pools
  const totalLiquidity = pools.reduce(
    (sum, pool) => sum + pool.liquidity_usd,
    0,
  );

  // Prepare pie chart data
  const pieData = sortedPools.map((pool) => ({
    name: pool.platform,
    value: pool.liquidity_usd,
    symbol: `${pool.base_token.symbol}/${pool.target_token.symbol}`,
  }));

  // Prepare color scheme
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82ca9d',
    '#f4a261',
    '#e76f51',
  ];

  // Format currency function
  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Format contract address for display
  const formatContractId = (contractId: string) => {
    if (contractId.length > 12) {
      return `${contractId.substring(0, 8)}...`;
    }
    return contractId;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>DeFi Liquidity Pools</CardTitle>
          <CardDescription>
            Active pools and their liquidity metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead>% of Total</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead>7d Price Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPools.map((pool) => (
                <TableRow key={pool.pool_id}>
                  <TableCell className="font-medium">{pool.platform}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>
                        {pool.base_token.symbol}/{pool.target_token.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatUSD(pool.liquidity_usd)}</TableCell>
                  <TableCell>
                    {formatPercentage(pool.liquidity_usd / totalLiquidity)}
                  </TableCell>
                  <TableCell>{formatUSD(pool.metrics.volume_1d_usd)}</TableCell>
                  <TableCell
                    className={
                      pool.metrics.price_change_7d >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {formatPercentage(pool.metrics.price_change_7d)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <LiquidityDistributionChart pools={pools} />
    </div>
  );
}
