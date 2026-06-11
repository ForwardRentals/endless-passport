import { Link } from "react-router";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { NewsletterSignup } from "../components/NewsletterSignup";

import imgCurrency from "figma:asset/efe398cf53ac666011b80e30fa282d3893da61f9.png"; // fan of Australian currency notes
import imgCoins    from "figma:asset/c0fe65b779402f9dbba7caedc61e58bfd6faaeec.png"; // circle of coins from countries worldwide

const tags = ["budget travel", "money tips", "travel finance"];

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

export function BlogPostDebitCard() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <img
          src={imgCurrency}
          alt="A fan of Australian currency notes spread out on a dark surface"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ objectPosition: "center 40%" }}
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
              What is the Best Debit Card to Take Abroad?
            </h1>
            <div className="flex items-center justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> August 24, 2022
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
              src={imgCurrency}
              alt="A colorful fan of Australian 50, 20, 10, and 5 dollar notes spread on a dark surface"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "480px", objectFit: "cover", objectPosition: "center 40%" }}
            />
          </figure>

          {/* Intro */}
          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              It seems like every bank boasts that they have the perfect solution, only to find that they
              quickly change the terms and conditions, begin charging hidden fees, and are slow to pick up
              the phone when you need urgent customer care. I got tired of this mistreatment and found a
              solution that will help you in your future travels.
            </p>
            <p>
              The Charles Schwab Bank High Yield Investor Checking Account debit card is the best choice
              when traveling internationally. It provides peace of mind with no fees and offers unlimited
              ATM rebates worldwide. Their amazing 24/7 customer support can help in emergencies while
              abroad, and your money grows as you go. Start the application process{" "}
              <A href="https://www.schwab.com/checking">here</A>.
            </p>
            <p>
              It is easy to get frustrated when seeking the perfect debit card to take along while
              traveling. Fortunately, I have consolidated this process, and you will soon see why Schwab
              is a perfect fit. Spending a few minutes now learning about the tremendous benefits this
              debit card provides has the potential to earn you thousands of dollars in the near future.
            </p>
          </div>

          {/* ── NO FEES ── */}
          <SectionHeading>No Fees!</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Schwab will never nickel-and-dime you simply for having a checking account with them.
              Utilize the account as much or as little as you would like; you will not get charged
              anything extra, regardless.
            </p>
            <p>
              Using the account to purchase goods and services on the road means that you will never have
              to absorb foreign transaction fees.
            </p>
            <p>
              Keep in mind that foreign vendors may tack on a convenience fee if you use a credit or
              debit card versus cash. This has nothing to do with Schwab's policies but should be kept in
              mind. I always elect to use cash in these scenarios if possible.
            </p>
            <p>
              Additionally, Charles Schwab offers a hefty Annual Percentage Yield (APY) of 0.03%, so your
              money grows even if it sits untouched for long periods. For example, your $10,000 today
              would grow to $10,300 one year from now.
            </p>
          </div>

          {/* ── ATM REBATES ── */}
          <SectionHeading>Unlimited ATM Rebates Worldwide</SectionHeading>

          <div className="space-y-5 leading-relaxed mb-10" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              This is the card's greatest benefit. You will never be charged for using a foreign ATM, no
              matter how frequently you need to withdraw money along your journey.
            </p>
            <p>
              The ATM technically charges you at that moment, but Schwab keeps track of these accruing
              fees throughout the calendar month. Then, come the first business day of the next month,
              they deposit 100% of that money right back into your account. You will also see that little
              extra 0.03% APY we discussed earlier factored in there!
            </p>
            <p>
              At first, absorbing a $3 fee here, and $4 there may not seem like a lot, but it adds up
              quickly, especially if you are going on a long-term journey abroad. While traveling 20
              countries for nearly two years, this card saved me roughly $1,000 in would-be fees. That
              alone paid for my final weeks of venturing through Cuba before returning home!
            </p>
            <p>
              It provides peace of mind. You never have to worry about carrying too many bills on you at
              once. The reality is that cash is king in certain countries. Sometimes you must pay cash for
              accommodation, meals, tours, and more. This is most common in developing countries, although
              not a universal rule. Pickpocketing is, unfortunately, a very real crime that can occur
              anywhere at any time.
            </p>
            <p>
              The Schwab card allows you to withdraw tiny frequent increments of foreign currency from
              ATMs without getting penalized. I find that the slight inconvenience of seeking out ATMs a
              couple of extra times per week is well worth knowing that I generally never have to keep
              track of more than the equivalent of $100 US at any one time.
            </p>
          </div>

          {/* Coins photo */}
          <figure className="mb-10">
            <img
              src={imgCoins}
              alt="Coins from countries around the world arranged in a circle on a wooden surface"
              className="w-full rounded-xl shadow-md"
              style={{ maxHeight: "460px", objectFit: "cover" }}
            />
            <figcaption className="text-center mt-3 text-xs italic" style={{ color: "#aaa" }}>
              Save some major dough with the Charles Schwab debit card
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
              "While traveling 20 countries for nearly two years, this card saved me roughly $1,000 in would-be fees."
            </p>
          </blockquote>

          {/* ── CUSTOMER SERVICE ── */}
          <SectionHeading>Outstanding 24/7 Customer Service</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              In a remote mountain town in Malaysia, I once inserted my Schwab debit card into an ATM to
              withdraw the equivalent of $300 USD to pay for a guided tour. The machine displayed "Error",
              and spit my card back out. I proceeded to attempt the same transaction on a neighboring ATM,
              and the same problem occurred.
            </p>
            <p>
              I returned to my hotel to connect to my Schwab online banking, only to find that the ATMs
              had recorded both transactions as successful, which, in turn, drained my account, but left
              me with no cash in hand.
            </p>
            <p>
              Immediately, I called Schwab to report the issue. It did not matter that it was 3:00 in the
              morning in New York. They picked up, listened to my explanation, reassured me, and conducted
              a thorough investigation to replace the missing funds as quickly as possible. In this most
              urgent of situations, Schwab came through for me, and they have repeatedly done so in far
              less dire scenarios abroad as well.
            </p>
            <p>
              Another time I needed funds deposited from another checking account into my Schwab account
              quicker than the standard 3–5 day hold. They made an exception to speed this along so that
              I could continue my travels.
            </p>
          </div>

          {/* ── ALL ACCOUNTS ── */}
          <SectionHeading>All Your Accounts in One Spot</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Their convenient mobile app is easy to use, secure and reliable. It is simple to make
              deposits and move money with a few simple taps. Connecting to my hostel's WiFi, I could
              transfer money from my US Bank account into my Schwab account in under two minutes.
            </p>
            <p>
              I also happen to have a Roth Contributory IRA account with Schwab. This account is helping
              me save for my retirement. I can easily contribute capital to the account, and manage my
              trades without hassle, fees, or a pesky middleman.
            </p>
            <p>
              At the same time, representatives are happy to help with any questions that I have about my
              account, the health of the stock market, and general advice.
            </p>
            <p>
              Separately, you can schedule a one-on-one in-person appointment with a Schwab account
              adviser to receive more formal coaching and guidance. They are as hands-on as you want them
              to be. I am confident knowing that my future is in safe, secure, and competent hands.
            </p>
          </div>

          {/* ── TAKEAWAYS ── */}
          <SectionHeading>Key Takeaways</SectionHeading>

          <div className="space-y-5 leading-relaxed" style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.85 }}>
            <p>
              Thanks to unlimited worldwide ATM rebates, superb customer service, and a user-friendly
              experience, it is no wonder that the no-fee Charles Schwab debit card is a traveler's
              preferred financial firepower to take on the road. Apply{" "}
              <A href="https://www.schwab.com/checking">here</A>, and happy travels!
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
              src={imgCoins}
              alt="Brian Michalski"
              className="w-16 h-16 rounded-full object-cover shrink-0"
              style={{ objectPosition: "center center" }}
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
              to="/blog/which-backpacks-to-buy"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >
              <span className="text-right">
                <span className="block text-xs uppercase tracking-wider mb-0.5" style={{ color: "#bbb" }}>Next Post</span>
                Which Backpacks to Buy for Extended Travel
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
