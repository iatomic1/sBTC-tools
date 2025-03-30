'use client';
import type { TopHoldersItem } from '@/types/top-holders';
import { calculateTokenSupplyPercentage } from '@/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/components/ui/table';

function truncateAddress(
  address: string,
  startChars = 5,
  endChars = 3,
): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

function formatNumberCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

export function TopHolders({ topHolders }: { topHolders: TopHoldersItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>% of Supply</TableHead>
          {/* <TableHead>Last Activity</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {topHolders.slice(0, 7).map((holder) => {
          // Convert balance to standard units (assuming 7 decimal places based on your code)
          const balanceInStandardUnits = Number(holder.balance) / 10_000_000;

          return (
            <TableRow key={holder.wallet.address}>
              <TableCell className="font-medium">
                {holder.wallet.bns ?? truncateAddress(holder.wallet.address)}
              </TableCell>
              <TableCell>
                {formatNumberCompact(balanceInStandardUnits)}
              </TableCell>
              <TableCell>
                {calculateTokenSupplyPercentage(holder.balance, 3030)}%
              </TableCell>
              {/* <TableCell>{holder.lastActivity}</TableCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
