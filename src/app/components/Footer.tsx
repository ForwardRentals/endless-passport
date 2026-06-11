import { Link } from "react-router";
import { Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { logoCompassWhite } from "../brianImages";
import { DARK, GOLD } from "../siteTheme";

// Custom SVG icons for platforms not in lucide-react
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Instagram,  href: "https://www.instagram.com/seebriantravel",          label: "Instagram" },
  { icon: Facebook,   href: "https://www.facebook.com/endlesspassport",           label: "Facebook"  },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@endlesspassport",            label: "TikTok"    },
  { icon: Youtube,    href: "https://www.youtube.com/brianmichalskitravels",      label: "YouTube"   },
  { icon: XIcon,      href: "https://www.x.com/seebriantravel",                   label: "X"         },
  { icon: Mail,       href: "mailto:brian@endlesspassport.com",                   label: "Email"     },
];

export function Footer() {
  return (
    <footer style={{ background: DARK, color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <motion.img
                src={logoCompassWhite}
                alt="Endless Passport"
                className="w-9 h-9 object-contain"
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <span
                className="text-white"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 600 }}
              >
                Endless Passport
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Traveling educator Brian Michalski brings the world to Chicagoland through captivating stories,
              original photography, and cultural insights from 60+ countries.
            </p>
            <div className="flex gap-4 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  whileHover={{ color: GOLD, scale: 1.2, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home",         href: "/" },
                { label: "About Brian",  href: "/about" },
                { label: "Blog",         href: "/blog" },
                { label: "Events",       href: "/events" },
              ].map((l) => (
                <li key={l.href}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Link
                      to={l.href}
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      className="transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Work with Brian
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Book a Talk",     href: "/book-a-talk" },
                { label: "Consultations",   href: "/consultations" },
                { label: "Sponsor",         href: "/sponsor" },
              ].map((l) => (
                <li key={l.href}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Link
                      to={l.href}
                      style={{ color: "rgba(255,255,255,0.6)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      className="transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  <a
                    href="https://www.etsy.com/shop/endlesspassport"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    className="transition-colors"
                  >
                    Shop
                  </a>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  <a
                    href="mailto:brian@endlesspassport.com"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    className="transition-colors"
                  >
                    Contact
                  </a>
                </motion.div>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
        >
          <p>© 2026 Endless Passport. All rights reserved.</p>
          <p>Based in Chicago, IL · <a href="mailto:brian@endlesspassport.com" className="hover:text-white transition-colors">brian@endlesspassport.com</a></p>
        </div>
        <div className="pt-4 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          This website was made for free by{" "}
          <a
            href="https://freesitecompany.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            freesitecompany.com
          </a>
        </div>
      </div>
    </footer>
  );
}