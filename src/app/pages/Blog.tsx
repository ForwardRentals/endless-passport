import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { DARK, GOLD } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import brianCamino  from "figma:asset/5693ebe4bfe68301b15f1cff3cff11fdd258e80f.png";
import brianStorage  from "figma:asset/9bfe7b7e91b9961d943463637a7bff079c49c3ac.png";
import imgPackHero   from "figma:asset/4be0af614b01a2a3131569b7609f5e87accb8a2c.png";
import imgPacksHero  from "figma:asset/cc633849077f9c84e32f40d3fe10e9ea028ce66a.png";
import imgCurrency   from "figma:asset/efe398cf53ac666011b80e30fa282d3893da61f9.png";
import imgTajMahal   from "figma:asset/ef7bf88fdec305117ca3ec996a9a44dbd368eca4.png";
import imgHostel     from "figma:asset/e219621c23a7a86919cd918c60f32b84f5d74e9a.png";

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a`;

const posts = [
  {
    id: 1,
    title: "The Year in Review and a Look Ahead",
    excerpt: "Bowling leagues, the Camino de Santiago, the Azores, Morocco, and what it means when 'home' starts to change. A year-end reflection from the road.",
    image: brianCamino,
    date: "December 30, 2023",
    readTime: "6 min read",
    category: "Reflection",
    tags: ["solo travel", "reflection", "Camino de Santiago"],
    href: "/blog/year-in-review-2023",
  },
  {
    id: 2,
    title: "Four Weeks To Go",
    excerpt: "I leave for the Iberian Peninsula and Africa in less than a month. A look back at where it all started — and what trading a suitcase for a backpack really means.",
    image: brianStorage,
    date: "August 24, 2023",
    readTime: "2 min read",
    category: "Stories",
    tags: ["trip prep", "solo backpacking", "pre-departure"],
    href: "/blog/four-weeks-to-go",
  },
  {
    id: 3,
    title: "Packing List for a Backpacking Journey Abroad",
    excerpt: "Fitting everything you own into two backpacks sounds impossible — but it's not only doable, it's liberating. Here's the complete gear guide from clothing to tech.",
    image: imgPackHero,
    date: "September 2, 2022",
    readTime: "10 min read",
    category: "Travel Tips",
    tags: ["packing list", "backpacking tips", "budget travel"],
    href: "/blog/packing-list",
  },
  {
    id: 4,
    title: "Which Backpacks to Buy for Extended Travel",
    excerpt: "Ditch the rolling suitcase. Here's why Tortuga's 45L Outbreaker and 27L Laptop Backpack are the only two bags you'll ever need for long-term travel.",
    image: imgPacksHero,
    date: "August 25, 2022",
    readTime: "7 min read",
    category: "Travel Tips",
    tags: ["gear review", "backpacks", "carry-on travel"],
    href: "/blog/which-backpacks-to-buy",
  },
  {
    id: 5,
    title: "What is the Best Debit Card to Take Abroad?",
    excerpt: "No fees, unlimited ATM rebates worldwide, and 24/7 emergency support — here's why the Charles Schwab debit card is every long-term traveler's financial secret weapon.",
    image: imgCurrency,
    date: "August 24, 2022",
    readTime: "6 min read",
    category: "Travel Tips",
    tags: ["budget travel", "money tips", "travel finance"],
    href: "/blog/best-debit-card-abroad",
  },
  {
    id: 6,
    title: "Innovative Ways to Enjoy Safe Hostel Stays",
    excerpt: "Horror movies won't stop me — and they shouldn't stop you. Here's how to find, book, and enjoy safe, social, budget-friendly hostels anywhere in the world.",
    image: imgHostel,
    date: "August 24, 2022",
    readTime: "7 min read",
    category: "Travel Tips",
    tags: ["budget travel", "hostel tips", "solo travel safety"],
    href: "/blog/hostel-stays",
  },
  {
    id: 7,
    title: "Welcome to Endless Passport!",
    excerpt: "My name is Brian Michalski. Thank you for exploring with me. This platform exists to educate and inspire budding global nomads all over the world.",
    image: imgTajMahal,
    date: "August 13, 2022",
    readTime: "3 min read",
    category: "Stories",
    tags: ["welcome", "solo travel", "travel inspiration"],
    href: "/blog/welcome",
  },
];

const categories = ["All", "Reflection", "Travel Tips", "Stories", "Guides", "Budget Travel"];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dynamicPosts, setDynamicPosts] = useState<typeof posts>([]);

  useEffect(() => {
    fetch(`${SERVER}/blog/posts`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    })
      .then((r) => r.json())
      .then((json) => {
        const fetched = (json.posts ?? []).map((p: any, i: number) => ({
          id: `dyn-${p.slug}`,
          title: p.title,
          excerpt: p.excerpt || "",
          image: p.coverImageUrl || "",
          date: p.date || "",
          readTime: p.readTime || "",
          category: p.category || "Stories",
          tags: Array.isArray(p.tags)
            ? p.tags
            : (p.tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
          href: `/blog/${p.slug}`,
          _createdAt: p.createdAt,
        }));
        setDynamicPosts(fetched);
      })
      .catch(() => {});
  }, []);

  // Merge dynamic + hardcoded, dynamic posts first (newest), then hardcoded
  const allPosts = [...dynamicPosts, ...posts].sort((a: any, b: any) => {
    const da = a._createdAt ? new Date(a._createdAt).getTime() : new Date(a.date).getTime();
    const db = b._createdAt ? new Date(b._createdAt).getTime() : new Date(b.date).getTime();
    return db - da;
  });

  const filtered = activeCategory === "All" ? allPosts : allPosts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: DARK }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-widest text-sm mb-4" style={{ color: GOLD, fontWeight: 500 }}>
            Blog
          </p>
          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
            }}
          >
            Stories from the Road
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
            Practical travel tips, guides, memorable moments, and key reflections from half a decade of solo backpacking through over 60 countries.
          </p>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ─── */}
      <section className="py-6 px-4 sticky top-16 lg:top-20 z-30 shadow-sm" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all"
              style={{
                background: activeCategory === cat ? DARK : "transparent",
                color: activeCategory === cat ? "white" : "#555",
                border: activeCategory === cat ? "none" : "1px solid #ddd",
                fontWeight: activeCategory === cat ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── FEATURED POST ─── */}
      <section className="py-12 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs"
                  style={{ background: GOLD, color: "white", fontWeight: 500 }}
                >
                  Latest Post
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center" style={{ background: "white" }}>
                <span
                  className="text-xs uppercase tracking-wider mb-3 inline-block"
                  style={{ color: GOLD, fontWeight: 600 }}
                >
                  {filtered[0].category}
                </span>
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: "#0F1932",
                    fontSize: "1.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {filtered[0].title}
                </h2>
                <p className="mb-5 leading-relaxed" style={{ color: "#666", fontSize: "0.95rem" }}>
                  {filtered[0].excerpt}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {filtered[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{ background: "rgba(13,30,38,0.07)", color: "#555" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: "#999" }}>
                  <span className="flex items-center gap-1"><Calendar size={13} /> {filtered[0].date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {filtered[0].readTime}</span>
                </div>
                <Link
                  to={filtered[0].href}
                  className="inline-flex items-center gap-2 text-sm"
                  style={{ color: GOLD, fontWeight: 500 }}
                >
                  Read Article <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center py-10" style={{ color: "#aaa" }}>No posts in this category yet.</p>
          )}
        </div>
      </section>

      {/* ─── MORE POSTS COMING ─── */}
      {filtered.length > 0 && (
        <section className="py-12 pb-20 px-4" style={{ background: "#FAFAF8" }}>
          <div className="max-w-6xl mx-auto">
            {filtered.length > 1 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filtered.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    to={post.href}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="text-xs uppercase tracking-wider mb-2 inline-block"
                        style={{ color: GOLD, fontWeight: 600 }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="mb-2"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          color: "#0F1932",
                          fontSize: "1.05rem",
                          lineHeight: 1.35,
                        }}
                      >
                        {post.title}
                      </h3>
                      <p className="mb-3 leading-relaxed" style={{ color: "#777", fontSize: "0.875rem" }}>
                        {post.excerpt.slice(0, 100)}…
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ background: "rgba(13,30,38,0.06)", color: "#666" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs" style={{ color: "#aaa" }}>
                        <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl p-10 text-center"
                style={{ background: "white", border: "2px dashed rgba(0,0,0,0.08)" }}
              >
                <p className="uppercase tracking-widest text-xs mb-3" style={{ color: GOLD, fontWeight: 600 }}>
                  More Coming Soon
                </p>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.3rem" }}
                >
                  New posts are on the way
                </h3>
                <p style={{ color: "#888", fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto" }}>
                  Brian is actively writing about his travels. Follow along on social media for updates as new articles are published.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER ─── */}
      <section className="py-16 px-4 text-center" style={{ background: DARK }}>
        <h2
          className="text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700 }}
        >
          Get New Posts in Your Inbox
        </h2>
        <p className="mb-8" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "400px", margin: "0 auto 2rem" }}>
          Travel tips, stories, and inspiration — delivered straight to you.
        </p>
        <NewsletterSignup />
      </section>
    </div>
  );
}