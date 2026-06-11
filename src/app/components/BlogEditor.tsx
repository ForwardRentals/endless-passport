import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft, Eye, Edit3, Bold, Italic, Heading2, Heading3,
  Quote, List, Link2, Image, Minus, Save, Globe, FileText,
  Clock, Tag, Loader2, CheckCircle, AlertCircle,
} from "lucide-react";

const DARK = "#0D1E26";
const GOLD = "#E8A838";
const SERVER_BASE = (projectId: string) =>
  `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a`;

const CATEGORIES = [
  "Travel Tips", "Stories", "Reflection", "Guides",
  "Budget Travel", "Gear Reviews", "Destinations", "Food & Culture",
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImageUrl: string;
  readTime: string;
  date: string;
  body: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
  _key?: string;
}

const EMPTY_POST: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "Travel Tips",
  tags: "",
  coverImageUrl: "",
  readTime: "",
  date: "",
  body: "",
  published: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

// ── Toolbar button helper ──────────────────────────────────────────────────────
function ToolBtn({
  onClick, title, children,
}: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
      style={{ color: "#555" }}
    >
      {children}
    </button>
  );
}

// ── Markdown preview renderer ─────────────────────────────────────────────────
function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: DARK, marginBottom: "1rem", marginTop: "2rem", lineHeight: 1.3 }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: DARK, marginBottom: "0.75rem", marginTop: "1.75rem", lineHeight: 1.35 }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: DARK, marginBottom: "0.5rem", marginTop: "1.5rem" }}>{children}</h3>
        ),
        p: ({ children }) => (
          <p style={{ color: "#444", lineHeight: 1.8, marginBottom: "1.1rem", fontSize: "1rem" }}>{children}</p>
        ),
        strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#222" }}>{children}</strong>,
        em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
        ul: ({ children }) => <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem", listStyleType: "disc" }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ paddingLeft: "1.5rem", marginBottom: "1rem", listStyleType: "decimal" }}>{children}</ol>,
        li: ({ children }) => <li style={{ color: "#444", lineHeight: 1.75, marginBottom: "0.25rem" }}>{children}</li>,
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: "1.25rem", marginLeft: 0, marginBottom: "1.25rem", color: "#666", fontStyle: "italic" }}>
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith("language-");
          return isBlock ? (
            <pre style={{ background: "#f4f4f4", borderRadius: "6px", padding: "1rem", overflow: "auto", marginBottom: "1rem" }}>
              <code style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#333" }}>{children}</code>
            </pre>
          ) : (
            <code style={{ background: "#f4f4f4", borderRadius: "3px", padding: "2px 5px", fontFamily: "monospace", fontSize: "0.875rem", color: "#c7254e" }}>{children}</code>
          );
        },
        hr: () => <hr style={{ border: "none", borderTop: `1px solid #e5e7eb`, margin: "2rem 0" }} />,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>{children}</a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} style={{ maxWidth: "100%", borderRadius: "8px", margin: "1rem 0" }} />
        ),
      }}
    >
      {content || "*Start writing to see a preview…*"}
    </ReactMarkdown>
  );
}

// ── Main editor ────────────────────────────────────────────────────────────────
interface BlogEditorProps {
  projectId: string;
  publicAnonKey: string;
  adminPassword: string;
  initialPost?: BlogPost | null;
  onBack: () => void;
  onSaved: () => void;
}

export function BlogEditor({
  projectId, publicAnonKey, adminPassword, initialPost, onBack, onSaved,
}: BlogEditorProps) {
  const SERVER = SERVER_BASE(projectId);
  const isEditing = !!initialPost;

  const [post, setPost] = useState<BlogPost>(initialPost ?? EMPTY_POST);
  const [slugManual, setSlugManual] = useState(isEditing);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && post.title) {
      setPost((p) => ({ ...p, slug: slugify(p.title) }));
    }
  }, [post.title, slugManual]);

  // Auto-estimate read time
  useEffect(() => {
    if (post.body) {
      setPost((p) => ({ ...p, readTime: estimateReadTime(p.body) }));
    }
  }, [post.body]);

  // Auto-set date if empty
  useEffect(() => {
    if (!post.date) {
      const d = new Date();
      setPost((p) => ({
        ...p,
        date: d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      }));
    }
  }, []);

  const set = (k: keyof BlogPost, v: any) => setPost((p) => ({ ...p, [k]: v }));

  // ── Markdown toolbar helpers ──
  const insertAround = useCallback((before: string, after = before) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const selected = value.slice(s, e) || "text";
    const newVal = value.slice(0, s) + before + selected + after + value.slice(e);
    setPost((p) => ({ ...p, body: newVal }));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(s + before.length, s + before.length + selected.length);
    }, 0);
  }, []);

  const insertLinePrefix = useCallback((prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, value } = ta;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const newVal = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setPost((p) => ({ ...p, body: newVal }));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + prefix.length, s + prefix.length); }, 0);
  }, []);

  const insertBlock = useCallback((text: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, value } = ta;
    const newVal = value.slice(0, s) + text + value.slice(s);
    setPost((p) => ({ ...p, body: newVal }));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + text.length, s + text.length); }, 0);
  }, []);

  const handleSave = async (publishOverride?: boolean) => {
    if (!post.title.trim()) { alert("Please enter a title."); return; }
    if (!post.slug.trim()) { alert("Please enter a URL slug."); return; }
    setSaving(true);
    setSaveStatus("idle");
    setSaveError("");
    try {
      const toSave: BlogPost = {
        ...post,
        slug: post.slug.trim(),
        tags: post.tags,
        published: publishOverride !== undefined ? publishOverride : post.published,
      };
      const res = await fetch(`${SERVER}/admin/blog/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Password": adminPassword,
        },
        body: JSON.stringify(toSave),
      });
      if (!res.ok) throw new Error(await res.text());
      if (publishOverride !== undefined) setPost((p) => ({ ...p, published: publishOverride }));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
      onSaved();
    } catch (err) {
      setSaveError(String(err));
      setSaveStatus("error");
    }
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm outline-none border transition-colors focus:border-yellow-400";
  const inputStyle = { border: "1px solid #e5e7eb", color: "#333", background: "white" };

  return (
    <div className="min-h-screen" style={{ background: "#f5f6f8" }}>
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between gap-3 shadow-sm" style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: "#555" }}
        >
          <ArrowLeft size={16} /> Back to Posts
        </button>

        <div className="flex items-center gap-2">
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1 text-xs" style={{ color: "#16a34a" }}>
              <CheckCircle size={13} /> Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1 text-xs" style={{ color: "#dc2626" }}>
              <AlertCircle size={13} /> {saveError.slice(0, 60)}
            </span>
          )}

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
            Save Draft
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
            {post.published ? "Update & Publish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* ── Title ── */}
        <div>
          <input
            type="text"
            value={post.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Post title…"
            className="w-full outline-none bg-transparent"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: DARK,
              border: "none",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "0.5rem",
            }}
          />
        </div>

        {/* ── Meta row ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#888" }}>
              URL SLUG
            </label>
            <div className="flex gap-1">
              <span className="flex items-center px-2 text-xs rounded-l-lg" style={{ background: "#f3f4f6", color: "#999", border: "1px solid #e5e7eb", borderRight: "none" }}>
                /blog/
              </span>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => { setSlugManual(true); set("slug", slugify(e.target.value)); }}
                placeholder="my-post-slug"
                className="flex-1 px-2 py-2 text-xs outline-none rounded-r-lg"
                style={{ border: "1px solid #e5e7eb", borderLeft: "none", color: "#333" }}
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#888" }}>
              PUBLISH DATE
            </label>
            <input
              type="text"
              value={post.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="February 26, 2026"
              className={inputCls}
              style={inputStyle}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#888" }}>
              CATEGORY
            </label>
            <select
              value={post.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputCls}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Read time */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#888" }}>
              <Clock size={11} /> READ TIME <span className="font-normal">(auto)</span>
            </label>
            <input
              type="text"
              value={post.readTime}
              onChange={(e) => set("readTime", e.target.value)}
              placeholder="5 min read"
              className={inputCls}
              style={inputStyle}
            />
          </div>
        </div>

        {/* ── Tags + Cover ── */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#888" }}>
              <Tag size={11} /> TAGS <span className="font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={post.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="solo travel, budget tips, Europe"
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#888" }}>
              <Image size={11} /> COVER IMAGE URL
            </label>
            <input
              type="url"
              value={post.coverImageUrl}
              onChange={(e) => set("coverImageUrl", e.target.value)}
              placeholder="https://images.unsplash.com/…"
              className={inputCls}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Cover preview */}
        {post.coverImageUrl && (
          <div className="rounded-xl overflow-hidden h-48 w-full">
            <img src={post.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
          </div>
        )}

        {/* ── Excerpt ── */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#888" }}>EXCERPT</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={2}
            placeholder="A short description that appears on the blog listing page…"
            className={`${inputCls} resize-none`}
            style={inputStyle}
          />
        </div>

        {/* ── Body editor ── */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5e7eb", background: "white" }}>
          {/* Toolbar */}
          <div className="flex items-center gap-0.5 px-3 py-2 flex-wrap" style={{ borderBottom: "1px solid #e5e7eb", background: "#fafafa" }}>
            <ToolBtn onClick={() => insertAround("**")} title="Bold"><Bold size={14} /></ToolBtn>
            <ToolBtn onClick={() => insertAround("*")} title="Italic"><Italic size={14} /></ToolBtn>
            <div className="w-px h-5 mx-1" style={{ background: "#e5e7eb" }} />
            <ToolBtn onClick={() => insertLinePrefix("## ")} title="Heading 2"><Heading2 size={14} /></ToolBtn>
            <ToolBtn onClick={() => insertLinePrefix("### ")} title="Heading 3"><Heading3 size={14} /></ToolBtn>
            <div className="w-px h-5 mx-1" style={{ background: "#e5e7eb" }} />
            <ToolBtn onClick={() => insertLinePrefix("> ")} title="Quote"><Quote size={14} /></ToolBtn>
            <ToolBtn onClick={() => insertLinePrefix("- ")} title="Bullet list"><List size={14} /></ToolBtn>
            <ToolBtn onClick={() => insertBlock("\n---\n")} title="Divider"><Minus size={14} /></ToolBtn>
            <div className="w-px h-5 mx-1" style={{ background: "#e5e7eb" }} />
            <ToolBtn onClick={() => insertAround("[", "](https://)")} title="Link"><Link2 size={14} /></ToolBtn>
            <ToolBtn onClick={() => insertBlock("![Image description](https://)\n")} title="Image"><Image size={14} /></ToolBtn>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium"
              style={preview
                ? { background: DARK, color: "white" }
                : { background: "#f0f0f0", color: "#555" }
              }
            >
              {preview ? <Edit3 size={12} /> : <Eye size={12} />}
              {preview ? "Edit" : "Preview"}
            </button>
          </div>

          {/* Editor / Preview */}
          {preview ? (
            <div className="px-6 py-5 min-h-64" style={{ maxWidth: "720px" }}>
              <MarkdownPreview content={post.body} />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={post.body}
              onChange={(e) => set("body", e.target.value)}
              rows={24}
              placeholder={`Write your post in Markdown…\n\n## Section Heading\n\nYour paragraph text here.\n\n- Bullet point one\n- Bullet point two\n\n> A beautiful quote from your travels.\n\nTip: use the toolbar above or type Markdown directly.`}
              className="w-full outline-none resize-none px-5 py-4 text-sm font-mono leading-relaxed"
              style={{ color: "#333", background: "white", minHeight: "480px" }}
            />
          )}
        </div>

        {/* ── Markdown cheat sheet ── */}
        <details className="text-xs rounded-lg px-4 py-3" style={{ background: "#f9fafb", border: "1px solid #e5e7eb", color: "#888" }}>
          <summary className="cursor-pointer font-semibold" style={{ color: "#666" }}>📝 Markdown quick reference</summary>
          <div className="grid sm:grid-cols-2 gap-x-8 mt-3 space-y-1">
            {[
              ["**bold**", "Bold text"],
              ["*italic*", "Italic text"],
              ["## Heading 2", "Section heading"],
              ["### Heading 3", "Sub-heading"],
              ["> Quote", "Blockquote"],
              ["- Item", "Bullet list"],
              ["1. Item", "Numbered list"],
              ["[text](url)", "Hyperlink"],
              ["![alt](url)", "Image"],
              ["---", "Horizontal divider"],
            ].map(([syntax, desc]) => (
              <div key={syntax} className="flex gap-3 py-0.5">
                <code className="font-mono shrink-0" style={{ color: "#c7254e", background: "#f4f4f4", borderRadius: "3px", padding: "1px 4px" }}>{syntax}</code>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </details>

        {/* ── Bottom save bar ── */}
        <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4" style={{ background: "white", border: "1px solid #e5e7eb" }}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: "#666" }}>Status:</span>
            <button
              type="button"
              onClick={() => set("published", !post.published)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={post.published
                ? { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }
                : { background: "#fafafa", color: "#999", border: "1px solid #e5e7eb" }
              }
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: post.published ? "#16a34a" : "#d1d5db" }} />
              {post.published ? "Published" : "Draft"}
            </button>
            <span className="text-xs" style={{ color: "#bbb" }}>
              {post.body ? `${post.body.trim().split(/\s+/).filter(Boolean).length} words` : ""}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}
            >
              <Save size={14} /> Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, opacity: saving ? 0.7 : 1 }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
              {post.published ? "Update & Publish" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
