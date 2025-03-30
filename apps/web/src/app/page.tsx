'use client';

import {
  ArrowRight,
  BarChart3,
  Code2,
  Command,
  Copy,
  Github,
  LineChart,
  Menu,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import siteConfig from '@/config/site';
import { features } from '@/data/features';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@repo/ui/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-4 md:gap-10 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Command className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">sBTC-Tools</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 px-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Command className="h-6 w-6 text-primary" />
                      <span className="font-bold">sBTC-Tools</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="#features"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      href="#tools"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Tools
                    </Link>
                    <Link
                      href="#analytics"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Analytics
                    </Link>
                    <Link
                      href={siteConfig.socials.github}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Documentation
                    </Link>
                    <Link
                      href="#download"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#tools"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Tools
              </Link>
              <Link
                href="#analytics"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Analytics
              </Link>
              <Link
                href={siteConfig.socials.github}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Documentation
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Button asChild className="hidden sm:flex">
                <Link href="#download">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 sm:px-6">
            <Link
              href={siteConfig.socials.github}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              Follow along on GitHub
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Powerful Tools for <span className="text-primary">sBTC</span>{' '}
              Development
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-xl sm:leading-8">
              A comprehensive suite of developer tools for working with sBTC on
              the Stacks blockchain. Transfer STX, analyze sBTC data, and build
              powerful applications with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#download">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="#docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              sBTC-Tools provides everything you need to interact with and
              analyze sBTC on the Stacks blockchain.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={feature.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {feature.title}
                  </CardTitle>
                  <feature.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section
          id="tools"
          className="container py-8 md:py-12 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Powerful Tools
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our suite of tools makes working with sBTC simple and efficient.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">sBTC CLI</h3>
                <p className="text-muted-foreground">
                  A powerful command-line interface for transferring STX and
                  interacting with sBTC contracts.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="#download">Download CLI</Link>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="#docs">View Documentation</Link>
                </Button>
              </div>
            </div>
            <div className="relative rounded-md overflow-hidden order-1 lg:order-2">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-slate-50">
                <div className="text-xs">CLI Example</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-50"
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy code</span>
                </Button>
              </div>
              <div className="bg-slate-950 p-4 overflow-x-auto">
                <pre className="text-sm text-slate-50 font-mono">
                  <code>
                    <span className="text-slate-500">$</span>{' '}
                    <span className="text-green-400">sbtc-tools</span> transfer
                    --amount 100 --to SP2WNEL...{'\n'}
                    <span className="text-blue-400">Success!</span> Transaction
                    ID: 0x8a7d...{'\n\n'}
                    <span className="text-slate-500">$</span>{' '}
                    <span className="text-green-400">sbtc-tools</span> balance
                    --address SP2WNEL...{'\n'}
                    Address: SP2WNEL...{'\n'}
                    STX Balance:{' '}
                    <span className="text-yellow-400">2,500.00</span>
                    {'\n'}
                    sBTC Balance: <span className="text-yellow-400">0.25</span>
                    {'\n\n'}
                    <span className="text-slate-500">$</span>{' '}
                    <span className="text-green-400">sbtc-tools</span> analytics
                    --metric supply{'\n'}
                    Total sBTC Supply:{' '}
                    <span className="text-yellow-400">3,032.37</span>
                    {'\n'}
                    Change (30d): <span className="text-green-400">+2.5%</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>
        <section
          id="analytics"
          className="container py-8 md:py-12 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              sBTC Analytics
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Comprehensive analytics dashboard for monitoring sBTC supply,
              holders, and transactions.
              <span className="block mt-2 text-primary font-medium">
                Now live at{' '}
                <Link
                  href="https://sbtc-analytics.vercel.app/"
                  className="underline underline-offset-4"
                  target="_blank"
                >
                  sbtc-analytics.vercel.app
                </Link>
              </span>
            </p>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center sm:grid sm:grid-cols-3">
                <TabsTrigger value="dashboard" className="flex-1 sm:flex-auto">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="transfers" className="flex-1 sm:flex-auto">
                  Transfers
                </TabsTrigger>
                <TabsTrigger value="holders" className="flex-1 sm:flex-auto">
                  Holders
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard" className="mt-6">
                <div className="overflow-hidden rounded-lg border bg-card shadow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8RGr58qnZC5Hx5UNNRF5qsdUstnibU.png"
                    alt="sBTC Analytics Dashboard"
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              </TabsContent>
              <TabsContent value="transfers" className="mt-6">
                <div className="overflow-hidden rounded-lg border bg-card shadow">
                  <div className="p-4 sm:p-8 text-center">
                    <h3 className="text-xl font-semibold mb-4">
                      Transfers Analytics
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Track all sBTC transfers across the network with detailed
                      transaction data.
                    </p>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Transfers visualization preview
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="holders" className="mt-6">
                <div className="overflow-hidden rounded-lg border bg-card shadow">
                  <div className="p-4 sm:p-8 text-center">
                    <h3 className="text-xl font-semibold mb-4">
                      Holders Analytics
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Analyze sBTC holder distribution and track the largest
                      wallets.
                    </p>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Holders visualization preview
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section
          id="download"
          className="container py-8 md:py-12 lg:py-24 px-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Get Started
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Start using sBTC-Tools today and unlock the full potential of sBTC
              on the Stacks blockchain.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-8 py-12 grid-cols-1 lg:grid-cols-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>sBTC CLI</CardTitle>
                <CardDescription>
                  Command-line interface for sBTC operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Clone the monorepo and run from source:</p>
                  <div className="mt-4 relative">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-slate-50 rounded-t-md">
                      <div className="text-xs">Terminal</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-50"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy code</span>
                      </Button>
                    </div>
                    <div className="bg-slate-950 p-4 overflow-x-auto rounded-b-md">
                      <pre className="text-sm text-slate-50 font-mono">
                        <code>
                          <span className="text-slate-500">$</span> git clone
                          https://github.com/sbtc-tools/sbtc-tools
                          {'\n'}
                          <span className="text-slate-500">$</span> cd
                          sbtc-tools{'\n'}
                          <span className="text-slate-500">$</span> bun install
                          {'\n'}
                          <span className="text-slate-500">$</span> cd apps/cli
                          {'\n'}
                          <span className="text-slate-500">$</span> bun
                          www/bin.ts
                        </code>
                      </pre>
                    </div>
                  </div>
                  <p className="mt-4">Coming to npm soon!</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="https://github.com/sbtc-tools/sbtc-tools">
                    Clone Repository
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>sBTC Analytics</CardTitle>
                <CardDescription>
                  Web dashboard for sBTC data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>The analytics dashboard is already live!</p>
                  <p className="mt-2">
                    Visit the link below to access the full sBTC analytics
                    platform with real-time data and visualizations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link
                    href="https://sbtc-analytics.vercel.app/"
                    target="_blank"
                  >
                    Launch Analytics
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0">
            <Command className="h-6 w-6" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} sBTC-Tools. All rights reserved.
            </p>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground order-first md:order-none">
            🌌 Born from the void, shaped by{' '}
            <Link
              href={siteConfig.socials.twitter}
              className="underline underline-offset-4"
            >
              Atomic
            </Link>
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground underline underline-offset-4"
            >
              GitHub
            </Link>
            {/* <Link */}
            {/*   href={siteConfig.socials.twitter} */}
            {/*   target="_blank" */}
            {/*   rel="noreferrer" */}
            {/*   className="text-sm font-medium text-muted-foreground underline underline-offset-4" */}
            {/* > */}
            {/*   Twitter */}
            {/* </Link> */}
            {/* <Link */}
            {/*   href="#" */}
            {/*   target="_blank" */}
            {/*   rel="noreferrer" */}
            {/*   className="text-sm font-medium text-muted-foreground underline underline-offset-4" */}
            {/* > */}
            {/*   Discord */}
            {/* </Link> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
