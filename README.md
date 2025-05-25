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

## 🧩 Tech Stack

- 🧑‍🚀 [Astro](https://astro.build) with partial islands
- 💨 [Tailwind CSS](https://tailwindcss.com) (custom theme + dark mode)
- ☁️ [Cloudflare Pages](https://pages.cloudflare.com) for frontend
- 🔧 [Cloudflare Workers](https://developers.cloudflare.com/workers/) for backend/API
- 🧬 [D1](https://developers.cloudflare.com/d1/) for SQL database
- ⚡ [KV](https://developers.cloudflare.com/kv/) for rate limiting and caching

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
| `npm install`         | Install dependencies                              |
| `npm run dev`         | Start local dev server at `localhost:4321`        |
| `npm run build`       | Build site to `./dist/` for Cloudflare Pages      |
| `npm run preview`     | Preview your production build locally             |
| `npm run format`      | Format with Prettier + Tailwind sort              |
| `wrangler dev`        | Run Worker + API locally                          |
| `wrangler publish`    | Deploy Worker to production                       |

---

## 📡 API Endpoints

All handled by the Cloudflare Worker:

- `/form1` → redirects to waitlist form
- `/api/formaloo-sync` → webhook POST receiver
- `/api/supporters` → public supporter data
- `/verify?token=...` → email verification route

---

## 🤝 Credits

- Base layout: [Astro Landing Template](https://github.com/withastro/astro/tree/main/examples/landing-page)
- Some icons: [Tabler Icons](https://tabler.io/icons)
- EtchNFT site + project: [Cozyartz Media](https://cozyartz.com)

---

## 📬 Contact

Questions? Want to collab?  
DM us [@etchnft](https://instagram.com/etchnft) or open an issue here.
