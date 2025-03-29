'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { date: '2024-03-01', volume: 12.5 },
  { date: '2024-03-02', volume: 18.2 },
  { date: '2024-03-03', volume: 15.7 },
  { date: '2024-03-04', volume: 22.3 },
  { date: '2024-03-05', volume: 19.8 },
  { date: '2024-03-06', volume: 24.5 },
  { date: '2024-03-07', volume: 21.2 },
  { date: '2024-03-08', volume: 17.9 },
  { date: '2024-03-09', volume: 23.1 },
  { date: '2024-03-10', volume: 25.6 },
  { date: '2024-03-11', volume: 20.4 },
  { date: '2024-03-12', volume: 18.9 },
  { date: '2024-03-13', volume: 22.7 },
  { date: '2024-03-14', volume: 26.3 },
  { date: '2024-03-15', volume: 24.8 },
];

export function TransferVolume() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
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
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="volume"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
