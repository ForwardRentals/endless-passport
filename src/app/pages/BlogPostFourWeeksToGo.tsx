import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

// Brian's actual photos for this post
import brianStorage from "figma:asset/9bfe7b7e91b9961d943463637a7bff079c49c3ac.png";  // Brian in front of packed storage unit, 2023
import brianAndMom  from "figma:asset/131c24597cda9b917cd1317922c2efefa418ac73.png";  // Brian & his mom, June 2010, first backpacking trip

const tags = ["trip prep", "solo backpacking", "pre-departure"];

export function BlogPostFourWeeksToGo() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={brianStorage}
          alt="Brian standing proudly in front of his packed storage unit"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="relative pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs capitalize"
                  style={{ background: "rgba(232,168,56,0.2)", color: GOLD, border: "1px solid rgba(232,168,56,0.4)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Four Weeks To Go
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> August 24, 2023
              </span>
              <span>·</span>
              <span>By <span style={{ color: GOLD }}>Brian</span></span>
              <span>·</span>
              <span>2 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <article className="py-14 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: "#999" }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = "#999")}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Hero photo — storage unit */}
          <figure className="mb-10">
            <img
              src={brianStorage}
              alt="Brian standing in front of a packed storage unit full of Bankers Boxes"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "520px", objectFit: "cover", objectPosition: "center top" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Everything he owns, packed up — ready for the next chapter
            </figcaption>
          </figure>

          {/* Body */}
          <div
            className="space-y-5 leading-relaxed"
            style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}
          >
            <p>
              I leave for the Iberian Peninsula and Africa in less than a month. Fortunately, I have been
              extremely organized in the run-up to this trip. Of course, there is plenty to do, but I am
              well on my way!
            </p>
          </div>

          {/* Mom photo */}
          <figure className="my-10">
            <img
              src={brianAndMom}
              alt="Brian and his worried mother in June 2010, right before his first-ever backpacking trip through Europe"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "560px", objectFit: "cover", objectPosition: "center top" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              June 2010 — Brian and his (worried) mother, moments before his very first backpacking journey through Europe
            </figcaption>
          </figure>

          {/* Body continued */}
          <div
            className="space-y-5 leading-relaxed"
            style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}
          >
            <p>
              This is me (and my worried mother), in June 2010, right before getting on the plane for my
              first-ever backpacking journey through Europe. Since then, this young man has learned so much
              about how to travel, including trading a clunky nightmarish rolling suitcase for a couple of
              easy breezy backpacks. More lessons to be learned on this next journey; can't wait!
            </p>
          </div>

          {/* Tags + Share */}
          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}
          >
            <div className="flex flex-wrap gap-2 items-center">
              <Tag size={14} style={{ color: "#bbb" }} />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs capitalize"
                  style={{ background: "#f0f0f0", color: "#666" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#999" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#999")}
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Share2 size={14} /> Share
            </button>
          </div>

          {/* Author bio */}
          <div
            className="mt-8 p-6 rounded-xl flex items-start gap-5"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <img
              src={brianStorage}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 10%" }}
            />
            <div>
              <p
                className="mb-1"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1rem" }}
              >
                Brian Michalski
              </p>
              <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Brian is a Chicago-based educator and world traveler who spent five years solo backpacking
                through 60+ countries. He now shares those stories through live presentations across Chicagoland.
              </p>
            </div>
          </div>

          {/* Next post nav */}
          <div
            className="mt-10 pt-8 flex justify-end"
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <Link
              to="/blog/year-in-review-2023"
              className="flex items-center gap-2 text-sm transition-colors group"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                The Year in Review and a Look Ahead
              </span>
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </article>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-14 px-4 text-center" style={{ background: DARK }}>
        <h2
          className="text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700 }}
        >
          Follow the Adventure
        </h2>
        <p className="mb-7" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "380px", margin: "0 auto 1.75rem" }}>
          Get new posts delivered straight to your inbox.
        </p>
        <NewsletterSignup />
        <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Or follow along on Instagram:{" "}
          <a
            href="https://www.instagram.com/seebriantravel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GOLD }}
          >
            @seebriantravel
          </a>
        </p>
      </section>
    </div>
  );
}