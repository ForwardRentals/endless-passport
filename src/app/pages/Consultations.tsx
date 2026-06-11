import { useState } from "react";
import { CheckCircle, Video, BookOpen, Map, Clock, Star } from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { TravelGlobe } from "../components/TravelGlobe";
import {
  photoBrianArmsLandscape,
  photoMotorcycle,
  photoLandscapeValley,
  photoIslandWater,
} from "../brianImages";
import { pickPhotos } from "../brianTravelPhotos";

// 2 photos under Expert Guidance — shuffled each load
const expertPhotos = pickPhotos(5, 22);

const includes = [
  { icon: <Video size={20} />, title: "2–3 Hour Zoom Call", desc: "One-on-one video consultation tailored to your specific trip and travel goals." },
  { icon: <Map size={20} />, title: "Custom Itinerary Guidance", desc: "Personalized day-by-day recommendations based on your interests and budget." },
  { icon: <BookOpen size={20} />, title: "Google Drive Resource Guide", desc: "A comprehensive guide you keep forever — apps, resources, tips, and tools Brian actually uses." },
  { icon: <Star size={20} />, title: "Follow-Up Support", desc: "Email follow-up within 2 weeks of your call to answer any remaining questions." },
];

const topics = [
  "Destination selection & itinerary planning",
  "Solo travel safety tips & best practices",
  "Budget planning & money-saving strategies",
  "Accommodation & transportation recommendations",
  "Visa, insurance & pre-trip logistics",
  "Packing lists & gear recommendations",
  "Working & volunteering abroad opportunities",
  "Cultural etiquette & travel mindset",
  "Best apps & tools for world travel",
  "Connecting with locals & immersive experiences",
];

const testimonials = [
  {
    id: 1,
    name: "Amir J.",
    text: "Brian's knowledge and experience far exceeded my expectations. So much so that before our first session ended, I booked a second, and before our second session ended, I booked a third. Brian took everything he learned over his 5+ years of experience and custom-tailored the information that would be most beneficial to my journey to Costa Rica. I would encourage anyone who is thinking about traveling overseas to consult with Brian. My trip will be far more enjoyable due to all I learned from Brian.",
    stars: 5,
  },
  {
    id: 2,
    name: "Megan Patricia",
    text: "I attended Brian's Virtual Zoom Event through the Wheaton Public Library on 4/30/2020. WOW — I was blown away with the absolutely breathtaking pictures and captivating stories Brian had to share with us about his recent traveling experiences throughout South America over a period of 16 months. Brian shared the \"ins and outs\" of traveling solo, some incredibly helpful tips for budgeting, hints for finding AirBNB/hostels, and how to make the most of every adventure.",
    stars: 5,
  },
  {
    id: 3,
    name: "Robin Mendel-Rosenberg",
    text: "He is an excellent speaker and has been on some very interesting trips all around the world.",
    stars: 5,
  },
];

export function Consultations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    timing: "",
    experience: "",
    questions: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ type: "consult", ...formData }),
        }
      );
    } catch (err) {
      console.error("Consultations submit error:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: DARK }}>
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-sm mb-4" style={{ color: GOLD, fontWeight: 500 }}>
              1-on-1 Travel Consultations
            </p>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              Your Personal Travel<br />Expert, on Zoom
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
              Planning a solo adventure and don't know where to start? Brian provides 2–3 hour
              one-on-one Zoom consultations with personalized guidance for aspiring world travelers.
            </p>
          </div>
        </div>
        {/* Photo strip */}
        <div className="grid grid-cols-3 h-24 sm:h-48 gap-1 px-1">
          {[photoMotorcycle, photoLandscapeValley, photoIslandWater].map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt="Travel" className="w-full h-full object-cover opacity-80" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              What You Get
            </p>
            <h2
              className="mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 700,
                color: DARK,
                lineHeight: 1.2,
              }}
            >
              Expert Guidance for<br />Your Next Adventure
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "#555", fontSize: "0.97rem" }}>
              Brian has traveled solo through 60+ countries on all budgets — and he wants to help
              you do the same. Whether you're planning your first international trip or tackling
              a complex multi-country itinerary, Brian brings practical knowledge and genuine
              enthusiasm to every consultation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {includes.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "rgba(232,168,56,0.1)", color: GOLD }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "0.95rem" }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "#777", fontSize: "0.83rem", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={photoBrianArmsLandscape}
              alt="Brian on an adventure"
              className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
            />
            <div
              className="p-6 rounded-xl text-center"
              style={{ background: DARK }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={18} style={{ color: GOLD }} />
                <span className="text-white" style={{ fontWeight: 500 }}>2–3 Hours · via Zoom</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                Flexible scheduling · Includes resource guide · Follow-up support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHOTO STRIP ─── */}
      <section className="py-4 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-3">
          {expertPhotos.map((img, i) => (
            <a
              key={i}
              href="https://www.etsy.com/shop/endlesspassport"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-square overflow-hidden rounded-lg relative group"
            >
              <img
                src={img}
                alt="Brian's travels"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(13,30,38,0.45)" }}
              >
                <span className="text-white text-xs font-semibold tracking-wide uppercase">Shop</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── TOPICS ─── */}
      <section className="py-16 px-4" style={{ background: "white" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              We Can Cover
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: DARK,
              }}
            >
              What We'll Talk About
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {topics.map((topic, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <CheckCircle size={16} style={{ color: GOLD }} className="shrink-0" />
                <span style={{ color: "#555", fontSize: "0.92rem" }}>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRIAN'S WORLD GLOBE ─── */}
      <TravelGlobe />

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 px-4" style={{ background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Client Experiences
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              What Clients Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} fill={GOLD} color={GOLD} />
                  ))}
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <p className="text-white" style={{ fontWeight: 500, fontSize: "0.9rem" }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING FORM ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
              Ready to Plan?
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: DARK,
              }}
            >
              Book Your Consultation
            </h2>
            <p className="mt-2" style={{ color: "#666", fontSize: "0.95rem" }}>
              Brian will reach out within 24 hours to confirm scheduling.
            </p>
          </div>

          {submitted ? (
            <div
              className="text-center p-12 rounded-xl"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: GOLD }} />
              <h3
                className="mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.4rem" }}
              >
                You're All Set!
              </h3>
              <p style={{ color: "#666" }}>
                Brian will be in touch within 24 hours to schedule your consultation.
                Get ready to start planning your next adventure!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl space-y-5"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Your Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Email Address *</label>
                  <input type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="jane@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Where are you hoping to travel? *</label>
                <input type="text" required value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="e.g. Southeast Asia, 4 countries, 6 weeks" />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>When are you planning to travel?</label>
                <input type="text" value={formData.timing}
                  onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="e.g. Summer 2026, flexible" />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Your travel experience level</label>
                <select value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1px solid #ddd", background: "#fafafa" }}>
                  <option value="">Select one</option>
                  <option>First international trip</option>
                  <option>Some international experience</option>
                  <option>Experienced traveler, new destination</option>
                  <option>First solo trip</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Questions or topics you want to cover</label>
                <textarea rows={4} value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: "1px solid #ddd", background: "#fafafa" }}
                  placeholder="Tell Brian what you're most curious or nervous about..." />
              </div>
              <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-lg text-white transition-all"
                style={{ background: "linear-gradient(135deg, #E8A838, #c8821a)", fontWeight: 500, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Sending…" : "Request a Consultation"}
              </button>
              <p className="text-center text-xs" style={{ color: "#999" }}>
                Or email: <a href="mailto:brian@endlesspassport.com" style={{ color: GOLD }}>brian@endlesspassport.com</a>
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}