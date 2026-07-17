"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Top", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Profile", href: "#profile" },
  { label: "Favorites", href: "#favorites" },
  { label: "Q&A", href: "#qna" },
  { label: "Videos", href: "#videos" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const center = window.innerHeight / 2;
            const aDistance = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - center);
            const bDistance = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - center);
            return aDistance - bDistance;
          });

        const activeId = visibleEntries[0]?.target.id;
        if (activeId) {
          setActiveSection(`#${activeId}`);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    const sections = NAV_ITEMS
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once initially
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* PC Header Navigation Bar (Desktop Only) */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full h-20 z-[990] hidden md:flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(36,19,13,0.04)] border-b border-primary/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-8 max-w-5xl flex justify-center items-center">
          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-black text-xs tracking-[0.2em] uppercase py-2 transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-text-sub hover:text-primary"
                  }`}
                >
                  {item.label}
                  {/* Underline for active state */}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </motion.header>

      {/* Floating Toggle Button - Always on Top Right (Mobile Only) */}
      <div className="fixed top-6 right-6 z-[999] block md:hidden">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
            menuOpen
              ? "bg-primary text-white border-transparent shadow-lg shadow-primary/20"
              : scrolled
              ? "bg-white/90 backdrop-blur-md text-text-main border-white/60 shadow-md"
              : "bg-white/40 backdrop-blur-sm text-text-main border-white/30 hover:bg-white/85 pointer-events-auto"
          }`}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Navigation Overlay Menu (Mobile Only Drawer) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-dark/15 backdrop-blur-sm z-[980] block md:hidden"
            />

            {/* Menu Card (Slides in/out from top/right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="fixed right-6 top-20 w-[280px] z-[985] glass-panel p-6 rounded-3xl border border-white/80 shadow-2xl flex flex-col gap-2.5 block md:hidden"
            >
              <div className="font-serif font-black text-xs text-primary/80 border-b border-primary/20 pb-3 mb-2 flex items-center justify-between">
                <span>NAVIGATION</span>
                <span className="text-[10px] text-accent">🐾 BUNBUKU</span>
              </div>
              
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`w-full px-5 py-3 rounded-2xl font-black text-[13px] tracking-[0.2em] text-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-rose-400 text-white shadow-md shadow-primary/10"
                        : "text-text-sub hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </motion.a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
