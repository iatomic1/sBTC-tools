'use client';

import type { PriceData } from '@/types/price-history';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/components/ui/tabs';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function PriceHistory({ priceData = [] }: { priceData?: PriceData[] }) {
  const [timeRange, setTimeRange] = useState('30d');
  const [chartType, setChartType] = useState('price');

  // Format data for better display
  const formattedData = priceData.map((item) => {
    // Convert timestamp to Date object
    const date = new Date(
      typeof item.timestamp === 'string'
        ? Number.parseInt(item.timestamp)
        : item.timestamp,
    );

    // Convert string values to numbers if needed
    const price =
      typeof item.close === 'string'
        ? Number.parseFloat(item.close)
        : item.close;

    const volume =
      typeof item.volume === 'string'
        ? Number.parseFloat(item.volume)
        : item.volume;

    const tvl = item.tvl
      ? typeof item.tvl === 'string'
        ? Number.parseFloat(item.tvl)
        : item.tvl
      : 0;

    return {
      timestamp: date.getTime(),
      date: format(date, 'MMM dd'),
      fullDate: format(date, 'yyyy-MM-dd'),
      price: price,
      open:
        typeof item.open === 'string'
          ? Number.parseFloat(item.open)
          : item.open,
      high:
        typeof item.high === 'string'
          ? Number.parseFloat(item.high)
          : item.high,
      low:
        typeof item.low === 'string' ? Number.parseFloat(item.low) : item.low,
      close: price,
      volume: volume,
      tvl: tvl,
      formattedPrice: `$${Number(price).toLocaleString()}`,
      formattedVolume: `${Number(volume).toFixed(2)} BTC`,
      formattedTVL: `$${Number(tvl).toLocaleString()}`,
    };
  });

  // Sort data by timestamp to ensure chronological order
  const sortedData = [...formattedData].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  // Calculate 24h change percentage
  const calculateDayChange = () => {
    if (sortedData.length < 2) return 0;

    const latest = sortedData[sortedData.length - 1].price;
    const previous = sortedData[sortedData.length - 2].price;

    return ((latest - previous) / previous) * 100;
  };

  const dayChangePercentage = calculateDayChange();

  // Early return with a placeholder if no data is available
  if (!priceData || priceData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>sBTC Price History</CardTitle>
          <CardDescription>Historical price and volume data</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading price data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="!w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>sBTC Price History</CardTitle>
          <CardDescription>Historical price and volume data</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="price"
          onValueChange={setChartType}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="combined">Combined</TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sortedData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    domain={['dataMin - 2000', 'dataMax + 2000']}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${Number(value).toLocaleString()}`,
                      'Price',
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    name="sBTC Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="volume" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value.toFixed(0)} BTC`}
                    domain={[0, 'dataMax + 100']}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toFixed(2)} BTC`,
                      'Volume',
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                  />
                  <Bar
                    dataKey="volume"
                    fill="rgba(236, 72, 153, 0.7)"
                    radius={[4, 4, 0, 0]}
                    name="Trading Volume"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="combined" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={sortedData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    yAxisId="price"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    domain={['dataMin - 2000', 'dataMax + 2000']}
                  />
                  <YAxis
                    yAxisId="volume"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                    domain={[0, 'dataMax + 100']}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'Price')
                        return [`$${Number(value).toLocaleString()}`, name];
                      if (name === 'Volume')
                        return [`${Number(value).toFixed(2)} BTC`, name];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    yAxisId="price"
                    name="Price"
                  />
                  <Bar
                    dataKey="volume"
                    fill="rgba(236, 72, 153, 0.5)"
                    radius={[4, 4, 0, 0]}
                    yAxisId="volume"
                    name="Volume"
                  />
                  <Legend />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-xl font-bold">
              $
              {sortedData.length > 0
                ? Number(
                    sortedData[sortedData.length - 1].price,
                  ).toLocaleString()
                : '0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Change</p>
            <p
              className={`text-xl font-bold ${
                dayChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {dayChangePercentage >= 0 ? '+' : ''}
              {dayChangePercentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-xl font-bold">
              {sortedData.length > 0
                ? Number(sortedData[sortedData.length - 1].volume).toFixed(2)
                : '0'}{' '}
              BTC
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
