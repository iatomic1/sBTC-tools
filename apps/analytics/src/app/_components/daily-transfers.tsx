'use client';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { date: '2024-03-01', transfers: 245 },
  { date: '2024-03-02', transfers: 267 },
  { date: '2024-03-03', transfers: 253 },
  { date: '2024-03-04', transfers: 290 },
  { date: '2024-03-05', transfers: 310 },
  { date: '2024-03-06', transfers: 285 },
  { date: '2024-03-07', transfers: 302 },
  { date: '2024-03-08', transfers: 315 },
  { date: '2024-03-09', transfers: 298 },
  { date: '2024-03-10', transfers: 320 },
  { date: '2024-03-11', transfers: 342 },
  { date: '2024-03-12', transfers: 335 },
  { date: '2024-03-13', transfers: 318 },
  { date: '2024-03-14', transfers: 329 },
  { date: '2024-03-15', transfers: 324 },
];

export function DailyTransfers() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTransfers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="transfers"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorTransfers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
