'use client';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Generate dummy price data for the last 30 days
const generatePriceData = () => {
  const data = [];
  const startPrice = 65000;
  let currentPrice = startPrice;

  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Random price movement with slight upward trend
    const change = (Math.random() - 0.45) * 1000;
    currentPrice += change;

    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice),
      peg: Math.round(currentPrice * (0.99 + Math.random() * 0.02)), // Slight variation around peg
    });
  }

  return data;
};

const priceData = generatePriceData();

export function PriceHistory() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={priceData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              undefined,
            ]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            name="BTC Price"
          />
          <Line
            type="monotone"
            dataKey="peg"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={false}
            name="sBTC Price"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
