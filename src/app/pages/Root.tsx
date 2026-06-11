import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { logoCompassBlack } from "../brianImages";

export function Root() {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element after the page renders;
    // otherwise scroll to the top as usual.
    if (location.hash) {
      const id = location.hash.slice(1);
      // Small delay so the page finishes rendering before we scroll
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 420); // just after the page-transition animation finishes
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // ── Inject branded favicon ──────────────────────────────────────────────────
  useEffect(() => {
    // Remove any existing favicons
    document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = logoCompassBlack;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}