import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export default function PageLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-primary/30 bg-white/90 px-6 py-3 text-sm font-bold text-[#82415f] shadow-sm transition-colors hover:bg-pink-50">
    {children}<ArrowRight aria-hidden="true" size={18} className="shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
  </Link>;
}
