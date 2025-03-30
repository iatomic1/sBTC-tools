import { Skeleton } from '@repo/ui/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';

interface TableSkeletonProps {
  columns: number;
  rows: number;
}

export function TableSkeleton({ columns = 4, rows = 6 }: TableSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableHead key={i}>
              <Skeleton className="h-5 w-full max-w-[120px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableCell key={colIndex}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
