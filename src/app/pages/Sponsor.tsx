import { CheckCircle, Globe, Users, Camera, TrendingUp, Heart, Repeat } from "lucide-react";
import { DARK, GOLD } from "../siteTheme";
import { photoConcertStage } from "../brianImages";
import { pickPhotos } from "../brianTravelPhotos";

// Shuffled fresh on every page load
const heroStripPhotos4 = pickPhotos(4, 25);   // festive top strip
const audiencePhotos3  = pickPhotos(3, 29);   // audience section — 3 equal landscape

const whySponsor = [
  {
    icon: <Users size={22} />,
    title: "Engaged Audiences",
    desc: "Brian's events draw curious, adventurous adults across Chicagoland — a highly engaged demographic that values experiences over things.",
  },
  {
    icon: <Camera size={22} />,
    title: "Authentic Storytelling",
    desc: "Your brand will be woven naturally into Brian's programs — not as an ad, but as a genuine partner supporting cultural exploration.",
  },
  {
    icon: <Globe size={22} />,
    title: "Multi-Platform Reach",
    desc: "Sponsorships extend beyond live events to include blog features, social media posts, and the Endless Passport newsletter.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Growing Platform",
    desc: "Endless Passport is growing rapidly across Chicagoland, with a dedicated audience that is passionate about travel and culture.",
  },
];

const supportOptions = [
  {
    id: "monthly",
    icon: <Repeat size={20} />,
    name: "Monthly Member",
    price: "$20",
    period: "/ month",
    desc: "Join a community that believes in the power of travel, storytelling, and real-world education. Your ongoing support helps bring these experiences to audiences year-round.",
    url: "https://buy.stripe.com/3cI8wO1XV9R1dPv9y64Ni03",
  },
  {
    id: "one-time",
    icon: <Heart size={20} />,
    name: "Support the Mission",
    price: "$25",
    period: "one-time",
    desc: "Help fuel the journey. Your one-time gift supports inspiring talks, global storytelling, and connecting communities through travel.",
    url: "https://buy.stripe.com/28EeVceKH2oz9zfcKi4Ni04",
  },
];

const tiers = [
  {
    id: "wanderer",
    name: "Wanderer",
    price: "$100",
    highlight: false,
    url: "https://buy.stripe.com/bJe7sKfOLgfp26NaCa4Ni00",
    perks: [
      "Logo/name on event resource guide",
      "Verbal mention during presentation",
      "Social media shout-out (1 post)",
      "Link on Endless Passport site",
    ],
  },
  {
    id: "explorer",
    name: "Explorer",
    price: "$250",
    highlight: true,
    url: "https://buy.stripe.com/bJefZg5a71kvh1HcKi4Ni01",
    perks: [
      "Everything in Wanderer",
      "Logo/name on Brian's presentation slides",
      "Social media shout-outs (3 posts)",
      "Featured in blog post",
      "Up to 3 reserved seats to events",
      "Feature in email newsletter",
    ],
  },
  {
    id: "expedition",
    name: "Expedition",
    price: "$500",
    highlight: false,
    url: "https://buy.stripe.com/00wbJ0463aV526NeSq4Ni02",
    perks: [
      "Everything in Explorer",
      "Product placement or giveaway at events",
      "Monthly social media campaign for 6 months",
      "Dedicated blog post with your story",
    ],
  },
];

export function Sponsor() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-sm mb-4" style={{ color: GOLD, fontWeight: 500 }}>
              Partnerships & Sponsorships
            </p>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              Partner with<br />Endless Passport
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
              Connect your brand with a growing community of travel enthusiasts across
              Chicagoland. Sponsor Brian's programs and reach audiences who are ready to explore.
            </p>
          </div>
        </div>
        {/* Festive photo strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 h-32 sm:h-48 gap-1 px-1">
          {heroStripPhotos4.map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt="Events" className="w-full h-full object-cover opacity-70" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY SPONSOR ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Why Partner With Brian
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: DARK,
              }}
            >
              Reach an Audience That Cares
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {whySponsor.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl text-center"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(232,168,56,0.1)", color: GOLD }}
                >
                  {item.icon}
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1rem" }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            className="rounded-xl p-8 grid grid-cols-3 gap-4 text-center"
            style={{ background: DARK }}
          >
            {[
              { value: "400+", label: "Live Events" },
              { value: "3,000+", label: "Audience Members" },
              { value: "60+", label: "Countries of Content" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: GOLD }}
                >
                  {s.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUDIENCE PHOTOS ─── */}
      <section className="py-6 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {audiencePhotos3.map((img, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-xl shadow-md">
              <img src={img} alt="Brian presenting" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── SUPPORT OPTIONS ─── */}
      <section className="py-16 px-4" style={{ background: "white" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Support the Journey
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: DARK,
              }}
            >
              Every Dollar Fuels the Mission
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {supportOptions.map((opt) => (
              <div
                key={opt.id}
                className="rounded-xl p-7 flex flex-col"
                style={{ border: `1px solid rgba(0,0,0,0.1)`, background: "#FAFAF8" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(232,168,56,0.12)", color: GOLD }}
                >
                  {opt.icon}
                </div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem", color: DARK }}
                  >
                    {opt.price}
                  </span>
                  <span style={{ color: "#999", fontSize: "0.85rem" }}>{opt.period}</span>
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.15rem" }}
                >
                  {opt.name}
                </h3>
                <p className="flex-1 mb-6" style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.65 }}>
                  {opt.desc}
                </p>
                <a
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-lg transition-all hover:bg-amber-50"
                  style={{
                    border: `2px solid ${GOLD}`,
                    color: GOLD,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {opt.id === "monthly" ? "Become a Member →" : "Give Now →"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORSHIP TIERS ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Sponsorship Packages
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: DARK,
              }}
            >
              Find the Right Fit
            </h2>
            <p className="mt-2" style={{ color: "#666", fontSize: "0.95rem" }}>
              All packages are flexible — Brian is happy to create a custom partnership that works for your brand.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  border: tier.highlight ? `2px solid ${GOLD}` : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: tier.highlight ? "0 8px 32px rgba(232,168,56,0.18)" : "none",
                  background: tier.highlight ? "#FFFBF0" : "white",
                }}
              >
                {tier.highlight && (
                  <div
                    className="text-center py-2 text-xs tracking-wider"
                    style={{ background: GOLD, color: "white", fontWeight: 600 }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: "2rem",
                        color: tier.highlight ? GOLD : DARK,
                      }}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: tier.highlight ? GOLD : DARK,
                      fontSize: "1.2rem",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <ul className="space-y-3 flex-1 mb-7">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
                        <span style={{ color: "#555", fontSize: "0.88rem" }}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 rounded-lg transition-all"
                    style={{
                      border: `2px solid ${tier.highlight ? GOLD : DARK}`,
                      color: tier.highlight ? GOLD : DARK,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.03em",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = tier.highlight
                        ? "rgba(232,168,56,0.08)"
                        : "rgba(13,30,38,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    Sponsor Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW TO PAY ─── */}
      <section className="py-12 px-4" style={{ background: "white" }}>
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-2xl p-8"
            style={{ background: "#FAFAF8", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#6D1ED4" }}>
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path d="M13 14h16.5l-16 20H30M30 14v6M18 28v6" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.2rem" }}>
                Send Payment via Zelle
              </h3>
            </div>
            <p className="text-sm mb-5" style={{ color: "#555" }}>
              Ready to sponsor? You can send your sponsorship payment directly to Brian via Zelle — quick, free, and no extra fees.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl px-5 py-3" style={{ background: "white", border: "1px solid #e2e8f0" }}>
                <span className="text-sm" style={{ color: "#888" }}>Email</span>
                <span className="text-sm" style={{ fontWeight: 700, color: "#1a202c", letterSpacing: "0.01em" }}>brmicha@gmail.com</span>
              </div>
              <div className="flex items-center justify-between rounded-xl px-5 py-3" style={{ background: "white", border: "1px solid #e2e8f0" }}>
                <span className="text-sm" style={{ color: "#888" }}>Phone</span>
                <span className="text-sm" style={{ fontWeight: 700, color: "#1a202c", letterSpacing: "0.01em" }}>(224) 806-6211</span>
              </div>
            </div>
            <p className="mt-4 text-xs" style={{ color: "#aaa" }}>
              Just open your bank's app, search "Zelle," and send to either of the above. No Zelle account required for most major banks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}