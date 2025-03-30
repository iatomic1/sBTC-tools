# sBTC-Tools

A comprehensive suite of developer tools for working with sBTC on the Stacks blockchain. This monorepo contains multiple applications to help you interact with and analyze sBTC.

![sBTC Analytics Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8RGr58qnZC5Hx5UNNRF5qsdUstnibU.png)

## 🚀 Features

- **CLI Tools**: Powerful command-line interface for transferring STX and interacting with sBTC contracts
- **Analytics Dashboard**: Comprehensive analytics for monitoring sBTC supply, holders, and transactions
- **Landing Page**: Modern web interface to showcase the tools and provide documentation

## 📁 Project Structure

```
sbtc-tools/
├── apps/
│   ├── web/      # Next.js landing page
│   ├── cli/      # Command-line interface for sBTC operations
│   └── analytics/  # sBTC analytics dashboard
├── packages/     # Shared packages and utilities
│   ├── tsconfig/
│   ├── utils/
│   └── ui/       # Shared Shadcn UI components
└── README.md
```

## 🔧 Installation

First, clone the repository:

```bash
git clone https://github.com/iatomic1/sBTC-tools
cd sBTC-tools
```

Then install dependencies:

```bash
bun install
```

## 🏃‍♂️ Running the Applications

### CLI

To run the CLI tool:

```bash
cd apps/cli
bun www/bin.ts
```

Example commands:

```bash
# Transfer STX
bun www/bin.ts transfer --amount 100 --to SP2WNEL...

# Check balance
bun www/bin.ts balance --address SP2WNEL...

# Get analytics
bun www/bin.ts analytics --metric supply
```

### Analytics Dashboard

To run the analytics dashboard:

```bash
cd apps/analytics
bun dev
```

Then open [http://localhost:4002](http://localhost:4002) in your browser.

### Landing Page

To run the landing page:

```bash
cd apps/web
bun dev
```

Then open [http://localhost:4000](http://localhost:4000) in your browser.

## 📚 Documentation

For more detailed documentation on each tool:

- **CLI**: See the [CLI Documentation](./apps/cli/README.md)
- **Analytics**: See the [Analytics Documentation](./apps/analytics/README.md)

## 🧩 Key Components

### sBTC CLI

The CLI provides a simple interface for:

- Transferring STX between addresses
- Checking balances of addresses
- Fetching analytics data (coming soon)

### sBTC Analytics

The analytics dashboard offers:

- Real-time monitoring of sBTC supply
- Tracking of active holders
- Visualization of transfers
- Price history and charts
- Top holders list
- and many more...

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions or feedback, please open an issue on GitHub or reach out to the maintainers.

---

Born from the void, shaped by Atomic
