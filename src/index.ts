interface Env {
  etchnft: D1Database;
  FORMALOO_TOKEN: string;
  RATE_LIMIT_KV: KVNamespace;
}

const RATE_LIMIT_MAX = 10; // Max requests per IP
const RATE_LIMIT_WINDOW = 600; // 10 minutes (seconds)

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    // === 1. Rate Limiting for POST requests under /api/*
    if (method === "POST" && path.startsWith("/api/")) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const key = `rate:${ip}`;
      const current = parseInt(await env.RATE_LIMIT_KV.get(key) || "0");

      if (current >= RATE_LIMIT_MAX) {
        return new Response("⚠️ Rate limit exceeded", { status: 429 });
      }

      ctx.waitUntil(
        env.RATE_LIMIT_KV.put(key, (current + 1).toString(), { expirationTtl: RATE_LIMIT_WINDOW })
      );
    }

    // === 2. Shortcut: /form1 redirect to hosted form
    if (path === "/form1") {
      return Response.redirect("https://forms.cozyartz.com/zxji2h", 302);
    }

    // === 3. Email Verification
    if (path === "/verify" && method === "GET") {
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
        return new Response("❌ Token not found or already verified.", { status: 404 });
      }
    }

    // === 4. Formaloo Webhook POST Handler
    if (path === "/api/formaloo-sync" && method === "POST") {
      const token = request.headers.get("x-formaloo-token");
      if (token !== env.FORMALOO_TOKEN) {
        return new Response("❌ Invalid token", { status: 401 });
      }

      try {
        const { email, wallet, name, tshirt_size, form_tag = "default" } = await request.json();
        const id = crypto.randomUUID();

        await env.etchnft.prepare(
          `INSERT INTO waitlist_signups (id, email, wallet, name, tshirt_size, form_tag) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(id, email, wallet, name, tshirt_size, form_tag).run();

        // Simulated: Send verification email
        console.log(`[EMAIL] Send verify link: https://etchnft.com/verify?token=${id}`);

        return new Response("✅ Synced", { status: 200 });
      } catch (err) {
        console.error("Formaloo Sync Error:", err);
        return new Response("❌ Sync failed", { status: 500 });
      }
    }

    // === 5. Public API — Fetch verified supporters
    if (path === "/api/supporters" && method === "GET") {
      try {
        const result = await env.etchnft.prepare(
          `SELECT wallet, ens, name, tshirt_size, created_at FROM waitlist_signups
           WHERE verified = 1
           ORDER BY created_at DESC
           LIMIT 100`
        ).all();

        return new Response(JSON.stringify(result.results), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        console.error("Supporters fetch error:", err);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    // === Default Fallback
    return new Response("EtchNFT Worker API — Online", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
};
