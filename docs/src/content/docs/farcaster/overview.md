---
title: Farcaster Mini App Overview
description: Learn about EtchNFT's Farcaster integration for social minting
---

## What is the EtchNFT Farcaster Mini App?

The EtchNFT Farcaster mini app brings phygital NFT minting directly into your social feed. Built on Farcaster's mini app framework, it enables users to create custom collectibles without leaving their social media experience.

## Key Features

### 🔄 Dual-Chain Support
Switch seamlessly between Ethereum and Solana:
- **Ethereum** — Premium collectibles with established ecosystem
- **Solana** — Fast, low-cost minting for high-volume drops
- **Base Chain** — Layer 2 option for reduced gas fees

### 🔗 Zero-Friction Wallet Connection  
- No popup dialogs or manual wallet connections
- Automatic detection of verified Farcaster addresses
- Support for both Ethereum and Solana wallets
- Real-time balance and gas estimation

### 📱 Mobile-Optimized Experience
- Designed for 424x695px frame format
- Touch-friendly interface with large buttons
- Optimized for one-handed use
- Fast loading with minimal JavaScript

### 🎉 Social Sharing Integration
- Automatic post composition after minting
- Chain-specific share messages with emojis
- Transaction links for verification
- Branded messaging that drives discovery

## How It Works

### 1. Discovery
Users discover the mini app through:
- **Direct links** in Farcaster posts
- **Embedded experiences** in the social feed  
- **Viral sharing** from other users
- **Branded content** from EtchNFT

### 2. Connection
The app automatically:
- Detects verified wallet addresses from Farcaster profile
- Establishes connection to chosen blockchain
- Displays current balance and network status
- Estimates transaction costs in real-time

### 3. Selection
Users choose:
- **Blockchain** (Ethereum, Solana, or Base)
- **Collectible type** (plaque, tee, or acrylic)
- **Customization options** (text, images, colors)
- **Shipping details** for physical fulfillment

### 4. Minting
The minting process:
- Creates NFT metadata on IPFS
- Submits blockchain transaction
- Processes physical order
- Confirms success with transaction hash

### 5. Sharing
After successful mint:
- Opens Farcaster composer automatically  
- Pre-fills branded share message
- Includes chain attribution and transaction link
- Encourages community engagement

## Technical Architecture

### Frontend Components
```typescript
// Core wallet integration
import { multiChainWallet } from '../lib/multichain-wallet.ts';

// Chain-specific providers
import { wagmiConfig } from '../lib/wagmi-config.ts';
import { FarcasterSolanaProvider } from '@farcaster/mini-app-solana';

// SDK integration
import { sdk } from '@farcaster/miniapp-sdk';
```

### Blockchain Integrations

#### Ethereum Support
- **Framework**: Wagmi for type-safe blockchain interactions
- **Connector**: `@farcaster/miniapp-wagmi-connector`
- **Chains**: Mainnet, Base, and other EVM-compatible networks
- **Features**: EIP-1193 provider, transaction signing, gas estimation

#### Solana Support  
- **Framework**: Solana Web3.js and Wallet Adapter
- **Connector**: `@farcaster/mini-app-solana`
- **Network**: Mainnet with Helius RPC for reliability
- **Features**: Wallet Standard integration, compressed NFTs

### Manifest Configuration
```json
{
  "name": "EtchNFT",
  "version": "1.0.0",
  "iconUrl": "https://etchnft.com/etchlogo.png",
  "splashImageUrl": "https://etchnft.com/etchlogo.png", 
  "splashBackgroundColor": "#DB2777",
  "homeUrl": "https://etchnft.com/miniapp",
  "requiredChains": [
    "eip155:1",     // Ethereum Mainnet
    "eip155:8453",  // Base
    "solana:mainnet" // Solana
  ]
}
```

## User Experience Flow

### Initial Load
1. User opens mini app from Farcaster post
2. App displays loading screen with EtchNFT branding
3. SDK initializes and fetches user context
4. Wallet connections are established automatically
5. Main interface loads with chain selection

### Chain Selection
1. User sees toggle buttons for ETH/SOL
2. Active chain is highlighted with brand gradient
3. Wallet status shows connection state and balance
4. Gas estimates update in real-time

### Minting Flow
1. User selects collectible type (plaque/tee/acrylic)
2. Customization options appear
3. Real-time preview shows final design
4. Gas estimation displays total cost
5. Confirm button triggers wallet transaction

### Post-Mint Experience
1. Success message with transaction hash
2. Automatic composer opening for sharing
3. Pre-filled message with chain attribution
4. Link back to mini app for viral growth

## Performance Optimizations

### Loading Speed
- **Minimal bundle size** — Essential code only
- **CDN delivery** — Cloudflare edge caching
- **Image optimization** — WebP format with fallbacks
- **Preloading** — Critical resources loaded first

### Network Efficiency
- **RPC optimization** — Helius for Solana, Infura for Ethereum
- **Gas estimation** — Cached estimates updated periodically
- **Error handling** — Graceful fallbacks for network issues
- **Retry logic** — Automatic retry for failed transactions

### Mobile Performance
- **Touch targets** — Minimum 44px for accessibility
- **Responsive design** — Adapts to various screen sizes
- **Offline support** — Basic functionality without network
- **Battery optimization** — Minimal background processing

## Analytics & Metrics

### User Engagement
- **Discovery rate** — How users find the mini app
- **Conversion rate** — From view to mint completion
- **Chain preference** — ETH vs SOL usage patterns
- **Share rate** — Post-mint social sharing frequency

### Technical Performance
- **Load times** — App initialization speed
- **Error rates** — Transaction failures by chain
- **Gas efficiency** — Cost optimization tracking
- **User retention** — Return usage patterns

## Best Practices

### For Users
- **Wallet setup** — Verify addresses on Farcaster profile
- **Gas management** — Keep sufficient funds for transactions
- **Design optimization** — Use high-resolution images
- **Social sharing** — Tag friends to grow the community

### For Developers
- **Error handling** — Provide clear user feedback
- **Gas estimation** — Always show realistic costs
- **Chain optimization** — Guide users to optimal chain choice
- **Performance monitoring** — Track metrics continuously

## Troubleshooting

### Common Issues
- **Wallet not connecting** — Check Farcaster verification
- **High gas fees** — Try different chain or wait for lower fees
- **Transaction failures** — Increase gas limit or retry
- **Design problems** — Use supported file formats (PNG, JPG, SVG)

### Error Codes
- `WALLET_NOT_CONNECTED` — User needs to verify address
- `INSUFFICIENT_FUNDS` — Add funds to wallet
- `TRANSACTION_FAILED` — Network congestion or gas issues
- `INVALID_DESIGN` — File format or size problems

---

*Ready to integrate the mini app? [Learn about wallet integration →](/farcaster/wallet-integration/)*