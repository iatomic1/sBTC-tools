'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const ageData = [
  { name: '< 1 month', value: 15, color: '#ef4444' },
  { name: '1-3 months', value: 22, color: '#f59e0b' },
  { name: '3-6 months', value: 18, color: '#10b981' },
  { name: '6-12 months', value: 25, color: '#0ea5e9' },
  { name: '> 12 months', value: 20, color: '#8b5cf6' },
];

export function WalletAgeDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Age Distribution</CardTitle>
        <CardDescription>
          How long addresses have been holding sBTC
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
