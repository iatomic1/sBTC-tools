import type { PoolItem } from '@/types/pools';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PlatformData = {
  name: string;
  value: number;
  percentage: string;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: PlatformData;
  }>;
};

const LiquidityDistributionChart = ({ pools }: { pools: PoolItem[] }) => {
  // Group by platform and sum liquidity
  const platformMap = new Map<string, number>();

  // Using for...of instead of forEach
  for (const pool of pools) {
    const currentLiquidity = platformMap.get(pool.platform) || 0;
    platformMap.set(pool.platform, currentLiquidity + pool.liquidity_usd);
  }

  // Convert to array and sort by liquidity (descending)
  const platformData = Array.from(platformMap, ([name, value]) => ({
    name,
    value,
  })).sort((a, b) => b.value - a.value);

  // Calculate total for percentages
  const totalLiquidity = platformData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Add percentage to data
  const chartData: PlatformData[] = platformData.map((item) => ({
    ...item,
    percentage: ((item.value / totalLiquidity) * 100).toFixed(1),
  }));

  // Colors with better contrast
  const COLORS = [
    '#2563eb',
    '#16a34a',
    '#eab308',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#f97316',
  ];

  // Format for tooltip
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip with fixed type safety
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (
      active &&
      payload &&
      payload.length > 0 &&
      payload[0] &&
      payload[0].payload
    ) {
      const data = payload[0];
      const platformData = data.payload;

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow">
          <p className="font-semibold">{platformData.name}</p>
          <p className="text-sm">{formatUSD(data.value)}</p>
          <p className="text-sm text-gray-600">
            {platformData.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Liquidity Distribution</CardTitle>
        <CardDescription>
          Share of liquidity across different platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(value: number) => `${value}%`}
              />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="percentage"
                  position="right"
                  formatter={(value: string) => `${value}%`}
                  style={{ fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiquidityDistributionChart;
