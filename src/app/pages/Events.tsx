import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import {
  Calendar, MapPin, Clock, ArrowRight, ExternalLink,
  Video, Loader2, List, ChevronLeft, ChevronRight,
} from "lucide-react";
import { DARK, GOLD, goldGradient } from "../siteTheme";
import {
  photoWWACoverDunes,
  photoLandscapeValley,
  photoDesertDunes,
  photoJapanCherryBlossom,
  photoAtypElephants,
  photoAtypCubaRide,
  photoTMBAlpineLake,
  photoTMBHikers,
  photoSpinHaGiang,
  photoSpinEgypt,
  photoSpinCappadocia,
  photoPataTorres,
  photoAusSydney,
  photoCaminoSantiago,
  photoMachuPicchu,
  photoAngkorWat,
  photoMountainRange,
} from "../brianImages";

const FB_PAGE_URL   = "https://www.facebook.com/endlesspassport";
const FB_EVENTS_URL = "https://www.facebook.com/endlesspassport/events";

const WEEKDAYS    = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ─── Photo matching ───────────────────────────────────────────────────────────
function getPhotoForTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("japan"))                                    return photoJapanCherryBlossom;
  if (t.includes("africa") || t.includes("west africa"))     return photoWWACoverDunes;
  if (t.includes("atypical") || t.includes("globetrot"))     return photoAtypElephants;
  if (t.includes("mont blanc") || t.includes("tmb"))         return photoTMBAlpineLake;
  if (t.includes("spin around") || t.includes("spin"))       return photoSpinHaGiang;
  if (t.includes("morocco") || t.includes("truncated"))      return photoDesertDunes;
  if (t.includes("cuba"))                                     return photoAtypCubaRide;
  if (t.includes("south america") || t.includes("patagonia")) return photoPataTorres;
  if (t.includes("australia"))                                return photoAusSydney;
  if (t.includes("camino"))                                   return photoCaminoSantiago;
  if (t.includes("machu") || t.includes("peru"))             return photoMachuPicchu;
  if (t.includes("angkor") || t.includes("cambodia"))        return photoAngkorWat;
  if (t.includes("cappadocia") || t.includes("turkey"))      return photoSpinCappadocia;
  if (t.includes("sahara") || t.includes("egypt"))           return photoSpinEgypt;
  if (t.includes("himalaya") || t.includes("nepal"))         return photoMountainRange;
  if (t.includes("vietnam") || t.includes("ha giang"))       return photoSpinHaGiang;
  if (t.includes("hike") || t.includes("trekk"))             return photoTMBHikers;
  return photoLandscapeValley;
}

// ─── Parse Facebook ISO-8601 timestamp ───────────────────────────────────────
function parseFBTime(iso: string) {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const tIdx     = iso.indexOf("T");
  const datePart = tIdx >= 0 ? iso.substring(0, tIdx) : iso.substring(0, 10);
  const timePart = tIdx >= 0 ? iso.substring(tIdx + 1) : "00:00:00";
  const [yearS, monthS, dayS] = datePart.split("-");
  const monthI  = parseInt(monthS, 10) - 1;
  const offsetM = timePart.match(/([+-]\d{4})$/);
  const tz: "CST" | "CDT" = offsetM?.[1] === "-0600" ? "CST" : "CDT";
  const clean   = timePart.replace(/[+-]\d{4}$/, "").replace(/Z$/, "");
  const [hhS, mmS] = clean.split(":");
  const hh   = parseInt(hhS, 10);
  const mm   = parseInt(mmS, 10);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12  = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
  return {
    month:  MONTHS[monthI] ?? "???",
    dayNum: String(parseInt(dayS, 10)),
    year:   yearS,
    time:   `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`,
    tz,
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────
type EventFormat = "In-Person" | "Virtual";
type ViewMode    = "list" | "calendar";
type Filter      = "All" | "In-Person" | "Virtual";

interface EventItem {
  fbId:     string;
  month:    string;
  dayNum:   string;
  year:     string;
  time:     string;
  tz:       "CST" | "CDT";
  title:    string;
  format:   EventFormat;
  venue:    string;
  location: string;
  image:    string;
  link:     string;
  startIso: string;
}

// ─── FB event → EventItem ─────────────────────────────────────────────────────
function fbEventToItem(e: any): EventItem {
  const { month, dayNum, year, time, tz } = parseFBTime(e.start_time ?? "");
  const placeName = (e.place?.name ?? "").trim();
  const city      = (e.place?.location?.city  ?? "").trim();
  const stateStr  = (e.place?.location?.state ?? "").trim();
  const isVirtual =
    !placeName ||
    /online|zoom|virtual|webinar/i.test(placeName) ||
    /online|zoom|virtual|webinar/i.test(e.name ?? "");
  const venue    = placeName || (isVirtual ? "Endless Passport" : "TBA");
  const location = isVirtual
    ? "Online · Zoom"
    : [city, stateStr].filter(Boolean).join(", ") || venue;
  return {
    fbId:     String(e.id),
    month, dayNum, year, time, tz,
    title:    e.name ?? "Untitled Event",
    format:   isVirtual ? "Virtual" : "In-Person",
    venue, location,
    image:    e.cover?.source ?? getPhotoForTitle(e.name ?? ""),
    link:     `https://www.facebook.com/events/${e.id}`,
    startIso: e.start_time ?? "",
  };
}

// ─── Grouping helpers ─────────────────────────────────────────────────────────
function groupByMonth(evs: EventItem[]) {
  const map = new Map<string, EventItem[]>();
  for (const e of evs) {
    const key = `${e.month} ${e.year}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

function groupByDate(evs: EventItem[]) {
  const map = new Map<string, EventItem[]>();
  for (const e of evs) {
    const key = e.startIso.substring(0, 10);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

// ─── Shared EventCard ─────────────────────────────────────────────────────────
function EventCard({ event }: { event: EventItem }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row"
      style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)")}
    >
      {/* Thumbnail */}
      <div className="relative sm:w-36 h-36 sm:h-auto shrink-0 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" style={{ minHeight: 100 }} />
        <div
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-xs"
          style={{
            background: event.format === "Virtual" ? "rgba(59,130,246,0.85)" : "rgba(13,30,38,0.8)",
            color: "white", fontWeight: 600, backdropFilter: "blur(4px)",
          }}
        >
          {event.format === "Virtual" ? <Video size={10} /> : <MapPin size={10} />}
          {event.format}
        </div>
      </div>

      {/* Date badge */}
      <div
        className="sm:w-20 flex flex-row sm:flex-col items-center justify-center px-4 py-3 sm:py-5 shrink-0 gap-3 sm:gap-1"
        style={{ background: DARK }}
      >
        <p style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{event.month}</p>
        <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{event.dayNum}</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>{event.year}</p>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.1rem", lineHeight: 1.25 }}>
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm" style={{ color: "#888" }}>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: GOLD }} />
              {event.venue}{event.location !== "Online · Zoom" && ` · ${event.location}`}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} style={{ color: GOLD }} />
              {event.time} {event.tz}
            </span>
            {event.format === "Virtual" && (
              <span className="flex items-center gap-1.5" style={{ color: "#3b82f6" }}>
                <Video size={12} />Online · Zoom
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={event.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-85"
            style={{ background: event.format === "Virtual" ? "#3b82f6" : DARK, color: "white", fontWeight: 500 }}
          >
            RSVP on Facebook <ExternalLink size={12} />
          </a>
          <span style={{ color: "#bbb", fontSize: "0.75rem" }}>Free · All Ages Welcome</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Events() {
  const [view,     setView]     = useState<ViewMode>("list");
  const [filter,   setFilter]   = useState<Filter>("All");
  const [events,   setEvents]   = useState<EventItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const today = new Date();
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selDate,  setSelDate]  = useState<string | null>(null);

  // Once events load, jump calendar to first month with events
  useEffect(() => {
    if (events.length > 0) {
      const iso = events[0].startIso;
      setCalYear(parseInt(iso.substring(0, 4), 10));
      setCalMonth(parseInt(iso.substring(5, 7), 10) - 1);
    }
  }, [events.length]);

  // Fetch events from Facebook via server
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a/facebook/events`,
      { headers: { Authorization: `Bearer ${publicAnonKey}` } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.fbError) {
          // Token scope issue or FB API unavailable — not a crash, just log quietly
          console.warn("FB events unavailable:", data.fbError);
        }
        const allItems: EventItem[] = (data.data ?? []).map(fbEventToItem);
        console.log(`FB events raw: ${allItems.length} total`);
        const cutoff   = Date.now() - 6 * 60 * 60 * 1000;
        const upcoming = allItems.filter((item) => new Date(item.startIso).getTime() >= cutoff);
        console.log(`FB events after client filter: ${upcoming.length} upcoming`);
        setEvents(upcoming);
      })
      .catch((err) => {
        console.error("Failed to fetch FB events:", err);
        setApiError(String(err));
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered  = filter === "All" ? events : events.filter((e) => e.format === filter);
  const grouped   = useMemo(() => groupByMonth(filtered), [filtered]);
  const byDate    = useMemo(() => groupByDate(filtered),  [filtered]);

  // Calendar helpers
  const startWeekday = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate();
  const todayStr     = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelDate(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelDate(null);
  }
  function dayKey(d: number) {
    return `${calYear}-${String(calMonth + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  }

  const selEvents = selDate ? (byDate.get(selDate) ?? []) : [];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: DARK }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-widest text-sm mb-4" style={{ color: GOLD, fontWeight: 500 }}>
            Events
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700 }}
          >
            Upcoming Presentations
          </h1>
          <p className="mb-8 mx-auto" style={{ color: "rgba(255,255,255,0.68)", fontSize: "1.05rem", maxWidth: "600px", lineHeight: 1.8 }}>
            Find an in-person presentation in Chicagoland or catch one of Brian's live virtual talks from anywhere in the world. These events are free and open to the public!
          </p>
          <a
            href={FB_EVENTS_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-opacity hover:opacity-85"
            style={{ background: "#1877F2", color: "white", fontSize: "0.88rem", fontWeight: 500 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            View &amp; RSVP on Facebook
            <ExternalLink size={12} />
          </a>
        </div>
      </section>

      {/* ─── FILTER / VIEW BAR ─── */}
      <div
        className="sticky top-0 z-20 px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
        style={{ background: "white", borderBottom: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
      >
        {/* Format filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["All", "In-Person", "Virtual"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm transition-all"
              style={{
                background: filter === f ? DARK : "rgba(0,0,0,0.04)",
                color:      filter === f ? "white" : "#555",
                fontWeight: filter === f ? 600 : 400,
                border: "none", cursor: "pointer",
              }}
            >
              {f === "In-Person" && <MapPin size={12} />}
              {f === "Virtual"   && <Video  size={12} />}
              {f === "All"       && <Calendar size={12} />}
              {f}
              {!loading && (
                <span
                  className="ml-0.5 rounded-full px-1.5 py-0.5"
                  style={{
                    background: filter === f ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.07)",
                    fontSize: "0.68rem", fontWeight: 600,
                  }}
                >
                  {f === "All" ? events.length : events.filter((e) => e.format === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List / Calendar toggle */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.02)" }}
        >
          {([
            { key: "list"     as ViewMode, icon: <List     size={14} />, label: "List"     },
            { key: "calendar" as ViewMode, icon: <Calendar size={14} />, label: "Calendar" },
          ]).map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all"
              style={{
                background: view === key ? DARK : "transparent",
                color:      view === key ? "white" : "#777",
                fontWeight: view === key ? 600 : 400,
                border: "none", cursor: "pointer",
              }}
            >
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-12 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={32} className="animate-spin" style={{ color: GOLD }} />
              <p style={{ color: "#999", fontSize: "0.9rem" }}>Loading events from Facebook…</p>
            </div>
          )}

          {/* Error */}
          {!loading && apiError && (
            <div className="rounded-xl p-5" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
              <p style={{ fontWeight: 600, color: "#b91c1c", fontSize: "0.9rem" }}>Couldn't load live events</p>
              <p style={{ color: "#666", fontSize: "0.82rem", marginTop: 2 }}>
                There was a problem fetching events from Facebook. Check back soon, or{" "}
                <a href={FB_EVENTS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2" }}>
                  view all events directly on Facebook
                </a>.
              </p>
              <p className="mt-3 px-3 py-2 rounded text-xs font-mono break-all"
                style={{ background: "rgba(220,38,38,0.08)", color: "#991b1b" }}>
                {apiError}
              </p>
            </div>
          )}

          {/* ══ LIST VIEW ══════════════════════════════════════════════════════ */}
          {!loading && !apiError && view === "list" && (
            <>
              {events.length === 0 && (
                <div className="text-center py-16">
                  <p style={{ color: "#999", fontSize: "0.95rem" }}>No upcoming events found.</p>
                  <p style={{ color: "#bbb", fontSize: "0.82rem", marginTop: 6 }}>
                    Check{" "}
                    <a href={FB_EVENTS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2" }}>
                      facebook.com/endlesspassport
                    </a>{" "}
                    for the latest announcements.
                  </p>
                </div>
              )}
              {events.length > 0 && filtered.length === 0 && (
                <p className="text-center py-10" style={{ color: "#999" }}>No {filter} events coming up.</p>
              )}
              {Array.from(grouped.entries()).map(([month, monthEvents]) => (
                <div key={month}>
                  <div className="flex items-center gap-4 mb-6">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1.25rem", whiteSpace: "nowrap" }}>
                      {month}
                    </p>
                    <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.1)" }} />
                    <span style={{ color: "#bbb", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {monthEvents.length} event{monthEvents.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {monthEvents.map((event) => <EventCard key={event.fbId} event={event} />)}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ══ CALENDAR VIEW ══════════════════════════════════════════════════ */}
          {!loading && !apiError && view === "calendar" && (
            <div className="space-y-6">
              {/* Calendar card */}
              <div className="bg-white rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

                {/* Month nav header */}
                <div className="flex items-center justify-between px-6 py-4"
                  style={{ background: DARK }}>
                  <button
                    onClick={prevMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-70"
                    style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "none", cursor: "pointer" }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="text-center">
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "white", fontSize: "1.25rem" }}>
                      {MONTH_NAMES[calMonth]} {calYear}
                    </h2>
                    {filtered.length > 0 && (() => {
                      const count = Array.from(byDate.keys()).filter(k =>
                        k.startsWith(`${calYear}-${String(calMonth+1).padStart(2,"0")}`)
                      ).reduce((acc, k) => acc + (byDate.get(k)?.length ?? 0), 0);
                      return count > 0
                        ? <p style={{ color: GOLD, fontSize: "0.72rem", marginTop: 2 }}>{count} event{count !== 1 ? "s" : ""} this month</p>
                        : <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: 2 }}>No events this month</p>;
                    })()}
                  </div>
                  <button
                    onClick={nextMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-70"
                    style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "none", cursor: "pointer" }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 px-2 pt-4 pb-1">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="text-center py-1"
                      style={{ fontSize: "0.68rem", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-px mx-2 mb-3 rounded-xl overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.05)" }}>
                  {/* Empty cells before month start */}
                  {Array.from({ length: startWeekday }).map((_, i) => (
                    <div key={`e-${i}`} className="bg-white" style={{ minHeight: 80 }} />
                  ))}

                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d       = i + 1;
                    const key     = dayKey(d);
                    const evs     = byDate.get(key) ?? [];
                    const hasEvs  = evs.length > 0;
                    const isToday = key === todayStr;
                    const isSel   = key === selDate;

                    return (
                      <div
                        key={d}
                        onClick={() => hasEvs && setSelDate(isSel ? null : key)}
                        className="bg-white flex flex-col p-1.5 transition-colors"
                        style={{
                          minHeight: 80,
                          cursor:    hasEvs ? "pointer" : "default",
                          outline:   isSel ? `2.5px solid ${GOLD}` : "none",
                          outlineOffset: "-2px",
                          background: isSel ? `rgba(232,168,56,0.05)` : "white",
                        }}
                      >
                        {/* Day number */}
                        <div className="flex justify-end mb-1">
                          <span
                            className="w-7 h-7 flex items-center justify-center rounded-full"
                            style={{
                              fontSize:   "0.82rem",
                              fontWeight: isToday || hasEvs ? 700 : 400,
                              background: isToday ? DARK : "transparent",
                              color:      isToday ? "white" : hasEvs ? DARK : "#ccc",
                            }}
                          >
                            {d}
                          </span>
                        </div>

                        {/* Event pills (sm+) / dots (xs) */}
                        <div className="flex flex-col gap-0.5 mt-auto">
                          {hasEvs && evs.slice(0, 2).map((ev) => (
                            <div
                              key={ev.fbId}
                              className="hidden sm:block rounded px-1 py-0.5 truncate"
                              style={{
                                background: ev.format === "Virtual"
                                  ? "rgba(59,130,246,0.12)"
                                  : "rgba(232,168,56,0.2)",
                                color:      ev.format === "Virtual" ? "#1d4ed8" : "#92600a",
                                fontSize:   "0.6rem",
                                fontWeight: 600,
                                lineHeight: 1.4,
                              }}
                            >
                              {ev.title}
                            </div>
                          ))}
                          {hasEvs && evs.length > 2 && (
                            <div className="hidden sm:block text-center"
                              style={{ fontSize: "0.55rem", color: "#aaa", fontWeight: 600 }}>
                              +{evs.length - 2} more
                            </div>
                          )}
                          {/* Mobile dots */}
                          {hasEvs && (
                            <div className="sm:hidden flex gap-0.5 justify-center pb-1">
                              {evs.slice(0, 3).map((ev) => (
                                <div key={ev.fbId} className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: ev.format === "Virtual" ? "#3b82f6" : GOLD }} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="px-5 py-3 flex items-center gap-5 flex-wrap"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#f7f7f5" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ background: "rgba(232,168,56,0.35)" }} />
                    <span style={{ fontSize: "0.72rem", color: "#888" }}>In-Person</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ background: "rgba(59,130,246,0.25)" }} />
                    <span style={{ fontSize: "0.72rem", color: "#888" }}>Virtual / Zoom</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: DARK }}>
                      <span style={{ fontSize: "0.55rem", color: "white", fontWeight: 700 }}>
                        {today.getDate()}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "#888" }}>Today</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "#bbb", marginLeft: "auto" }}>
                    Click a day to see its events ↓
                  </p>
                </div>
              </div>

              {/* Selected day panel */}
              {selDate && selEvents.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: "rgba(0,0,0,0.08)" }} />
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: DARK, fontSize: "1rem", whiteSpace: "nowrap" }}>
                      {new Date(selDate + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long", month: "long", day: "numeric",
                      })}
                      {" "}— {selEvents.length} event{selEvents.length !== 1 ? "s" : ""}
                    </p>
                    <div className="h-px flex-1" style={{ background: "rgba(0,0,0,0.08)" }} />
                  </div>
                  {selEvents.map((ev) => <EventCard key={ev.fbId} event={ev} />)}
                </div>
              )}

              {/* No events this month hint */}
              {filtered.length > 0 && !Array.from(byDate.keys()).some(k =>
                k.startsWith(`${calYear}-${String(calMonth+1).padStart(2,"0")}`)
              ) && (
                <div className="text-center py-8">
                  <p style={{ color: "#bbb", fontSize: "0.9rem" }}>No events in this month.</p>
                  <button
                    onClick={nextMonth}
                    className="mt-2 inline-flex items-center gap-1 text-sm"
                    style={{ color: GOLD, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                  >
                    Next month <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Facebook sync note */}
          {!loading && (
            <div
              className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ background: "rgba(24,119,242,0.06)", border: "1px solid rgba(24,119,242,0.15)" }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#1877F2" }}>
                <svg width="10" height="18" viewBox="0 0 10 18" fill="white">
                  <path d="M6.5 18V10h2.8l.4-3.2H6.5V4.9c0-.9.3-1.6 1.6-1.6H9.8V.1C9.5.1 8.5 0 7.3 0 4.8 0 3.1 1.5 3.1 4.3v2.5H.3V10h2.8v8h3.4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p style={{ fontWeight: 600, color: DARK, fontSize: "0.9rem" }}>Events sync live from Facebook</p>
                <p style={{ color: "#666", fontSize: "0.82rem" }}>
                  This page pulls directly from Brian's Facebook page. Follow{" "}
                  <a href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2" }}>@endlesspassport</a>{" "}
                  to get notified the moment new events are posted.
                </p>
              </div>
              <a href={FB_EVENTS_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm shrink-0 transition-opacity hover:opacity-80"
                style={{ color: "#1877F2", fontWeight: 500 }}>
                View on Facebook <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ─── PAST EVENTS ─── */}
      <section className="py-16 px-4" style={{ background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(232,168,56,0.15)" }}>
                <Calendar size={24} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="uppercase tracking-widest text-xs mb-2" style={{ color: GOLD, fontWeight: 600 }}>
                  Program History
                </p>
                <h2 className="text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}>
                  400+ Events
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", maxWidth: 440, lineHeight: 1.6 }}>
                  For over eight years, Brian has presented at libraries, senior living facilities, community centers, schools, and more across
                  Chicagoland. Browse the full archive of past events on Facebook.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://www.facebook.com/endlesspassport/past_hosted_events"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition-opacity hover:opacity-85"
                style={{ background: "#1877F2", color: "white", fontWeight: 500 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Browse Past Events on Facebook <ExternalLink size={12} />
              </a>
              <p className="text-center" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>
                Opens facebook.com/endlesspassport
              </p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { value: "400+",   label: "Events Presented" },
              { value: "125+",   label: "Partners"          },
              { value: "8+ Yrs", label: "Of Storytelling"   },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: GOLD, fontSize: "1.7rem" }}>
                  {stat.value}
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOK CTA ─── */}
      <section className="py-16 px-4 text-center" style={{ background: goldGradient }}>
        <h2 className="text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700 }}>
          Want Brian at Your Event?
        </h2>
        <p className="mb-8 mx-auto"
          style={{ color: "rgba(255,255,255,0.9)", maxWidth: "450px", fontSize: "0.97rem" }}>
          Book Brian for your library, organization, school, or event in-person across
          Chicagoland or live via Zoom anywhere in the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/book-a-talk"
            className="inline-flex items-center gap-2 px-8 py-4 rounded"
            style={{ background: DARK, color: "white", fontWeight: 500 }}>
            Book a Talk <ArrowRight size={16} />
          </Link>
          <a href={FB_EVENTS_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded transition-opacity hover:opacity-85"
            style={{ background: "rgba(255,255,255,0.2)", color: "white", fontWeight: 500, border: "1.5px solid white" }}>
            Follow on Facebook <ExternalLink size={15} />
          </a>
        </div>
      </section>
    </div>
  );
}