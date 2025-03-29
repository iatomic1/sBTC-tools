'use client';

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

export function DeFiProjects() {
  const projects = [
    {
      name: 'StackSwap',
      tvl: '32.5 sBTC',
      percentage: '36.35%',
      type: 'DEX',
      contractAddress: 'SP1ABC...',
    },
    {
      name: 'StackLend',
      tvl: '24.8 sBTC',
      percentage: '27.74%',
      type: 'Lending',
      contractAddress: 'SP2DEF...',
    },
    {
      name: 'StackStake',
      tvl: '18.2 sBTC',
      percentage: '20.36%',
      type: 'Staking',
      contractAddress: 'SP3GHI...',
    },
    {
      name: 'StackYield',
      tvl: '8.7 sBTC',
      percentage: '9.73%',
      type: 'Yield Farming',
      contractAddress: 'SP4JKL...',
    },
    {
      name: 'StackVault',
      tvl: '5.2 sBTC',
      percentage: '5.82%',
      type: 'Vault',
      contractAddress: 'SP5MNO...',
    },
  ];

  const pieData = projects.map((project) => ({
    name: project.name,
    value: Number.parseFloat(project.tvl.split(' ')[0]),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>DeFi Projects Supporting sBTC</CardTitle>
          <CardDescription>
            Projects with sBTC integration and their TVL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>TVL</TableHead>
                <TableHead>% of DeFi TVL</TableHead>
                <TableHead>Contract</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>{project.tvl}</TableCell>
                  <TableCell>{project.percentage}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {project.contractAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>sBTC Distribution in DeFi</CardTitle>
          <CardDescription>
            Share of sBTC locked in different DeFi protocols
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_entry, index) => (
                    <Cell
                      key={`cell-${_entry.value}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
