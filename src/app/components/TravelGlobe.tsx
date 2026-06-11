import { useRef, useEffect, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GOLD } from "../siteTheme";

// ─── Visited countries by ISO Alpha-3 code ───────────────────────────────────
const VISITED_ISO = new Set([
  // Africa
  "EGY", "GMB", "MRT", "MAR", "SEN", "SLE",
  // Asia
  "KHM", "GEO", "IND", "IDN", "JPN", "LAO", "MYS", "MMR", "NPL",
  "PHL", "SGP", "KOR", "TWN", "THA", "TUR", "ARE", "VNM",
  // Europe
  "ALB", "AUT", "BEL", "BIH", "BGR", "HRV", "CZE", "DNK", "FRA",
  "DEU", "GRC", "HUN", "IRL", "ITA", "NLD", "PRT", "ROU", "SRB",
  "ESP", "CHE", "GBR", "VAT",
  // North America
  "BHS", "CAN", "CRI", "CUB", "MEX", "NIC", "USA", "PRI",
  // Oceania
  "AUS", "FJI", "NZL",
  // South America
  "ARG", "BOL", "BRA", "CHL", "COL", "ECU", "PER", "URY",
]);

// ─── Continent data ───────────────────────────────────────────────────────────
const CONTINENTS = [
  {
    id: "africa",
    name: "Africa",
    accent: "#E8A838",
    countries: ["Egypt", "The Gambia", "Mauritania", "Morocco", "Senegal", "Sierra Leone"],
  },
  {
    id: "asia",
    name: "Asia",
    accent: "#38b2ac",
    countries: [
      "Cambodia", "Georgia", "India", "Indonesia", "Japan", "Laos",
      "Malaysia", "Myanmar", "Nepal", "Philippines", "Singapore",
      "South Korea", "Taiwan", "Thailand", "Türkiye",
      "United Arab Emirates", "Vietnam",
    ],
  },
  {
    id: "europe",
    name: "Europe",
    accent: "#6B8ED6",
    countries: [
      "Albania", "Austria", "Belgium", "Bosnia & Herzegovina", "Bulgaria",
      "Croatia", "Czechia", "Denmark", "England", "France", "Germany",
      "Greece", "Hungary", "Ireland", "Italy", "Netherlands", "Portugal",
      "Romania", "Scotland", "Serbia", "Spain", "Switzerland",
      "United Kingdom", "Vatican City",
    ],
  },
  {
    id: "north-america",
    name: "North America",
    accent: "#C084FC",
    countries: ["The Bahamas", "Canada", "Costa Rica", "Cuba", "Mexico", "Nicaragua", "Puerto Rico", "USA"],
  },
  {
    id: "oceania",
    name: "Oceania",
    accent: "#4ADE80",
    countries: ["Australia", "Fiji", "New Zealand"],
  },
  {
    id: "south-america",
    name: "South America",
    accent: "#F87171",
    countries: ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Peru", "Uruguay"],
  },
];

// ─── Spinning Globe ───────────────────────────────────────────────────────────
function SpinningGlobe({ size }: { size: number }) {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/vasturiano/react-globe.gl@master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((d) => { setCountries(d.features); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.65;
    ctrl.enableZoom = false;
    ctrl.enablePan = false;
    globeRef.current.pointOfView({ lat: 18, lng: 10, altitude: 2.4 }, 0);
    // Transparent canvas — section starfield shows through
    globeRef.current.renderer().setClearColor(0x000000, 0);
    globeRef.current.renderer().setPixelRatio(window.devicePixelRatio);
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size, margin: "0 auto" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="animate-spin rounded-full"
            style={{ width: 48, height: 48, border: `3px solid rgba(255,255,255,0.1)`, borderTopColor: GOLD }}
          />
        </div>
      )}

      <Globe
        ref={globeRef}
        width={size}
        height={size}
        onGlobeReady={handleGlobeReady}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        atmosphereColor="#1e82aa"
        atmosphereAltitude={0.14}
        polygonsData={countries}
        polygonCapColor={(feat: any) =>
          VISITED_ISO.has(feat.properties?.ISO_A3) ? "#E8A838" : "rgba(255,255,255,0.04)"
        }
        polygonSideColor={(feat: any) =>
          VISITED_ISO.has(feat.properties?.ISO_A3) ? "rgba(232,168,56,0.4)" : "rgba(0,0,0,0.08)"
        }
        polygonStrokeColor={() => "rgba(100,160,190,0.18)"}
        polygonAltitude={(feat: any) =>
          VISITED_ISO.has(feat.properties?.ISO_A3) ? 0.013 : 0.003
        }
        polygonLabel={(feat: any) => {
          const name = feat.properties?.ADMIN || feat.properties?.name || "";
          const visited = VISITED_ISO.has(feat.properties?.ISO_A3);
          return `<div style="background:rgba(13,30,38,0.92);padding:5px 10px;border-radius:6px;color:${
            visited ? "#E8A838" : "rgba(255,255,255,0.7)"
          };font-family:sans-serif;font-size:12px;border:1px solid ${
            visited ? "rgba(232,168,56,0.4)" : "rgba(255,255,255,0.1)"
          }">${visited ? "✓ " : ""}${name}</div>`;
        }}
      />

      {/* Legend — no vignette, stars bleed through freely */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full px-5 py-2"
        style={{ background: "rgba(13,30,38,0.85)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: GOLD }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.12)" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Not yet</span>
        </div>
      </div>
    </div>
  );
}

// ─── Continent card ─────────────────────────────────────────────��────────────
function ContinentCard({ continent }: { continent: (typeof CONTINENTS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ border: `1px solid rgba(255,255,255,0.08)`, background: "rgba(255,255,255,0.05)" }}
      whileHover={{ borderColor: `${continent.accent}55`, background: "rgba(255,255,255,0.08)" }}
      transition={{ duration: 0.2 }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full shrink-0" style={{ background: continent.accent }} />
          <div>
            <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem" }}>
              {continent.name}
            </p>
            <p style={{ color: continent.accent, fontSize: "0.75rem", fontWeight: 500 }}>
              {continent.countries.length} {continent.countries.length === 1 ? "country" : "countries and territories"}
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="pt-4 flex flex-wrap gap-2">
                {continent.countries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: `${continent.accent}18`,
                      color: continent.accent,
                      border: `1px solid ${continent.accent}33`,
                    }}
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Antarctica card ──────────────────────────────────────────────────────────
function AntarcticaCard() {
  return (
    <div
      className="rounded-xl px-5 py-4 flex items-center gap-3"
      style={{ border: "1px dashed rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.02)", opacity: 0.55 }}
    >
      <div className="w-2 h-8 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.2)" }} />
      <div>
        <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem" }}>
          Antarctica
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Not yet… 🧊</p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function TravelGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [globeSize, setGlobeSize] = useState(500);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setGlobeSize(Math.min(el.offsetWidth, 580));
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const totalCountries = CONTINENTS.reduce((sum, c) => sum + c.countries.length, 0);

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(//unpkg.com/three-globe/example/img/night-sky.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark teal overlay so text stays readable over the starfield */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(13,30,38,0.70)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-4">
          <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>
            Brian's World
          </p>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}
          >
            6 Continents · 60+ Countries
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto" }}>
            Brian has traveled to every highlighted spot, bringing firsthand stories and lessons learned to his presentations and consultations. His goals include reaching Antarctica and exploring 100 countries, including Iceland, South Africa, and China!
          </p>
        </div>

        {/* Globe */}
        <div ref={containerRef} className="w-full">
          <SpinningGlobe size={globeSize} />
        </div>

        {/* Hint */}
        <p className="text-center mt-2 mb-12" style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.75rem" }}>
          Hover a country to see its name · Drag to rotate
        </p>

        {/* Continent cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTINENTS.map((c) => (
            <ContinentCard key={c.id} continent={c} />
          ))}
          <AntarcticaCard />
        </div>

        {/* Footer stat */}
        <div className="mt-10 text-center">
          <span
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: GOLD }}
          >
            {totalCountries}+
          </span>
          <span className="ml-2" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
            destinations worth talking about
          </span>
        </div>
      </div>
    </section>
  );
}