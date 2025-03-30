import { TransactionHeatmap } from './_components/heatmap';

export default function AdvancedAnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8">
        <TransactionHeatmap />
        <p className="text-muted-foreground mx-auto">More coming soon</p>
      </div>
    </div>
  );
}
