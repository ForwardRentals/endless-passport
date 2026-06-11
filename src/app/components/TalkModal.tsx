import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Clock, MapPin, Video, Youtube, Star } from "lucide-react";
import { DARK, GOLD } from "../siteTheme";

// ─── Types (mirrored from BookATalk) ─────────────────────────────────────────
export type PricingTier = {
  price: string;
  label: string;
  sublabel: string;
  color: string;
  addon: string | null;
};
export type Photo = { src: string; caption: string; pos: string };
export type ProgramDetail = {
  fullDesc: string;
  mission: string;
  audiences: string[];
  pricing: PricingTier[];
  photos: Photo[];
  note?: string;
};
export type Program = {
  id: number;
  isNew: boolean;
  title: string;
  desc: string;
  duration: string;
  image: string;
  imgPos: string;
  detail: ProgramDetail | null;
};

interface TalkModalProps {
  program: Program | null;
  onClose: () => void;
  /** Called when user clicks "Book This Talk" — defaults to onClose if omitted */
  onBookTalk?: () => void;
}

export function TalkModal({ program, onClose, onBookTalk }: TalkModalProps) {
  const [galleryIdx,   setGalleryIdx]   = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx,  setLightboxIdx]  = useState(0);

  // Reset internal state whenever a new program is opened
  useEffect(() => {
    setGalleryIdx(0);
    setLightboxOpen(false);
    setLightboxIdx(0);
  }, [program?.id]);

  // Keyboard navigation for gallery and lightbox
  useEffect(() => {
    if (!program) return;
    const photos = program.detail?.photos ?? [];
    const n = photos.length;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
      if (n === 0) return;
      if (e.key === "ArrowRight") {
        if (lightboxOpen) setLightboxIdx(i => (i + 1) % n);
        else setGalleryIdx(i => (i + 1) % n);
      }
      if (e.key === "ArrowLeft") {
        if (lightboxOpen) setLightboxIdx(i => (i - 1 + n) % n);
        else setGalleryIdx(i => (i - 1 + n) % n);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [program, lightboxOpen, onClose]);

  if (!program) return null;

  const modalPhotos = program.detail?.photos ?? [];
  const hasPhotos   = modalPhotos.length > 0;
  const curPhoto    = hasPhotos ? modalPhotos[galleryIdx] : null;
  const totalPics   = modalPhotos.length;

  return (
    <>
      {/* ── Modal ── */}
      <div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-6 px-3 sm:py-10 sm:px-4"
        style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "white", maxWidth: 760 }}>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
          >
            <X size={16} />
          </button>

          {/* ── Gallery Hero ── */}
          <div className="relative overflow-hidden" style={{ background: "#0a0a0a", height: "clamp(260px, 44vw, 460px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {hasPhotos ? (
              <>
                <img
                  src={curPhoto!.src}
                  alt={curPhoto!.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 cursor-zoom-in"
                  style={{ objectPosition: curPhoto!.pos, transform: "scale(1.12)", transformOrigin: "center center" }}
                  onClick={() => { setLightboxIdx(galleryIdx); setLightboxOpen(true); }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 45%)" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%)" }} />

                {/* Expand hint */}
                <button
                  className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-opacity hover:opacity-100 opacity-80"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.9)", fontSize: "0.7rem" }}
                  onClick={() => { setLightboxIdx(galleryIdx); setLightboxOpen(true); }}
                >
                  <Expand size={11} /> Expand
                </button>

                {/* Photo counter */}
                <div className="absolute top-3.5 right-14 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem" }}>
                  {galleryIdx + 1} / {totalPics}
                </div>

                {/* Prev arrow */}
                {totalPics > 1 && (
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-100 opacity-60 hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "white" }}
                    onClick={(e) => { e.stopPropagation(); setGalleryIdx(i => (i - 1 + totalPics) % totalPics); }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {/* Next arrow */}
                {totalPics > 1 && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-100 opacity-60 hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "white" }}
                    onClick={(e) => { e.stopPropagation(); setGalleryIdx(i => (i + 1) % totalPics); }}
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </>
            ) : (
              <>
                <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: program.imgPos }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)" }} />
              </>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}>
              {program.isNew && (
                <span className="inline-block px-2.5 py-0.5 rounded text-xs mb-2" style={{ background: GOLD, color: "white", fontWeight: 700 }}>✦ New Program</span>
              )}
              <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, lineHeight: 1.15 }}>
                {program.title}
              </h2>
              {curPhoto && (
                <p className="mt-1 italic leading-snug" style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.76rem" }}>{curPhoto.caption}</p>
              )}
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          {hasPhotos && totalPics > 1 && (
            <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ background: "#151515", scrollbarWidth: "thin" }}>
              {modalPhotos.map((photo, i) => (
                <button
                  key={i}
                  className="shrink-0 rounded overflow-hidden transition-all duration-200 hover:opacity-100"
                  style={{
                    width: 68, height: 50,
                    outline: i === galleryIdx ? `2.5px solid ${GOLD}` : "2.5px solid transparent",
                    outlineOffset: 1,
                    opacity: i === galleryIdx ? 1 : 0.48,
                    background: "#111",
                    position: "relative",
                  }}
                  onClick={() => setGalleryIdx(i)}
                  title={photo.caption}
                >
                  <img src={photo.src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: photo.pos }} />
                </button>
              ))}
            </div>
          )}

          {/* ── Body ── */}
          <div className="p-6 space-y-5">

            {/* Description */}
            <div style={{ color: "#444", fontSize: "0.95rem", lineHeight: 1.75 }}>
              {(program.detail?.fullDesc ?? program.desc).split("\n\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
              ))}
            </div>

            {/* Note banner */}
            {program.detail?.note && (
              <div className="p-3.5 rounded-xl flex gap-3 items-start" style={{ background: "rgba(232,168,56,0.08)", border: `1px solid ${GOLD}33` }}>
                <Star size={14} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
                <p style={{ color: "#8a6015", fontSize: "0.82rem", lineHeight: 1.6 }}>{program.detail.note}</p>
              </div>
            )}

            {/* Mission */}
            {program.detail?.mission && (
              <div className="p-4 rounded-xl" style={{ background: `${DARK}06`, borderLeft: `3px solid ${GOLD}` }}>
                <p className="uppercase tracking-widest text-xs mb-1.5" style={{ color: GOLD, fontWeight: 600 }}>Mission</p>
                <p style={{ color: "#444", fontSize: "0.9rem", lineHeight: 1.65 }}>{program.detail.mission}</p>
              </div>
            )}

            {/* Audiences + duration */}
            {program.detail && (
              <div className="grid sm:grid-cols-2 gap-5">
                {program.detail.audiences && (
                  <div>
                    <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#aaa", fontWeight: 600 }}>Ideal Audiences</p>
                    <div className="flex gap-2 flex-wrap">
                      {program.detail.audiences.map((a) => (
                        <span key={a} className="px-3 py-1.5 rounded-full text-sm" style={{ background: "rgba(232,168,56,0.1)", color: "#c8821a", fontWeight: 500 }}>{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#aaa", fontWeight: 600 }}>Format</p>
                  <span className="flex items-center gap-1.5 text-sm" style={{ color: DARK }}>
                    <Clock size={13} style={{ color: GOLD }} />
                    {program.duration} · 55-min presentation + live Q&A
                  </span>
                </div>
              </div>
            )}

            {/* Pricing */}
            {program.detail?.pricing && (
              <div>
                <p className="uppercase tracking-widest text-xs mb-3" style={{ color: "#aaa", fontWeight: 600 }}>Program Options</p>
                <div className="space-y-2">
                  {program.detail.pricing.map((tier) => (
                    <div key={tier.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fafafa", border: "1px solid rgba(0,0,0,0.07)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tier.color}18`, color: tier.color }}>
                        {tier.label === "Live In-Person" && <MapPin size={12} />}
                        {tier.label === "Live Virtual"   && <Video size={12} />}
                        {tier.label === "Pre-Recorded"   && <Youtube size={12} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span style={{ fontWeight: 700, color: tier.color, fontSize: "0.95rem" }}>{tier.price}</span>
                          <span style={{ fontWeight: 600, color: DARK, fontSize: "0.82rem" }}>{tier.label}</span>
                          <span style={{ color: "#999", fontSize: "0.72rem" }}>· {tier.sublabel}</span>
                        </div>
                        {tier.addon && <p style={{ color: "#bbb", fontSize: "0.7rem" }}>{tier.addon}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={onBookTalk ?? onClose}
                className="flex-1 text-center py-3 rounded-lg text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, fontWeight: 600 }}
              >
                Book This Talk
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-lg text-sm hover:opacity-70 transition-opacity"
                style={{ background: "rgba(0,0,0,0.06)", color: "#555" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      {lightboxOpen && program.detail?.photos && (() => {
        const lbPhotos = program.detail!.photos;
        const lbN      = lbPhotos.length;
        const lbPhoto  = lbPhotos[lightboxIdx];
        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.96)" }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity z-10"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {lightboxIdx + 1} / {lbN}
            </div>

            {/* Title */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center hidden sm:block">
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Playfair Display', serif" }}>{program.title}</p>
            </div>

            {/* Main image */}
            <img
              src={lbPhoto.src}
              alt={lbPhoto.caption}
              className="object-contain select-none"
              style={{ maxHeight: "82vh", maxWidth: "88vw" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Prev */}
            {lbN > 1 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-100 opacity-60"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); const ni = (lightboxIdx - 1 + lbN) % lbN; setLightboxIdx(ni); setGalleryIdx(ni); }}
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Next */}
            {lbN > 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-100 opacity-60"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); const ni = (lightboxIdx + 1) % lbN; setLightboxIdx(ni); setGalleryIdx(ni); }}
              >
                <ChevronRight size={26} />
              </button>
            )}

            {/* Caption + thumbnail strip */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-12" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
              <p className="text-center italic mb-3" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.88rem" }}>{lbPhoto.caption}</p>
              {lbN > 1 && (
                <div className="flex justify-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {lbPhotos.map((ph, i) => (
                    <button
                      key={i}
                      className="shrink-0 rounded overflow-hidden transition-all duration-150"
                      style={{
                        width: 54, height: 38,
                        outline: i === lightboxIdx ? `2px solid ${GOLD}` : "2px solid transparent",
                        opacity: i === lightboxIdx ? 1 : 0.45,
                        background: "#111",
                        position: "relative",
                      }}
                      onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); setGalleryIdx(i); }}
                    >
                      <img src={ph.src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: ph.pos }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </>
  );
}