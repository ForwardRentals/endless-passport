import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { logoCompassWhite } from "../brianImages";
import { DARK, GOLD, darkRgba } from "../siteTheme";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Book a Talk", href: "/book-a-talk" },
  { label: "Shop", href: "https://www.etsy.com/shop/endlesspassport", external: true },
  { label: "Consultations", href: "/consultations" },
  { label: "Sponsor", href: "/sponsor" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: isTransparent ? "transparent" : darkRgba(0.97),
        backdropFilter: isTransparent ? "none" : "blur(12px)",
        boxShadow: isTransparent ? "none" : "0 2px 20px rgba(0,0,0,0.3)",
        transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img
              src={logoCompassWhite}
              alt="Endless Passport compass logo"
              className="w-9 h-9 object-contain"
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
            <span
              className="text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 600 }}
            >
              Endless Passport
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const active = location.pathname === link.href;
              const Component = (link as any).external ? 'a' : Link;
              const linkProps = (link as any).external
                ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: link.href };
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Component
                    {...linkProps}
                    className="px-3 py-2 rounded transition-colors duration-200 text-sm relative"
                    style={{
                      color: active ? GOLD : "rgba(255,255,255,0.85)",
                      fontWeight: active ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ background: GOLD }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Component>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <Link
                to="/book-a-talk#booking-form"
                className="ml-3 px-4 py-2 rounded text-sm"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #c8821a)`,
                  color: "white",
                  fontWeight: 500,
                  transition: "filter 0.2s, transform 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(1.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden px-4 pb-4 overflow-hidden"
            style={{ background: darkRgba(0.98) }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navLinks.map((link, i) => {
              const active = location.pathname === link.href;
              const Component = (link as any).external ? 'a' : Link;
              const linkProps = (link as any).external
                ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                : { to: link.href, onClick: () => setMenuOpen(false) };
              return (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Component
                    {...linkProps}
                    className="block py-3 text-sm border-b"
                    style={{
                      color: active ? GOLD : "rgba(255,255,255,0.85)",
                      borderColor: "rgba(255,255,255,0.1)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {link.label}
                  </Component>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => navigate("/book-a-talk#booking-form"), 50);
                }}
                className="block w-full mt-4 text-center py-3 rounded text-sm cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #c8821a)`,
                  color: "white",
                  fontWeight: 500,
                  border: "none",
                }}
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}