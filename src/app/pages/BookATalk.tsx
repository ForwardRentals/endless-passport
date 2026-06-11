import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { CheckCircle, Camera, Users, MapPin, Clock, Star, ArrowRight, Video, Youtube } from "lucide-react";
import { TalkModal } from "../components/TalkModal";
import { DARK, GOLD, darkRgba } from "../siteTheme";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  // General travel photos — ALL confirmed present in Frame1.tsx (legitimate Figma import)
  photoConcertStage, photoFisherman, photoColorfulFood, photoRainbowMtn, photoSaltFlats2,
  photoGlacierRocks, photoMachuPicchu, photoVolcano, photoDesertDunes, photoFlamingo,
  photoGroupKids, photoEuropeBridge,
  // Mountain / hiking photos confirmed in Frame1.tsx (img341=b462ec26, img351=f4307388, img381=ea502336, img491=e8ad5b0a)
  photoHikingBridge, photoMountain1, photoGlacier, photoMountainRange,
  // Confirmed old Patagonia photos — Frame1-32-145.tsx (legitimate Figma import)
  photoPataTorres, photoPataCaballos, photoPataPeaks, photoPataMountaineers, photoPataMarshy,
  // Confirmed old Camino photos — Frame2.tsx (legitimate Figma import, img41/img31/img21)
  photoCaminoVineyard, photoCaminoBrianCoast, photoCaminoBridge,
  // Searching for South America — Frame1-113-40.tsx (all 5 confirmed)
  photoSAMRainbowMtn, photoSAMIncaHiker, photoSAMCafeFriends,
  photoSAMTEFL, photoSAMGlacierSelfie,
  // A Spin Around the Globe (Frame1-63-206)
  photoSpinToubkal, photoSpinEgypt, photoSpinParaglide, photoSpinHaGiang,
  photoSpinSantorini, photoSpinSaharaSunset, photoSpinCappadocia, photoSpinEverestBrian,
  // Pristine Patagonia NEW proposal photos (Frame1-65-440)
  photoPataGaucho, photoPataTorresBrian, photoPataUshuaia, photoPataElChalten, photoPataVolcan,
  // Conquering the Camino NEW proposal photos (Frame1-63-296)
  photoCaminoPortoCity, photoCaminoAtlanticCoast, photoCaminoGalicianFarms,
  photoCaminoScallops, photoCaminoViana, photoCaminoPilgrims, photoCaminoSantiagoNew,
} from "../brianImages";

// ── Direct figma:asset imports — ONLY from confirmed legitimate Figma frame files ──

// Joyous Japan — Frame1-108-295.tsx (all 7 confirmed)
import japanOsakaCastle   from "figma:asset/136dedc9678a09d88e3cbf0acc2cb073f8cbee98.png"; // Osaka Castle reflected in garden pond
import japanBrianFuji     from "figma:asset/a76977334462ee2f11d9fdb5dc397b5886d2209e.png"; // Brian at Mt. Fuji & Chureito Pagoda
import japanStoneHeads    from "figma:asset/36a2777b2a465f959008abe623445c9bc230f09f.png"; // Otagi Nenbutsu-ji Temple stone heads
import japanTeaCeremony   from "figma:asset/67afacfc060db9787b618ae9477989b215a43bc0.png"; // Traditional tea ceremony
import japanKobeBeef      from "figma:asset/8b80533f342e03e261a3b2d6eaaebf4fc5dbe99f.png"; // Kobe beef lunch with local chef
import japanCherryBlossom from "figma:asset/a659237bf19457ecbf415cbf63915f88fcf35287.png"; // Sakura cherry blossoms at sunset
import japanSushiClass    from "figma:asset/6bdeee72bae5315605c36bc000ba5ef5c0fb9b3f.png"; // Sushi-making class with travelers

// Awesome Australia — Frame1-108-278.tsx (all 7 confirmed)
import photoAusSkydive   from "figma:asset/2192e2e73766c8f14188696c11f65208d5f516a0.png"; // Byron Bay skydive
import photoAusCroc      from "figma:asset/71fb78aaa77e9ff536ec428b4293b48484620a0a.png"; // Adelaide River crocodile
import photoAusUluru     from "figma:asset/50fc839b25943bf862a8b35578f720d516ff8283.png"; // Uluru Outback
import photoAusMelbourne from "figma:asset/c54ca3427c2f34b8dddaa275ad3a77028a538ca4.png"; // Hosier Lane Melbourne
import photoAusSydney    from "figma:asset/bbbdeb4d313371794d8b5c3f17a4fb2a5400dad5.png"; // Sydney NYE fireworks
import photoAusTasmania  from "figma:asset/4dfe87aa08db7005cee7a25bfebd1219fe9831b3.png"; // Wineglass Bay Tasmania
import photoAusTurtle    from "figma:asset/375659369d5d7ff915de1040f0cc8e7e7161dd47.png"; // Great Barrier Reef turtle

// Conquering the Camino — new hero (Santiago de Compostela cathedral from bronze statue viewpoint)
import caminoSantiagoStatue from "figma:asset/004ab1881508db4eb06cc2cd067daeeaaa8896ed.png";
import egyptWallPainting    from "figma:asset/11f614721a4a02c21b825841ae88a0ae8055cccd.png";
import spinEverestHero      from "figma:asset/a2cc09f1df15eb1502b1fa7c4e7c9bd461151b4c.png"; // Brian near EBC, Ama Dablam background
import scubaDivingHero      from "figma:asset/a337bfac328042c1b0c5cba09b6f95f993d8f246.png"; // traditional Andean dancers at Centro Qosqo de Arte Nativo, Cusco, Peru

// Tenacious Tour du Mont Blanc — Frame2-108-325.tsx (all 7 confirmed)
import tmbAosta        from "figma:asset/fc7fa6210becd4be877a7ea34424722035dd315f.png"; // Breath-taking beauty in Aosta Valley near Courmayeur, Italy
import tmbHikers       from "figma:asset/efa4904b6ef856757f1ee210c5305876ae90b56b.png"; // Fellow hikers braving the afternoon sun near Bourg-Saint-Maurice, France
import tmbFinish       from "figma:asset/ebcb6ce66d4348d52687fd59cf5fcf61da9c9112.png"; // Group of seven crossing the finish line in celebration
import tmbRefuge       from "figma:asset/14c72fce62a49b26b5f8fc4f6e9c1007be4806e2.png"; // Alpine refuge built into the Alps — views, meals, and a comfy bed
import tmbStart        from "figma:asset/df68c8ddaf51c5b82351107431cb5c7233d179d2.png"; // Starting the adventure of a lifetime at Les Houches
import tmbLacChampex   from "figma:asset/e74bd38ddd64e4bd3d8c40719dea5c910efc0894.png"; // Morning stroll along Lac de Champex in Switzerland
import tmbLagoChecrout from "figma:asset/9fd829ce5b6369a6602735b18cf03f81673d17a6.png"; // Much-needed dip in Lago Checrouit during a challenging hiking day

// Atypical Globetrotting — Frame1-116-130.tsx (all 5 confirmed)
import atypOrphanage  from "figma:asset/53812c5769e8d327ae3d7a61d8a075ce3ce205c2.png"; // Brian with kids at orphanage volunteer session
import atypElephants  from "figma:asset/5b8bf2d6db972d556ce61599c4161d7994c96031.png"; // Brian with rescued elephant at Thai sanctuary
import atypLangSchool from "figma:asset/4695dc43d2de393137499abbbd1fd2c2edca8c61.png"; // BBL Language School classroom, Myanmar
import atypHpaAn      from "figma:asset/2af32f37479753daeb6ba2b005b2c098bc1ed7a0.png"; // Brian overlooking green karst landscape, Hpa-An, Myanmar

// Truncated Travels: Magical Morocco — card hero (Gnawa musician, Marrakech medina)
import ttMoroccoMusician from "figma:asset/78f73a5ec7a84d70c26472aa2596c63b579ab271.png";

// Truncated Travels: Magical Morocco (Frame1-65-485)
import photoTTMoroccoToubkal from "figma:asset/307ab3027368eb3f4f61c4034ca520f59f41b5a1.png";
import photoTTMoroccoChef    from "figma:asset/19b1c5bbdcb61c6fa766733a039009025b3a8088.png";
import photoTTMoroccoSahara  from "figma:asset/a0ae4a48d1e58ad38db8a33b65d88179b2ad9b3d.png";

// Truncated Travels: Picturesque Portugal (Frame1-65-485)
import photoTTPortugalLagos  from "figma:asset/0268eae7f270142986362559f8fdd43fae9608a9.png";
import photoTTPortugalAzores from "figma:asset/57c2f0493470dc56478b81f428fe9e9aa61caa15.png";

// Travel Truths: Lessons Learned Abroad — Frame1-126-51.tsx (all 5 confirmed)
import ttlKidsSelfie from "figma:asset/cd03ef83d052be0da83b4bda4575a8d83b766959.png"; // Brian selfie with kids in West Africa — human connection
import ttlOrangutan  from "figma:asset/e6f5618d21f0d513decfae435ad3692e630acdf9.png"; // Wild orangutan in the trees, Borneo
import ttlSnorkeling from "figma:asset/7dde56528b54a759e67b9dabd3ba0c699f2350f1.png"; // Scuba diving surrounded by tropical fish
import ttlCappadocia from "figma:asset/9da4ab86d27ddf8f719a0b13c367103420d8feef.png"; // Hot air balloons over Cappadocia at sunset, Türkiye
import ttlColombia   from "figma:asset/c413a27a60b6ef0c2b9f6676f934dde98320f37a.png"; // Café with local teens abroad

// Gorgeous Georgia photos
import georgiaGlacierAutumn from "../../imports/IMG_2263.webp"; // Shkhara Glacier with autumn foliage
import georgiaKhinkali from "../../imports/IMG_3004.webp"; // Khinkali dumplings cooking class
import georgiaAutumnHills from "../../imports/IMG_2385.webp"; // Autumn mountains and hills
import georgiaRainbowHills from "../../imports/IMG_3046.webp"; // Mravaltskaro Rainbow Hills
import georgiaKazbegiSelfie from "../../imports/IMG_3329.webp"; // Brian at Kazbegi Glacier

// Wild West Africa — card hero (Mauritanian man in white boubou on sand dunes)
import wwaBoubouDunes from "figma:asset/e2eaff343f1c6f2b01e267e978ff592ec1446fd5.png";

// Wild West Africa (Frame1-63-151.tsx — confirmed legitimate Figma import)
import photoWWACoverDunes      from "figma:asset/5a195bf8283bd43d1e67f3ef5edaf1d2152423e6.png";
import photoWWAIronOreTrain    from "figma:asset/549f5b32639af204886482a00cbdae44f8be5935.png";
import photoWWAMauritaniaDunes from "figma:asset/ef3f7e801f741f0c369a741522f427bd9109f14e.png";
import photoWWAChinguetti      from "figma:asset/34f51dcf22613252d69a9e5ee694c6d5d47652fd.png";
import photoWWAPirogues        from "figma:asset/9a966226ee3bf3d20d04ca606738ffff499d5bbb.png";
import photoWWAPelicans        from "figma:asset/26297cd4c9236d7bd9ddeb6231444e5e769a2cae.png";
import photoWWAGambiaFamily    from "figma:asset/4c8bd235054262f787ccf28bcb0fd081d0615e89.png";
import photoWWAChimp           from "figma:asset/bc96ae09deac5a420176cc872a63d12bb7b58343.png";
import photoWWAHippos          from "figma:asset/0de9e193667b8daaa581c5bb15d169aa97c43e60.png";
import photoWWASierraLeoneTree from "figma:asset/822ebb2205ae640de0a74bf57bd8026e19aa3b8a.png";

import { pickPhotos } from "../brianTravelPhotos";
import { PhotoStrip } from "../components/PhotoStrip";

// 5 travel photos for the hero strip — pick a buffer of 15 so all 5 slots
// are always filled even if any individual image fails to load.
const heroStripPhotos = pickPhotos(15, 17);

// ─── Photo lookup table — only confirmed-working assets ──────────────────────
const IMGS = {
  // Awesome Australia — Frame1-108-278.tsx (all 7 confirmed)
  ausUluru:    photoAusUluru,
  ausByronBay: photoAusSkydive,
  ausReef:     photoAusTurtle,
  ausMelb:     photoAusMelbourne,
  ausSydney:   photoAusSydney,
  ausCroc:     photoAusCroc,
  ausTasmania: photoAusTasmania,
  // Searching for South America — Frame1-113-40.tsx (confirmed)
  samIncaTrail:     photoSAMIncaHiker,
  samRainbowMtn:    photoSAMRainbowMtn,
  samCafe:          photoSAMCafeFriends,
  samTEFL:          photoSAMTEFL,
  samGlacierSelfie: photoSAMGlacierSelfie,
  // A Spin Around the Globe — Frame1.tsx confirmed photos (replaced unregistered Frame1-63-206 assets)
  spinLeft1:  photoSpinToubkal,       // Taking in the views atop stunning Mount Toubkal
  spinLeft2:  photoSpinEgypt,         // Exploring one of Egypt's fascinating ancient temples
  spinLeft3:  photoSpinParaglide,     // Paragliding along Turkiye's Mediterranean coast
  spinLeft4:  photoSpinHaGiang,       // Navigating the Ha Giang Loop by motorbike
  spinRight1: photoSpinSantorini,     // Admiring the natural beauty of Santorini
  spinRight2: photoSpinSaharaSunset,  // Enjoying a Sahara Desert sunrise in Morocco
  spinRight3: photoSpinCappadocia,    // Absorbing the uniqueness of Cappadocia in a hot air balloon
  spinRight4: photoSpinEverestBrian,  // Trekking to Mount Everest Base Camp in Nepal
  // Tenacious Tour du Mont Blanc — Frame2-108-325.tsx (all 7 confirmed)
  tmbHero:      tmbAosta,        // Aosta Valley panorama — card hero
  tmbMountain:  tmbHikers,       // fellow hikers on trail near Bourg-Saint-Maurice
  tmbGlacier:   tmbFinish,       // group crossing finish line at Les Houches
  tmbRange:     tmbRefuge,       // alpine refuge with mountain backdrop
  tmbSnow:      tmbStart,        // starting the adventure at Les Houches sign
  tmbClimbers:  tmbLacChampex,   // serene Lac de Champex reflection, Switzerland
  tmbPeaks:     tmbLagoChecrout, // cooling off in Lago Checrouit with peak views
  // Truncated Travels: Magical Morocco — Frame1-65-485
  ttMoroccoToubkal: photoTTMoroccoToubkal,
  ttMoroccoChef:    photoTTMoroccoChef,
  ttMoroccoSahara:  photoTTMoroccoSahara,
  // Truncated Travels: Picturesque Portugal — Frame1-65-485
  ttPortugalLagos:  photoTTPortugalLagos,
  ttPortugalAzores: photoTTPortugalAzores,
  // Wild West Africa — Frame1-63-151.tsx (confirmed)
  wwaCoverDunes:      photoWWACoverDunes,
  wwaIronOreTrain:    photoWWAIronOreTrain,
  wwaMauritaniaDunes: photoWWAMauritaniaDunes,
  wwaChinguetti:      photoWWAChinguetti,
  wwaPirogues:        photoWWAPirogues,
  wwaPelicans:        photoWWAPelicans,
  wwaGambiaFamily:    photoWWAGambiaFamily,
  wwaChimp:           photoWWAChimp,
  wwaHippos:          photoWWAHippos,
  wwaSierraLeoneTree: photoWWASierraLeoneTree,
  // Pristine Patagonia NEW proposal photos
  pataGaucho:      photoPataGaucho,
  pataTorresBrian: photoPataTorresBrian,
  pataUshuaia:     photoPataUshuaia,
  pataElChalten:   photoPataElChalten,
  pataVolcan:      photoPataVolcan,
  // Conquering the Camino NEW proposal photos
  caminoPorto:       photoCaminoPortoCity,
  caminoAtlantic:    photoCaminoAtlanticCoast,
  caminoFarms:       photoCaminoGalicianFarms,
  caminoScallops:    photoCaminoScallops,
  caminoViana:       photoCaminoViana,
  caminoPilgrims:    photoCaminoPilgrims,
  caminoSantiagoNew: photoCaminoSantiagoNew,
  // Gorgeous Georgia
  georgiaGlacierAutumn: georgiaGlacierAutumn,
  georgiaKhinkali:      georgiaKhinkali,
  georgiaAutumnHills:   georgiaAutumnHills,
  georgiaRainbowHills:  georgiaRainbowHills,
  georgiaKazbegiSelfie: georgiaKazbegiSelfie,
  // Travel Truths: Lessons Learned Abroad — Frame1-126-51.tsx
  ttlKidsSelfie: ttlKidsSelfie,
  ttlOrangutan:  ttlOrangutan,
  ttlSnorkeling: ttlSnorkeling,
  ttlCappadocia: ttlCappadocia,
  ttlColombia:   ttlColombia,
};

// ─── Types ────────────────────────────────────────────────────────────────────
type PricingTier = { price: string; label: string; sublabel: string; color: string; addon: string | null };
type Photo = { src: string; caption: string; pos: string };
type ProgramDetail = {
  fullDesc: string;
  mission: string;
  audiences: string[];
  pricing: PricingTier[];
  photos: Photo[];
  note?: string;

};

// ─── Shared pricing (same across all programs) ────────────────────────────────
const STD_PRICING: PricingTier[] = [
  { price: "$400", label: "Live In-Person", sublabel: "Chicagoland",          color: DARK,      addon: "+ $60 optional 30-day recording add-on" },
  { price: "$350", label: "Live Virtual",   sublabel: "Zoom · Nationwide",    color: "#3b82f6", addon: "+ $60 optional 30-day recording add-on" },
  { price: "$275", label: "Pre-Recorded",   sublabel: "Private YouTube Link", color: "#fc5252", addon: null },
];

// Truncated Travels pricing (50-min format, lower rates)
const TT_PRICING: PricingTier[] = [
  { price: "$300", label: "Live In-Person", sublabel: "Chicagoland",          color: DARK,      addon: "+ $45 optional 30-day recording add-on" },
  { price: "$250", label: "Live Virtual",   sublabel: "Zoom · Nationwide",    color: "#3b82f6", addon: "+ $45 optional 30-day recording add-on" },
  { price: "$200", label: "Pre-Recorded",   sublabel: "Private YouTube Link", color: "#fc5252", addon: null },
];
const STD_MISSION   = "To educate and inspire audiences to serve others, explore places, and pursue opportunities near and far.";
const STD_AUDIENCES = ["Seniors", "Other Adults"];

// ─── Programs (alphabetical order) ───────────────────────────────────────────
export const programs: { id: number; title: string; desc: string; duration: string; image: string; imgPos: string; isNew: boolean; detail: ProgramDetail | null }[] = [
  // ── A Spin Around the Globe ───────────────────────────────────────────────────
  // ── A Spin Around the Globe — Left Split ─────────────────────────────────────
  {
    id: 91, isNew: false,
    title: "A Spin Around the Globe: Left Split",
    desc: "Along the Left Split, we discover Portugal's Azores Islands and explore Egyptian temples on the Nile. We paraglide on Türkiye's south coast and motorbike the Ha Giang Loop in Vietnam. Learn about elephant conservation in Thailand and yearn for yummy Georgian cuisine.",
    duration: "60 min",
    image: IMGS.spinLeft1, imgPos: "center center",
    detail: {
      fullDesc: "Seasoned traveler Brian Michalski shares two distinct parallel paths of his journey to over 30 countries across six continents. This two-year solo backpacking expedition is a passionate storytelling photographer's ode to creativity, adventure, and boundless curiosity.\n\nAlong the Left Split, we discover Portugal's Azores Islands and explore Egyptian temples on the Nile. We paraglide on Türkiye's south coast and motorbike the Ha Giang Loop in Vietnam. Learn about elephant conservation in Thailand and yearn for yummy Georgian cuisine. We also unearth hardships and insights, concluding with a Q&A.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As this journey wraps up in summer, further adventures are still planned in Japan, Australia, Colombia, Guatemala, and more. Program descriptions may be adjusted accordingly.",
      photos: [
        { src: IMGS.spinLeft1, caption: "Taking in the views atop stunning Mount Toubkal", pos: "center center" },
        { src: IMGS.spinLeft2, caption: "Exploring one of Egypt's fascinating ancient temples", pos: "center center" },
        { src: IMGS.spinLeft3, caption: "Connecting with local communities — the heart of every journey",                  pos: "center center" },
        { src: IMGS.spinLeft4, caption: "Navigating the Ha Giang Loop by motorbike", pos: "center center" },
      ],
    },
  },
  // ── A Spin Around the Globe — Right Split ────────────────────────────────────
  {
    id: 92, isNew: false,
    title: "A Spin Around the Globe: Right Split",
    desc: "On the Right Split, we tour Egypt's ancient pyramids and escape to Croatia's Hvar Island. We soar in hot air balloons over Türkiye and brave Mauritania's infamous Iron Ore train. Learn about the dizzying climb to Mount Everest Base Camp and salivate over Thailand's bold flavors.",
    duration: "60 min",
    image: spinEverestHero, imgPos: "center 25%",
    detail: {
      fullDesc: "Seasoned traveler Brian Michalski shares two distinct parallel paths of his journey to over 30 countries across six continents. This two-year solo backpacking expedition is a passionate storytelling photographer's ode to creativity, adventure, and boundless curiosity.\n\nOn the Right Split, we tour Egypt's ancient pyramids and escape to Croatia's Hvar Island. We soar in hot air balloons over Türkiye and brave Mauritania's infamous Iron Ore train. Learn about the dizzying climb to Mount Everest Base Camp and salivate over Thailand's bold flavors. We also unpack challenges and takeaways, finishing with a Q&A.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As this journey wraps up in summer, further adventures are still planned in Japan, Australia, Colombia, Guatemala, and more. Program descriptions may be adjusted accordingly.",
      photos: [
        { src: IMGS.spinRight1, caption: "Admiring the natural beauty of Santorini", pos: "center center" },
        { src: IMGS.spinRight2, caption: "Enjoying a Sahara Desert sunrise in Morocco", pos: "center center" },
        { src: IMGS.spinRight3, caption: "Absorbing the uniqueness of Cappadocia in a hot air balloon", pos: "center center" },
        { src: IMGS.spinRight4, caption: "Trekking to Mount Everest Base Camp in Nepal", pos: "center center" },
      ],
    },
  },

  // ── Atypical Globetrotting ───────────────────────────────────────────────────
  {
    id: 1, isNew: false,
    title: "Atypical Globetrotting",
    desc: "Brian's 22-month solo journey working and volunteering through Australia, Southeast Asia, India, Cuba, and more — with real talk on budgeting, culture shock, and how to travel like a pro.",
    duration: "60 min",
    image: atypElephants, imgPos: "center center",
    detail: {
      fullDesc: "Come along on Brian Michalski's 22-month solo backpacking journey as he worked and volunteered his way through Australia, Southeast Asia, India, Cuba, and more. Get insider information about planning, budgeting, coping with culture shock, hostel life, testing your physical and emotional limits, dealing with setbacks, and how to travel like a pro.\n\nAtypical Globetrotting addresses goals to explore and embrace diversity. By staying curious about others and their customs, we develop a more authentic understanding of our world. Life's greatest rewards come from stepping outside one's comfort zone, challenging the status quo, and being selfless. This program provides a compelling option for those looking to navigate a challenging and rewarding path. Additionally, it helps unite individuals of various backgrounds, providing them with practical resources to help others.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 100 local organizations about my worldwide adventures.",
      photos: [
        { src: atypOrphanage,  caption: "Volunteering with children at an orphanage in Southeast Asia",        pos: "center center" },
        { src: atypElephants,  caption: "Caring for rescued elephants at a sanctuary in Thailand",              pos: "center center" },
        { src: atypLangSchool, caption: "Teaching at BBL Language School in Myanmar",                           pos: "center center" },
        { src: atypHpaAn,      caption: "Taking in the sweeping karst landscape near Hpa-An, Myanmar",         pos: "center center" },
      ],
    },
  },
  // ── Awesome Australia ────────────────────────────────────────────────────────
  {
    id: 6, isNew: false,
    title: "Awesome Australia",
    desc: "G'day, mate! Ten months of backpacking and working in the Land Down Under — the Outback, Great Barrier Reef, Tasmania, Aboriginal culture, deadly animals, and the best NYE on Earth.",
    duration: "60 min",
    image: photoAusUluru, imgPos: "center center",
    detail: {
      fullDesc: "G'day, mate! With his tapestry of original photographs and deep well of stories, world traveler Brian Michalski illuminates ten months of backpacking and working in the Land Down Under. While visiting exotic destinations including the Australian Outback, Great Barrier Reef, and Tasmania, we also learn about the country's fascinating history, grand traditions, chic urban life, charming slang, deadly animals, and Aboriginal influences.\n\nAwesome Australia models how and why travel is critical in helping us develop an understanding of places, cultures, and customs different from our own. Backpacking and working here presented many challenges, but also fantastic rewards. Exploring this isolated continent teaches us about its history, geography, and cuisine. With a Q&A, attendees will come away educated, entertained, and inspired.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 100 local organizations about my worldwide adventures.",
      photos: [
        { src: photoAusUluru,    caption: "Absorbing mystical Uluru in the heart of the Australian Outback",                         pos: "center center" },
        { src: photoAusCroc,     caption: "A powerful crocodile leaps from the Adelaide River in the Northern Territory near Darwin", pos: "center center" },
        { src: photoAusSkydive,  caption: "Skydiving along Australia's East Coast in Byron Bay",                                     pos: "center center" },
        { src: photoAusTurtle,   caption: "Scuba diving with a sea turtle at the Great Barrier Reef",                                pos: "center center" },
        { src: photoAusMelbourne, caption: "Admiring vibrant street art along Hosier Lane in Melbourne",                             pos: "center center" },
        { src: photoAusSydney,   caption: "Experiencing the mind-blowing New Year's Eve fireworks over Sydney Harbour",              pos: "center center" },
        { src: photoAusTasmania, caption: "Overlooking the stunning Wineglass Bay from Freycinet National Park, Tasmania",           pos: "center center" },
      ],
    },
  },
  // ── 7 · Conquering the Camino ────────────────────────────────────────────────
  {
    id: 7, isNew: false,
    title: "Conquering the Camino",
    desc: "Soak up the sprawling coastal beauty of the 174-mile Portuguese Camino de Santiago as Brian navigates its challenges and rewards — from Porto to northwestern Spain. ¡Buen Camino!",
    duration: "60 min",
    image: caminoSantiagoStatue, imgPos: "center 30%",
    detail: {
      fullDesc: "Soak up the sprawling coastal beauty of the 174-mile Portuguese Camino de Santiago as globetrotter Brian Michalski helps us navigate its many challenges and rewards. Through brilliant original snapshots and charming storytelling, learn about the pilgrimage's history, logistics, local cuisine, and more as we journey from Porto to northwestern Spain. ¡Buen Camino!\n\nThe Caminho Português is one of the world's most iconic and accessible multi-day treks for adventurers of all ages. While steeped in Catholic roots, today's Camino invites pilgrims of all backgrounds and beliefs to complete the voyage for any personal reason. Whether planning an upcoming adventure to the Iberian Peninsula or traveling vicariously, attendees will learn about Portuguese and Spanish cultures along with entertaining and interesting information about this fulfilling pilgrimage.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 100 local organizations about my worldwide adventures.",
      photos: [
        { src: IMGS.caminoPorto,       caption: "Most pilgrims choose to begin the Caminho Português in charming Porto, Portugal", pos: "center center" },
        { src: IMGS.caminoAtlantic,    caption: "Taking in the beauty along the sprawling Atlantic coast", pos: "center 35%" },
        { src: IMGS.caminoFarms,       caption: "For all the coastal beauty offered, the Camino also provides adventures through villages, vineyards, and family farms", pos: "center center" },
        { src: IMGS.caminoScallops,    caption: "Sea scallops are among the superb main courses offered along the path", pos: "center center" },
        { src: IMGS.caminoViana,       caption: "Pilgrims can endure a steep climb to stay in an albergue next to this beautiful church in Viana do Castelo", pos: "center center" },
        { src: IMGS.caminoPilgrims,    caption: "Connecting with fellow pilgrims is an essential part of the Camino experience", pos: "center center" },
        { src: IMGS.caminoSantiagoNew, caption: "With the stunning cathedral on the horizon, the Camino provides a memorable finish in Santiago de Compostela, Spain", pos: "center center" },
      ],
    },
  },
  // ── Gorgeous Georgia ─────────────────────────────────────────────────────────
  {
    id: 16, isNew: true,
    title: "Gorgeous Georgia",
    desc: "After hearing years of rave reviews about this Eastern European gem, Brian finally visited Georgia. During five remarkable weeks, it exceeded high expectations thanks to vast natural wonders, locals' relaxed approach to life, and wide-ranging cuisine.",
    duration: "60 min",
    image: IMGS.georgiaGlacierAutumn, imgPos: "center center",
    detail: {
      fullDesc: "After hearing years of rave reviews about this Eastern European gem, world traveler Brian Michalski finally visited Georgia. During five remarkable weeks, it exceeded high expectations thanks to its vast natural wonders, locals' relaxed approach to life, and wide-ranging cuisine. Brian's insider experiences take us along the mountainous Mestia to Ushguli hike, to bustling Tbilisi, into Sighnaghi's wine country, and much more. Despite a difficult history, Georgians consistently shared unparalleled warmth and generosity. Join this journey, with a Q&A to conclude.\n\nThis presentation provides insider information before others get wind. Georgia is one of the final remaining examples of the world's hidden treasures begging to be unearthed. The combination of Brian's firsthand encounters with locals through cultural immersion, determination to explore key cities and difficult-to-access towns, and a genuine curiosity about lifestyles different from his own all culminate in making Georgia fascinating to community members. This experience equally delights armchair travelers and inspires active adventurers to visit this impressive destination firsthand.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 125 local organizations about my worldwide adventures. See my full calendar here.",
      photos: [
        { src: IMGS.georgiaGlacierAutumn, caption: "The four-day Mestia to Ushguli hike showcases the remarkable Shkhara Glacier", pos: "center center" },
        { src: IMGS.georgiaKhinkali, caption: "This regional cooking class taught how to make delicious khinkali, traditional Georgian dumplings", pos: "center center" },
        { src: IMGS.georgiaAutumnHills, caption: "The shifting autumn foliage created an ideal setting for exploring beautiful Georgia", pos: "center center" },
        { src: IMGS.georgiaRainbowHills, caption: "The Mravaltskaro Rainbow Hills provides a photogenic tapestry of mineral-rich, layered soil", pos: "center center" },
        { src: IMGS.georgiaKazbegiSelfie, caption: "A demanding full-day hike leads to the reward of having Kazbegi Glacier all to myself!", pos: "center center" },
      ],
    },
  },
  // ── Joyous Japan ────────────────────────────────────────────────────────────
  {
    id: 0, isNew: false,
    title: "Joyous Japan",
    desc: "Japan is the only country among 60+ that left Brian heartbroken to leave. Journey aboard the Shinkansen following the blooming cherry blossoms, discovering unforgettable cuisine, rich history, and vibrant culture.",
    duration: "60 min",
    image: japanBrianFuji, imgPos: "center top",
    detail: {
      fullDesc: "Japan is the only country among 60+ that left Brian heartbroken to leave. Journey aboard the Shinkansen bullet train as he chases the blooming cherry blossoms from Kyushu to Hokkaido. We will explore feudal castles and ancient temples, savor unforgettable cuisine, witness the serene art of the tea ceremony, and soak in Japan's extraordinary blend of rich tradition and modern wonder.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      photos: [
        { src: japanBrianFuji,     caption: "Brian soaking in the iconic view of Mt. Fuji & Chureito Pagoda during cherry blossom season", pos: "center top"    },
        { src: japanOsakaCastle,   caption: "Osaka Castle perfectly mirrored in the tranquil Japanese garden pond below",                   pos: "center center" },
        { src: japanCherryBlossom, caption: "Stunning sakura cherry blossoms glowing gold at sunset — Japan's most beloved season",         pos: "center center" },
        { src: japanStoneHeads,    caption: "Hundreds of mossy stone Jizo heads blanketing the grounds of ancient Otagi Nenbutsu-ji Temple", pos: "center center" },
        { src: japanTeaCeremony,   caption: "Participating in an intimate and serene traditional Japanese tea ceremony",                     pos: "center center" },
        { src: japanKobeBeef,      caption: "Savoring a tender and juicy Kobe beef lunch prepared tableside by a local chef",               pos: "center center" },
        { src: japanSushiClass,    caption: "Taking a fun yet challenging sushi-making class with fellow travelers",                         pos: "center center" },
      ],
    },
  },
  // ── Pristine Patagonia ───────────────────────────────────────────────────────
  {
    id: 8, isNew: false,
    title: "Pristine Patagonia",
    desc: "Five spellbinding weeks at the ends of the earth — wildlife, glaciers, volcanoes, and the shared wonders of Chilean and Argentinian Patagonia.",
    duration: "60 min",
    image: photoPataMountaineers, imgPos: "center center",
    detail: {
      fullDesc: "Have you ever wondered what it's like to venture to the ends of the earth? Through his stunning photos and entertaining anecdotes, world traveler Brian Michalski takes us along on his spellbinding five-week journey through Patagonia. We will examine this remote region's wildlife, vegetation, climate, sprawling topography, Chilean and Argentinian influences, delightful cuisine, and much more.\n\nPristine Patagonia models how and why foreign travel is critical in helping us develop a fuller understanding of places, cultures, and customs different from our own. Solo backpacking in such an isolated location presented many obstacles, but also incredible rewards. By bringing patrons to this shared region of Chile and Argentina, we learn about its history, language, food, and how the locals live. With a Q&A to conclude, attendees will come away educated, entertained, and inspired.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 100 local organizations about my worldwide adventures.",
      photos: [
        { src: IMGS.pataGaucho,      caption: "A gaucho absorbs the scenery from his family estancia in El Calafate, Argentina",                               pos: "center center" },
        { src: IMGS.pataTorresBrian, caption: "Stomaching the tough multi-hour hike to reach iconic Mirador Base Las Torres in Torres del Paine, Chile",       pos: "center center" },
        { src: IMGS.pataUshuaia,     caption: "At Parque Nacional Tierra del Fuego in the world’s southernmost city of Ushuaia, Argentina",                    pos: "center center" },
        { src: IMGS.pataElChalten,   caption: "Braving the harsh winter yields unique rewards in El Chaltén, Argentina",                                      pos: "center center" },
        { src: IMGS.pataVolcan,      caption: "Climbing dizzying Volcán Villarrica outside of Pucón, Chile",                                                  pos: "center center" },
      ],
    },
  },
  // ── Searching for South America ──────────────────────────────────────────────
  {
    id: 4, isNew: false,
    title: "Searching for South America",
    desc: "Over a year trekking the Inca Trail, navigating Patagonia, and exploring the Amazon — while volunteering, earning a TEFL certificate, and studying Spanish abroad.",
    duration: "60 min",
    image: IMGS.samCafe, imgPos: "center center",
    detail: {
      fullDesc: "Brian Michalski is on the road again, spending over a year in South America. As he trekked the Inca Trail, navigated pristine Patagonia, and explored the Amazon rainforest, he also volunteered, took Spanish classes, earned his English teaching certificate, and worked remotely. Witness this atypical approach to a challenging, yet deeply rewarding continent. Michalski will enthrall you with as many entertaining stories as he has passport stamps.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      photos: [
        { src: IMGS.samCafe,          caption: "Hiking the intense Inca Trail in Peru",                                                                      pos: "center center" },
        { src: IMGS.samRainbowMtn,    caption: "Atop Rainbow Mountain near Cusco",                                                                          pos: "center center" },
        { src: IMGS.samTEFL,          caption: "Obtaining my Teaching English as a Foreign Language certificate in Arequipa, Peru",                          pos: "center center" },
        { src: IMGS.samGlacierSelfie, caption: "Taking a month of intensive small-group Spanish classes in Cusco, Peru",                                     pos: "center center" },
        { src: IMGS.samIncaTrail,     caption: "Admiring the Perito Moreno Glacier in Argentinian Patagonia",                                               pos: "center center" },
      ],
    },
  },
  // ── Tenacious Tour du Mont Blanc ─────────────────────────────────────────────
  {
    id: 10, isNew: false,
    title: "Tenacious Tour du Mont Blanc",
    desc: "Trek 105 miles through the Alps across France, Italy, and Switzerland — planning tips, alpine refuges, cultural gems, and Brian's gorgeous original photography all the way to the finish line.",
    duration: "60 min",
    image: IMGS.tmbHero, imgPos: "center center",
    detail: {
      fullDesc: "Trek 105 miles through the Alps as Brian Michalski guides us along Europe's world-famous Tour du Mont Blanc. As we journey through France, Italy, and Switzerland, gain insight into practical planning tips, cultural tidbits, challenges along the trail, accommodation logistics, and more, all seen through the lens of Michalski's gorgeous original photography and entertainingly adventurous retellings.\n\nThis epic journey is among Europe's most popular treks. Travelers of all ages, frequently in their later years, and with varying physical conditions, completed the experience at their own pace. Attendees will learn concrete tips for planning and booking their own future Tour du Mont Blanc, yet can also enjoy the presentation for the beautiful photography, entertaining stories, and fascinating cultural insight.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      photos: [
        { src: IMGS.tmbHero,      caption: "Breath-taking beauty along the TMB route in Aosta Valley near Courmayeur, Italy",                                    pos: "center center" },
        { src: IMGS.tmbSnow,      caption: "Starting the adventure of a lifetime at the iconic Les Houches trailhead sign",                                      pos: "center top"    },
        { src: IMGS.tmbMountain,  caption: "Fellow hikers braving the afternoon sun on a sweeping alpine trail near Bourg-Saint-Maurice, France",               pos: "center center" },
        { src: IMGS.tmbRange,     caption: "Refuges like this one — built into the Alps — provided rewarding views, tasty meals, and a comfy bed each night",   pos: "center center" },
        { src: IMGS.tmbClimbers,  caption: "A peaceful morning stroll along the perfectly mirrored Lac de Champex in Switzerland",                               pos: "center center" },
        { src: IMGS.tmbPeaks,     caption: "Taking a much-needed cooling dip in Lago Checrouit with dramatic alpine peaks rising above",                        pos: "center center" },
        { src: IMGS.tmbGlacier,   caption: "Our group of seven crossing the finish line in Les Houches — a great moment of celebration after 105 miles!",       pos: "center center" },
      ],
    },
  },
  // ── Travel Truths: Lessons Learned Abroad ────────────────────────────────────
  {
    id: 15, isNew: true,
    title: "Travel Truths: Lessons Learned Abroad",
    desc: "Five years, 60+ countries, six continents — Brian distills powerful lessons about resilience, perspective, and the human connection through the best of 30,000 original photographs and compelling storytelling.",
    duration: "60 min",
    image: IMGS.ttlKidsSelfie, imgPos: "center 35%",
    detail: {
      fullDesc: "Educator and world traveler Brian Michalski shares powerful, humorous, and heartfelt lessons gathered while spending five years exploring over 60 countries across six continents. The best of 30,000 original photos and compelling storytelling moves these journeys beyond landmarks to focus on perspective, resilience, and the human experience. From simple joys to unexpected kindness, this presentation unearths revelations about fear, comfort zones, materialism, cultures, and curiosity. Together, we will see the world, and our own lives, with fresh eyes.\n\nThis is not a travel tips lecture. It is an inspiring adventure that highlights what unites us across borders and generations. Perfect for curious minds, lifelong learners, and anyone who believes there is always more to discover. Drawing on half a decade of long-term solo world travel, this talk distills lessons about resilience, serendipity, smart budgeting, coping with setbacks, and unearthing joy in unexpected places. It is a great fit for audiences who appreciate reflection, philosophy, and humor as much as photos. We finish with a Q&A.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 125 local organizations about my worldwide adventures. See my full calendar here.",
      photos: [
        { src: IMGS.ttlKidsSelfie, caption: "The world is safer and kinder than the headlines would lead us to believe",                                                                                                                                pos: "center 35%" },
        { src: IMGS.ttlOrangutan,  caption: "Opportunities in nature, including trekking to see wild orangutans, restored perspective and reinforced simplicity",                                                                                      pos: "center 40%" },
        { src: IMGS.ttlSnorkeling, caption: "Pursuing interests and hobbies along the way kept me curious, challenged, and continuously growing",                                                                                                      pos: "center center" },
        { src: IMGS.ttlCappadocia, caption: "Budgeting during long-term travel is essential, but I felt it was important to treat myself to once-in-a-lifetime opportunities, for example, this stunning hot air balloon ride in Cappadocia, Türkiye", pos: "center 30%" },
        { src: IMGS.ttlColombia,   caption: "Immersing myself in local communities, including teaching English to Colombian teenagers, moved me from observer to participant, and created rewarding volunteering opportunities",    pos: "center 35%" },
      ],
    },
  },
  // ── Magical Morocco ──────────────────────────────────────────────────────────
  {
    id: 13, isNew: false,
    title: "Truncated Travels: Magical Morocco",
    desc: "Fall in love with the vibrant colors, stunning sites, and electrifying energy of Morocco — Chefchaouen, ATVs and camels in the Sahara, Mount Toubkal, and Harira soup.",
    duration: "40 min",
    image: ttMoroccoMusician, imgPos: "center 20%",
    detail: {
      fullDesc: "Fall in love with the vibrant colors, stunning sites, and electrifying energy of Morocco. Part of the Truncated Travels series — a compact 40-minute presentation plus Q&A perfect for venues looking for a punchy, memorable experience. Brian shares two months here, highlighting beachy Taghazout and the blue gem of Chefchaouen. We get whisked away by ATV and camel into the desert, climb majestic Mount Toubkal, and savour Harira soup, chicken tagine, and vegetable couscous.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: TT_PRICING,
      photos: [
        { src: IMGS.ttMoroccoToubkal, caption: "Brian soaking in the sunrise atop majestic Mount Toubkal, highest peak in the Atlas Mountains",    pos: "center center" },
        { src: IMGS.ttMoroccoChef,    caption: "The enchanting blue-painted alleyways of Chefchaouen, Morocco's iconic Blue City",                 pos: "center center" },
        { src: IMGS.ttMoroccoSahara,  caption: "Golden Sahara dunes at sunset, camel riders silhouetted against the fiery sky, Erg Chebbi",        pos: "center center" },
      ],
    },
  },
  // ── Picturesque Portugal ─────────────────────────────────────────────────────
  {
    id: 14, isNew: false,
    title: "Truncated Travels: Picturesque Portugal",
    desc: "Five weeks of jaw-dropping beauty — the extraordinary Azores Islands, picture-perfect Lagos by land and sea, Porto's cobblestone streets, and the world's best pastéis de nata.",
    duration: "40 min",
    image: IMGS.ttPortugalAzores, imgPos: "center center",
    detail: {
      fullDesc: "Thanks to its jaw-dropping beauty and hospitable locals, five weeks in Portugal made Brian feel born again. Part of the Truncated Travels series — a compact 40-minute presentation plus Q&A perfect for venues looking for a punchy, memorable experience. Marvel at the Azores Islands, explore picture-perfect Lagos by land and sea, and discover the rich fabric of Portugal — its economy, way of life, plants, animals, and proud traditions. Conclude with bacalhau fritters, caldo verde soup, and sweet pastéis de nata.",
      mission: STD_MISSION, audiences: STD_AUDIENCES, pricing: TT_PRICING,
      photos: [
        { src: IMGS.ttPortugalLagos,  caption: "Kayaking through the spectacular limestone sea caves and golden arches of Lagos, Portugal",         pos: "center center" },
        { src: IMGS.ttPortugalAzores, caption: "The breathtaking Sete Cidades twin lakes inside an ancient volcanic crater, São Miguel, Azores",   pos: "center center" },
        { src: IMGS.caminoPorto,      caption: "The charming city of Porto, where the Caminho Português begins",                                    pos: "center center" },
      ],
    },
  },
  // ── Wild West Africa ──────────────────────────────────────────────────────────
  {
    id: 12, isNew: false,
    title: "Wild West Africa",
    desc: "Over 50 countries in, Brian navigates his most challenging region yet — firsthand stories and gorgeous original photography from Mauritania, Senegal, The Gambia, and Sierra Leone.",
    duration: "60 min",
    image: wwaBoubouDunes, imgPos: "center 30%",
    detail: {
      fullDesc: "Over 50 countries in, Brian Michalski navigates his most challenging region to date. Through gorgeous original photos, unearth fascinating firsthand experiences in Mauritania, Senegal, The Gambia, and Sierra Leone. While discussing the staggering difficulties these populations face, we will also explore the upsides, including stunning natural beauty, accessible wildlife, and genuine hospitality.\n\nWest Africa is worlds apart from Chicagoland. Due to safety concerns, poor living conditions, long distances, and prohibitive costs, patrons may favor visiting other destinations. Fortunately, this experience transports folks to this fascinating region with all the beauty and excitement but none of the risks. My mission is to foster curiosity, challenge preconceived notions, and deepen perspective to promote understanding and tolerance.",
      mission: "To educate and inspire audiences to serve others, explore places, and pursue opportunities near and far",
      audiences: ["Seniors", "Other Adults"],
      pricing: STD_PRICING,
      note: "As a LACONI Highly Effective Library Presenter, I have shared hundreds of in-person and virtual programs at over 100 local organizations about my worldwide adventures.",
      photos: [
        { src: IMGS.wwaIronOreTrain,    caption: "Riding on the world-famous Iron Ore Train was harrowing and epic",                               pos: "center center" },
        { src: IMGS.wwaMauritaniaDunes, caption: "Golden sands greet you at every turn in Mauritania's many deserts",                              pos: "center center" },
        { src: IMGS.wwaChinguetti,      caption: "Historical Chinguetti is steeped in ancient traditions",                                         pos: "center center" },
        { src: IMGS.wwaPirogues,        caption: "Passing through a fisherman's village in Dakar, Senegal",                                        pos: "center center" },
        { src: IMGS.wwaPelicans,        caption: "Observing thousands of wild pelicans at Djoudj National Bird Sanctuary",                         pos: "center center" },
        { src: IMGS.wwaGambiaFamily,    caption: "Local Gambian families welcomed me with their signature hospitality",                            pos: "center center" },
        { src: IMGS.wwaChimp,           caption: "A mother chimpanzee looks on as her baby plays in River Gambia National Park",                   pos: "center center" },
        { src: IMGS.wwaHippos,          caption: "Close encounters with wild hippos",                                                              pos: "center center" },
      ],
    },
  },
];

const includes = [
  "Available for libraries, organizations, schools, and corporate events",
  "Exclusive original photography from Brian's travels",
  "Engaging storytelling with cultural insights",
  "Off the beaten path encounters with locals",
  "Practical travel tips for aspiring adventurers",
  "Lively Q&A session at the end",
  "Flexible program length (40–90 minutes)",
];

const venueTypes = [
  { icon: <Users size={20} />,  label: "Libraries"         },
  { icon: <Star size={20} />,   label: "Senior Facilities" },
  { icon: <Camera size={20} />, label: "Corporate"         },
  { icon: <MapPin size={20} />, label: "Schools"           },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function BookATalk() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", organization: "",
    eventDate: "", talkTitle: "", audience: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<(typeof programs)[0] | null>(null);

  // Close modal
  const closeModal = () => setSelectedProgram(null);

  // Auto-open a talk if ?open=ID is in the URL (direct deep links)
  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId !== null) {
      const prog = programs.find((p) => p.id === Number(openId));
      if (prog) setSelectedProgram(prog);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-36a3d90a/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ type: "talk", ...formData }),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.error) {
        const msg = json.error ?? `Server error ${res.status}`;
        console.error("BookATalk submit error:", msg);
        setSubmitError("Something went wrong — please try again or email Brian directly.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error("BookATalk submit error:", err);
      setSubmitError("Network error — please check your connection and try again.");
    }
    setSubmitting(false);
  };

  const openProgram = (p: (typeof programs)[0]) => { setSelectedProgram(p); };

  return (
    <div>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-0 px-4 overflow-hidden" style={{ background: DARK }}>
        <div className="max-w-4xl mx-auto text-center pb-16">
          <p className="uppercase tracking-widest text-sm mb-4" style={{ color: GOLD, fontWeight: 500 }}>Speaking Programs</p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700 }}>
            Book Brian for Your<br />Next Event
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", maxWidth: "550px", margin: "0 auto" }}>
            Transport your audience to dozens of countries and regions through Brian's captivating storytelling
            and stunning original photography. In-person talks in Chicagoland; online events available worldwide.
          </p>
        </div>
        <div className="relative h-48 sm:h-64 overflow-hidden mt-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 h-full gap-1">
            <PhotoStrip
              pool={heroStripPhotos}
              count={5}
              aspect=""
              animate={false}
              className="h-full overflow-hidden"
              linkUrl="https://www.etsy.com/shop/endlesspassport"
            />
          </div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${darkRgba(0.3)} 0%, transparent 40%)` }} />
        </div>
      </section>

      {/* ─── DELIVERY FORMATS ─── */}
      <section className="py-16 px-4" style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: GOLD, fontWeight: 500 }}>Flexible Formats</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700 }}>
              Three Ways to Experience a Brian Michalski Talk
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={22} />, bg: `${GOLD}22`, c: GOLD, title: "In-Person Talk", region: "Chicago & Chicagoland Suburbs", body: "Brian comes directly to your library, corporate event, local business, community center, or venue anywhere in Chicago or the nearby suburbs for a live, in-person presentation. A resource guide and live Q&A are included.", cta: "Book in-person", border: `1px solid ${GOLD}44` },
              { icon: <Video size={22} />,  bg: "rgba(99,179,237,0.15)", c: "#63b3ed", title: "Live Zoom Talk", region: "Available Worldwide", body: "Brian delivers a fully interactive live presentation over Zoom to organizations anywhere in the world. Attendees receive a digital resource guide and participate in a real-time Q&A.", cta: "Book via Zoom", border: "1px solid rgba(255,255,255,0.1)" },
              { icon: <Youtube size={22} />, bg: "rgba(252,82,82,0.12)", c: "#fc5252", title: "Pre-Recorded Lecture", region: "Worldwide * Private YouTube Link", body: "Receive a private, unlisted time-sensitive YouTube link to a recorded lecture that your organization can watch on its own schedule. Perfect for accommodating clients' busy schedules.", cta: "Request a recording", border: "1px solid rgba(255,255,255,0.1)" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.05)", border: f.border }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: f.bg, color: f.c }}>{f.icon}</div>
                <div>
                  <p className="text-white mb-1" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{f.title}</p>
                  <p className="uppercase tracking-widest mb-3" style={{ color: f.c, fontSize: "0.68rem", fontWeight: 600 }}>{f.region}</p>
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.9rem" }}>{f.body}</p>
                </div>
                <a href="#booking-form" className="mt-auto inline-flex items-center gap-1.5 text-sm" style={{ color: f.c, fontWeight: 500 }}>
                  {f.cta} <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: "#E8A838", fontWeight: 500 }}>What to Expect</p>
            <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, color: "#0F1932", lineHeight: 1.2 }}>
              An Experience Your Audience<br />Won't Forget
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#555", fontSize: "0.97rem" }}>
              Blending practical travel advice with engaging anecdotes and helpful resources, Brian sparks ideas for your next journey and closes each session with a lively Q&A.
            </p>
            <ul className="space-y-3">
              {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#E8A838" }} />
                  <span style={{ color: "#555", fontSize: "0.95rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={scubaDivingHero} alt="Traditional Andean dancers performing at Centro Qosqo de Arte Nativo, Cusco, Peru" className="w-full h-96 object-cover rounded-xl shadow-lg" style={{ objectPosition: "center 40%" }} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {venueTypes.map((v) => (
                <div key={v.label} className="p-3 rounded-lg text-center" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <div style={{ color: "#E8A838" }} className="flex justify-center mb-1">{v.icon}</div>
                  <p style={{ fontSize: "0.7rem", color: "#555" }}>{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GORGEOUS GEORGIA FEATURED ─── */}
      <section className="py-16 px-4" style={{ background: DARK }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <span className="inline-block px-2.5 py-1 rounded text-xs uppercase tracking-widest mb-3" style={{ background: GOLD, color: "white", fontWeight: 700 }}>✦ New Program</span>
              <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}>Gorgeous Georgia</h2>
              <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.97rem", lineHeight: 1.65 }}>
                After hearing years of rave reviews, Brian finally visited this Eastern European gem. Five weeks of vast natural wonders, locals' warmth and generosity, and wide-ranging cuisine exceeded every expectation.
              </p>
            </div>
            <a href="#booking-form" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, color: "white", fontWeight: 600, fontSize: "0.9rem" }}>
              Book This Talk <ArrowRight size={15} />
            </a>
          </div>
          {/* Mobile: stacked layout */}
          <div className="sm:hidden flex flex-col gap-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => openProgram(programs.find(p => p.id === 16)!)}>
            <div className="relative h-52 overflow-hidden" style={{ background: "#111" }}>
              <img src={IMGS.georgiaGlacierAutumn} alt="Shkhara Glacier with autumn foliage" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center center" }} />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                <p className="text-white text-xs" style={{ fontStyle: "italic", opacity: 0.85 }}>Mestia to Ushguli Hike</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 h-36">
              <div className="relative overflow-hidden rounded-bl-2xl" style={{ background: "#111" }}>
                <img src={IMGS.georgiaKhinkali} alt="Khinkali dumplings" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center center" }} />
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Khinkali Cooking Class</div>
              </div>
              <div className="relative overflow-hidden rounded-br-2xl" style={{ background: "#111" }}>
                <img src={IMGS.georgiaKazbegiSelfie} alt="Kazbegi Glacier" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center 30%" }} />
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Kazbegi Glacier Hike</div>
              </div>
            </div>
          </div>
          {/* Desktop: bento grid */}
          <div className="!hidden sm:!block rounded-2xl overflow-hidden cursor-pointer" onClick={() => openProgram(programs.find(p => p.id === 16)!)}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "220px 220px", gap: "5px" }}>
              <div className="group relative overflow-hidden" style={{ gridColumn: "1", gridRow: "1 / 3", background: "#111" }}>
                <img src={IMGS.georgiaGlacierAutumn} alt="Shkhara Glacier with autumn foliage" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center center" }} />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                  <p className="text-white text-xs" style={{ fontStyle: "italic", opacity: 0.85 }}>Mestia to Ushguli Hike</p>
                </div>
              </div>
              <div className="group relative overflow-hidden" style={{ background: "#111" }}>
                <img src={IMGS.georgiaKhinkali} alt="Khinkali dumplings" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center center" }} />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Khinkali Cooking Class</div>
              </div>
              <div className="group relative overflow-hidden" style={{ background: "#111" }}>
                <img src={IMGS.georgiaKazbegiSelfie} alt="Kazbegi Glacier" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center 30%" }} />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Kazbegi Glacier Hike</div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontSize: "0.83rem" }}>
            <span className="flex items-center gap-1.5"><Clock size={13} style={{ color: GOLD }} /> 60 min · 55-min presentation + live Q&amp;A</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span>In-person (Chicagoland) or Virtual via Zoom</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span>Libraries · Senior Facilities · Corporate · Schools</span>
          </div>
        </div>
      </section>

      {/* ─── TRAVEL TRUTHS FEATURED ─── */}
      <section className="py-16 px-4" style={{ background: DARK }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <span className="inline-block px-2.5 py-1 rounded text-xs uppercase tracking-widest mb-3" style={{ background: GOLD, color: "white", fontWeight: 700 }}>✦ New Program</span>
              <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}>Travel Truths: Lessons Learned Abroad</h2>
              <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.97rem", lineHeight: 1.65 }}>
                Five years. 60+ countries. Six continents. Brian distills powerful, humorous, and heartfelt lessons about resilience, perspective, and the enduring kindness of strangers — brought to life through the best of 30,000 original photographs.
              </p>
            </div>
            <a href="#booking-form" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${GOLD}, #c8821a)`, color: "white", fontWeight: 600, fontSize: "0.9rem" }}>
              Book This Talk <ArrowRight size={15} />
            </a>
          </div>
          {/* Mobile: stacked layout */}
          <div className="sm:hidden flex flex-col gap-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => openProgram(programs.find(p => p.id === 15)!)}>
            <div className="relative h-52 overflow-hidden" style={{ background: "#111" }}>
              <img src={ttlKidsSelfie} alt="Brian selfie with kids" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center 35%" }} />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                <p className="text-white text-xs" style={{ fontStyle: "italic", opacity: 0.85 }}>Making Friends Along the Way</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 h-36">
              <div className="relative overflow-hidden rounded-bl-2xl" style={{ background: "#111" }}>
                <img src={ttlOrangutan} alt="Wild orangutan, Borneo" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center 40%" }} />
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Wild Orangutans, Borneo</div>
              </div>
              <div className="relative overflow-hidden rounded-br-2xl" style={{ background: "#111" }}>
                <img src={ttlSnorkeling} alt="Scuba diving with tropical fish" className="w-full h-full object-cover scale-[1.08]" style={{ objectPosition: "center center" }} />
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Scuba Diving, Southeast Asia</div>
              </div>
            </div>
          </div>
          {/* Desktop: bento grid */}
          <div className="!hidden sm:!block rounded-2xl overflow-hidden cursor-pointer" onClick={() => openProgram(programs.find(p => p.id === 15)!)}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "220px 220px", gap: "5px" }}>
              <div className="group relative overflow-hidden" style={{ gridColumn: "1", gridRow: "1 / 3", background: "#111" }}>
                <img src={ttlKidsSelfie} alt="Brian selfie with kids" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center 35%" }} />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                  <p className="text-white text-xs" style={{ fontStyle: "italic", opacity: 0.85 }}>Making Friends Along the Way</p>
                </div>
              </div>
              <div className="group relative overflow-hidden" style={{ background: "#111" }}>
                <img src={ttlOrangutan} alt="Wild orangutan, Borneo" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center 40%" }} />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Wild Orangutans, Borneo</div>
              </div>
              <div className="group relative overflow-hidden" style={{ background: "#111" }}>
                <img src={ttlSnorkeling} alt="Scuba diving with tropical fish" className="w-full h-full object-cover transition-transform duration-700 scale-[1.08] group-hover:scale-[1.14]" style={{ objectPosition: "center center" }} />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>Scuba Diving, Southeast Asia</div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontSize: "0.83rem" }}>
            <span className="flex items-center gap-1.5"><Clock size={13} style={{ color: GOLD }} /> 60 min · 55-min presentation + live Q&amp;A</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span>In-person (Chicagoland) or Virtual via Zoom</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span>Libraries · Senior Facilities · Corporate · Schools</span>
          </div>
        </div>
      </section>

      {/* ─── MORE DESTINATIONS ─── */}
      <section className="py-16 px-4" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: "#E8A838", fontWeight: 500 }}>Available Programs</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#0F1932" }}>More Destinations</h2>
            <p className="mt-2 mx-auto" style={{ color: "#888", fontSize: "0.88rem", maxWidth: 480 }}>
              Click any program to see the full description, photos, and pricing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p) => (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                style={{ border: p.isNew ? `1.5px solid ${GOLD}` : "1px solid rgba(0,0,0,0.07)", transition: "box-shadow 0.2s, transform 0.2s" }}
                onClick={() => openProgram(p)}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: p.imgPos }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
                  {p.isNew && (
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-xs" style={{ background: GOLD, color: "white", fontWeight: 700 }}>✦ NEW</div>
                  )}
                  {p.detail?.photos && p.detail.photos.length > 0 && (
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)" }}>
                      <Camera size={10} /> {p.detail.photos.length} photos
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(13,30,38,0.45)" }}>
                    <span className="px-4 py-1.5 rounded-full text-sm text-white" style={{ background: GOLD, fontWeight: 600 }}>View Gallery →</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0F1932", fontSize: "0.95rem" }}>{p.title}</h3>
                  <p className="mb-3" style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5 }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs" style={{ color: GOLD }}><Clock size={11} /> {p.duration}</span>
                    <span className="text-xs" style={{ color: GOLD, fontWeight: 500 }}>View details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EGYPT WALL PAINTING FULL BLEED ─── */}
      <section className="relative h-48 overflow-hidden">
        <img src={egyptWallPainting} alt="Ancient Egyptian wall painting" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: darkRgba(0.5) }}>
          <p className="text-white text-center px-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 600, fontStyle: "italic" }}>
            "May your map be filled with many pins."
          </p>
        </div>
      </section>

      {/* ─── BOOKING FORM ─── */}
      <section id="booking-form" className="py-16 px-4" style={{ background: "#FAFAF8" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-widest text-sm mb-3" style={{ color: "#E8A838", fontWeight: 500 }}>Get in Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#0F1932" }}>Book a Talk</h2>
            <p className="mt-2" style={{ color: "#666", fontSize: "0.95rem" }}>Fill out the form and Brian will get back to you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center p-12 rounded-xl" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#E8A838" }} />
              <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0F1932", fontSize: "1.4rem" }}>Inquiry Received!</h3>
              <p style={{ color: "#666" }}>Thanks for reaching out! Brian will be in touch within 24 hours to discuss your event. Get ready for an adventure!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-xl space-y-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Your Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="jane@library.org" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="(312) 555-0100" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Organization / Venue *</label>
                  <input type="text" required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="Your School, Library, or Organization" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Preferred Date(s)</label>
                  <input type="text" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="March 15, 2026 (flexible)" />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Program Preference</label>
                  <select value={formData.talkTitle} onChange={(e) => setFormData({ ...formData, talkTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }}>
                    <option value="">Select a program</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}{p.isNew ? " ✦ New" : ""}</option>
                    ))}
                    <option value="open">Open to Brian's suggestion</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Expected Audience Size</label>
                <input type="text" value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="e.g. 30–50 adults" />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#333", fontWeight: 500 }}>Additional Notes</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none" style={{ border: "1px solid #ddd", background: "#fafafa" }} placeholder="Any special requirements, questions, or details about your event..." />
              </div>
              {submitError && (
                <div className="px-4 py-3 rounded-lg text-sm" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}>
                  {submitError}
                </div>
              )}
              <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-lg text-white transition-all" style={{ background: "linear-gradient(135deg, #E8A838, #c8821a)", fontWeight: 500, opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Sending…" : "Send Inquiry"}
              </button>
              <p className="text-center text-xs" style={{ color: "#999" }}>
                Or email directly: <a href="mailto:brian@endlesspassport.com" style={{ color: "#E8A838" }}>brian@endlesspassport.com</a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── PROGRAM DETAIL MODAL ─── */}
      <TalkModal
        program={selectedProgram}
        onClose={closeModal}
        onBookTalk={() => {
          setSelectedProgram(null);
          setTimeout(() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" }), 50);
        }}
      />


    </div>
  );
}
