# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EtchNFT is a phygital (physical + digital) NFT platform built with Astro, deployed on Cloudflare Pages with Workers for API endpoints. The platform allows users to mint memories as both physical collectibles and NFTs on the Solana blockchain.

## Development Commands

### Core Development
- `pnpm install` - Install dependencies (preferred package manager)
- `pnpm dev` - Start local development server at http://localhost:4321
- `pnpm build` - Build production site to ./dist/ for Cloudflare Pages
- `pnpm preview` - Preview production build locally
- `pnpm format` - Format code with Prettier + Tailwind sort

### Deployment
- `wrangler dev` - Run Cloudflare Workers locally
- `wrangler publish` - Deploy Workers to production

## Architecture

### Frontend Stack
- **Astro 5.8.0** - Static site generator with component architecture
- **TypeScript** - Type-safe development with strict configuration
- **Tailwind CSS** - Utility-first styling with custom theming
- **Framer Motion** - Animation library for interactive elements

### Backend Infrastructure
- **Cloudflare Pages** - Static site hosting
- **Cloudflare Workers** - Serverless API endpoints
- **Cloudflare D1** - SQLite database for user data, orders, and subscribers
- **Cloudflare KV** - Key-value storage for rate limiting

### Database Schema
The database includes four main tables:
- `users` - OAuth/email authentication
- `sessions` - User session management
- `orders` - NFT order tracking with physical fulfillment details
- `subscribers` - Email newsletter signups

### Key Directories
- `src/components/` - Reusable Astro components
- `src/pages/` - File-based routing including API endpoints
- `src/lib/` - Utility functions (Solana blockchain integration)
- `src/styles/` - Global CSS and theme definitions
- `migrations/` - Database schema migrations

## Blockchain Integration

The platform integrates with Solana blockchain via:
- **Helius API** - RPC provider for Solana network
- **SolanaFM** - Token data and transaction tracking
- Wallet address management for NFT minting

## Brand & Theming

Custom CSS variables define the brand colors:
- Primary: `#DB2777` (pink)
- Secondary: `#7F73F7` (purple)
- Accent: `#41C6BB` (teal)
- Dark mode is the default theme

## API Routes

API endpoints are located in `src/pages/api/`:
- `/api/ticker` - Real-time token price data
- Additional endpoints for user management and order processing

## Development Notes

- Uses file-based routing with Astro pages
- Components follow Astro's component architecture
- TypeScript strict mode enabled
- Prettier with Astro and Tailwind plugins for formatting
- Responsive design with mobile-first approach
- Animated UI elements using Framer Motion