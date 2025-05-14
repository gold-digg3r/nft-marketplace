# GoldDigger NFT Marketplace (MVP)

![GoldDigger Logo](https://ucarecdn.com/5ffe7e5b-c316-4c57-9a21-841ec935f073/token.png)

## Overview

GoldDigger is a comprehensive Solana-based platform that combines NFT marketplace functionality, DeFi features, on-chain Rust smart contracts, and AI-powered tools to create a unique ecosystem for crypto enthusiasts and digital collectors. Built with modern UI components and developer tooling, GoldDigger provides a seamless experience for end-users and developers alike.

## Features

* **NFT Marketplace**: Buy, sell, and trade unique NFTs with support for Metaplex metadata standards.
* **Collections**: Explore themed character collections from the Gold Digger universe.
* **Leaderboard**: Track and compare the performance of collections and users.
* **Wallet Integration**: Seamless connection with Solana wallets (Phantom, Solflare, Backpack, etc.)
* **Smart Contract Support**: Built with Anchor framework for scalable, maintainable Solana programs.
* **Responsive Design**: Optimized for all devices with Tailwind CSS and shadcn/ui components.
* **Developer Friendly**: Modular architecture using Rust smart contracts, TypeScript utilities, and clean UI patterns.

## Tech Stack

* **Next.js (App Router)** – React framework for fast UI and routing
* **TypeScript** – Type-safe codebase
* **Tailwind CSS** – Utility-first styling
* **shadcn/ui** – Reusable, accessible UI components
* **Solana Web3.js** – Solana blockchain integration
* **Solana Wallet Adapter** – Wallet integration (Phantom, Backpack, Solflare, etc.)
* **Anchor** – Rust-based framework for writing Solana programs
* **Metaplex** – Token metadata, auctions, and NFT standards
* **Supabase** *(optional)* – Backend-as-a-Service for auth and database features

## Getting Started

### Prerequisites

* Node.js 18.0.0 or later
* npm or yarn
* Rust (with `cargo` and `anchor-cli` if you plan to build Solana programs)
* Solana CLI (`solana --version`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gold-digg3r/nft-marketplace.git
   cd nft-marketplace
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Anchor Program Development (Optional)

If you're working with the smart contracts:

```bash
cd programs/gold-digger
anchor build
anchor deploy
```

Make sure your Solana CLI is connected to Devnet or your local validator:

```bash
solana config set --url https://api.devnet.solana.com
```

## Project Structure

```
gold-digger/
├── app/                  # Next.js App Router
│   ├── marketplace/      # Marketplace pages
│   ├── brand-guide/      # Brand guidelines
│   └── ...
├── components/           
│   ├── ui/               # shadcn/ui components
│   ├── marketplace/      # NFT marketplace components
│   └── ...
├── lib/                  # Utility functions (e.g., Web3 helpers)
├── public/               # Static assets
├── programs/             # Anchor-based Solana smart contracts
├── scripts/              # Deployment, CLI tools
└── ...
```

## Contributing

Contributions are welcome! Please feel free to fork the project, create an issue, or submit a Pull Request. If you're submitting Anchor programs or UI components, please follow the established conventions.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* [Solana Foundation](https://solana.org)
* [Next.js Team](https://nextjs.org)
* [Metaplex](https://www.metaplex.com/)
* [shadcn/ui](https://ui.shadcn.com)
* [Anchor Framework](https://book.anchor-lang.com/)
* All contributors and supporters ❤️
