import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  Trash2, LogOut, Mail, Mic, Globe, PenSquare, Plus,
  ExternalLink, Eye, EyeOff, Edit2, Send, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp,
} from "lucide-react";
import { BlogEditor, BlogPost } from "../components/BlogEditor";

const DARK = "#0D1E26";
const GOLD = "#E8A838";
const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a`;

type Tab = "talks" | "consultations" | "newsletter" | "blog";

interface Submission {
  _key: string;
  submittedAt: string;
  type: string;
  [key: string]: any;
}

interface Submissions {
  talks: Submission[];
  consultations: Submission[];
  newsletter: Submission[];
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  } catch { return iso; }
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mb-1.5">
      <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#999" }}>{label}: </span>
      <span className="text-sm" style={{ color: "#222" }}>{value}</span>
    </div>
  );
}

function TalkCard({ sub, onDelete }: { sub: Submission; onDelete: () => void }) {
  return (
    <div className="rounded-xl p-5 mb-4 relative" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-semibold text-base" style={{ color: DARK }}>{sub.name || "—"}</p>
          <p className="text-sm" style={{ color: "#666" }}>{sub.email}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>Talk Inquiry</span>
          <button onClick={onDelete} className="p-1.5 rounded-lg transition-colors hover:bg-red-50" title="Delete">
            <Trash2 size={15} style={{ color: "#ef4444" }} />
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-6">
        <Field label="Phone" value={sub.phone} />
        <Field label="Organization" value={sub.organization} />
        <Field label="Preferred Date" value={sub.preferredDate} />
        <Field label="Program" value={sub.program} />
        <Field label="Audience Size" value={sub.audience} />
      </div>
      {sub.message && (
        <div className="mt-2 p-3 rounded-lg text-sm" style={{ background: "#f9fafb", color: "#444", border: "1px solid #f0f0f0" }}>
          {sub.message}
        </div>
      )}
      <p className="text-xs mt-3" style={{ color: "#bbb" }}>{formatDate(sub.submittedAt)}</p>
    </div>
  );
}

function ConsultCard({ sub, onDelete }: { sub: Submission; onDelete: () => void }) {
  return (
    <div className="rounded-xl p-5 mb-4 relative" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-semibold text-base" style={{ color: DARK }}>{sub.name || "—"}</p>
          <p className="text-sm" style={{ color: "#666" }}>{sub.email}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}>Consultation</span>
          <button onClick={onDelete} className="p-1.5 rounded-lg transition-colors hover:bg-red-50" title="Delete">
            <Trash2 size={15} style={{ color: "#ef4444" }} />
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-6">
        <Field label="Destination" value={sub.destination} />
        <Field label="Timing" value={sub.timing} />
        <Field label="Experience" value={sub.experience} />
      </div>
      {sub.questions && (
        <div className="mt-2 p-3 rounded-lg text-sm" style={{ background: "#f9fafb", color: "#444", border: "1px solid #f0f0f0" }}>
          {sub.questions}
        </div>
      )}
      <p className="text-xs mt-3" style={{ color: "#bbb" }}>{formatDate(sub.submittedAt)}</p>
    </div>
  );
}

function NewsletterCard({ sub, onDelete }: { sub: Submission; onDelete: () => void }) {
  return (
    <div className="rounded-xl px-5 py-4 mb-3 flex items-center justify-between gap-4" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#fef3c7" }}>
          <Mail size={14} style={{ color: GOLD }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: DARK }}>{sub.email}</p>
          <p className="text-xs" style={{ color: "#bbb" }}>{formatDate(sub.submittedAt)}</p>
        </div>
      </div>
      <button onClick={onDelete} className="p-1.5 rounded-lg transition-colors hover:bg-red-50" title="Delete">
        <Trash2 size={15} style={{ color: "#ef4444" }} />
      </button>
    </div>
  );
}

function BlogPostCard({
  post, onEdit, onDelete, onTogglePublish,
}: {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  return (
    <div className="rounded-xl p-5 mb-4 flex gap-4" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {post.coverImageUrl && (
        <div className="shrink-0 w-24 h-20 rounded-lg overflow-hidden hidden sm:block">
          <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-semibold text-base leading-snug" style={{ color: DARK }}>{post.title}</h3>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onTogglePublish}
              title={post.published ? "Unpublish" : "Publish"}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {post.published
                ? <Eye size={14} style={{ color: "#16a34a" }} />
                : <EyeOff size={14} style={{ color: "#aaa" }} />
              }
            </button>
            <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
              <Edit2 size={14} style={{ color: "#555" }} />
            </button>
            {post.published && (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title="View live"
              >
                <ExternalLink size={14} style={{ color: "#555" }} />
              </a>
            )}
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
              <Trash2 size={14} style={{ color: "#ef4444" }} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={post.published
              ? { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }
              : { background: "#fafafa", color: "#999", border: "1px solid #e5e7eb" }
            }>
            {post.published ? "Published" : "Draft"}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>
            {post.category}
          </span>
          {post.readTime && (
            <span className="text-xs" style={{ color: "#aaa" }}>{post.readTime}</span>
          )}
        </div>
        {post.excerpt && (
          <p className="text-sm leading-snug" style={{ color: "#888" }}>{post.excerpt.slice(0, 120)}{post.excerpt.length > 120 ? "…" : ""}</p>
        )}
        <p className="text-xs mt-2" style={{ color: "#ccc" }}>
          {post.date && `${post.date} · `}
          {post.updatedAt ? `Last edited ${formatDate(post.updatedAt)}` : ""}
        </p>
      </div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="text-center py-16 rounded-2xl" style={{ background: "white", border: "1px solid #e5e7eb" }}>
      <p style={{ color: "#bbb", fontSize: "2rem" }}>📭</p>
      <p className="mt-3 text-sm" style={{ color: "#999" }}>{label}</p>
    </div>
  );
}

export function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Submissions | null>(null);
  const [tab, setTab] = useState<Tab>("talks");
  const [fetchError, setFetchError] = useState("");

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null | undefined>(undefined);
  // undefined = not in editor, null = new post, BlogPost = editing existing

  const adminHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${publicAnonKey}`,
    "X-Admin-Password": password,
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    try {
      const [subRes, blogRes] = await Promise.all([
        fetch(`${SERVER}/admin/submissions`, { headers: { Authorization: `Bearer ${publicAnonKey}`, "X-Admin-Password": password } }),
        fetch(`${SERVER}/admin/blog/posts`, { headers: { Authorization: `Bearer ${publicAnonKey}`, "X-Admin-Password": password } }),
      ]);
      if (subRes.status === 401) { setAuthError("Incorrect password."); setLoading(false); return; }
      if (!subRes.ok) throw new Error(await subRes.text());
      const subJson = await subRes.json();
      const blogJson = blogRes.ok ? await blogRes.json() : { posts: [] };
      setData(subJson);
      setBlogPosts(blogJson.posts ?? []);
      setAuthed(true);
    } catch (err) {
      setFetchError(String(err));
    }
    setLoading(false);
  };

  const refresh = async () => {
    setFetchError("");
    try {
      const res = await fetch(`${SERVER}/admin/submissions`, {
        headers: { Authorization: `Bearer ${publicAnonKey}`, "X-Admin-Password": password },
      });
      if (!res.ok) throw new Error(await res.text());
      setData(await res.json());
    } catch (err) {
      setFetchError(String(err));
    }
  };

  const refreshBlog = async () => {
    setBlogLoading(true);
    try {
      const res = await fetch(`${SERVER}/admin/blog/posts`, {
        headers: { Authorization: `Bearer ${publicAnonKey}`, "X-Admin-Password": password },
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setBlogPosts(json.posts ?? []);
    } catch (err) {
      console.error("Blog refresh error:", err);
    }
    setBlogLoading(false);
  };

  const deleteItem = async (key: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await fetch(`${SERVER}/admin/delete`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ key }),
      });
      await refresh();
    } catch (err) {
      alert("Delete failed: " + String(err));
    }
  };

  const deleteBlogPost = async (slug: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      await fetch(`${SERVER}/admin/blog/delete-post`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ slug }),
      });
      await refreshBlog();
    } catch (err) {
      alert("Delete failed: " + String(err));
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await fetch(`${SERVER}/admin/blog/save`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ ...post, published: !post.published }),
      });
      await refreshBlog();
    } catch (err) {
      alert("Update failed: " + String(err));
    }
  };

  const logout = () => { setAuthed(false); setPassword(""); setData(null); setBlogPosts([]); setEditingPost(undefined); };

  // ── Show editor if active ─────────────────────────────────────────────────────
  if (authed && editingPost !== undefined) {
    return (
      <BlogEditor
        projectId={projectId}
        publicAnonKey={publicAnonKey}
        adminPassword={password}
        initialPost={editingPost}
        onBack={() => setEditingPost(undefined)}
        onSaved={() => refreshBlog()}
      />
    );
  }

  // ── Login Screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: DARK }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 600 }}>Endless Passport</p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Dashboard</h1>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Submissions, newsletter & blog</p>
          </div>
          <form onSubmit={login} className="rounded-2xl p-8 space-y-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <label className="block text-sm mb-2 text-white">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </div>
            {authError && <p className="text-sm text-center" style={{ color: "#fca5a5" }}>{authError}</p>}
            {fetchError && <p className="text-sm text-center" style={{ color: "#fca5a5" }}>{fetchError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium transition-opacity"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
            Admin access only. The password is set via ADMIN_PASSWORD in Supabase Secrets.
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  const submissionTabs: { id: Tab; label: string; count: number; icon: React.ReactNode }[] = [
    { id: "talks",         label: "Talk Inquiries",  count: data?.talks.length ?? 0,         icon: <Mic size={15} /> },
    { id: "consultations", label: "Consultations",   count: data?.consultations.length ?? 0, icon: <Globe size={15} /> },
    { id: "newsletter",    label: "Newsletter",       count: data?.newsletter.length ?? 0,    icon: <Mail size={15} /> },
    { id: "blog",          label: "Blog Posts",       count: blogPosts.length,                icon: <PenSquare size={15} /> },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f5f6f8" }}>
      {/* Header */}
      <div style={{ background: DARK }} className="px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: GOLD, fontWeight: 600 }}>Endless Passport</p>
          <h1 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
          <LogOut size={15} /> Sign out
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-px" style={{ background: "#e5e7eb" }}>
        {submissionTabs.map((t) => (
          <div key={t.id} className="bg-white px-4 py-4 text-center">
            <p className="text-2xl font-bold" style={{ color: DARK }}>{t.count}</p>
            <p className="text-xs mt-0.5 hidden sm:block" style={{ color: "#888" }}>{t.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {submissionTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); if (t.id === "blog") refreshBlog(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={tab === t.id
                ? { background: DARK, color: "white" }
                : { background: "white", color: "#555", border: "1px solid #e5e7eb" }
              }
            >
              {t.icon}
              {t.label}
              {t.count > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{
                  background: tab === t.id ? "rgba(255,255,255,0.2)" : "#f0f0f0",
                  color: tab === t.id ? "white" : "#666",
                }}>{t.count}</span>
              )}
            </button>
          ))}
          {tab !== "blog" && (
            <button onClick={refresh} className="ml-auto text-xs px-3 py-2 rounded-full" style={{ background: "white", color: "#888", border: "1px solid #e5e7eb" }}>
              ↻ Refresh
            </button>
          )}
        </div>

        {fetchError && (
          <div className="mb-4 p-4 rounded-xl text-sm" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
            {fetchError}
          </div>
        )}

        {/* Submission tabs */}
        {tab === "talks" && (
          <div>
            {data?.talks.length === 0
              ? <Empty label="No talk inquiries yet." />
              : data?.talks.map((s) => <TalkCard key={s._key} sub={s} onDelete={() => deleteItem(s._key)} />)
            }
          </div>
        )}
        {tab === "consultations" && (
          <div>
            {data?.consultations.length === 0
              ? <Empty label="No consultation requests yet." />
              : data?.consultations.map((s) => <ConsultCard key={s._key} sub={s} onDelete={() => deleteItem(s._key)} />)
            }
          </div>
        )}
        {tab === "newsletter" && (
          <div>
            <NewsletterBroadcast
              subscriberCount={data?.newsletter.length ?? 0}
              adminPassword={password}
            />
            {data?.newsletter.length === 0
              ? <Empty label="No newsletter signups yet." />
              : data?.newsletter.map((s) => <NewsletterCard key={s._key} sub={s} onDelete={() => deleteItem(s._key)} />)
            }
          </div>
        )}

        {/* Blog Posts tab */}
        {tab === "blog" && (
          <div>
            {/* New post button */}
            <button
              onClick={() => setEditingPost(null)}
              className="w-full mb-5 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)` }}
            >
              <Plus size={16} /> Write New Post
            </button>

            {blogLoading ? (
              <div className="text-center py-12" style={{ color: "#aaa" }}>Loading posts…</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl" style={{ background: "white", border: "1px solid #e5e7eb" }}>
                <p style={{ color: "#bbb", fontSize: "2.5rem" }}>✍️</p>
                <p className="mt-3 font-medium" style={{ color: DARK }}>No blog posts yet</p>
                <p className="mt-1 text-sm" style={{ color: "#999" }}>Click "Write New Post" above to get started.</p>
              </div>
            ) : (
              <>
                {/* Published */}
                {blogPosts.filter(p => p.published).length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#16a34a" }}>
                      Published ({blogPosts.filter(p => p.published).length})
                    </p>
                    {blogPosts.filter(p => p.published).map(post => (
                      <BlogPostCard
                        key={post.slug}
                        post={post}
                        onEdit={() => setEditingPost(post)}
                        onDelete={() => deleteBlogPost(post.slug)}
                        onTogglePublish={() => togglePublish(post)}
                      />
                    ))}
                  </div>
                )}
                {/* Drafts */}
                {blogPosts.filter(p => !p.published).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#999" }}>
                      Drafts ({blogPosts.filter(p => !p.published).length})
                    </p>
                    {blogPosts.filter(p => !p.published).map(post => (
                      <BlogPostCard
                        key={post.slug}
                        post={post}
                        onEdit={() => setEditingPost(post)}
                        onDelete={() => deleteBlogPost(post.slug)}
                        onTogglePublish={() => togglePublish(post)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Newsletter Broadcast Panel ───────────────────────────────────────────────
interface BroadcastHistory {
  subject: string;
  postTitle: string;
  postUrl?: string;
  sent: number;
  failed: number;
  sentAt: string;
  _key: string;
}

function NewsletterBroadcast({
  subscriberCount,
  adminPassword,
}: {
  subscriberCount: number;
  adminPassword: string;
}) {
  const [subject, setSubject]       = useState("");
  const [postTitle, setPostTitle]   = useState("");
  const [postUrl, setPostUrl]       = useState("");
  const [previewText, setPreviewText] = useState("");
  const [status, setStatus]         = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult]         = useState<{ sent: number; failed: number; total: number; errors?: string[] } | null>(null);
  const [errorMsg, setErrorMsg]     = useState("");
  const [history, setHistory]       = useState<BroadcastHistory[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [confirmed, setConfirmed]   = useState(false);

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`${SERVER}/admin/newsletter/history`, {
        headers: { Authorization: `Bearer ${publicAnonKey}`, "X-Admin-Password": adminPassword },
      });
      const json = await res.json();
      setHistory(json.history ?? []);
    } catch (err) {
      console.error("History load error:", err);
    }
    setHistoryLoading(false);
  };

  const toggleHistory = () => {
    const next = !historyOpen;
    setHistoryOpen(next);
    if (next && history.length === 0) loadHistory();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) { alert("Please check the confirmation box before sending."); return; }
    if (subscriberCount === 0) { alert("There are no subscribers yet!"); return; }
    setStatus("sending");
    setResult(null);
    setErrorMsg("");
    try {
      const res = await fetch(`${SERVER}/admin/newsletter/broadcast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Password": adminPassword,
        },
        body: JSON.stringify({ subject, postTitle, postUrl, previewText }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Unknown server error");
      setResult({ sent: json.sent, failed: json.failed, total: json.total, errors: json.errors });
      setStatus("done");
      setConfirmed(false);
      // Refresh history
      loadHistory();
      setHistoryOpen(true);
    } catch (err) {
      console.error("Broadcast error:", err);
      setErrorMsg(String(err));
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    setSubject("");
    setPostTitle("");
    setPostUrl("");
    setPreviewText("");
    setConfirmed(false);
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: `2px solid ${GOLD}33`, background: "white" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4" style={{ background: `linear-gradient(135deg, ${DARK}, #1a3344)` }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}22`, border: `1.5px solid ${GOLD}55` }}>
          <Send size={16} style={{ color: GOLD }} />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">Send Newsletter</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            Broadcast a new post to all {subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="p-6">
        {status === "done" && result ? (
          <div>
            <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <CheckCircle size={20} style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: "#16a34a" }}>Newsletter sent!</p>
                <p className="text-sm mt-0.5" style={{ color: "#15803d" }}>
                  ✉️ {result.sent} delivered · {result.failed > 0 ? `⚠️ ${result.failed} failed` : "0 failed"} · {result.total} total subscribers
                </p>
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-2 text-xs" style={{ color: "#dc2626" }}>
                    {result.errors.map((e, i) => <p key={i}>{e}</p>)}
                  </div>
                )}
              </div>
            </div>
            <button onClick={reset} className="text-sm px-4 py-2 rounded-lg" style={{ background: DARK, color: "white" }}>
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#666" }}>
                Email Subject <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. New post: My 30 Days in Southeast Asia"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7eb", color: "#222", background: "#fafafa" }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#666" }}>
                Post Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. My 30 Days in Southeast Asia"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7eb", color: "#222", background: "#fafafa" }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#666" }}>
                Post URL <span style={{ color: "#aaa", fontWeight: 400, text: "normal-case" }}>(optional — links to blog if blank)</span>
              </label>
              <input
                type="url"
                placeholder="https://endlesspassport.com/blog/my-post"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: "1.5px solid #e5e7eb", color: "#222", background: "#fafafa" }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#666" }}>
                Preview / Teaser Text <span style={{ color: "#aaa", fontWeight: 400 }}>(optional — shown in email body)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Write a short teaser that will appear in the email above the post link…"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #e5e7eb", color: "#222", background: "#fafafa" }}
                onFocus={(e) => (e.target.style.borderColor = GOLD)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Confirmation checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-lg" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 shrink-0"
                style={{ accentColor: GOLD, width: 16, height: 16 }}
              />
              <span className="text-sm" style={{ color: "#92400e" }}>
                I confirm I want to send this email to all <strong>{subscriberCount}</strong> subscriber{subscriberCount !== 1 ? "s" : ""}. This cannot be undone.
              </span>
            </label>

            {status === "error" && (
              <div className="flex items-start gap-2 p-3 rounded-lg text-sm" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !confirmed}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #c8821a)`,
                opacity: (status === "sending" || !confirmed) ? 0.55 : 1,
                cursor: (status === "sending" || !confirmed) ? "not-allowed" : "pointer",
              }}
            >
              <Send size={15} />
              {status === "sending" ? `Sending to ${subscriberCount} subscriber${subscriberCount !== 1 ? "s" : ""}…` : `Send to ${subscriberCount} Subscriber${subscriberCount !== 1 ? "s" : ""}`}
            </button>
          </form>
        )}
      </div>

      {/* Broadcast History */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <button
          onClick={toggleHistory}
          className="w-full flex items-center justify-between px-6 py-3 text-sm transition-colors hover:bg-gray-50"
          style={{ color: "#888" }}
        >
          <span className="flex items-center gap-2">
            <Clock size={14} />
            Send History
          </span>
          {historyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {historyOpen && (
          <div className="px-6 pb-5">
            {historyLoading ? (
              <p className="text-sm text-center py-4" style={{ color: "#ccc" }}>Loading…</p>
            ) : history.length === 0 ? (
              <p className="text-sm text-center py-4" style={{ color: "#ccc" }}>No newsletters sent yet.</p>
            ) : (
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h._key} className="flex items-start justify-between gap-4 p-3 rounded-lg" style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: DARK }}>{h.subject}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#aaa" }}>{h.postTitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold" style={{ color: "#16a34a" }}>{h.sent} sent{h.failed > 0 ? ` · ${h.failed} failed` : ""}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#ccc" }}>
                        {new Date(h.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}