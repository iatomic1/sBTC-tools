'use client';

import { fetchAllRecentTransactions } from '@/queries/transactions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { useEffect, useState } from 'react';

interface HeatmapData {
  day: string;
  hour: number;
  value: number;
}

export function TransactionHeatmap() {
  const [timeframe, setTimeframe] = useState('week');
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Determine days to fetch based on timeframe
        let days = 7;
        if (timeframe === 'month') days = 30;
        if (timeframe === 'quarter') days = 90;

        const transactions = await fetchAllRecentTransactions(days);

        // Filter only sBTC transfers
        const sbtcTransfers = transactions.filter(
          (tx) =>
            tx.tx.tx_type === 'contract_call' &&
            tx.tx.contract_call?.contract_id.includes('sbtc-token') &&
            tx.tx.contract_call.function_name === 'transfer',
        );

        // Process into heatmap data
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const newHeatmapData: HeatmapData[] = [];

        for (const tx of sbtcTransfers) {
          const date = new Date(tx.tx.block_time * 1000);
          const dayIndex = date.getUTCDay();
          const day = daysOfWeek[dayIndex] || 'Unknown';
          const hour = date.getUTCHours();
          const existingEntry = newHeatmapData.find(
            (d) => d.day === day && d.hour === hour,
          );
          if (existingEntry) {
            existingEntry.value += 1;
          } else {
            newHeatmapData.push({ day, hour, value: 1 });
          }
        }

        setHeatmapData(newHeatmapData);
      } catch (error) {
        console.error('Failed to load heatmap data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeframe]);

  // Get max value for color scaling
  const maxValue = Math.max(...heatmapData.map((d) => d.value), 1); // Ensure at least 1 to avoid division by zero

  // Generate empty cells for all possible day/hour combinations
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDayNames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Activity Heatmap</CardTitle>
          <CardDescription>Loading sBTC transaction data...</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transaction Activity Heatmap</CardTitle>
          <CardDescription>
            sBTC transaction frequency by day and hour
          </CardDescription>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-25 gap-1">
          {/* Hour labels */}
          <div className="col-span-1" />
          {hours.map((hour) => (
            <div
              key={hour}
              className="text-center text-xs text-muted-foreground"
            >
              {hour % 3 === 0 ? `${hour}:00` : ''}
            </div>
          ))}

          {/* Day rows */}
          {days.map((dayAbbr) => {
            const fullDay =
              fullDayNames.find((d) => d.startsWith(dayAbbr)) || '';
            return (
              <div key={dayAbbr} className="contents">
                <div className="text-xs font-medium flex items-center justify-end pr-2">
                  {dayAbbr}
                </div>
                {hours.map((hour) => {
                  const dataPoint = heatmapData.find(
                    (d) => d.day === fullDay && d.hour === hour,
                  );
                  const value = dataPoint?.value || 0;
                  const intensity = Math.min(value / maxValue, 1); // Cap at 1
                  const bgColor = `rgba(var(--primary-rgb), ${
                    0.1 + intensity * 0.9
                  })`;

                  return (
                    <div
                      key={`${dayAbbr}-${hour}`}
                      className="aspect-square rounded-sm hover:ring-1 hover:ring-primary transition-all"
                      style={{
                        backgroundColor: bgColor,
                        width: '100%',
                        height: '16px',
                      }}
                      title={`${fullDay} ${hour}:00 - ${value} transaction${
                        value !== 1 ? 's' : ''
                      }`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-muted-foreground">Less</div>
          <div className="flex gap-1 mx-2 flex-1">
            {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
              <div
                key={intensity}
                className="h-4 rounded-sm flex-1"
                style={{
                  backgroundColor: `rgba(var(--primary-rgb), ${
                    0.1 + intensity * 0.9
                  })`,
                }}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">More</div>
        </div>
      </CardContent>
    </Card>
  );
}
