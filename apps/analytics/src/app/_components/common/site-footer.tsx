import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">
            🌌 Born from the void, shaped by{' '}
            <Link
              href="https://x.com/iatomic_1"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atomic
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <Link href="/tools" className="font-medium hover:underline">
              Checkout more tools →
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
