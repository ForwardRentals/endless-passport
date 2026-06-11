import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "motion/react";
import { Link, useNavigate } from "react-router";
import { programs } from "./BookATalk";
import { TalkModal } from "../components/TalkModal";
import { ArrowRight, MapPin, Users, Globe, Star, ChevronDown, ExternalLink } from "lucide-react";
import { DARK, GOLD, darkRgba, goldGradient } from "../siteTheme";
import { AnimateIn, StaggerIn } from "../components/AnimateIn";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { pickPhotos } from "../brianTravelPhotos";
import { PhotoStrip } from "../components/PhotoStrip";

// Photo strips — pick extra photos as a buffer so all slots always fill
// even if any individual image fails to load.
const stripPhotos4 = pickPhotos(12, 0);   // need 4, buffer of 12
const stripPhotos5 = pickPhotos(15, 12);  // need 5, buffer of 15

// ─── Hero photos ──────────────────────────────────────────────────────────────
import heroCarousel01 from "figma:asset/07b954b41ce07b6543bc4ffdee297112230ab55d.png";
import heroCarousel02 from "figma:asset/e40d071c6ca73414588f8bfaeac47983e951d51b.png";
import heroCarousel03 from "figma:asset/a45e994b2ddf629ba45a869b0b116f7c7e647fb2.png";
import heroCarousel04 from "figma:asset/04aeb0e60be37b09dae54c8b30ac6fde6488618b.png";
// heroCarousel05 removed — blurry green mountain valley photo
import heroCarousel06 from "figma:asset/b70c78ff67121412ae66a606e91105729f1b44f2.png";
import heroCarousel07 from "figma:asset/29b07ac36a870ea21b943f461a57d5f1c258b3c9.png";
import heroCarousel08 from "figma:asset/e3f32fa697f631deccbc1a14cf8aad744ff2da4d.png";
import heroCarousel09 from "figma:asset/d8df3ea02c39f7ea1b44b4ba533ee67cdcec7f29.png";
import heroCarousel10 from "figma:asset/26856d79d243a6505d1790f09d721eff09174c96.png";
import heroCarousel11 from "figma:asset/d6c8eb46962881aeea76950815dc0a510fc496e5.png";
import heroCarousel12 from "figma:asset/e1f633c0982beb1df9ddc91ea7f9647d1bcab170.png";
import heroCarousel13 from "figma:asset/8c6f9b45a97f6d3fb81c29dcd0729a12b552dfbc.png";
import heroCarousel14 from "figma:asset/3fd058b57f5c926813cf9a023881c2b343244378.png";
import heroCarousel15 from "figma:asset/29da56c324640f9edba5e2e5391767ec0729c80b.png";
import heroCarousel16 from "figma:asset/28e2883123468d0801fcfb1b392a7cd9f53dcef9.png";
import heroCarousel17 from "figma:asset/3936762018c0ef6610ef824fa866b24db6451ae1.png";
import heroCarousel18 from "figma:asset/e4a15bd73c056bb60811b25fe7fdb2eea5850dc8.png";
import heroCarousel19 from "figma:asset/3255c3bff844c01869e8b2e968605b2f276fc9e7.png";
import heroCarousel20 from "figma:asset/210c5521181b1cfe10005931eae9cd8ca6a1ac5d.png";
import heroCarousel21 from "figma:asset/487a222de617e67c895ee50c7423cac2b05cff50.png";

// ─── Destination card images ─────────────────────────────────────────────────
import destJapan      from "figma:asset/a76977334462ee2f11d9fdb5dc397b5886d2209e.png"; // Brian at Mt. Fuji — matches BookATalk id:0 hero
import destGeorgia    from "../../imports/IMG_2263.webp"; // Shkhara Glacier with autumn foliage — matches BookATalk id:16 hero
import destCamino     from "figma:asset/004ab1881508db4eb06cc2cd067daeeaaa8896ed.png"; // Santiago de Compostela statue — matches BookATalk id:7 hero
import destAustralia  from "figma:asset/50fc839b25943bf862a8b35578f720d516ff8283.png"; // Uluru — matches BookATalk id:6 hero
import destTravelTruths from "figma:asset/cd03ef83d052be0da83b4bda4575a8d83b766959.png"; // Brian selfie with kids — Travel Truths id:15 hero
import destWestAfrica from "figma:asset/e2eaff343f1c6f2b01e267e978ff592ec1446fd5.png"; // Boubou dunes — matches BookATalk id:12 hero
import pelourinhoSalvador from "figma:asset/705b8616970988525716636ad8d38a009274ba96.png"; // Pelourinho square, Salvador, Brazil

import {
  photoLandscapeValley,
  photoConcertStage,
  photoSydney,
  photoStonehenge,
  photoAngkorWat,
  photoCoastalCliffs,
  photoSeaTurtle,
  photoRockArch,
  photoLanternFestival,
  photoMachuPicchu,
  photoRainbowMtn,
  photoSingaporeNight,
  photoGardenLights,
  photoFireworks1,
  photoFireworks2,
  photoSunsetLandscape,
  photoCaminoBrianCoast,
  photoAusUluru,
} from "../brianImages";
import scubaFishHero from "figma:asset/792fb34e9c965cdc45265147ebed5a1b954c7b46.png"; // Brian scuba diving surrounded by tropical fish

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroSlides = [
  { src: heroCarousel01 },
  { src: heroCarousel02 },
  { src: heroCarousel03 },
  { src: heroCarousel04 },
  // heroCarousel05 removed
  { src: heroCarousel06 },
  { src: heroCarousel07 },
  { src: heroCarousel08 },
  { src: heroCarousel09 },
  { src: heroCarousel10 },
  { src: heroCarousel11 },
  { src: heroCarousel12 },
  { src: heroCarousel13 },
  { src: heroCarousel14 },
  { src: heroCarousel15 },
  { src: heroCarousel16 },
  { src: heroCarousel17 },
  { src: heroCarousel18 },
  { src: heroCarousel19 },
  { src: heroCarousel20 },
  { src: heroCarousel21 },
];

// ─── Destination → Talk cards ─────────────────────────────────────────────────
const destinations = [
  {
    id: 1,
    talkId: 0,
    name: "Joyous Japan",
    image: destJapan,
    tag: "Japan, Asia",
  },
  {
    id: 2,
    talkId: 16,
    name: "Gorgeous Georgia",
    image: destGeorgia,
    tag: "Eastern Europe",
  },
  {
    id: 3,
    talkId: 7,
    name: "Conquering the Camino",
    image: destCamino,
    tag: "Portugal to Spain, Europe",
  },
  {
    id: 4,
    talkId: 6,
    name: "Awesome Australia",
    image: destAustralia,
    tag: "Land Down Under",
  },
  {
    id: 5,
    talkId: 15,
    name: "Travel Truths: Lessons Learned Abroad",
    image: destTravelTruths,
    tag: "60+ Countries, 6 Continents",
    imgPos: "center 25%",
  },
  {
    id: 6,
    talkId: 12,
    name: "Wild West Africa",
    image: destWestAfrica,
    tag: "Senegal, Gambia & Beyond",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Deborah Preiser",
    initials: "DP",
    color: "#3b82f6",
    text: "Brian came to the Oak Park Public Library Sunday afternoon, Jan. 21, with amazing stories, gorgeous photos, and lots of suggestions for making the most of foreign travel by both working and volunteering in other cultures and countries. His handout, \"Vagabonding Around the World\" Resources offers everything from books and backpacks to free travel apps and the Charles Schwab Checking Account which sounds amazingly useful for any traveler. Our audience ages ranged from 30-somethings to 70-somethings — and everyone gave Brian great reviews.",
    stars: 5,
    via: "Oak Park Public Library",
  },
  {
    id: 3,
    name: "Rachel Elizabeth Dennis",
    initials: "RD",
    color: "#e8a838",
    text: "Last month I had the privilege to attend one of Brian's vagabonding workshops, and it was amazing! As a visual artist, I really appreciated the wonderful photographs that accompanied his presentation. Often times when I am learning tricks of the travel trade at a seminar, there are boring slides with lists of words and it doesn't really emotionally motivate me. In contrast, leaving Brian's talk, I felt stimulated and inspired in a variety of ways. What a cool alternative to an average outing, and a great way to start thinking about the possibility of taking charge of your travel lifestyle! I can't wait to catch Brian again. Such a valuable experience!",
    stars: 5,
    via: "",
  },
  {
    id: 4,
    name: "Larissa Michelle",
    initials: "LM",
    color: "#10b981",
    text: "Last Spring, Brian came to share his travels with my 4th Grade class. He did an amazing job of bringing his adventures to life for my students. His pictures and stories were engaging and inspiring. Many students shared an eagerness to explore following his visit. He was very polite, organized, and thoughtful with his answers to student questions. Thank you, Brian Michalski, for being such an inspiration! You are welcome back any time!",
    stars: 5,
    via: "4th Grade Classroom",
  },
  {
    id: 5,
    name: "Katie Alysse",
    initials: "KA",
    color: "#ec4899",
    text: "I have been fortunate enough to attend Brian's events in person and through the Zoom platform through the Wheaton Public Library. Let me tell you... you will not be disappointed by either presentation. Brian has a unique way of storytelling which completely immerses you in his adventures. He shares useful tips about traveling while also showing you the amazing features each country he visits has to offer. His pictures are also breathtaking.",
    stars: 5,
    via: "Wheaton Public Library",
  },
  {
    id: 7,
    name: "Roz Grossman Topolski",
    initials: "RT",
    color: "#14b8a6",
    text: "Brian's presentation was fantastic — thoughtful, creative, practical, sometimes humorous. Our patrons were completely engaged in his presentation. We saw many new faces at this program — people of many ages were interested in learning about his adventure. He inspired many audience members to consider their own travel plans.",
    stars: 5,
    via: "",
  },
  {
    id: 9,
    name: "Sarah Vessalo",
    initials: "SV",
    color: "#0ea5e9",
    text: "Brian took my Park Ridge Public Library patrons on an epic journey last night! Through a cleverly-constructed PowerPoint, over 100 stunning photos, and his charming narration, he took us from Hawaii to Australia to Southeast Asia to Cuba and back, landing us back home with our heads spinning and our hearts open wide. His perspective on authentic and meaningful travel — one that features work, volunteering, and numerous connections with people and landscapes — is one we won't soon forget.",
    stars: 5,
    via: "Park Ridge Public Library",
  },
  {
    id: 10,
    name: "Kenny Tymick",
    initials: "KT",
    color: "#f43f5e",
    text: "Brian's presentation bestows a sense of empowerment unto his audience. For even the most apprehensive couch travelers of the world who hesitate to journey away from their homes, Michalski supplies practical travel advice, inspirational stories, and invaluable cultural interactions that entertain as much as they entice you to follow in his path. Despite the hardships and lessons learned in his travels, Brian's passion and positivity is indefatigable and contagious. A truly worthwhile experience for all.",
    stars: 5,
    via: "",
  },
  {
    id: 11,
    name: "Hilary Gabel",
    initials: "HG",
    color: "#6366f1",
    text: "Brian kept our Glenview Library patrons engrossed with his stories of personal growth and authentic experience of place while on a 22-month journey around the world. Stunning photography and fun videos make for a truly engaging introduction to \"Mindful Vagabonding.\"",
    stars: 5,
    via: "Glenview Public Library",
  },
  {
    id: 12,
    name: "Jennifer Bartel",
    initials: "JB",
    color: "#10b981",
    text: "Brian's 'Vagabonding Around the World' this May at the Wilmette Public Library was a fantastic presentation combining beautiful photos, videos, and personal anecdotes from his 22-month journey. Common threads through all of his destinations were his love of travel, volunteering, and making connections with new people. Brian provided handouts with helpful resources ranging from travel apps to recommended supplies and reading. We had very positive feedback from our patrons and look forward to inviting him back!",
    stars: 5,
    via: "Wilmette Public Library · Creative Experiences Coordinator",
  },
];

// ─── Facebook review type & mapper ────────────────────────────────────────────
interface FBRating {
  id: string;
  reviewer: { name: string; id: string };
  rating: number;
  review_text?: string;
  created_time: string;
  recommendation_type?: "positive" | "negative";
}

const AVATAR_COLORS = [
  "#3b82f6","#e8a838","#10b981","#ec4899","#14b8a6",
  "#0ea5e9","#f43f5e","#6366f1","#f97316","#8b5cf6",
];

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0x7fffffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function mapFBRating(r: FBRating, idx: number): typeof testimonials[number] {
  const parts = r.reviewer.name.trim().split(/\s+/);
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0].substring(0, 2).toUpperCase();
  return {
    id: idx + 1,
    name: r.reviewer.name,
    initials,
    color: colorFromName(r.reviewer.name),
    text: r.review_text ?? "",
    stars: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))),
    via: "",
  };
}

// ─── SVG helpers ──────────────────────────────────────────────────────────────

const FbBadge = () => (
  <div
    className="rounded-full flex items-center justify-center shrink-0"
    style={{ width: 30, height: 30, background: "#1877F2" }}
  >
    <svg width="10" height="18" viewBox="0 0 10 18" fill="white">
      <path d="M6.5 18V10h2.8l.4-3.2H6.5V4.9c0-.9.3-1.6 1.6-1.6H9.8V.1C9.5.1 8.5 0 7.3 0 4.8 0 3.1 1.5 3.1 4.3v2.5H.3V10h2.8v8h3.4z" />
    </svg>
  </div>
);

const FbLogo = ({ size = 18, color = "#1877F2" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

// ─── Animated counting number ─────────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Arrow button (must live outside carousel to avoid remount-on-render) ─────
function CarouselArrow({
  dir,
  enabled,
  onClick,
}: {
  dir: "left" | "right";
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!enabled}
      whileHover={enabled ? { scale: 1.1 } : {}}
      whileTap={enabled ? { scale: 0.92 } : {}}
      className="rounded-full flex items-center justify-center shadow-lg"
      style={{
        width: 40,
        height: 40,
        background: enabled ? GOLD : "rgba(255,255,255,0.08)",
        opacity: enabled ? 1 : 0.3,
        cursor: enabled ? "pointer" : "default",
        border: "none",
        flexShrink: 0,
      }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        width="15" height="15"
        viewBox="0 0 15 15"
        fill="none"
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left"
          ? <path d="M9 2.5L4.5 7.5L9 12.5" />
          : <path d="M5.5 2.5L10 7.5L5.5 12.5" />
        }
      </svg>
    </motion.button>
  );
}

// ─── Testimonials Carousel ───────────────────────────────────────────────────
function TestimonialsCarousel({ items }: { items: typeof testimonials }) {
  const wrapRef   = useRef<HTMLDivElement>(null); // outer container — measure width
  const scrollRef = useRef<HTMLDivElement>(null); // scrollable track
  const [dotIdx,       setDotIdx]       = useState(0);
  const [cardW,        setCardW]        = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const GAP = 24; // gap-6

  // Compute pixel card width from container width so we control exactly
  // how many cards are visible and where the scroll stops.
  useLayoutEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
        setCardW(Math.floor((w - GAP * 2) / 3));
      } else {
        setVisibleCount(1);
        setCardW(Math.floor(w * 0.85));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Maximum scroll position index — last window starts so the final card is always visible
  const maxIdx = Math.max(0, items.length - visibleCount);

  // Clamp dotIdx if screen resizes and maxIdx shrinks
  useEffect(() => {
    setDotIdx((i) => Math.min(i, maxIdx));
  }, [maxIdx]);

  const canLeft  = dotIdx > 0;
  const canRight = dotIdx < maxIdx;

  const scrollToIdx = (idx: number) => {
    const clamped = Math.max(0, Math.min(maxIdx, idx));
    setDotIdx(clamped);
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-card]")) as HTMLElement[];
    const target = cards[clamped];
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || !cardW) return;
    const idx = Math.round(el.scrollLeft / (cardW + GAP));
    setDotIdx(Math.min(idx, maxIdx));
  };

  // Dots represent the number of scroll positions, not individual cards
  const dotCount = maxIdx + 1;

  return (
    <div ref={wrapRef}>
      {/* ── Controls row ── */}
      <div className="flex items-center justify-between mb-6">
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          {dotIdx + 1} / {dotCount}
        </p>
        <div className="flex gap-2">
          <CarouselArrow dir="left"  enabled={canLeft}  onClick={() => scrollToIdx(dotIdx - 1)} />
          <CarouselArrow dir="right" enabled={canRight} onClick={() => scrollToIdx(dotIdx + 1)} />
        </div>
      </div>

      {/* ── Scroll track ── */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-6 overflow-x-auto pb-4"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          // @ts-ignore
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
          // On mobile (1-up) add paddingRight so the last card can reach the snap point.
          // On desktop (3-up) the math works out perfectly — no padding needed.
          paddingRight: visibleCount === 1 && cardW > 0
            ? `${(wrapRef.current?.clientWidth ?? 0) - cardW}px`
            : undefined,
        }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const startX     = e.pageX - el.offsetLeft;
          const initScroll = el.scrollLeft;
          el.style.cursor  = "grabbing";
          const onMove = (ev: MouseEvent) => {
            el.scrollLeft = initScroll - (ev.pageX - el.offsetLeft - startX);
          };
          const onUp = () => {
            el.style.cursor = "grab";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup",   onUp);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup",   onUp);
        }}
      >
        {items.map((t) => (
          <div
            key={t.id}
            data-card
            className="flex-shrink-0 rounded-xl flex flex-col gap-4 p-6"
            style={{
              width: cardW > 0 ? `${cardW}px` : "clamp(280px, 85vw, 360px)",
              scrollSnapAlign: "start",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "border-color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${GOLD}55`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            {/* Header: avatar + name + FB badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    background: t.color,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white" style={{ fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.3 }}>
                    {t.name}
                  </p>
                  {t.via && (
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.71rem" }}>{t.via}</p>
                  )}
                </div>
              </div>
              <FbBadge />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: t.stars }).map((_, si) => (
                <Star key={si} size={13} fill={GOLD} color={GOLD} />
              ))}
              <span style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.7rem", marginLeft: 5 }}>
                Recommends
              </span>
            </div>

            {/* Review text or "no text" notice */}
            {t.text ? (
              <p
                className="leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.87rem", fontStyle: "italic", flexGrow: 1 }}
              >
                "{t.text}"
              </p>
            ) : (
              <div
                className="flex items-center gap-2 mt-1"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontStyle: "italic" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Recommended Endless Passport on Facebook
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Dot bar — one dot per scroll position, not per card ── */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: dotCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIdx(i)}
            style={{
              width: i === dotIdx ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: i === dotIdx ? GOLD : "rgba(255,255,255,0.18)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
export function Home() {
  const navigate = useNavigate();
  const [openTalkId, setOpenTalkId] = useState<number | null>(null);
  const selectedHomeTalk = openTalkId !== null ? (programs.find(p => p.id === openTalkId) ?? null) : null;
  const [activeIdx, setActiveIdx] = useState(0);
  const [reviews, setReviews] = useState(testimonials);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live Facebook reviews; fall back to hardcoded on any error
  useEffect(() => {
    fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a/facebook/reviews`,
      { headers: { Authorization: `Bearer ${publicAnonKey}` } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          console.error("FB reviews API error:", data.error);
          return;
        }
        const mapped: typeof testimonials = (data.data as FBRating[])
          .filter((r) => r.review_text && r.review_text.trim().length > 10)
          .map(mapFBRating);
        if (mapped.length >= 3) setReviews(mapped);
      })
      .catch((err) => console.error("Failed to fetch FB reviews:", err));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === activeIdx ? 1 : 0,
              transition: "opacity 2.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            <img
              src={slide.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: "brightness(0.55)",
                transform: i === activeIdx ? "scale(1.06)" : "scale(1)",
                transition: "transform 10s ease-out",
              }}
            />
          </div>
        ))}

        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${darkRgba(0.35)} 0%, ${darkRgba(0.15)} 50%, ${darkRgba(0.65)} 100%)` }}
        />

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } } }}
        >
          <motion.p
            className="uppercase tracking-widest mb-4 text-sm"
            style={{ color: GOLD, fontWeight: 500 }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            Chicago's Traveling Educator
          </motion.p>

          <motion.h1
            className="mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.15 }}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            <span style={{ fontWeight: 300, letterSpacing: "0.01em", opacity: 0.9 }}>Sharing my travels</span>
            <br />
            <strong style={{ fontWeight: 800, fontStyle: "italic", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}>to inspire yours.</strong>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.7 }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            Brian Michalski spent five years solo backpacking through over 60 countries. Now, he brings those unforgettable adventures, original photography, and cultural insights to audiences across Chicagoland and beyond.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/book-a-talk" className="px-8 py-4 rounded text-white block" style={{ background: goldGradient, fontWeight: 500 }}>
                Book a Talk
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/about"
                className="px-8 py-4 rounded flex items-center justify-center gap-2"
                style={{ border: "1.5px solid rgba(255,255,255,0.6)", color: "white", fontWeight: 500 }}
              >
                Meet Brian <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="rounded-full"
              animate={{
                width: i === activeIdx ? 24 : 8,
                background: i === activeIdx ? GOLD : "rgba(255,255,255,0.4)",
              }}
              style={{ height: 8 }}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <motion.button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center"
          style={{ width: 44, height: 44, background: "rgba(0,0,0,0.35)", border: "1.5px solid rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}
          onClick={() => { setActiveIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length); }}
          whileHover={{ scale: 1.1, background: "rgba(0,0,0,0.6)" }}
          whileTap={{ scale: 0.93 }}
          aria-label="Previous photo"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8L10 13" />
          </svg>
        </motion.button>

        <motion.button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center"
          style={{ width: 44, height: 44, background: "rgba(0,0,0,0.35)", border: "1.5px solid rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}
          onClick={() => { setActiveIdx((prev) => (prev + 1) % heroSlides.length); }}
          whileHover={{ scale: 1.1, background: "rgba(0,0,0,0.6)" }}
          whileTap={{ scale: 0.93 }}
          aria-label="Next photo"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3L11 8L6 13" />
          </svg>
        </motion.button>
      </section>

      {/* ─── STATS BAND ─── */}
      <section style={{ background: DARK }} className="py-10">
        <StaggerIn className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center" stagger={0.18}>
          {[
            { icon: <Globe size={22} />, value: 60, suffix: "+",    label: "Countries Visited"  },
            { icon: <MapPin size={22} />, value: 5, suffix: "+ Yrs", label: "Solo Backpacking"   },
            { icon: <Users size={22} />, value: 400, suffix: "+",    label: "Events Presented"   },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <motion.div
                style={{ color: GOLD }}
                whileHover={{ scale: 1.25, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700 }}>
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </StaggerIn>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="py-20 px-4 overflow-hidden" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimateIn direction="right" delay={0.1}>
            <div className="relative">
              <motion.img
                src={photoLandscapeValley}
                alt="Dramatic valley landscape"
                className="w-full h-80 md:h-[450px] object-cover rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-5 -right-5 px-6 py-4 rounded-lg shadow-xl"
                style={{ background: DARK }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                <p style={{ color: GOLD, fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700 }}>Thousands</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>of Stories Told</p>
              </motion.div>
            </div>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <div>
              <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
                About Brian
              </p>
              <h2
                className="mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: DARK, lineHeight: 1.2 }}
              >
                Five Years. 60+ Countries.<br />Endless Stories.
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "#555", fontSize: "0.97rem" }}>
                Brian Michalski spent five years solo backpacking through over 60 countries. Now, he brings those unforgettable adventures, original photography, and cultural insights to audiences across Chicagoland and beyond.
              </p>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded"
                  style={{ background: DARK, color: "white", fontWeight: 500 }}
                >
                  Read Brian's Story <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── DESTINATIONS GALLERY ─── */}
      <section className="py-20 px-4" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <AnimateIn direction="up" className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Around the World
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: DARK }}>
              Destinations That Inspire
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#888" }}>Click any destination to learn more about the talk</p>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.02 }}
              >
                <button className="absolute inset-0 z-10 cursor-pointer" aria-label={`Learn about ${dest.name}`} onClick={() => setOpenTalkId(dest.talkId)} />
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    objectPosition: (dest as any).imgPos ?? "center center",
                    transform: (dest as any).imgPos ? "scale(1.06)" : undefined,
                    transformOrigin: "center center",
                  }}
                />
                {/* Always-visible label at bottom */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
                >
                  <p className="text-white text-sm font-semibold leading-snug">{dest.name}</p>
                  {dest.tag && <p style={{ color: GOLD, fontSize: "0.72rem" }}>{dest.tag}</p>}
                </div>
                {/* Hover overlay: "View Talk →" */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: "rgba(13,30,38,0.52)" }}
                >
                  <span
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                    style={{ background: goldGradient }}
                  >
                    View Talk <ArrowRight size={14} />
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO STRIP ─── */}
      <section className="hidden sm:block py-4 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-3">
          <PhotoStrip pool={stripPhotos4} count={4} aspect="aspect-video" linkUrl="https://www.etsy.com/shop/endlesspassport" />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto">
          <AnimateIn direction="up" className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Work With Brian
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: DARK }}>
              How Can Brian Help You?
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: scubaFishHero,
                alt: "Brian scuba diving surrounded by tropical fish",
                title: "Book a Talk",
                body: "Bring Brian to your library, corporate event, local business, or community center. Featuring exclusive original photography, each program transports your audience across the globe.",
                href: "/book-a-talk",
              },
              {
                img: photoRainbowMtn,
                alt: "Rainbow Mountain from Brian's travel photography collection",
                title: "Shop Travel Prints",
                body: "Bring the world into your home with high-quality prints from Brian's original travel photography collection, captured during five years traveling the globe.",
                href: "https://www.etsy.com/shop/endlesspassport",
                external: true,
              },
              {
                img: pelourinhoSalvador,
                alt: "Colourful colonial buildings of Pelourinho square, Salvador, Brazil",
                title: "Travel Consultations",
                body: "Planning a solo trip? Brian offers Zoom consultations with personalized recommendations and a customized Google Drive resource guide that you keep forever.",
                href: "/consultations",
              },
            ].map((card, i) => {
              const isExternal = (card as any).external;
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: card.href };

              return (
              <motion.div
                key={card.title}
                className="rounded-xl overflow-hidden shadow-md group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.14)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={card.img} alt={card.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: darkRgba(0.35) }} />
                </div>
                <div className="p-8" style={{ background: "white" }}>
                  <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.4rem" }}>
                    {card.title}
                  </h3>
                  <p className="mb-5 leading-relaxed" style={{ color: "#666", fontSize: "0.95rem" }}>
                    {card.body}
                  </p>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <LinkComponent
                      {...linkProps}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm"
                      style={{ background: DARK, color: "white", fontWeight: 500 }}
                    >
                      {isExternal ? "Visit Shop" : "Learn More"} {isExternal ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
                    </LinkComponent>
                  </motion.div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* ─── COLLAGE STRIP ─── */}
      <section className="hidden sm:block py-4 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-3">
          <PhotoStrip pool={stripPhotos5} count={5} aspect="aspect-square" linkUrl="https://www.etsy.com/shop/endlesspassport" />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-4" style={{ background: DARK }}>
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <AnimateIn direction="up" className="text-center mb-3">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              What People Say
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}
            >
              Real Reviews from Real Audiences
            </h2>
          </AnimateIn>

          {/* Facebook source line */}
          <AnimateIn direction="up" delay={0.1} className="flex items-center justify-center gap-2 mb-10">
            <FbLogo size={16} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
              From{" "}
              <a
                href="https://www.facebook.com/endlesspassport/reviews"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877F2", textDecoration: "underline" }}
              >
                facebook.com/endlesspassport/reviews
              </a>
            </span>
          </AnimateIn>

          {/* Carousel */}
          <TestimonialsCarousel items={reviews} />

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="https://www.facebook.com/endlesspassport/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-opacity hover:opacity-80"
              style={{ background: "#1877F2", color: "white", fontWeight: 500 }}
            >
              <FbLogo size={14} color="white" />
              See All Reviews on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="py-20 px-4 text-center" style={{ background: goldGradient }}>
        <AnimateIn direction="up" delay={0.1}>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700 }}
          >
            Ready to Explore the World?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem" }}>
            Whether you want to bring an inspiring talk to your organization or plan your own
            adventure, Brian is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/book-a-talk" className="px-8 py-4 rounded block"
                style={{ background: DARK, color: "white", fontWeight: 500 }}>
                Book a Talk
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/consultations" className="px-8 py-4 rounded block"
                style={{ background: "rgba(255,255,255,0.2)", color: "white", fontWeight: 500, border: "1.5px solid white" }}>
                Book a Consultation
              </Link>
            </motion.div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── TALK MODAL (opened from Destinations grid, stays on Home page) ─── */}
      <TalkModal
        program={selectedHomeTalk}
        onClose={() => setOpenTalkId(null)}
        onBookTalk={() => { setOpenTalkId(null); navigate("/book-a-talk"); }}
      />
    </div>
  );
}