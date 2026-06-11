import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, Tag, ArrowLeft, Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { DARK, GOLD } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a`;

interface Post {
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
}

function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-10 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: DARK, lineHeight: 1.3 }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: DARK, lineHeight: 1.35 }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: DARK }}>{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-5" style={{ color: "#3a3a3a", lineHeight: 1.85, fontSize: "1.05rem" }}>{children}</p>
        ),
        strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#111" }}>{children}</strong>,
        em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
        ul: ({ children }) => <ul className="mb-5 pl-6" style={{ listStyleType: "disc" }}>{children}</ul>,
        ol: ({ children }) => <ol className="mb-5 pl-6" style={{ listStyleType: "decimal" }}>{children}</ol>,
        li: ({ children }) => <li className="mb-1.5" style={{ color: "#3a3a3a", lineHeight: 1.75 }}>{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="pl-5 my-7 italic" style={{ borderLeft: `4px solid ${GOLD}`, color: "#666", fontStyle: "italic" }}>
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith("language-");
          return isBlock ? (
            <pre className="rounded-xl p-5 mb-5 overflow-auto" style={{ background: "#f4f4f4" }}>
              <code style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#333" }}>{children}</code>
            </pre>
          ) : (
            <code className="px-1.5 py-0.5 rounded" style={{ background: "#f4f4f4", fontFamily: "monospace", fontSize: "0.875rem", color: "#c7254e" }}>{children}</code>
          );
        },
        hr: () => <hr className="my-10" style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: "underline" }}>{children}</a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="rounded-xl my-6 w-full object-cover shadow-sm" style={{ maxHeight: "480px" }} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function DynamicBlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${SERVER}/blog/post/${slug}`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#FAFAF8" }}>
        <p className="text-5xl mb-6">🗺️</p>
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: DARK }}>Post Not Found</h1>
        <p className="mb-6" style={{ color: "#888" }}>This post doesn't exist or hasn't been published yet.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: GOLD }}>
          <ArrowLeft size={14} /> Back to the Blog
        </Link>
      </div>
    );
  }

  const tagList = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative w-full" style={{ minHeight: "420px", background: DARK }}>
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
        )}
        <div className="relative max-w-3xl mx-auto px-6 pt-36 pb-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            <ArrowLeft size={14} /> Blog
          </Link>
          <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: GOLD }}>{post.category}</p>
          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", maxWidth: "600px" }}>
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            {post.date && <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>}
            {post.readTime && <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>}
            {tagList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tagList.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ background: "#FAFAF8" }}>
        <article className="max-w-3xl mx-auto px-6 py-14">
          <MarkdownBody content={post.body} />
        </article>
      </div>

      {/* ── Back link ── */}
      <div className="py-8 px-6 text-center" style={{ background: "#FAFAF8", borderTop: "1px solid #eee" }}>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: GOLD }}
        >
          <ArrowLeft size={14} /> Back to all posts
        </Link>
      </div>

      {/* ── Newsletter ── */}
      <section className="py-14 px-4 text-center" style={{ background: DARK }}>
        <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700 }}>
          Get New Posts in Your Inbox
        </h2>
        <p className="mb-7" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "380px", margin: "0 auto 1.75rem" }}>
          Travel tips, stories, and inspiration — delivered straight to you.
        </p>
        <NewsletterSignup />
      </section>
    </div>
  );
}
