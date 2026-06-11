// ─── Brian's 40 Travel Photos (valid figma:asset imports only) ───────────────
// Only photos that were properly imported via figma:asset/ in the Figma frame
// are included here. Plain-string src paths from the frame are excluded because
// they cannot be resolved by the bundler.
//
// The array is shuffled once at module-load time so every page refresh shows a
// different combination, but the order stays consistent within a session.

import p01 from "figma:asset/e2b2db07f7171df35c0e19af138e1cd25725093c.png";
import p02 from "figma:asset/04aeb0e60be37b09dae54c8b30ac6fde6488618b.png";
import p03 from "figma:asset/d23a2b96d124b4893ee41cc1509b048652b94835.png";
import p04 from "figma:asset/72ab92248b39485cd045bbcfc9a5513bc19e9c26.png";
import p05 from "figma:asset/be0c2160806abd2965271ad72d46c9f6822952d6.png";
import p06 from "figma:asset/6cc3f5a1dfa1d1df5f6ba9e06b106c028db8720d.png";
import p07 from "figma:asset/8bf31333c7889ebb8d857a6fc6b8beb87dea654c.png";
import p08 from "figma:asset/29b07ac36a870ea21b943f461a57d5f1c258b3c9.png";
import p09 from "figma:asset/045044cfcf266075e28b21433f1d57b1c3f130e0.png";
import p10 from "figma:asset/e3f32fa697f631deccbc1a14cf8aad744ff2da4d.png";
import p11 from "figma:asset/487a222de617e67c895ee50c7423cac2b05cff50.png";
import p12 from "figma:asset/d8df3ea02c39f7ea1b44b4ba533ee67cdcec7f29.png";
import p13 from "figma:asset/26856d79d243a6505d1790f09d721eff09174c96.png";
import p14 from "figma:asset/614db90aff8cd462287fdf6997556a5d8ab95373.png";
import p15 from "figma:asset/1fd55602df24965c5e2a2e030d3e8f652b7c6e89.png";
import p16 from "figma:asset/63d6a8556988a113f1286835406c044e7ee1ffb5.png";
import p17 from "figma:asset/b394b0abacb3ecbd5ab0f2906414e595206d4b96.png";
import p18 from "figma:asset/d6c8eb46962881aeea76950815dc0a510fc496e5.png";
import p19 from "figma:asset/4c2c2070aa425ce4a5ed986c4ee588248eac411a.png";
import p20 from "figma:asset/3af7f46cbef8cc672a2bedac61839e7f3d13a78a.png";
import p21 from "figma:asset/f240a2810098585ad3dfc1f5795c63ebb6e01119.png";
import p22 from "figma:asset/bf4ab510c311ce64347d3b5e36f32a6c48f677c3.png";
import p23 from "figma:asset/64b4accbe2b9d8907b26cdb9a9ae53afc258153a.png";
import p24 from "figma:asset/74f0ef289d66b7a34d519c586efedf75b5dc575e.png";
import p25 from "figma:asset/7780cf305e02a745b67a137aa3cf4dceb4fabaf1.png";
import p26 from "figma:asset/b784058e2b4d1d02112651c3aca123a63d1935c9.png";
import p27 from "figma:asset/101ba4e7abb1325312c74bf8be4e5b0724bf7992.png";
import p28 from "figma:asset/be242b76c69df4cbb0347ee5e0a0477f3978a300.png";
import p29 from "figma:asset/cc50cdf86b0986f705d6f47cb788ab446995619f.png";
import p30 from "figma:asset/85ee2aa297c54fe33e071c768f9dbb3a89ebc569.png";
import p31 from "figma:asset/3fb8cd061a5672aa0742d69d3afd4d6eaeb360b4.png";
import p32 from "figma:asset/3255c3bff844c01869e8b2e968605b2f276fc9e7.png";
import p33 from "figma:asset/6005e32eb69926151c59f27512e7c6c7e3da7471.png";
import p34 from "figma:asset/498cd6b0f5da683b87345004f102404b89f4fa36.png";
import p35 from "figma:asset/23a42559bbdeaeef496c00ef9faed6d19127fe5c.png";
// p36 removed — "0-2" file (non-travel screenshot)
// p37 removed — "FullSizeRender" file (website screenshot)
import p38 from "figma:asset/a462587c49cf679c0185f84eacb5339da80ffc88.png";
import p39 from "figma:asset/d50122c9fba30f23c9aab8dcfaee13e014f6c31b.png";
import p40 from "figma:asset/387a303640a6b5133252459cadcc03c78fae0812.png";
// p41 removed — Ponte Vecchio reflection looks like two images stacked
// p42 removed — Figma composite frame export (collage of 3–4 photos, not a real single photo)

// All 38 confirmed-valid photos (p36, p37, p41, p42 removed)
const ALL_PHOTOS: string[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p38, p39, p40,
];

// Fisher-Yates shuffle — runs once when the module is first imported,
// so the order is random on every page load but consistent within a session.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const travelPhotos: string[] = shuffle(ALL_PHOTOS);

/**
 * Pick `n` photos from the shuffled pool starting at `offset`.
 * Wraps around automatically so you never run out.
 */
export function pickPhotos(n: number, offset = 0): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push(travelPhotos[(offset + i) % travelPhotos.length]);
  }
  return out;
}