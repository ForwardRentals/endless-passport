import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

// Brian's actual photos for this post
import brianCamino   from "figma:asset/5693ebe4bfe68301b15f1cff3cff11fdd258e80f.png"; // Brian at Cathedral of Santiago de Compostela
import brianMorocco  from "figma:asset/59fbfea23d887af08cced7a2527f34f76af9939e.png";  // Brian in the blue streets of Chefchaouen
import brianAzores   from "figma:asset/516468f5c32137038ea1e1b862a9cb27d956498e.png";  // Brian selfie overlooking Sete Cidades crater lake

const tags = ["solo travel", "reflection", "Camino de Santiago", "Morocco", "Azores", "year in review"];

export function BlogPostYearInReview() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={brianCamino}
          alt="Brian at the Cathedral of Santiago de Compostela"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
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
              The Year in Review and a Look Ahead
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> December 30, 2023
              </span>
              <span>·</span>
              <span>By <span style={{ color: GOLD }}>Brian</span></span>
              <span>·</span>
              <span>6 min read</span>
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

          {/* Hero photo */}
          <figure className="mb-10">
            <img
              src={brianCamino}
              alt="Brian at the Cathedral of Santiago de Compostela after completing the coastal Camino"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "520px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Arriving at the Cathedral of Santiago de Compostela after completing the coastal Camino
            </figcaption>
          </figure>

          {/* Body — opening */}
          <div
            className="space-y-5 leading-relaxed"
            style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}
          >
            <p>
              This year, I bowled in a league, went to Austin, had a blast tutoring each week, saw Ed Sheeran
              in concert, dog-sat a lot, moved out of my favorite living space, sold my beloved MINI Cooper,
              completed the coastal Camino from Portugal to Spain, visited the Azores Islands, and entered
              my sixth continent, Africa, kicking it off in Morocco, country #44. A highlight reel of a year
              that also unearthed several developments and revelations.
            </p>

            <p>
              It was difficult choosing to say farewell to my stimulating and enriching lifestyle in
              Chicagoland. I adored my apartment, but a nearly $2,000 per month rent helped me decide to
              self-evict. That monthly savings lasts ages out here in the travel-verse.
            </p>

            <p>
              Concluding tutoring 12 amazing kids per week was the toughest decision to make. I miss each of
              them but am thankful that I get to check in monthly via Zoom as they learn about the country
              that I have just explored.
            </p>

            <p>
              With my other occupation of educating adult travelers, now, I have the luxury to give these
              presentations virtually as I go along — a blessing that I cannot quantify. Incidentally, I look
              forward to sharing my experience along the Camino de Santiago with you all, starting February 13th.
            </p>
          </div>

          {/* Azores photo */}
          <figure className="my-10">
            <img
              src={brianAzores}
              alt="Brian selfie overlooking the Sete Cidades crater lake in the Azores, Portugal"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "480px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Sete Cidades crater lake, São Miguel — the Azores, Portugal
            </figcaption>
          </figure>

          {/* Body — middle */}
          <div
            className="space-y-5 leading-relaxed"
            style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}
          >
            <p>
              While healthy and motivated to explore a variety of destinations, I am, at the same time, seeing
              the beginning of the end of these types of long-term solo backpacking trips. Travel in my forties
              will evolve alongside my lifestyle needs and desires.
            </p>

            <p>
              To be clear, 101 days in, this adventure is just getting started. I expect to visit a couple dozen
              countries spanning roughly two years. I may work and/or volunteer along the way (or I may not).
              You know that I love an open-ended journey rich in serendipitous opportunities.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="my-10 py-6 px-8 rounded-xl"
            style={{ background: DARK, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6 }}
            >
              "The definition of 'home' is evolving."
            </p>
          </blockquote>

          {/* Morocco photo */}
          <figure className="my-10">
            <img
              src={brianMorocco}
              alt="Brian standing in the blue-washed streets of Chefchaouen, Morocco"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "560px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Chefchaouen, Morocco — country #44 and Brian's 6th continent
            </figcaption>
          </figure>

          {/* Body — closing */}
          <div
            className="space-y-5 leading-relaxed"
            style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}
          >
            <p>
              Returning home will look different, but planning for that inevitable homecoming is part of this
              experience. My parents will soon move away from Chicagoland; many friends have also left. Several
              have passed on, including my travel role model, Grandma Pat. Most importantly, I don't feel the
              same desire to re-anchor there that I once did.
            </p>

            <p>
              This leads me to weigh a relocation to one of my favorite destinations: America's Southwest,
              Colombia, Australia, or Portugal. Wildcard dream destinations are possibilities too! Feedback is
              appreciated, but this is my decision to make and I will do so independently.
            </p>

            <p>
              I look forward to a rewarding and challenging year of exploration that will, hopefully, spill over
              into 2025. Thanks for your kindness and support. Happy New Year!
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
              src={brianAzores}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
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
        </div>
      </article>

      {/* ─── BACK TO BLOG ─── */}
      <section className="py-14 px-4 text-center" style={{ background: "white" }}>
        <p
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.4rem" }}
        >
          More posts are on the way
        </p>
        <p className="mb-7" style={{ color: "#888", fontSize: "0.9rem" }}>
          Brian is actively writing about his travels.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm"
          style={{ background: DARK, color: "white", fontWeight: 500 }}
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </section>

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