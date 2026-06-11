import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

// ─── Email Notification Helper ────────────────────────────────────────────────
const BRIAN_EMAIL = "brian@endlesspassport.com";

async function sendEmail(subject: string, htmlBody: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("sendEmail: RESEND_API_KEY not set — skipping notification");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Endless Passport Forms <noreply@endlesspassport.com>",
        to: [BRIAN_EMAIL],
        subject,
        html: htmlBody,
      }),
    });
    const result = await res.json();
    if (!res.ok) {
      console.log("sendEmail error:", JSON.stringify(result));
    } else {
      console.log("sendEmail sent, id:", result.id);
    }
  } catch (err) {
    console.log("sendEmail exception:", String(err));
  }
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-weight:600;color:#0D1E26;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#333;">${value || "—"}</td>
  </tr>`;
}

function emailWrapper(title: string, badge: string, badgeColor: string, tableRows: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12);">
        <tr>
          <td style="background:#0D1E26;padding:24px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">Endless Passport</p>
            <h1 style="margin:4px 0 0;font-size:22px;color:#ffffff;">${title}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;">
              <span style="background:${badgeColor};color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:4px;text-transform:uppercase;letter-spacing:1px;">${badge}</span>
            </p>
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              ${tableRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#888;">This notification was sent automatically from the Endless Passport website.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Password"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-36a3d90a/health", (c) => {
  return c.json({ status: "ok" });
});

// ─── Facebook Reviews ─────────────────────────────────────────────────────────
// Fetches page ratings/reviews from the Endless Passport Facebook page.
// Requires the Page Access Token to have pages_read_engagement permission.
app.get("/make-server-36a3d90a/facebook/reviews", async (c) => {
  try {
    const raw = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
    if (!raw) {
      console.log("FB reviews error: FACEBOOK_PAGE_ACCESS_TOKEN not set");
      return c.json({ error: "FACEBOOK_PAGE_ACCESS_TOKEN not configured" }, 500);
    }
    const token = raw.trim();
    console.log(`FB reviews: token length=${token.length}, prefix=${token.substring(0, 6)}`);
    const url = `https://graph.facebook.com/v19.0/me/ratings?fields=reviewer,rating,review_text,created_time,recommendation_type&limit=25&access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      // Facebook's ratings endpoint is often unavailable (deprecated, disabled on page,
      // or requires additional permissions). Return empty data so the UI falls back
      // to hardcoded testimonials instead of showing an error.
      console.log(`FB reviews HTTP ${res.status} (degrading gracefully):`, text.substring(0, 300));
      return c.json({ data: [] });
    }
    const data = await res.json();
    if (data.error) {
      console.log("FB reviews API error:", JSON.stringify(data.error));
      // Degrade gracefully rather than surfacing the error to the frontend
      return c.json({ data: [] });
    }
    return c.json(data);
  } catch (err) {
    console.log("FB reviews exception:", err);
    return c.json({ data: [] });
  }
});

// ─── Facebook Events ──────────────────────────────────────────────────────────
app.get("/make-server-36a3d90a/facebook/events", async (c) => {
  try {
    const raw = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
    if (!raw) {
      console.log("FB events error: FACEBOOK_PAGE_ACCESS_TOKEN not set");
      return c.json({ data: [], fbError: "FACEBOOK_PAGE_ACCESS_TOKEN not configured" });
    }
    const token = raw.trim();

    // ── Resolve a page token ──────────────────────────────────────────────────
    // If the stored token is a USER token (common when copied from Graph API
    // Explorer without switching to the page), exchange it for a PAGE token via
    // /me/accounts so we can actually read the page's events.
    let pageToken = token;
    let pageId = "me";

    const accountsRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token&access_token=${token}`);
    const accountsData = await accountsRes.json();
    const accountsLog = JSON.stringify(accountsData.data?.map((p: any) => ({ id: p.id, name: p.name })) ?? accountsData.error ?? "none");
    console.log("FB accounts:", accountsLog);

    if (Array.isArray(accountsData.data) && accountsData.data.length > 0) {
      // Prefer "Endless Passport" page; fall back to the first managed page
      const epPage = accountsData.data.find((p: any) =>
        p.name?.toLowerCase().includes("endless passport")
      ) ?? accountsData.data[0];
      pageToken = epPage.access_token;
      pageId    = epPage.id;
      console.log(`FB resolved page: name="${epPage.name}", id=${pageId}`);
    } else {
      // Token might already be a page token — try /me to get the page id
      const meRes  = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${token}`);
      const meData = await meRes.json();
      pageId = meData.id ?? "me";
      console.log(`FB page (direct): name="${meData.name}", id=${pageId}, err=${JSON.stringify(meData.error ?? null)}`);
    }

    // cover.source gives the actual event banner photo URL
    const EVENT_FIELDS = "id,name,description,start_time,end_time,place,cover";

    // Approach A: /{page-id}/events?time_filter=upcoming
    const urlA = `https://graph.facebook.com/v19.0/${pageId}/events?fields=${EVENT_FIELDS}&time_filter=upcoming&limit=100&access_token=${pageToken}`;
    const resA  = await fetch(urlA);
    const dataA = await resA.json();
    console.log(`FB approach A (/${pageId}/events upcoming): ${dataA.data?.length ?? "err"} events, error=${JSON.stringify(dataA.error ?? null)}`);

    if (!dataA.error && Array.isArray(dataA.data) && dataA.data.length > 0) {
      dataA.data.sort((a: any, b: any) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
      return c.json(dataA);
    }

    // Approach B: also try past events so the page isn't empty if no upcoming
    const urlB = `https://graph.facebook.com/v19.0/${pageId}/events?fields=${EVENT_FIELDS}&time_filter=past&limit=20&access_token=${pageToken}`;
    const resB  = await fetch(urlB);
    const dataB = await resB.json();
    console.log(`FB approach B (/${pageId}/events past): ${dataB.data?.length ?? "err"} events, error=${JSON.stringify(dataB.error ?? null)}`);

    if (!dataB.error && Array.isArray(dataB.data) && dataB.data.length > 0) {
      dataB.data.sort((a: any, b: any) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
      return c.json({ data: dataB.data, note: "showing recent past events — no upcoming events found" });
    }

    if (dataA.error) {
      return c.json({ data: [], fbError: dataA.error.message });
    }

    console.log("FB events: all approaches returned 0 events (page may have no events or token lacks events permission)");
    return c.json({ data: [] });
  } catch (err) {
    console.log("FB events exception:", String(err));
    return c.json({ data: [], fbError: String(err) });
  }
});

// ─── Facebook Debug ───────────────────────────────────────────────────────────
// Visit /facebook/debug to see what the token represents and what events are visible.
app.get("/make-server-36a3d90a/facebook/debug", async (c) => {
  const raw = Deno.env.get("FACEBOOK_PAGE_ACCESS_TOKEN");
  if (!raw) return c.json({ error: "FACEBOOK_PAGE_ACCESS_TOKEN not set" }, 500);
  const token = raw.trim();

  const [meRes, accountsRes] = await Promise.all([
    fetch(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${token}`),
    fetch(`https://graph.facebook.com/v19.0/me/accounts?fields=id,name&access_token=${token}`),
  ]);
  const [meData, accountsData] = await Promise.all([meRes.json(), accountsRes.json()]);

  // Determine which page/token to use for events
  let evPageId = meData.id ?? "me";
  let evToken  = token;
  if (Array.isArray(accountsData.data) && accountsData.data.length > 0) {
    const epPage = accountsData.data.find((p: any) => p.name?.toLowerCase().includes("endless passport")) ?? accountsData.data[0];
    evPageId  = epPage.id;
    const acctRes2 = await fetch(`https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token&access_token=${token}`);
    const acctData2 = await acctRes2.json();
    const epFull = acctData2.data?.find((p: any) => p.id === evPageId);
    if (epFull) evToken = epFull.access_token;
  }

  const [evUpRes, evPastRes] = await Promise.all([
    fetch(`https://graph.facebook.com/v19.0/${evPageId}/events?fields=id,name,start_time&time_filter=upcoming&limit=5&access_token=${evToken}`),
    fetch(`https://graph.facebook.com/v19.0/${evPageId}/events?fields=id,name,start_time&time_filter=past&limit=5&access_token=${evToken}`),
  ]);
  const [evUpData, evPastData] = await Promise.all([evUpRes.json(), evPastRes.json()]);

  return c.json({
    token_type: Array.isArray(accountsData.data) ? "user_token" : "page_token",
    token_prefix: token.substring(0, 10) + "...",
    me: meData,
    managed_pages: accountsData.data?.map((p: any) => ({ id: p.id, name: p.name })) ?? accountsData.error,
    events_page_id_used: evPageId,
    upcoming_events: evUpData,
    past_events: evPastData,
  });
});

// ─── Form Submissions ─────────────────────────────────────────────────────────
app.post("/make-server-36a3d90a/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { type, ...data } = body;
    if (!type) return c.json({ error: "Missing type" }, 400);
    const timestamp = Date.now();
    let key: string;
    if (type === "newsletter") {
      // deduplicate by email
      key = `sub:newsletter:${(data.email ?? "unknown").replace(/[^a-zA-Z0-9]/g, "_")}`;
    } else {
      key = `sub:${type}:${timestamp}`;
    }
    await kv.set(key, JSON.stringify({ ...data, type, submittedAt: new Date().toISOString(), _key: key }));
    console.log(`Submission saved: type=${type}, key=${key}`);

    // ─ Send email notification ──────────────────────────────────────────────
    if (type === "talk") {
      const html = emailWrapper(
        "New Talk Inquiry",
        "Book a Talk",
        "#0D1E26",
        [
          row("Name", data.name),
          row("Email", data.email),
          row("Phone", data.phone),
          row("Organization", data.organization),
          row("Talk Requested", data.talkTitle),
          row("Event Date", data.eventDate),
          row("Audience", data.audience),
          row("Est. Attendance", data.attendance),
          row("Location / Venue", data.location),
          row("Message", data.message),
          row("Submitted At", new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CT"),
        ].join("")
      );
      await sendEmail(`🎤 New Talk Inquiry from ${data.name || "Unknown"}`, html);
    } else if (type === "consult") {
      const html = emailWrapper(
        "New Consultation Request",
        "Consultation",
        "#B45309",
        [
          row("Name", data.name),
          row("Email", data.email),
          row("Phone", data.phone),
          row("Topic / Trip Type", data.topic),
          row("Preferred Time", data.preferredTime),
          row("Budget Range", data.budget),
          row("Message", data.message),
          row("Submitted At", new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CT"),
        ].join("")
      );
      await sendEmail(`🧭 New Consultation Request from ${data.name || "Unknown"}`, html);
    } else if (type === "newsletter") {
      const html = emailWrapper(
        "New Newsletter Subscriber",
        "Newsletter",
        "#166534",
        [
          row("Email", data.email),
          row("Name", data.name || "Not provided"),
          row("Subscribed At", new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CT"),
        ].join("")
      );
      await sendEmail(`📬 New Newsletter Subscriber: ${data.email || "Unknown"}`, html);
    }

    return c.json({ ok: true });
  } catch (err) {
    console.log("Submit error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Admin: Get All Submissions ────────────────────────────────────────────────
app.get("/make-server-36a3d90a/admin/submissions", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const [talks, consults, newsletters] = await Promise.all([
      kv.getByPrefix("sub:talk:"),
      kv.getByPrefix("sub:consult:"),
      kv.getByPrefix("sub:newsletter:"),
    ]);
    const parse = (items: any[]) => items.map((s: any) => { try { return typeof s === "string" ? JSON.parse(s) : s; } catch { return s; } });
    const byDate = (a: any, b: any) => new Date(b.submittedAt ?? 0).getTime() - new Date(a.submittedAt ?? 0).getTime();
    return c.json({
      talks: parse(talks).sort(byDate),
      consultations: parse(consults).sort(byDate),
      newsletter: parse(newsletters).sort(byDate),
    });
  } catch (err) {
    console.log("Admin submissions error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Admin: Delete Submission ──────────────────────────────────────────────────
app.post("/make-server-36a3d90a/admin/delete", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const { key } = await c.req.json();
    if (!key) return c.json({ error: "Missing key" }, 400);
    await kv.del(key);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Admin delete error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Blog: Public — list published posts ──────────────────────────────────────
app.get("/make-server-36a3d90a/blog/posts", async (c) => {
  try {
    const raw = await kv.getByPrefix("blog:post:");
    const parse = (items: any[]) => items.map((s: any) => { try { return typeof s === "string" ? JSON.parse(s) : s; } catch { return null; } }).filter(Boolean);
    const posts = parse(raw).filter((p: any) => p.published === true);
    posts.sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    return c.json({ posts });
  } catch (err) {
    console.log("Blog posts error:", String(err));
    return c.json({ posts: [] });
  }
});

// ─── Blog: Public — single post by slug ───────────────────────────────────────
app.get("/make-server-36a3d90a/blog/post/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const raw = await kv.get(`blog:post:${slug}`);
    if (!raw) return c.json({ error: "Not found" }, 404);
    const post = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!post.published) return c.json({ error: "Not found" }, 404);
    return c.json(post);
  } catch (err) {
    console.log("Blog post error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Blog Admin: list all posts ───────────────────────────────────────────────
app.get("/make-server-36a3d90a/admin/blog/posts", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const raw = await kv.getByPrefix("blog:post:");
    const parse = (items: any[]) => items.map((s: any) => { try { return typeof s === "string" ? JSON.parse(s) : s; } catch { return null; } }).filter(Boolean);
    const posts = parse(raw);
    posts.sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    return c.json({ posts });
  } catch (err) {
    console.log("Admin blog list error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Blog Admin: save (create or update) ─────────────────────────────────────
app.post("/make-server-36a3d90a/admin/blog/save", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const post = await c.req.json();
    if (!post.slug) return c.json({ error: "Missing slug" }, 400);
    if (!post.title) return c.json({ error: "Missing title" }, 400);
    const key = `blog:post:${post.slug}`;
    const now = new Date().toISOString();
    const existingRaw = await kv.get(key);
    const existing = existingRaw ? (typeof existingRaw === "string" ? JSON.parse(existingRaw) : existingRaw) : null;
    const createdAt = existing?.createdAt ?? now;
    const toStore = { ...post, _key: key, createdAt, updatedAt: now };
    await kv.set(key, JSON.stringify(toStore));
    console.log(`Blog post saved: slug=${post.slug}, published=${post.published}`);
    return c.json({ ok: true, post: toStore });
  } catch (err) {
    console.log("Admin blog save error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Blog Admin: delete post ──────────────────────────────────────────────────
app.post("/make-server-36a3d90a/admin/blog/delete-post", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const { slug } = await c.req.json();
    if (!slug) return c.json({ error: "Missing slug" }, 400);
    await kv.del(`blog:post:${slug}`);
    console.log(`Blog post deleted: slug=${slug}`);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Admin blog delete error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Admin: Newsletter Broadcast ──────────────────────────────────────────────
app.post("/make-server-36a3d90a/admin/newsletter/broadcast", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);

  try {
    const { subject, postTitle, postUrl, previewText } = await c.req.json();
    if (!subject) return c.json({ error: "Missing subject" }, 400);
    if (!postTitle) return c.json({ error: "Missing postTitle" }, 400);

    // Fetch all subscribers
    const raw = await kv.getByPrefix("sub:newsletter:");
    const subs: any[] = raw
      .map((s: any) => { try { return typeof s === "string" ? JSON.parse(s) : s; } catch { return null; } })
      .filter((s: any) => s && s.email);

    if (subs.length === 0) {
      return c.json({ ok: true, sent: 0, failed: 0, message: "No subscribers to send to." });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return c.json({ error: "RESEND_API_KEY not configured" }, 500);

    const preview = previewText || `A new post from Brian Michalski — ${postTitle}`;
    const postLink = postUrl || "https://endlesspassport.com/blog";

    // Build the subscriber email HTML
    function buildEmail(recipientEmail: string): string {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12);max-width:580px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#0D1E26;padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">Endless Passport</p>
            <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:700;">New Post from Brian</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 24px;">
            <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">Hey there, fellow traveler —</p>
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">${preview}</p>
            <!-- Post title card -->
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f8f7f4;border-left:4px solid #E8A838;border-radius:4px;padding:16px 20px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E8A838;text-transform:uppercase;">New Post</p>
                  <p style="margin:0;font-size:18px;font-weight:700;color:#0D1E26;line-height:1.3;">${postTitle}</p>
                </td>
              </tr>
            </table>
            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#E8A838;border-radius:6px;">
                  <a href="${postLink}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#0D1E26;text-decoration:none;letter-spacing:0.3px;">Read the Post →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:14px;color:#888;line-height:1.6;">
              Safe travels,<br />
              <strong style="color:#0D1E26;">Brian Michalski</strong><br />
              <span style="color:#aaa;font-size:12px;">Endless Passport · Chicago, IL</span>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;font-size:11px;color:#bbb;line-height:1.6;">
              You're receiving this because you subscribed at endlesspassport.com.<br />
              To unsubscribe, reply to this email with "unsubscribe" in the subject line.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
    }

    // Send to each subscriber individually, collecting results
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const sub of subs) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Brian Michalski <brian@endlesspassport.com>",
            to: [sub.email],
            subject,
            html: buildEmail(sub.email),
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(`Newsletter send failed for ${sub.email}:`, JSON.stringify(result));
          failed++;
          errors.push(`${sub.email}: ${result.message ?? "unknown error"}`);
        } else {
          console.log(`Newsletter sent to ${sub.email}, id: ${result.id}`);
          sent++;
        }
      } catch (err) {
        console.log(`Newsletter exception for ${sub.email}:`, String(err));
        failed++;
        errors.push(`${sub.email}: ${String(err)}`);
      }
    }

    // Log broadcast record to KV for history
    const broadcastKey = `newsletter:broadcast:${Date.now()}`;
    await kv.set(broadcastKey, JSON.stringify({
      subject,
      postTitle,
      postUrl,
      previewText,
      sent,
      failed,
      sentAt: new Date().toISOString(),
      _key: broadcastKey,
    }));

    return c.json({ ok: true, sent, failed, total: subs.length, errors });
  } catch (err) {
    console.log("Newsletter broadcast error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

// ─── Admin: Newsletter Broadcast History ──────────────────────────────────────
app.get("/make-server-36a3d90a/admin/newsletter/history", async (c) => {
  const password = c.req.header("X-Admin-Password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || password !== adminPassword) return c.json({ error: "Unauthorized" }, 401);
  try {
    const raw = await kv.getByPrefix("newsletter:broadcast:");
    const history = raw
      .map((s: any) => { try { return typeof s === "string" ? JSON.parse(s) : s; } catch { return null; } })
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b.sentAt ?? 0).getTime() - new Date(a.sentAt ?? 0).getTime());
    return c.json({ history });
  } catch (err) {
    console.log("Newsletter history error:", String(err));
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);