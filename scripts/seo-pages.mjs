const SITE = 'https://www.endlesspassport.com';
const SITE_NAME = 'Endless Passport';
const OG_IMAGE = 'https://www.endlesspassport.com/og-everest.jpg';
const DISALLOW = ['/admin', '/photo-assets'];
const PAGES = [
  { path: '/', title: 'Endless Passport | Travel Talks & Trip Consultations with Brian', description: 'Brian of Endless Passport brings the world to your library, business, or community group — live travel talks in Chicago & worldwide via Zoom, plus one-on-one trip planning consultations.' },
  { path: '/about', title: 'About Brian Michalski | Endless Passport', description: "Meet Brian Michalski — Chicago's traveling educator and storyteller. Five years of solo backpacking, 60+ countries, six continents, and the lessons learned along the way." },
  { path: '/book-a-talk', title: 'Book a Travel Talk | Endless Passport', description: 'Book a live travel talk with Brian for your library, business or community group — in person around Chicagoland or worldwide via Zoom. Destinations from Everest Base Camp to Georgia.' },
  { path: '/events', title: 'Upcoming Travel Talks & Events | Endless Passport', description: "See Brian's upcoming travel talks at libraries and community venues around Chicagoland, plus online events on Zoom." },
  { path: '/consultations', title: '1-on-1 Travel Consultations | Endless Passport', description: 'Planning a solo adventure and not sure where to start? Brian offers 2–3 hour one-on-one Zoom consultations with personalized trip planning for aspiring world travelers.' },
  { path: '/sponsor', title: 'Partnerships & Sponsorships | Endless Passport', description: "Connect your brand with a growing community of travel enthusiasts across Chicagoland by sponsoring Brian's travel programs." },
  { path: '/blog/', title: 'Travel Blog — Stories from the Road | Endless Passport', description: 'Practical travel tips, guides, memorable moments and reflections from half a decade of solo backpacking through more than 60 countries.' },
  { path: '/blog/welcome', title: 'Welcome to Endless Passport! | Endless Passport Blog', description: 'Brian Michalski introduces Endless Passport — a platform to educate and inspire budding global nomads all over the world.' },
  { path: '/blog/packing-list', title: 'Packing List for a Backpacking Journey Abroad | Endless Passport', description: "Brian's packing list for long-term backpacking: how to pack light, what clothes to bring, and what actually fits in a carry-on bag." },
  { path: '/blog/which-backpacks-to-buy', title: 'Which Backpacks to Buy for Extended Travel | Endless Passport', description: 'A hands-on look at the Tortuga Outbreaker backpacks Brian used for years of extended travel — sizes, prices and what works on the road.' },
  { path: '/blog/best-debit-card-abroad', title: 'What Is the Best Debit Card to Take Abroad? | Endless Passport', description: "Why Brian travels with a Schwab checking account: no foreign transaction fees and unlimited ATM fee rebates worldwide." },
  { path: '/blog/hostel-stays', title: 'Innovative Ways to Enjoy Safe Hostel Stays | Endless Passport', description: 'How to find safe, comfortable hostels — using Hostelworld, search filters, and tips for meeting travelers from all over the world.' },
  { path: '/blog/four-weeks-to-go', title: 'Four Weeks To Go | Endless Passport Blog', description: 'Final preparations before Brian sets off for the Iberian Peninsula and Africa — packing up, staying organized, and getting ready for the next chapter.' },
  { path: '/blog/year-in-review-2023', title: 'The Year in Review and a Look Ahead | Endless Passport', description: "Brian's 2023 in review — the coastal Camino de Santiago, the Azores, Morocco as his sixth continent, and an evolving definition of home." },
];
// Post-build SEO step (runs in the deploy workflow after `pnpm run build`).
// GitHub Pages serves unknown paths via 404.html with an HTTP 404 status, so
// client-side routes like /about were invisible to Google. This writes a real
// HTML file for every public page (served with 200), each with
// its own title, description and canonical URL, plus sitemap.xml and robots.txt.
// Add new pages to PAGES when you add routes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const dist = 'dist';
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

function render({ path, title, description }) {
  const url = SITE + path;
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ].join('\n    ');
  return template
    .replace(/<meta name="robots"[^>]*>\s*/i, '')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<\/head>/i, `  ${head}\n  </head>`);
}

// /about is written as dist/about.html: GitHub Pages serves it at /about with
// a 200, whereas dist/about/index.html would 301 to /about/.
for (const page of PAGES) {
  // Paths ending in "/" (e.g. /blog/, which also has child pages) get a folder index.html.
  const file = page.path.endsWith('/') ? join(dist, page.path, 'index.html') : join(dist, page.path.slice(1) + '.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(page));
}

writeFileSync(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PAGES.map(p => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${DISALLOW.map(d => `Disallow: ${d}\n`).join('')}\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`SEO: wrote ${PAGES.length} pages, sitemap.xml, robots.txt`);
