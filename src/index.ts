interface Env {
  etchnft: D1Database;
  FORMALOO_TOKEN: string;
  RATE_LIMIT_KV: KVNamespace;
}

const RATE_LIMIT_MAX = 10; // Max requests per 10 min
const RATE_LIMIT_WINDOW = 600; // Seconds

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // === 1. Rate Limit (by IP) for POSTs
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateKey = `rate:${ip}`;
    if (request.method === "POST" && url.pathname.startsWith("/api/")) {
      const count = parseInt(await env.RATE_LIMIT_KV.get(rateKey) || "0");
      if (count >= RATE_LIMIT_MAX) {
        return new Response("⚠️ Rate limit exceeded", { status: 429 });
      }
      ctx.waitUntil(env.RATE_LIMIT_KV.put(rateKey, (count + 1).toString(), { expirationTtl: RATE_LIMIT_WINDOW }));
    }

    // === 2. Simple redirect shortcut
    if (url.pathname === "/form1") {
      return Response.redirect("https://forms.cozyartz.com/zxji2h", 302);
    }

    // === 3. Email verification click
    if (url.pathname === "/verify" && request.method === "GET") {
      const token = url.searchParams.get("token");
      if (!token) return new Response("❌ Invalid token", { status: 400 });

      const result = await env.etchnft.prepare(
        `UPDATE waitlist_signups SET verified = 1 WHERE id = ?`
      ).bind(token).run();

      if (result.success) {
        return new Response("✅ Email verified. You're in!", {
          headers: { "Content-Type": "text/html" }
        });
      } else {
        return new Response("❌ Token not found or already used.", { status: 404 });
      }
    }

    // === 4. Formaloo Sync POST
    if (url.pathname === "/api/formaloo-sync" && request.method === "POST") {
      const token = request.headers.get("x-formaloo-token");
      if (token !== env.FORMALOO_TOKEN) {
        return new Response("❌ Invalid token", { status: 401 });
      }

      try {
        const data = await request.json();

        const { email, wallet, name, tshirt_size, form_tag = "default" } = data;
        const id = crypto.randomUUID();

        await env.etchnft.prepare(
          `INSERT INTO waitlist_signups (id, email, wallet, name, tshirt_size, form_tag) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(id, email, wallet, name, tshirt_size, form_tag).run();

        // Simulated: Send verification email w/ token = id
        console.log(`[EMAIL] Would send verification to ${email} with link: https://etchnft.com/verify?token=${id}`);

        return new Response("✅ Synced", { status: 200 });
      } catch (err) {
        console.error("Formaloo Sync Error:", err);
        return new Response("❌ Sync failed", { status: 500 });
      }
    }

    // === 5. API for client-side page to load supporters
    if (url.pathname === "/api/supporters" && request.method === "GET") {
      try {
        const result = await env.etchnft.prepare(
          `SELECT wallet, ens, name, tshirt_size, created_at FROM waitlist_signups
           WHERE verified = 1
           ORDER BY created_at DESC LIMIT 100`
        ).all();

        return new Response(JSON.stringify(result.results), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        console.error("Supporters fetch error:", err);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    // === Default
    return new Response("EtchNFT Worker API — Online", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
};
