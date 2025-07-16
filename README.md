# 🎨 EtchNFT — Custom Phygital NFT Platform

> **Create custom phygital NFTs** — physical collectibles paired with digital tokens on Ethereum & Solana. Mint memories that exist both physically and on-chain.

<div align="center">

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
[![Powered by Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-orange?style=flat&logo=cloudflare)](https://cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Farcaster Mini App](https://img.shields.io/badge/Farcaster-Mini%20App-purple?style=flat&logo=farcaster)](https://farcaster.xyz)

[🌐 Live Site](https://etchnft.com) • [📱 Mini App](https://etchnft.com/miniapp) • [📚 Documentation](https://docs.etchnft.com)

</div>

![EtchNFT Platform Screenshot](./screenshots.jpg)

---

## 🚀 What Is EtchNFT?

**EtchNFT** bridges the physical and digital worlds by creating **phygital NFTs** — collectibles you can hold in your hand AND own on the blockchain. We offer:

- 🏆 **Etched Plaques** — Custom engraved metal commemoratives
- 👕 **Custom Tees** — High-quality apparel with unique designs  
- 💎 **Acrylic Relics** — Transparent art pieces with embedded memories
- ⛓️ **Dual-Chain Support** — Mint on Ethereum or Solana
- 📱 **Farcaster Integration** — Social minting via mini app

Each physical item comes with a corresponding NFT that proves authenticity, ownership, and provenance on-chain.

---

## ✨ Platform Features

### 🌐 **Multi-Chain Architecture**
- **Ethereum** — Premium collectibles with established ecosystem
- **Solana** — Fast, low-cost minting for high-volume drops
- **Base Chain** — Layer 2 option for cost-effective Ethereum minting

### 📱 **Farcaster Mini App**
- Social minting directly in Farcaster feeds
- One-click wallet connection (no popups!)
- Automatic sharing with branded messages
- Gas estimation and fee comparison

### 🛠️ **Technical Stack**
- **Frontend**: Astro 5.8 + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers + D1 Database + KV Storage
- **Blockchain**: Wagmi (Ethereum) + Solana Web3.js
- **Social**: Farcaster SDK integration
- **Deployment**: Cloudflare Pages with edge functions

---

## 📂 Project Structure

```
etchNFT-landing/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── meta-head.astro # Enhanced SEO & Open Graph
│   │   ├── SolanaProvider.astro
│   │   └── ...
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage
│   │   ├── miniapp.astro   # Farcaster mini app
│   │   ├── waitlist.astro  # Early access signup
│   │   └── API/            # Cloudflare Workers endpoints
│   ├── lib/                # Utility functions & services
│   │   ├── multichain-wallet.ts  # Dual-chain wallet service
│   │   ├── wagmi-config.ts       # Ethereum configuration
│   │   └── solana.ts             # Solana integration
│   └── styles/             # Global CSS & theming
├── public/
│   ├── .well-known/        # Farcaster manifest
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine directives
├── migrations/             # Database schema
└── docs/                   # Starlight documentation
```

---

## 🛠️ Development Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies (preferred package manager) |
| `pnpm dev` | Start local development server at `http://localhost:4321` |
| `pnpm build` | Build production site to `./dist/` for Cloudflare Pages |
| `pnpm preview` | Preview production build locally |
| `pnpm format` | Format code with Prettier + Tailwind sort |
| `wrangler dev` | Run Cloudflare Workers locally |
| `wrangler deploy` | Deploy Workers to production |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/etchnft/etchnft-landing.git
cd etchnft-landing
pnpm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Add your API keys:
# HELIUS_API_KEY=your_helius_key
# COINBASE_API_KEY_NAME=your_coinbase_key  
# COINBASE_PRIVATE_KEY=your_coinbase_private_key
```

### 3. Local Development
```bash
# Start development server
pnpm dev

# In another terminal, start Workers
wrangler dev
```

### 4. Deploy to Cloudflare
```bash
# Build and deploy
pnpm build
wrangler deploy
```

---

## 📱 Farcaster Mini App

Our Farcaster integration allows users to mint NFTs directly within their social feed:

### Features
- **Dual-Chain Selection** — Switch between Ethereum & Solana
- **Gas Estimation** — Real-time fee comparison  
- **Social Sharing** — Automatic post composition after minting
- **Wallet Integration** — Seamless connection via Farcaster SDK

### Testing
1. Deploy your site to a public URL
2. Share the mini app URL in a Farcaster post: `https://yoursite.com/miniapp`
3. The mini app will appear as an interactive embed

---

## 🎨 Brand & Design

### Color Palette
- **Primary**: `#DB2777` (Pink) — Energy & creativity
- **Secondary**: `#7F73F7` (Purple) — Innovation & magic  
- **Accent**: `#41C6BB` (Teal) — Trust & reliability
- **Background**: `#000000` (Black) — Elegance & focus

### Typography
- **Font**: Inter Variable (Google Fonts)
- **Approach**: Mobile-first responsive design
- **Theme**: Dark mode by default with high contrast

---

## 📊 SEO & Performance

### SEO Features
- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph & Twitter Cards with custom images
- ✅ JSON-LD structured data for rich snippets
- ✅ XML sitemap with proper priorities
- ✅ Robots.txt for search engine guidance
- ✅ Canonical URLs and language tags

### Performance Optimizations
- ✅ Static site generation with Astro
- ✅ Edge deployment on Cloudflare Pages
- ✅ Image optimization with Sharp
- ✅ DNS prefetching for external APIs
- ✅ Minimal JavaScript bundles

---

## 🔗 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/API/ticker` | GET | Real-time token price data |
| `/API/orders/create` | POST | Create new NFT order |
| `/API/payment/create` | POST | Initialize payment flow |
| `/API/payment/verify` | POST | Verify payment completion |

---

## 🗄️ Database Schema

### Tables
- **users** — OAuth/email authentication
- **sessions** — User session management  
- **orders** — NFT orders with fulfillment tracking
- **subscribers** — Email newsletter signups

### Technologies
- **Database**: Cloudflare D1 (SQLite at edge)
- **Storage**: Cloudflare KV for rate limiting
- **Auth**: Planned OAuth integration

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏢 About Cozyartz Media Group

EtchNFT is built with ❤️ by **Cozyartz Media Group** in Battle Creek, Michigan.

- 📧 **Email**: [hello@cozyartz.com](mailto:hello@cozyartz.com)
- 📞 **Phone**: (269) 261-0069
- 🐦 **Twitter**: [@cozyartz](https://twitter.com/cozyartz)
- 💼 **LinkedIn**: [Cozyartz Media Group](https://linkedin.com/company/cozyartzmediagroup)

---

## 🔗 Links

- [🌐 Live Platform](https://etchnft.com)
- [📱 Farcaster Mini App](https://etchnft.com/miniapp)
- [📚 Documentation](https://docs.etchnft.com)
- [🐦 Twitter](https://twitter.com/etchNFT)
- [📷 Instagram](https://instagram.com/etchnft)

---

<div align="center">

**Made with 💜 for the phygital future**

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/etchnft/etchnft-landing)

</div>