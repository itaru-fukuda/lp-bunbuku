"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sitePages } from "@/lib/site";
import Modal from "./Modal";

export default function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/videos") return;
    const followLegacyHash = () => {
      if (window.location.hash === "#songs") { router.replace("/songs"); return; }
      if (pathname !== "/") return;
      const routes: Record<string, string> = { "#profile": "/profile#profile", "#qna": "/profile#qna", "#favorites": "/profile#favorites", "#videos": "/videos#videos", "#daily": "/videos#playlists", "#expression-gallery": "/gallery#expression-gallery" };
      const destination = routes[window.location.hash];
      if (destination) router.replace(destination);
    };
    followLegacyHash();
    window.addEventListener("hashchange", followLegacyHash);
    return () => window.removeEventListener("hashchange", followLegacyHash);
  }, [pathname, router]);
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const close = () => { if (query.matches) setMenuOpen(false); };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  const links = (mobile: boolean) => sitePages.map((item) => {
    const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
    return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}
      className={`relative min-h-11 py-3 text-xs font-black tracking-[0.2em] transition-colors ${mobile ? "rounded-2xl px-5 text-center" : "px-3"} ${active ? "bg-pink-50 text-[#82415f]" : "text-text-sub hover:bg-pink-50"}`}>
      {item.label}{active && <span aria-hidden="true" className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-primary" />}
    </Link>;
  });
  return <>
    <motion.header initial={reduceMotion ? false : { y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="fixed inset-x-0 top-0 z-[990] hidden h-20 items-center justify-center border-b border-primary/10 bg-white/90 shadow-sm backdrop-blur-md md:flex">
      <nav aria-label="メインナビゲーション" className="flex items-center gap-8">{links(false)}</nav>
    </motion.header>
    <button type="button" onClick={() => setMenuOpen(true)} aria-label="メニューを開く" aria-expanded={menuOpen} aria-controls="mobile-navigation" className="fixed right-6 top-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border border-pink-100 bg-white/95 text-dark shadow-md md:hidden"><Menu size={20} /></button>
    {menuOpen && <Modal label="サイトナビゲーション" onClose={() => setMenuOpen(false)} className="nav-dialog">
      <div className="flex items-center justify-between border-b border-primary/20 pb-3"><span className="text-xs font-bold tracking-widest text-[#82415f]">NAVIGATION</span><button type="button" aria-label="メニューを閉じる" onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-pink-50"><X size={20} /></button></div>
      <nav id="mobile-navigation" aria-label="モバイルナビゲーション" className="mt-4 flex flex-col gap-2">{links(true)}</nav>
    </Modal>}
  </>;
}
