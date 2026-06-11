import { Link } from "react-router";
import { Calendar, Tag, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

import imgTajMahal from "figma:asset/ef7bf88fdec305117ca3ec996a9a44dbd368eca4.png"; // Brian at the Taj Mahal
import imgBagan    from "figma:asset/2fac0f66fdd101ef4dd5cf3035f989c712e28bca.png"; // Brian arms wide over Bagan temples

const tags = ["welcome", "solo travel", "travel inspiration"];

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
    >
      {children}
    </a>
  );
}

export function BlogPostWelcome() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={imgTajMahal}
          alt="Brian Michalski smiling in front of the Taj Mahal in Agra, India"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ objectPosition: "center 20%" }}
        />
        <div className="relative pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
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
              Welcome to Endless Passport!
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> August 13, 2022
              </span>
              <span>·</span>
              <span>By <span style={{ color: GOLD }}>Brian</span></span>
              <span>·</span>
              <span>3 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <article className="py-14 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Hero photo */}
          <figure className="mb-10">
            <img
              src={imgTajMahal}
              alt="Brian Michalski smiling in front of the Taj Mahal in Agra, India"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "560px", objectFit: "cover", objectPosition: "center 15%" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Brian at the Taj Mahal — Agra, India
            </figcaption>
          </figure>

          {/* Letter greeting */}
          <p
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.25rem",
              fontStyle: "italic",
              color: "#888",
              letterSpacing: "0.02em",
            }}
          >
            Greetings World Traveler,
          </p>

          {/* Body */}
          <div className="space-y-6 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.9 }}>
            <p>
              Welcome to <strong style={{ color: DARK }}>Endless Passport</strong>! My name is Brian
              Michalski. Thank you for exploring with me. This platform exists to educate and inspire
              budding global nomads all over the world.
            </p>
            <p>
              By providing important resources, insightful gems, and inspiring photography, my goal is
              to help you realize and develop your perfect journey. I offer a variety of in-person,
              virtual, and pre-recorded travel talks to make your voyage a reality. You may{" "}
              <Link
                to="/book-a-talk"
                style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                book me for your next occasion
              </Link>{" "}
              or attend an upcoming{" "}
              <Link
                to="/events"
                style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                local event
              </Link>!
            </p>
            <p>
              We all travel for a variety of purposes. There is no one right answer. During my three
              years of collective solo backpacking around the world, I worked, volunteered, and
              navigated my way through over 30 countries. So much of it developed organically and was
              revised as I went along. That daily reality was often scary, but also liberating.
            </p>
            <p>
              When giving my talks to young adults, adults, and seniors, I communicate the importance
              of stepping outside our comfort zones, coping with inevitable travel setbacks, and finding
              ways to persevere so as to reap the long-term rewards. There is such a variety of
              opportunities near and far that, when we each contribute, we better ourselves by helping
              others. Karma is very real in the travel universe.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="my-12 py-7 px-8 rounded-xl"
            style={{ background: DARK, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.65 }}
            >
              "That daily reality was often scary, but also liberating."
            </p>
          </blockquote>

          {/* Bagan photo */}
          <figure className="my-10">
            <img
              src={imgBagan}
              alt="Brian standing atop a stone pillar in Bagan, Myanmar, arms outstretched wide against a brilliant blue sky with ancient temples dotting the green landscape below"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "520px", objectFit: "cover", objectPosition: "center 25%" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Bagan, Myanmar — the feeling that makes it all worth it
            </figcaption>
          </figure>

          {/* Closing paragraph */}
          <div className="space-y-6 leading-relaxed mt-8" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.9 }}>
            <p>
              Along with new website content being added regularly, please subscribe to my newsletter
              for important updates and helpful information. Lastly, discover the deeper layers of
              Endless Passport on{" "}
              <SocialLink href="https://www.instagram.com/seebriantravel/">Instagram</SocialLink>,{" "}
              <SocialLink href="https://www.youtube.com/brianmichalskitravels">YouTube</SocialLink>,{" "}
              <SocialLink href="https://www.facebook.com/endlesspassport/events/">Facebook</SocialLink>,
              and{" "}
              <SocialLink href="https://twitter.com/seebriantravel">Twitter</SocialLink>.
            </p>
          </div>

          {/* Sign-off */}
          <div
            className="mt-10 pt-8 pb-2"
            style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
          >
            <p
              className="mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#777",
              }}
            >
              May your map be filled with many pins.
            </p>
            <p
              className="mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#777",
              }}
            >
              Safe travels,
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: DARK,
                marginTop: "0.5rem",
              }}
            >
              Brian Michalski
            </p>
            <p style={{ fontSize: "0.85rem", color: "#aaa", marginTop: "0.2rem" }}>
              Endless Passport
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
              src={imgTajMahal}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 15%" }}
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
              to="/blog/hostel-stays"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                Innovative Ways to Enjoy Safe Hostel Stays
              </span>
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </article>

      {/* ─── CTA STRIP ─── */}
      <section
        className="py-14 px-4"
        style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="uppercase tracking-widest text-xs mb-4"
            style={{ color: GOLD, fontWeight: 600 }}
          >
            Ready to Start Your Journey?
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: DARK,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            }}
          >
            Bring Endless Passport to Your Community
          </h2>
          <p className="mb-8" style={{ color: "#666", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a live travel talk for your school, library, organization, or private event —
            or attend an upcoming public event near Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-a-talk"
              className="px-7 py-3 rounded text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: goldGradient, color: "white" }}
            >
              Book a Talk
            </Link>
            <Link
              to="/events"
              className="px-7 py-3 rounded text-sm font-medium transition-colors"
              style={{ background: "transparent", color: DARK, border: `1.5px solid ${DARK}` }}
              onMouseEnter={e => {
                e.currentTarget.style.background = DARK;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = DARK;
              }}
            >
              View Events
            </Link>
          </div>
        </div>
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
