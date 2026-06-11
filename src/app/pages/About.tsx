import { Link } from "react-router";
import { ArrowRight, Camera, Heart, MapPin, Briefcase } from "lucide-react";
import { DARK, GOLD, darkRgba, goldGradient } from "../siteTheme";
import {
  photoBrianArmsOpen,
  photoBrianMtnSelfie,
  photoBrianWithKids,
  photoGroupSelfie,
  photoFestiveGroup,
  photoColorfulBuildings,
  photoBeachGroup,
  photoBrianBug,
} from "../brianImages";
import { pickPhotos } from "../brianTravelPhotos";

// 8 unique travel photos shuffled on every page load
const storyGridPhotos = pickPhotos(4, 9);   // right-side 2×2 grid
const galleryPhotos   = pickPhotos(4, 13);  // strip below story

const timeline = [
  {
    year: "2015–2017",
    title: "The Journey Begins",
    desc: "After leaving classroom teaching, Brian takes a one-way flight out of Chicago, beginning a 22-month solo odyssey around the world.",
  },
  {
    year: "2017–2019",
    title: "Lessons Learned and Shared",
    desc: "Brian returns to Chicagoland to share his travel lessons with local audiences while gearing up for his next adventure.",
  },
  {
    year: "2019–2020",
    title: "A New Continent Beckons",
    desc: "In addition to teaching English and taking Spanish lessons, Brian spends 14 months solo backpacking through South America.",
  },
  {
    year: "2020–2023",
    title: "The Educator Returns",
    desc: "Brian tutors young Chicagoland students one-on-one and inspires adult audiences with more travel tales.",
  },
  {
    year: "2023–2025",
    title: "Around the Globe – Again!",
    desc: "In a 30-country blitz, Brian spends two more years circling six continents.",
  },
  {
    year: "2025–Present",
    title: "Endless Passport",
    desc: "Now with over 400 events and growing, Brian continues to inspire audiences and guide aspiring travelers through one-on-one consultations.",
  },
];

const values = [
  {
    icon: <Camera size={24} />,
    title: "Original Photography",
    desc: "Every program features exclusive photos Brian captured during his travels — no stock images, just real moments from real places.",
  },
  {
    icon: <Heart size={24} />,
    title: "Human Connection",
    desc: "At the heart of every story is a connection with a local — a shared meal, an unexpected kindness, a lesson from a stranger.",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Immersion",
    desc: "By working, volunteering, and turning strangers into friends, Brian reveals how to truly immerse yourself in a place — far beyond tourism.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Practical Inspiration",
    desc: "Brian doesn't just inspire you to dream — he gives you the tools, tips, and resources to actually make your trip happen.",
  },
];

export function About() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: DARK }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="uppercase tracking-widest text-sm mb-4"
            style={{ color: GOLD, fontWeight: 500 }}
          >
            About
          </p>
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            The Story Behind<br /><em>Endless Passport</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "640px", margin: "0 auto" }}>
            Six continents. Life-changing experiences. Important lessons learned. Meet Brian Michalski — Chicago's traveling educator, storyteller, and your guide to the world.
          </p>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="py-20 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="uppercase tracking-widest text-sm mb-3"
              style={{ color: "#E8A838", fontWeight: 500 }}
            >
              About Brian
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 700,
                color: "#0F1932",
                lineHeight: 1.2,
              }}
            >
              Five Years. 60+ Countries.<br />Endless Stories.
            </h2>
            <div className="space-y-4" style={{ color: "#555", fontSize: "0.97rem", lineHeight: 1.8 }}>
              <p>
                Brian Michalski grew up in Chicago with a curiosity about the world that textbooks alone couldn't satisfy. In 2015, he decided to find out for himself, setting off on what would become five collective years of solo travel through over 60 countries.
              </p>
              <p>
                Along the way, he worked, volunteered at schools and in communities, cared for animals, hiked and climbed, and formed friendships with locals from every walk of life. He wasn't just a tourist; he was a willing learner and enthusiastic participant.
              </p>
              <p>
                When Brian returned to Chicago, he brought the world back with him. Now, he shares those adventures with audiences across Chicagoland and beyond, transporting them to his favorite destinations through captivating storytelling and exclusive original photography.
              </p>
            </div>
            <div className="flex gap-6 mt-8">
              {[
                { value: "60+", label: "Countries" },
                { value: "5+ Yrs", label: "Traveling" },
                { value: "400+", label: "Events" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#0F1932",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ color: "#999", fontSize: "0.8rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {storyGridPhotos.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Brian's travels"
                className={`w-full h-40 sm:h-52 object-cover rounded-lg${i % 2 === 1 ? " sm:mt-6" : ""}`}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO GALLERY ─── */}
      <section className="py-4 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryPhotos.map((img, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-lg">
              <img
                src={img}
                alt="Brian's travels"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 px-4" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: "#E8A838", fontWeight: 500 }}>
              What Drives Brian
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#0F1932",
              }}
            >
              The Heart of Endless Passport
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-xl text-center"
                style={{ background: "#FAFAF8", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(232,168,56,0.12)", color: GOLD }}
                >
                  {v.icon}
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.05rem" }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 px-4" style={{ background: DARK }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              The Journey
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              Brian's Timeline
            </h2>
          </div>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs"
                    style={{ background: GOLD, color: DARK, fontWeight: 700 }}
                  >
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: "rgba(232,168,56,0.3)" }} />
                  )}
                </div>
                <div className="pb-8">
                  <p style={{ color: GOLD, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em" }}>
                    {item.year}
                  </p>
                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-4 text-center" style={{ background: "#FAFAF8" }}>
        <h2
          className="mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0F1932" }}
        >
          Bring Brian to Your Next Event
        </h2>
        <p className="mb-8" style={{ color: "#666", maxWidth: "500px", margin: "0 auto 2rem" }}>
          Whether it's a library program, corporate event, school assembly, or community gathering, Brian delivers a memorable experience that your audience won't soon forget.
        </p>
        <Link
          to="/book-a-talk"
          className="inline-flex items-center gap-2 px-8 py-4 rounded"
          style={{ background: goldGradient, color: "white", fontWeight: 500 }}
        >
          Book a Talk <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}