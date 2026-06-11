import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

import imgHero       from "figma:asset/cc633849077f9c84e32f40d3fe10e9ea028ce66a.png"; // Brian wearing both packs, smiling
import imgOutbreaker from "figma:asset/6604163cfdacf360fd8872722ebe6120c1ecf58e.png"; // 45L clamshell open, fully loaded
import imgLaptop     from "figma:asset/636d9c794cd1285d40384b75490406aa6843d008.png"; // 27L companion pack, open

const tags = ["gear review", "backpacks", "carry-on travel"];

function A({ href, children }: { href: string; children: React.ReactNode }) {
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-12 mb-4"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: DARK,
        fontSize: "1.45rem",
        lineHeight: 1.25,
        borderBottom: `2px solid ${GOLD}`,
        paddingBottom: "0.4rem",
        display: "inline-block",
      }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-8 mb-3"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: DARK,
        fontSize: "1.15rem",
      }}
    >
      {children}
    </h3>
  );
}

export function BlogPostWhichBackpacks() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={imgHero}
          alt="Brian smiling and wearing both the Tortuga 45L and 27L backpacks"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
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
              Which Backpacks to Buy for Extended Travel
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> August 25, 2022
              </span>
              <span>·</span>
              <span>By <span style={{ color: GOLD }}>Brian</span></span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <article className="py-14 px-4">
        <div className="max-w-2xl mx-auto">

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
              src={imgHero}
              alt="Brian wearing both Tortuga backpacks — the 45L on his back and the 27L laptop bag in front"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "560px", objectFit: "cover", objectPosition: "center 15%" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Brian wearing both Tortuga bags — fully loaded and ready to go
            </figcaption>
          </figure>

          {/* Intro */}
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              The first time I "backpacked" I went to Europe for two months. Through ten countries, I dragged
              around a heavy suitcase on wheels and a very uncomfortable duffel bag that acted as my personal
              item. While that journey was the trip of a lifetime, I could have saved myself a ton of stress
              (and money on chiropractic bills) by carrying two manageable backpacks instead. This article
              explains why Tortuga is the go-to brand for your backpacking needs. We will examine two backpacks
              that they offer, and why you should buy them.
            </p>
          </div>

          {/* ── 45L OUTBREAKER ── */}
          <SectionHeading>Tortuga Outbreaker Backpack</SectionHeading>

          <div className="space-y-5 leading-relaxed mb-8" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Behold the{" "}
              <A href="https://www.tortugabackpacks.com/products/outbreaker-travel-backpack?variant=26900597193">
                Tortuga 45L Outbreaker Backpack
              </A>! At $349, this bad boy more than pays for itself as its unique dimensions allow it to fit
              into the overhead bin as the maximum-sized US carry-on. Think about that: no baggage fees ever!
              They also offer a nifty{" "}
              <A href="https://www.tortugabackpacks.com/products/outbreaker-travel-backpack?variant=26900597257">
                35L option at $299
              </A>. However, for my extended world travels, I had great success with the larger of the two
              so that is what we will focus on.
            </p>
          </div>

          <figure className="mb-8">
            <img
              src={imgOutbreaker}
              alt="Brian's fully loaded Tortuga 45L Outbreaker Backpack laid open clamshell-style showing organized contents"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "480px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              My fully loaded Tortuga 45L Outbreaker — everything in plain sight
            </figcaption>
          </figure>

          <SubHeading>Easy to Organize</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              With the clamshell opening, the 5.1-pound 45L Outbreaker organizes like a suitcase but travels
              like a backpack. My hostel buddies were usually quite envious because their backpacks only opened
              from the top making it difficult to access the majority of their possessions. I witnessed them
              constantly needing to organize and re-organize their stuff. I never have any problems instantly
              accessing my items because everything is always in plain sight!
            </p>
            <p>
              I designate the two mesh zipper pockets for socks and underwear. The spacious main compartment
              is for shirts, pants, and shorts along with a couple of pairs of flip-flops. There is also a
              padded compartment built in for 17" laptops and 9.7" tablets. Fortunately, there are two
              external water bottle pockets on the newest models as well! A smaller separate toiletries bag
              can also easily pack inside this beauty.
            </p>
          </div>

          <SubHeading>Comfortable</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              I find that I can wear my Tortuga 45L Outbreaker backpack for long periods of time. Having a
              backpack like this is critical on travel days especially. Sometimes you can be on your feet for
              multiple hours, getting in and out of transportation, walking to your accommodation, and even
              sprinting through airports. It helps to be as comfortable as possible during these stressful
              transition times.
            </p>
            <p>
              This bag easily adjusts to your height. The helpful hip belt takes over three-quarters of its
              weight off of your shoulders. The shoulder straps are composed of a soft padded foam and the
              back panel is soft and breathable. It includes a convenient removable hip belt and sternum strap
              as well.
            </p>
          </div>

          <SubHeading>Durable</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              For reference, I am still using the Tortuga Outbreaker that I purchased in early 2015! This
              fabulous relic has now been to over 30 countries and is still in great shape. No need to fix
              what is not broken!
            </p>
            <p>
              With the current updated model that we are discussing, the waterproof sailcloth doesn't rip or
              tear. I love the zippers! They are lockable, water-resistant, and seriously durable. The buckles
              and clips also excel at their jobs.
            </p>
            <p>
              As if the above wasn't enough, the 45L Outbreaker Backpack includes a Common Decency Guarantee.
              It ships for free and Tortuga promises no-hassle returns. Lastly, the product is guaranteed for
              life! Plan to buy this many months ahead as they are having trouble keeping it in stock.
            </p>
          </div>

          {/* ── 27L LAPTOP BACKPACK ── */}
          <SectionHeading>Tortuga Outbreaker Laptop Backpack</SectionHeading>

          <div className="space-y-5 leading-relaxed mb-8" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              I can also sing the praises of the{" "}
              <A href="https://www.tortugabackpacks.com/products/outbreaker-laptop-backpack?variant=31630328561735">
                Tortuga 27L Outbreaker Laptop Backpack
              </A>! This little brother of the 45L Outbreaker travels with your laptop or tablet and fits
              under the seat in front of you. Currently, it is listed at $225 and is absolutely worth your
              investment.
            </p>
          </div>

          <figure className="mb-8">
            <img
              src={imgLaptop}
              alt="The Tortuga 27L Laptop Backpack packed open showing rolled clothing, toiletries, and water bottle"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "460px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              The Tortuga 27L Laptop Backpack — the perfect companion to its 45L brother
            </figcaption>
          </figure>

          <SubHeading>Easy to Pack</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              "Spacious" is an understatement! The main compartment has that familiar wide opening for
              ultra-easy access and organization. It also has a secure electronics compartment and padded
              fleece-lined sleeves for your laptop or tablet. I love the expandable water bottle pocket
              as well.
            </p>
          </div>

          <SubHeading>Personal-Item-Sized</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              If you are carrying a suitcase, it so cleverly includes a built-in luggage handle
              pass-through sleeve. It has top and side grab handles that are comfortable to hold for
              longer periods if needed. If I have one complaint, it is that it feels rather heavy at 3.2
              pounds, but I feel that what the backpack is capable of makes it worth carrying around those
              few extra ounces.
            </p>
          </div>

          <SubHeading>Built to Last</SubHeading>
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              The exceptionally durable fabric does not rip or tear. It is waterproof with a helpful assist
              from the lockable water-resistant zippers. Tortuga backpacks can take a beating and they stay
              looking classy!
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="my-10 py-6 px-8 rounded-xl"
            style={{ background: DARK, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6 }}
            >
              "No baggage fees ever — these bags more than pay for themselves."
            </p>
          </blockquote>

          {/* ── TAKEAWAYS ── */}
          <SectionHeading>Key Takeaways</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              You can confidently invest your hard-earned cash in both the{" "}
              <A href="https://www.tortugabackpacks.com/products/outbreaker-travel-backpack?variant=26900597193">
                Tortuga 45L Outbreaker Backpack
              </A>{" "}
              and the{" "}
              <A href="https://www.tortugabackpacks.com/products/outbreaker-laptop-backpack?variant=31630328561735">
                Tortuga 27L Outbreaker Laptop Backpack
              </A>. I know that a collective $574 may sound like a lot but these bags more than pay for
              themselves thanks to their airplane-friendly sizes, incredibly intuitive organization
              compartments, comfort in wearing, and multi-year multi-trip durability. After your next
              journey, please let me know what you think of yours!
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
              src={imgHero}
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
              to="/blog/packing-list"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                Packing List for a Backpacking Journey Abroad
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
