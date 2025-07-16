import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.etchnft.com',
  integrations: [
    starlight({
      title: 'EtchNFT Documentation',
      logo: {
        src: './src/assets/etchlogo.png',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/etchnft/etchnft-landing',
        twitter: 'https://twitter.com/etchNFT',
        discord: 'https://discord.gg/etchnft',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/introduction/' },
            { label: 'Quick Start', link: '/getting-started/quick-start/' },
            { label: 'Installation', link: '/getting-started/installation/' },
          ],
        },
        {
          label: 'Platform',
          items: [
            { label: 'What are Phygital NFTs?', link: '/platform/phygital-nfts/' },
            { label: 'Dual-Chain Support', link: '/platform/dual-chain/' },
            { label: 'Physical Fulfillment', link: '/platform/fulfillment/' },
          ],
        },
        {
          label: 'Farcaster Mini App',
          items: [
            { label: 'Overview', link: '/farcaster/overview/' },
            { label: 'Wallet Integration', link: '/farcaster/wallet-integration/' },
            { label: 'Social Minting', link: '/farcaster/social-minting/' },
            { label: 'Testing', link: '/farcaster/testing/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Authentication', link: '/api/authentication/' },
            { label: 'Orders', link: '/api/orders/' },
            { label: 'Payments', link: '/api/payments/' },
            { label: 'Webhooks', link: '/api/webhooks/' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Local Setup', link: '/development/local-setup/' },
            { label: 'Environment Variables', link: '/development/environment/' },
            { label: 'Database Schema', link: '/development/database/' },
            { label: 'Deployment', link: '/development/deployment/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Creating Custom Collections', link: '/guides/custom-collections/' },
            { label: 'Integrating Payment Gateways', link: '/guides/payment-gateways/' },
            { label: 'Marketing & Launch', link: '/guides/marketing/' },
          ],
        },
      ],
      customCss: [
        './src/styles/docs.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/etchnft/etchnft-landing/edit/main/docs/',
      },
      lastUpdated: true,
      pagination: true,
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://docs.etchnft.com/og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://docs.etchnft.com/og-image.png',
          },
        },
      ],
    }),
  ],
});