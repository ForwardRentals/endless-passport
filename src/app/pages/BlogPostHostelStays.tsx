import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

import imgHostelGroup  from "figma:asset/db4463bcd50cca5963f3fe1844650284a31b659e.png";
import imgHostelBeach  from "figma:asset/e219621c23a7a86919cd918c60f32b84f5d74e9a.png";

const tags = ["budget travel", "hostel tips", "solo travel safety"];

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

export function BlogPostHostelStays() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={imgHostelBeach}
          alt="Travelers connecting in a hostel common area"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ objectPosition: "center 60%" }}
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
              Innovative Ways to Enjoy Safe Hostel Stays
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> August 24, 2022
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
              src={imgHostelBeach}
              alt="Travelers connecting and socializing in a hostel setting"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "520px", objectFit: "cover", objectPosition: "center 60%" }}
            />
          </figure>

          {/* Intro */}
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Before solo traveling to what has now topped 40 countries, I had wondered if staying in
              hostels was safe. Horror stories (and a certain movie franchise) didn't exactly assuage my
              fears. Yet, I knew that staying in luxury hotels would not take me very far on a
              backpacker's budget.
            </p>
            <p>
              By utilizing the free Hostelworld app, buying a trusty lock, and respecting hostel rules,
              you too can safely enjoy stays in hostels all over the world. Along your journey, you will
              be able to save your hard-earned dollars, and even turn once strangers into lifelong friends!
            </p>
            <p>
              While booking the average hostel stay may seem easy enough to navigate, below are helpful
              pointers to save time and build confidence in booking your next journey. Also, read about
              what locks to buy, and hostel rules to follow so as to contribute to a safe and enjoyable
              stay for all.
            </p>
          </div>

          {/* ── WHAT IS A HOSTEL ── */}
          <SectionHeading>What is a Hostel?</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Hostels are establishments that offer inexpensive lodging for travelers; generally, but not
              limited to, young adults and students. By sharing the kitchen, living room, and sleeping
              spaces, hostels have the unique ability to build trust and community while saving guests
              lots of money.
            </p>
            <p>
              Oftentimes, the best hostels offer free experiences to bring guests together such as movie
              nights, bar crawls, or trivia nights. These events are not compulsory, but a great way for
              travelers to meet, connect and have fun. In fact, I met many of my all-time favorite
              international friends in hostels, simply by striking up a conversation at these engagements.
            </p>
          </div>

          {/* ── HOSTELWORLD ── */}
          <SectionHeading>Familiarize Yourself with Hostelworld</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              While hostels can be fun and friendly places, you need to equip yourself with as great a
              possibility of staying in the cleanest and safest establishments possible. By downloading
              the free Hostelworld app through the App Store or Google Play, you can search for the
              perfect fit based on your particular standards.
            </p>
            <p>
              On the app, backpackers from all over the world rate their hostel stays, including their
              opinions about staff care, overall cleanliness, value, and, most importantly, personal
              safety. Hostels post daily vacancies, hoping to woo guests-to-be to book their stay.
            </p>
            <p>
              Individual listings also include photos of the hostel and a deep well of reviews of past
              verified guests. The best spots inevitably rise to the top of search results. Increase your
              chances of a great stay by utilizing specific search filters.
            </p>
          </div>

          {/* ── FILTERS ── */}
          <SectionHeading>Utilize Filters in Your Search</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              When staying amongst strangers, your personal comfort level is key. Fortunately,
              Hostelworld helps make customizing your experience quite easy. After plugging in your
              destination and dates, you can refine your search results by price, distance, and, most
              importantly, rating.
            </p>
            <p>
              I will rarely consider staying at hostels rated lower than an overall score of 8.5 out of
              10. If it passes that initial test, then I will begin clicking on individual listings to
              read backpacker reviews, examine location, view photos, and potentially add it to my list
              of maybes.
            </p>
            <p>
              When narrowing your search, exercise common sense. Within seconds, it is obvious if a
              particular hostel is intimate or large, quiet or party-like. Read reviews to reinforce your
              intuition (or confirm your suspicion!).
            </p>
            <p>
              Hostel experiences are customizable in that they offer a variety of types of rooms.
              Generally, there are multiple dormitory rooms, each set up in a bunk bed format. Usually,
              there are mixed-gender and female-only room options available. My gal pals have emphasized,
              for both safety and peace of mind, how important the latter option is for hostels to offer.
            </p>
            <p>
              Generally, the more people you share your sleeping quarters with, the cheaper the cost.
              While 12- and even 16-bed spaces are available for penny-pinching hostelers, I generally
              choose to share a 4- or 6-bed room. Fewer disruptions often occur here; snoring, folks
              coming in at all hours, or, even, canoodling! Private rooms are available but can begin to
              rival the price of hotels.
            </p>
            <p>
              Incidentally, bathrooms are generally divided by gender, although in-suite bathroom options
              exist, and are listed at a premium, when available.
            </p>
          </div>

          {/* Mid-article photo */}
          <figure className="my-10">
            <img
              src={imgHostelGroup}
              alt="Connecting with friends from all over the world at a hostel"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "420px", objectFit: "cover", objectPosition: "center 30%" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Connecting with friends from all over the world
            </figcaption>
          </figure>

          {/* Pull quote */}
          <blockquote
            className="my-10 py-6 px-8 rounded-xl"
            style={{ background: DARK, borderLeft: `4px solid ${GOLD}` }}
          >
            <p
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6 }}
            >
              "I met many of my all-time favorite international friends in hostels, simply by striking up a conversation."
            </p>
          </blockquote>

          {/* ── BOOK IT ── */}
          <SectionHeading>Book It!</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Once you have found your ideal hostel and room type in your Hostelworld search, securely
              pay with a credit card to book your stay. You will generally front a non-refundable deposit
              of about 15% to secure your spot, and pay the remainder upon arrival.
            </p>
            <p>
              I usually book two nights ahead of arriving at a new destination. It strikes a nice balance
              of not having to check out the very next morning, but also offers an "out", if the chosen
              hostel isn't all it's cracked up to be.
            </p>
            <p>
              In the rare instance, I have ever had a problem with a rowdy roommate, most commonly an
              innocently loud snorer, the hostel employee on duty has always helped me immediately
              relocate to a comparable, quieter room.
            </p>
          </div>

          {/* ── LOCK ── */}
          <SectionHeading>Purchase a Good Lock</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Hostels will provide a locker for you in your room, but the lock is your responsibility.
              I have never had anything stolen from me through my hundreds of hostel stays. A big reason
              for this is that I lock up my valuables. I travel with at least two locks to accommodate
              different locker styles, and, also, if one gets lost along the way.
            </p>
            <p>
              If you prefer to keep a hidden key with you, this durable{" "}
              <A href="https://amzn.to/3Qa0noH">Master Lock</A> is the way to go. Otherwise, if you
              like the option of a resettable combination, go with this{" "}
              <A href="https://amzn.to/3TDi6I0">Brinks Home Security Lock</A>. I personally like and
              use both types.
            </p>
          </div>

          {/* ── RULES ── */}
          <SectionHeading>Follow the Rules</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Upon check-in, a hostel employee will run through a list of your rules and expectations.
              You will likely have to sign a document promising to abide by these guidelines with the
              possibility of being removed from the premises if in violation.
            </p>
            <p>
              The biggest offenses include drug use, sneaking in outside guests, destroying property, or
              disturbing guests during quiet hours. Fortunately, our collective universe of hostelers
              understands these guiding principles, and everybody largely respects one another.
            </p>
            <p>
              If another hosteler is ever harassing you in any way that makes you uncomfortable, consult
              an employee, who will help find a discreet solution that helps keep you safe.
            </p>
          </div>

          {/* ── TAKEAWAYS ── */}
          <SectionHeading>Key Takeaways</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Properly utilizing Hostelworld to book your hostel stays will help keep you safe while
              traveling. By familiarizing yourself with its key features, you will find the safest
              hostels that also help connect you with awesome like-minded travelers from all over the
              world. Buy a good lock, follow hostel rules, and have fun exploring!
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
              src={imgHostelGroup}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center 20%" }}
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
              to="/blog/best-debit-card-abroad"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                What is the Best Debit Card to Take Abroad?
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