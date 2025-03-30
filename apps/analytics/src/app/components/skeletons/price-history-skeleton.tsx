import { Card, CardContent, CardHeader } from '@repo/ui/components/ui/card';
import { Skeleton } from '@repo/ui/components/ui/skeleton';

export function PriceHistorySkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <Skeleton className="h-6 w-[180px] mb-2" />
          <Skeleton className="h-4 w-[240px]" />
        </div>
        <Skeleton className="h-9 w-[100px]" />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Skeleton className="h-10 w-full mb-4" />
        </div>

        <Skeleton className="h-[350px] w-full mb-6" />

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-7 w-32 mx-auto" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-7 w-20 mx-auto" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-7 w-28 mx-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
