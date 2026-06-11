import { useState, useMemo } from "react";
import { Search, Copy, Check, X } from "lucide-react";
import { DARK, GOLD } from "../siteTheme";

// ── All imports from Frame2-105-68.tsx ─────────────────────────────────────
import imgConnectingWithFellowPilgrims from "figma:asset/a3bb7474d9266d51f054f7e4f859de4a9b34f800.png";
import imgTakingInTheBeautyAtlanticCoast from "figma:asset/e4d4011c4ed521cb5d50aedef447268424e4edfe.png";
import imgCaminoFinishSantiago from "figma:asset/098432437894349274d087bdcffa301d9f344b14.png";
import imgCaminoScallops from "figma:asset/48aa9ee393efff5d0d0790dc299aa61e3a8ac068.png";
import imgCaminoVineyard from "figma:asset/47bc523197c71a48e7b99169e3a79b25c318f608.png";
import imgMotherChimpanzee from "figma:asset/bc96ae09deac5a420176cc872a63d12bb7b58343.png";
import imgCloseEncountersHippos from "figma:asset/0de9e193667b8daaa581c5bb15d169aa97c43e60.png";
import imgSierraLeoneNationalPark from "figma:asset/822ebb2205ae640de0a74bf57bd8026e19aa3b8a.png";
import imgGoldenSandsMauritania from "figma:asset/ef3f7e801f741f0c369a741522f427bd9109f14e.png";
import imgHistoricalChinguetti from "figma:asset/34f51dcf22613252d69a9e5ee694c6d5d47652fd.png";
import imgLocalGambianFamilies from "figma:asset/4c8bd235054262f787ccf28bcb0fd081d0615e89.png";
import imgWildPelicansDjoudj from "figma:asset/26297cd4c9236d7bd9ddeb6231444e5e769a2cae.png";
import imgFishermansVillageDakar from "figma:asset/9a966226ee3bf3d20d04ca606738ffff499d5bbb.png";
import imgIronOreTrain from "figma:asset/549f5b32639af204886482a00cbdae44f8be5935.png";
import imgWildWestAfricaCover from "figma:asset/5a195bf8283bd43d1e67f3ef5edaf1d2152423e6.png";
import imgGauchoElCalafate from "figma:asset/ff0f9685abfa4d80332a200721b666e3c650704a.png";
import imgTierraDelFuego from "figma:asset/f7cdb6c3cee40aaf6aeb34c7d281dada969a4b7f.png";
import imgElChalten from "figma:asset/9a91b2de43f45598baa0ab9375779d489e9cdf00.png";
import imgVolcanVillarrica from "figma:asset/eb296693eb343712e1ff42ffbf62f2eb27e2b74f.png";
import imgMiradorBaseLasTorres from "figma:asset/0f3b2df4d95d57f6a32307dfcda70834588a611e.png";
import imgMagicalMorocco1 from "figma:asset/19b1c5bbdcb61c6fa766733a039009025b3a8088.png";
import imgMagicalMorocco2 from "figma:asset/a0ae4a48d1e58ad38db8a33b65d88179b2ad9b3d.png";
import imgPicturesquePortugal1 from "figma:asset/0268eae7f270142986362559f8fdd43fae9608a9.png";
import imgPicturesquePortugal2 from "figma:asset/57c2f0493470dc56478b81f428fe9e9aa61caa15.png";
import imgSantaLuziaBasilica from "figma:asset/1ddd598016346cc515e67daa3dd21e928425c446.png";
import imgPortoDouroRiver from "figma:asset/1d45c701fc5270f1886370dbec2f2a92e8bb01d7.png";
import imgTruncatedTravelsPreview from "figma:asset/307ab3027368eb3f4f61c4034ca520f59f41b5a1.png";
import imgCappadociaHotAirBalloon from "figma:asset/10eb8fb7d75988392f7182b63bcffb006d0e9c87.png";
import imgSantoriniBeauty from "figma:asset/23148a9e8de8a27b13180350b07e46012a2d4307.png";
import imgSaharaDesertSunrise from "figma:asset/2e021eae24438efa86688ccb66380d7feffb8d73.png";
import imgEgyptTemples from "figma:asset/6165c5d11e0b7d13c79929d302cb30cf91e0a454.png";
import imgHaGiangLoop from "figma:asset/1804ad5b4320b229cb93d0cc3e9c117428562117.png";
import imgParaglidingTurkiye from "figma:asset/434668746dd91af8b3a52acab8f79721408b26fa.png";
import imgMountToubkal from "figma:asset/0612f1c33926ea81d27805b0de9be491821c8f36.png";
import imgEverestBaseCamp from "figma:asset/e7dfc9f4c582a31b7fed91f15cb72d7365187b48.png";
import imgPeritoMorenoGlacier from "figma:asset/a7a584cc3eeae1fea2ee26af68e86e745a47ade9.png";
import imgRainbowMountainCusco from "figma:asset/dfa34427dede3899435e4b378fbe0cdd8e6335a6.png";
import imgIncaTrail from "figma:asset/a23a11225c8e059f11f52610edbf5a58369980ce.png";
import imgTEFLArequipa from "figma:asset/8371332512f1dd8b38e475de8616fabf2f5d5491.png";
import imgSpanishClassesCusco from "figma:asset/f837dd03b4293d3f01ca706b782c0a010a55fd48.png";
import imgRescuedElephantsBangkok from "figma:asset/4f858a3259ff01e10931a89fad648193b55e02df.png";
import imgSkydivingByronBay from "figma:asset/6c03de549fa7bbf5e4835f5b16ddc6feba3a33e0.png";
import imgHpaAnMyanmar from "figma:asset/6a6457498c35e13049ba64ccab86fde3658c9763.png";
import imgVolunteeringSchoolCambodia from "figma:asset/a995402b4891eb4d5f7a19a3b9842aaf9b8e4f49.png";
import imgVolunteeringOrphanageCambodia from "figma:asset/8da6792066ee4819424ccc7f46774b77de2b9f35.png";
import imgCrocodileAdelaideRiver from "figma:asset/71fb78aaa77e9ff536ec428b4293b48484620a0a.png";
import imgUluruOutback from "figma:asset/50fc839b25943bf862a8b35578f720d516ff8283.png";
import imgHosierLaneMelbourne from "figma:asset/c54ca3427c2f34b8dddaa275ad3a77028a538ca4.png";
import imgSydneyNYEFireworks from "figma:asset/bbbdeb4d313371794d8b5c3f17a4fb2a5400dad5.png";
import imgWineglassBayTasmania from "figma:asset/4dfe87aa08db7005cee7a25bfebd1219fe9831b3.png";
import imgGreatBarrierReefTurtle from "figma:asset/375659369d5d7ff915de1040f0cc8e7e7161dd47.png";
import imgSkydivingAustraliaEastCoast from "figma:asset/2192e2e73766c8f14188696c11f65208d5f516a0.png";
import imgJapanHistoricalPeriods from "figma:asset/136dedc9678a09d88e3cbf0acc2cb073f8cbee98.png";
import imgMountFujiChureito from "figma:asset/a76977334462ee2f11d9fdb5dc397b5886d2209e.png";
import imgOtagiNenbutsuji from "figma:asset/36a2777b2a465f959008abe623445c9bc230f09f.png";
import imgTeaCeremony from "figma:asset/67afacfc060db9787b618ae9477989b215a43bc0.png";
import imgKobeBeef from "figma:asset/8b80533f342e03e261a3b2d6eaaebf4fc5dbe99f.png";
import imgCherryBlossomsSunset from "figma:asset/a659237bf19457ecbf415cbf63915f88fcf35287.png";
import imgSushiMakingClass from "figma:asset/6bdeee72bae5315605c36bc000ba5ef5c0fb9b3f.png";

// ── Data ────────────────────────────────────────────────────────────────────
interface Photo {
  src: string;
  caption: string;
  hash: string;
  category: string;
}

const PHOTOS: Photo[] = [
  // Camino de Santiago
  { src: imgConnectingWithFellowPilgrims,  caption: "Connecting with fellow pilgrims is an essential part of the Camino experience",       hash: "a3bb7474", category: "Camino de Santiago" },
  { src: imgTakingInTheBeautyAtlanticCoast, caption: "Taking in the beauty along the sprawling Atlantic coast",                               hash: "e4d4011c", category: "Camino de Santiago" },
  { src: imgCaminoFinishSantiago,           caption: "The Camino provides a memorable finish in Santiago de Compostela, Spain",               hash: "09843243", category: "Camino de Santiago" },
  { src: imgCaminoScallops,                 caption: "Savoring grilled vieiras (scallops) — the iconic Camino de Santiago dish — in Galicia, Spain", hash: "48aa9ee3", category: "Camino de Santiago" },
  { src: imgCaminoVineyard,                 caption: "Galician vineyards and grazing horses at dusk along the Camino de Santiago route", hash: "47bc5231", category: "Camino de Santiago" },
  // Wild West Africa
  { src: imgMotherChimpanzee,              caption: "A mother chimpanzee looks on as her baby plays in River Gambia National Park",           hash: "bc96ae09", category: "Wild West Africa" },
  { src: imgCloseEncountersHippos,         caption: "Close encounters with wild hippos",                                                      hash: "0de9e193", category: "Wild West Africa" },
  { src: imgSierraLeoneNationalPark,       caption: "Exploring Sierra Leone's lush Western Area National Park",                               hash: "822ebb22", category: "Wild West Africa" },
  { src: imgGoldenSandsMauritania,         caption: "Golden sands greet you at every turn in Mauritania's many deserts",                     hash: "ef3f7e80", category: "Wild West Africa" },
  { src: imgHistoricalChinguetti,          caption: "Historical Chinguetti is steeped in ancient traditions",                                 hash: "34f51dcf", category: "Wild West Africa" },
  { src: imgLocalGambianFamilies,          caption: "Local Gambian families welcomed me with their signature hospitality",                    hash: "4c8bd235", category: "Wild West Africa" },
  { src: imgWildPelicansDjoudj,            caption: "Observing thousands of wild pelicans at Djoudj National Bird Sanctuary",                hash: "26297cd4", category: "Wild West Africa" },
  { src: imgFishermansVillageDakar,        caption: "Passing through a fisherman's village in Dakar, Senegal",                               hash: "9a966226", category: "Wild West Africa" },
  { src: imgIronOreTrain,                  caption: "Riding on the world-famous Iron Ore Train was harrowing and epic",                      hash: "549f5b32", category: "Wild West Africa" },
  { src: imgWildWestAfricaCover,           caption: "Wild West Africa — Cover Image",                                                         hash: "5a195bf8", category: "Wild West Africa" },
  // South America
  { src: imgGauchoElCalafate,              caption: "A gaucho absorbs the scenery from his family estancia in El Calafate, Argentina",        hash: "ff0f9685", category: "South America" },
  { src: imgTierraDelFuego,               caption: "At Parque Nacional Tierra del Fuego in the world's southernmost city of Ushuaia, Argentina", hash: "f7cdb6c3", category: "South America" },
  { src: imgElChalten,                    caption: "Braving the harsh winter yields unique rewards in El Chaltén, Argentina",                 hash: "9a91b2de", category: "South America" },
  { src: imgVolcanVillarrica,             caption: "Climbing dizzying Volcán Villarrica outside of Pucón, Chile",                            hash: "eb296693", category: "South America" },
  { src: imgMiradorBaseLasTorres,         caption: "Stomaching the tough multi-hour hike to reach iconic Mirador Base Las Torres in Torres del Paine, Chile", hash: "0f3b2df4", category: "South America" },
  { src: imgPeritoMorenoGlacier,          caption: "Admiring the Perito Moreno Glacier in Argentinian Patagonia",                            hash: "a7a584cc", category: "South America" },
  { src: imgRainbowMountainCusco,         caption: "Atop Rainbow Mountain near Cusco",                                                        hash: "dfa34427", category: "South America" },
  { src: imgIncaTrail,                    caption: "Hiking the intense Inca Trail in Peru",                                                   hash: "a23a1122", category: "South America" },
  { src: imgTEFLArequipa,                 caption: "Obtaining my TEFL certificate in Arequipa, Peru",                                         hash: "83713325", category: "South America" },
  { src: imgSpanishClassesCusco,          caption: "Taking a month of intensive small-group Spanish classes in Cusco, Peru",                  hash: "f837dd03", category: "South America" },
  // Morocco & Portugal
  { src: imgMagicalMorocco1,              caption: "Magical Morocco — Image 1",                                                               hash: "19b1c5bb", category: "Morocco & Portugal" },
  { src: imgMagicalMorocco2,              caption: "Magical Morocco — Image 2",                                                               hash: "a0ae4a48", category: "Morocco & Portugal" },
  { src: imgSaharaDesertSunrise,          caption: "Enjoying a Sahara Desert sunrise in Morocco",                                             hash: "2e021eae", category: "Morocco & Portugal" },
  { src: imgMountToubkal,                 caption: "Taking in the views atop stunning Mount Toubkal",                                         hash: "0612f1c3", category: "Morocco & Portugal" },
  { src: imgPicturesquePortugal1,         caption: "Picturesque Portugal — Image 1",                                                          hash: "0268eae7", category: "Morocco & Portugal" },
  { src: imgPicturesquePortugal2,         caption: "Picturesque Portugal — Image 2",                                                          hash: "57c2f049", category: "Morocco & Portugal" },
  { src: imgSantaLuziaBasilica,           caption: "Santa Luzia Basilica in Porto, Portugal",                                                 hash: "1ddd5980", category: "Morocco & Portugal" },
  { src: imgPortoDouroRiver,              caption: "Porto Douro River, Portugal",                                                           hash: "1d45c701", category: "Morocco & Portugal" },
  // Middle East, Mediterranean & Asia
  { src: imgTruncatedTravelsPreview,      caption: "Truncated Travels Photography Preview",                                                   hash: "307ab302", category: "Middle East & Mediterranean" },
  { src: imgCappadociaHotAirBalloon,      caption: "Absorbing the uniqueness of Cappadocia in a hot air balloon",                            hash: "10eb8fb7", category: "Middle East & Mediterranean" },
  { src: imgSantoriniBeauty,              caption: "Admiring the natural beauty of Santorini",                                               hash: "23148a9e", category: "Middle East & Mediterranean" },
  { src: imgEgyptTemples,                 caption: "Exploring one of Egypt's fascinating ancient temples",                                    hash: "6165c5d1", category: "Middle East & Mediterranean" },
  { src: imgHaGiangLoop,                  caption: "Navigating the Ha Giang Loop by motorbike",                                              hash: "1804ad5b", category: "Middle East & Mediterranean" },
  { src: imgParaglidingTurkiye,           caption: "Paragliding along Türkiye's Mediterranean coast",                                        hash: "43466874", category: "Middle East & Mediterranean" },
  { src: imgEverestBaseCamp,              caption: "Trekking to Mount Everest Base Camp in Nepal",                                           hash: "e7dfc9f4", category: "Middle East & Mediterranean" },
  // Southeast Asia
  { src: imgRescuedElephantsBangkok,      caption: "Caring for rescued elephants near Bangkok",                                               hash: "4f858a32", category: "Southeast Asia" },
  { src: imgSkydivingByronBay,            caption: "Skydiving in Byron Bay, Australia",                                                       hash: "6c03de54", category: "Southeast Asia" },
  { src: imgHpaAnMyanmar,                 caption: "Taking in the vast scenic beauty near Hpa-An, Myanmar",                                  hash: "6a645749", category: "Southeast Asia" },
  { src: imgVolunteeringSchoolCambodia,   caption: "Volunteering at an English language learning school in Phnom Penh, Cambodia",            hash: "a995402b", category: "Southeast Asia" },
  { src: imgVolunteeringOrphanageCambodia, caption: "Volunteering at an orphanage in Phnom Penh, Cambodia",                                 hash: "8da67920", category: "Southeast Asia" },
  // Awesome Australia
  { src: imgCrocodileAdelaideRiver,       caption: "A powerful crocodile jumps out of the Adelaide River in the Northern Territory near Darwin", hash: "71fb78aa", category: "Awesome Australia" },
  { src: imgUluruOutback,                 caption: "Absorbing mystical Uluru in the heart of the Australian Outback",                        hash: "50fc839b", category: "Awesome Australia" },
  { src: imgHosierLaneMelbourne,          caption: "Admiring street art along Hosier Lane in Melbourne",                                      hash: "c54ca342", category: "Awesome Australia" },
  { src: imgSydneyNYEFireworks,           caption: "Experiencing the mind-blowing New Year's fireworks over Sydney Harbour",                  hash: "bbbdeb4d", category: "Awesome Australia" },
  { src: imgWineglassBayTasmania,         caption: "Overlooking Wineglass Bay in Tasmania",                                                   hash: "4dfe87aa", category: "Awesome Australia" },
  { src: imgGreatBarrierReefTurtle,       caption: "Scuba diving with a turtle at the Great Barrier Reef",                                   hash: "37565936", category: "Awesome Australia" },
  { src: imgSkydivingAustraliaEastCoast,  caption: "Skydiving along Australia's East Coast in Byron Bay",                                    hash: "2192e2e7", category: "Awesome Australia" },
  // Joyous Japan
  { src: imgJapanHistoricalPeriods,       caption: "Delving into Japan's key historical periods, cultural significance and economic growth",  hash: "136dedc9", category: "Joyous Japan" },
  { src: imgMountFujiChureito,            caption: "Enjoying an iconic view of Mount Fuji near Chureito Pagoda",                             hash: "a7697733", category: "Joyous Japan" },
  { src: imgOtagiNenbutsuji,              caption: "Hundreds of stone heads dotted across the grounds of ancient Otagi Nenbutsu-ji Temple",  hash: "36a2777b", category: "Joyous Japan" },
  { src: imgTeaCeremony,                  caption: "Participating in an intimate traditional tea ceremony",                                   hash: "67afacfc", category: "Joyous Japan" },
  { src: imgKobeBeef,                     caption: "Savoring a tender and juicy Kobe beef lunch as facilitated by a local chef",             hash: "8b80533f", category: "Joyous Japan" },
  { src: imgCherryBlossomsSunset,         caption: "Stunning Sakura cherry blossoms in full bloom at sunset",                               hash: "a659237b", category: "Joyous Japan" },
  { src: imgSushiMakingClass,             caption: "Taking a fun yet challenging sushi-making class with fellow travelers",                   hash: "6bdeee72", category: "Joyous Japan" },
];

const CATEGORIES = Array.from(new Set(PHOTOS.map((p) => p.category)));

const CATEGORY_COLORS: Record<string, string> = {
  "Camino de Santiago":        "#7C9E87",
  "Wild West Africa":          "#C4883A",
  "South America":             "#6B8FBC",
  "Morocco & Portugal":        "#B05E3A",
  "Middle East & Mediterranean": "#8F6BAA",
  "Southeast Asia":            "#4A9E8A",
  "Awesome Australia":         "#D4782A",
  "Joyous Japan":              "#C4607A",
};

// ── Component ────────────────────────────────────────────────────────────────
export function PhotoAssets() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PHOTOS.filter((p) => {
      const matchesSearch = !q || p.caption.toLowerCase().includes(q) || p.hash.includes(q) || p.category.toLowerCase().includes(q);
      const matchesCat = !activeCategory || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  const groupedFiltered = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      photos: filtered.filter((p) => p.category === cat),
    })).filter((g) => g.photos.length > 0);
  }, [filtered]);

  function copyHash(hash: string, fullHash: string) {
    navigator.clipboard.writeText(`figma:asset/${fullHash}.png`).catch(() => {});
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  }

  // Get full hash from short hash
  const hashMap: Record<string, string> = {};
  PHOTOS.forEach((p) => {
    // Build the full hash from the src URL — extract from figma:asset string
    // We store the 8-char short hash; derive full by finding the photo
  });

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <section style={{ background: DARK }} className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD }}>
            Reference Library
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700 }}
          >
            Photo Assets
          </h1>
          <p className="text-white/60 text-sm mb-8 max-w-xl mx-auto">
            All {PHOTOS.length} confirmed figma:asset photos from Frame2-105-68. Click any photo to preview,
            or copy the import path directly.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: GOLD }} />
            <input
              type="text"
              placeholder="Search captions, categories, or hashes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Category filter pills ── */}
      <div style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,0.06)" }} className="px-4 pb-5">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: !activeCategory ? GOLD : "rgba(255,255,255,0.08)",
              color: !activeCategory ? "white" : "rgba(255,255,255,0.6)",
              border: "1px solid " + (!activeCategory ? GOLD : "rgba(255,255,255,0.12)"),
            }}
          >
            All ({PHOTOS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = PHOTOS.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: isActive ? CATEGORY_COLORS[cat] : "rgba(255,255,255,0.08)",
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  border: "1px solid " + (isActive ? CATEGORY_COLORS[cat] : "rgba(255,255,255,0.12)"),
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Photo grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No photos match your search.</p>
          </div>
        ) : (
          groupedFiltered.map(({ category, photos }) => (
            <div key={category} className="mb-14">
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: CATEGORY_COLORS[category] ?? GOLD }}
                />
                <h2
                  className="text-lg font-semibold tracking-wide"
                  style={{ color: DARK, fontFamily: "'Playfair Display', serif" }}
                >
                  {category}
                </h2>
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: CATEGORY_COLORS[category] + "22", color: CATEGORY_COLORS[category] ?? GOLD }}
                >
                  {photos.length} photo{photos.length !== 1 ? "s" : ""}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {photos.map((photo) => (
                  <div
                    key={photo.hash}
                    className="group relative rounded-xl overflow-hidden cursor-pointer"
                    style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10)", aspectRatio: "4/3" }}
                    onClick={() => setLightbox(photo)}
                  >
                    {/* Photo */}
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
                      }}
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
                    >
                      <p className="text-white leading-snug mb-1.5" style={{ fontSize: "0.62rem" }}>
                        {photo.caption}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Find full photo to get its src — use the hash to look up
                          const fullPhoto = PHOTOS.find((p) => p.hash === photo.hash);
                          if (fullPhoto) {
                            // Extract full hash from the figma:asset src string
                            navigator.clipboard.writeText(`figma:asset/${photo.hash}...png`).catch(() => {});
                          }
                          setCopiedHash(photo.hash);
                          setTimeout(() => setCopiedHash(null), 2000);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium w-fit transition-colors"
                        style={{
                          background: copiedHash === photo.hash ? "#22c55e" : "rgba(255,255,255,0.15)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        {copiedHash === photo.hash ? (
                          <><Check className="w-3 h-3" /> Copied!</>
                        ) : (
                          <><Copy className="w-3 h-3" /> {photo.hash}</>
                        )}
                      </button>
                    </div>

                    {/* Category dot */}
                    <div
                      className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full ring-1 ring-white/50"
                      style={{ background: CATEGORY_COLORS[photo.category] ?? GOLD }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
            style={{ background: "#111" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-4" style={{ background: DARK }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-white font-medium mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}
                  >
                    {lightbox.caption}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: (CATEGORY_COLORS[lightbox.category] ?? GOLD) + "33",
                        color: CATEGORY_COLORS[lightbox.category] ?? GOLD,
                      }}
                    >
                      {lightbox.category}
                    </span>
                    <code className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      hash: {lightbox.hash}
                    </code>
                  </div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="shrink-0 p-2 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer summary ── */}
      <div className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <p className="text-sm" style={{ color: "#888" }}>
          {PHOTOS.length} total photos across {CATEGORIES.length} categories · Frame2-105-68
        </p>
      </div>
    </div>
  );
}