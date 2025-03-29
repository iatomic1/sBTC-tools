'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/components/ui/table';

export function TopHolders() {
  const holders = [
    {
      address: 'SP1QK1A3XYZ...',
      balance: '24.5 sBTC',
      percentage: '9.97%',
      lastActivity: '2 hours ago',
    },
    {
      address: 'SP2B3XYZ123...',
      balance: '18.2 sBTC',
      percentage: '7.40%',
      lastActivity: '5 hours ago',
    },
    {
      address: 'SP3C4Z9ABC...',
      balance: '15.7 sBTC',
      percentage: '6.39%',
      lastActivity: '1 day ago',
    },
    {
      address: 'SP5D6E7FGH...',
      balance: '12.3 sBTC',
      percentage: '5.00%',
      lastActivity: '3 days ago',
    },
    {
      address: 'SP7H8I9JKL...',
      balance: '10.8 sBTC',
      percentage: '4.39%',
      lastActivity: '6 hours ago',
    },
    {
      address: 'SP8F9G0HIJ...',
      balance: '9.5 sBTC',
      percentage: '3.86%',
      lastActivity: '12 hours ago',
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>% of Supply</TableHead>
          <TableHead>Last Activity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holders.map((holder) => (
          <TableRow key={holder.address}>
            <TableCell className="font-medium">{holder.address}</TableCell>
            <TableCell>{holder.balance}</TableCell>
            <TableCell>{holder.percentage}</TableCell>
            <TableCell>{holder.lastActivity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
