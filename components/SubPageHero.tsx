import Link from "next/link";
import { sitePages, type SitePath } from "@/lib/site";

export default function SubPageHero({ href }: { href: SitePath }) {
  const page = sitePages.find((item) => item.href === href)!;
  return <header className="relative overflow-hidden border-b border-primary/10 bg-pink-50/90 px-5 pb-12 pt-28 md:pb-16 md:pt-36">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(#82415f_1px,transparent_1px)] [background-size:20px_20px]" />
    <div className="relative mx-auto max-w-5xl">
      <nav aria-label="パンくず" className="mb-8 flex gap-3 text-xs text-text-sub"><Link href="/" className="underline underline-offset-4">TOP</Link><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
      <p className="mb-3 font-poppins text-sm font-bold tracking-[0.3em] text-[#82415f]">{page.label}</p>
      <h1 className="font-mochiy text-2xl leading-relaxed md:text-4xl">{page.subtitle}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-8 text-text-sub">{page.description}</p>
    </div>
  </header>;
}
