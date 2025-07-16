// src/pages/api/ticker.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const response = await fetch("https://api.solana.fm/v0/tokens?limit=10", {
      headers: {
        Authorization: `Bearer ${import.meta.env.SOLANAFM_API_KEY}`
      }
    });

    if (!response.ok) throw new Error("SolanaFM failed");

    const data = await response.json();
    const tokens = data.result?.slice(0, 10).map((token: any) => ({
      symbol: token.symbol,
      price: parseFloat(token.priceUsd).toFixed(2)
    })) ?? [];

    return new Response(JSON.stringify(tokens), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Ticker fallback:", err);
    const fallback = [
      { symbol: "SOL", price: "168.22" },
      { symbol: "BONK", price: "0.000026" },
      { symbol: "JUP", price: "0.96" },
      { symbol: "SHDW", price: "0.44" }
    ];
    return new Response(JSON.stringify(fallback), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
