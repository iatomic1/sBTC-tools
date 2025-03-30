'use client';

import type React from 'react';

import {
  Activity,
  BarChart2,
  Bitcoin,
  Home,
  LineChart,
  Menu,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@repo/ui/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@repo/ui/components/ui/sheet';
import { cn } from '@repo/ui/lib/utils';
import { ModeToggle } from './theme-toggle';

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent',
                  pathname === '/' ? 'bg-accent' : 'transparent',
                )}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/advanced-analytics"
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent',
                  pathname === '/advanced-analytics'
                    ? 'bg-accent'
                    : 'transparent',
                )}
              >
                <Activity className="h-5 w-5" />
                Advanced Analytics
              </Link>
              {/* <Link */}
              {/*   href="/transfers" */}
              {/*   className={cn( */}
              {/*     'flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent', */}
              {/*     pathname === '/transfers' ? 'bg-accent' : 'transparent', */}
              {/*   )} */}
              {/* > */}
              {/*   <LineChart className="h-5 w-5" /> */}
              {/*   Transfers */}
              {/* </Link> */}
              {/* <Link */}
              {/*   href="/holders" */}
              {/*   className={cn( */}
              {/*     'flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent', */}
              {/*     pathname === '/holders' ? 'bg-accent' : 'transparent', */}
              {/*   )} */}
              {/* > */}
              {/*   <Wallet className="h-5 w-5" /> */}
              {/*   Holders */}
              {/* </Link> */}
              {/* <Link */}
              {/*   href="/defi" */}
              {/*   className={cn( */}
              {/*     'flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent', */}
              {/*     pathname === '/defi' ? 'bg-accent' : 'transparent', */}
              {/*   )} */}
              {/* > */}
              {/*   <BarChart2 className="h-5 w-5" /> */}
              {/*   DeFi */}
              {/* </Link> */}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bitcoin className="h-6 w-6" />
          <span className="text-lg font-bold">sBTC Analytics</span>
        </Link>
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/advanced-analytics"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/advanced-analytics'
                ? 'text-primary'
                : 'text-muted-foreground',
            )}
          >
            Advanced Analytics
          </Link>
          {/* <Link */}
          {/*   href="/transfers" */}
          {/*   className={cn( */}
          {/*     "text-sm font-medium transition-colors hover:text-primary", */}
          {/*     pathname === "/transfers" */}
          {/*       ? "text-primary" */}
          {/*       : "text-muted-foreground" */}
          {/*   )} */}
          {/* > */}
          {/*   Transfers */}
          {/* </Link> */}
          {/* <Link */}
          {/*   href="/holders" */}
          {/*   className={cn( */}
          {/*     "text-sm font-medium transition-colors hover:text-primary", */}
          {/*     pathname === "/holders" ? "text-primary" : "text-muted-foreground" */}
          {/*   )} */}
          {/* > */}
          {/*   Holders */}
          {/* </Link> */}
          {/* <Link */}
          {/*   href="/defi" */}
          {/*   className={cn( */}
          {/*     "text-sm font-medium transition-colors hover:text-primary", */}
          {/*     pathname === "/defi" ? "text-primary" : "text-muted-foreground" */}
          {/*   )} */}
          {/* > */}
          {/*   DeFi */}
          {/* </Link> */}
        </nav>
        <ModeToggle />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
