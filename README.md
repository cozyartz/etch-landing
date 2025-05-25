# ✨ EtchNFT — Custom Phygital Drops

A modern Astro + Tailwind site for the **EtchNFT** platform — a hybrid of collectible culture and on-chain memory inscription.

<div align="center">

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
[![Powered by Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-orange?style=flat&logo=cloudflare)](https://cloudflare.com)

</div>

![Screenshot of EtchNFT Landing](screenshots.jpg)

---

## 🚀 What Is EtchNFT?

**EtchNFT** lets you mint memories — physical and digital collectibles, permanently sealed on-chain. Think plaques, tees, and acrylic relics — all backed by real ownership and public proofs.

This repo powers the landing site at [etchnft.com](https://etchnft.com) and includes:

- 🌈 Hero splash & animated starfield
- 🎟 Waitlist form powered by Cloudflare D1
- 🏆 Supporters wall (API + UI)
- 🗺 Roadmap display with motion
- 📦 Built-in API routes via Workers

---

## 🎨 Features

- 💅 Brand theme: `#DB2777`, `#7F73F7`, `#41C6BB`
- 🌓 Dark mode by default
- ⚡ Animated roadmap + grid transitions
- 🔍 SEO + Open Graph metadata
- 🔐 Rate-limited Formaloo-compatible API
- ✅ Email verification-ready endpoints

---

## 🛠️ Commands

| Command                | Action                                            |
| :---------------------| :-------------------------------------------------|
| `pnpm install`         | Install dependencies                              |
| `pnpm run dev`         | Start local dev server at `localhost:4321`        |
| `pnpm run build`       | Build site to `./dist/` for Cloudflare Pages      |
| `pnpm run preview`     | Preview your production build locally             |
| `pnpm run format`      | Format with Prettier + Tailwind sort              |
| `wrangler dev`        | Run Worker + API locally                          |
| `wrangler publish`    | Deploy Worker to production                       |

---
# ✨ etchNFT — Phygital Minting Platform

**etchNFT** lets you mint memories — on-chain collectibles you can actually hold. We combine physical relics (like tees, plaques, and acrylics) with digital permanence. No crypto wallet required. Built with 💖 by [Cozyartz Media](https://www.linkedin.com/company/cozyartzmediagroup).

![EtchNFT Screenshot](./screenshots.jpg)

---

## 🔥 What’s Inside

- ⚡️ **Astro** for lightning-fast static rendering
- 🎨 **Tailwind CSS** custom theming with `theme.css`
- 🧠 **Cloudflare D1** database integration for:
  - Waitlist signups
  - Supporter dashboard
  - Order records
- 🌐 **Worker API** for webhook syncing (Formaloo-ready)
- 🎁 Fully responsive & dark-mode by default
- 🎉 Starfield background & animated visuals
- 📦 GitHub → Cloudflare Pages deployment
- 🛠️ Built-in CLI dev + build scripts

---

## 📁 Pages & Features

| Page            | Purpose                                               |
|-----------------|-------------------------------------------------------|
| `/`             | Splash landing w/ motion graphics and CTA            |
| `/waitlist`     | Embedded form for early access                       |
| `/about`        | Brand principles and "Why EtchNFT Exists"            |
| `/roadmap`      | Horizontally scrollable roadmap with emojis + theme  |
| `/supporters`   | Live list of backers synced via Cloudflare D1        |
| `/terms`        | Legal page w/ styled content                         |
| `/api/*`        | Worker endpoints for syncing and fetching data       |

---

## ⚙️ Local Setup

```bash
git clone https://github.com/cozyartz/etch-landing.git
cd etch-landing
pnpm install          # or npm install
pnpm dev              # local dev server at http://localhost:4321


---

## 🤝 Credits

- Base layout: [Astro Landing Template](https://github.com/withastro/astro/tree/main/examples/landing-page)
- Some icons: [Tabler Icons](https://tabler.io/icons)
- EtchNFT site + project: [Cozyartz Media](https://cozyartz.com)

---

## 📬 Contact

Questions? Want to collab?  
DM us [@etchnft](https://instagram.com/etchnft) or open an issue here.
