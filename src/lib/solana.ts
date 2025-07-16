// src/lib/solana.ts
const API_KEY = import.meta.env.HELIUS_API_KEY;
const BASE_URL = "https://api.helius.xyz/v0";

export async function getRecentTransactions() {
  const res = await fetch(`${BASE_URL}/transactions?api-key=${API_KEY}`);
  return await res.json();
}
