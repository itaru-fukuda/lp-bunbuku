import { ExternalLink } from "lucide-react";
import content from "@/data/content.json";

export default function Footer() {
    const { footer } = content;
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-50 overflow-hidden bg-gradient-to-br from-pink-50/95 via-rose-50/95 to-violet-100/95 text-dark">
            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#24130d_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

            <div className="container relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 text-center md:py-14">
                <div className="space-y-3">
                    <p className="font-[family-name:var(--font-mochiy)] text-2xl text-dark md:text-3xl">
                        Bunbuku Arisa Fan Site
                    </p>
                    <p className="mx-auto max-w-2xl whitespace-pre-wrap text-sm font-bold leading-relaxed text-text-sub">
                        {footer.notice}
                    </p>
                </div>

                <div className="mx-auto grid w-full max-w-3xl gap-4 rounded-3xl border border-white/70 bg-white/45 p-5 text-left shadow-[0_8px_24px_rgba(36,19,13,0.035)] sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                        <p className="font-[family-name:var(--font-mochiy)] text-sm text-dark">
                            {footer.staff.title}
                        </p>
                        <p className="mt-2 text-xs font-bold leading-relaxed text-text-sub">
                            {footer.staff.roles}
                        </p>
                    </div>
                    <a
                        href={footer.staff.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-black text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                        {footer.staff.name}
                        <ExternalLink size={13} aria-hidden="true" />
                    </a>
                    {footer.staff.specialThanks && (
                        <p className="text-xs font-bold text-text-sub sm:col-span-2">
                            {footer.staff.specialThanks.title}: {footer.staff.specialThanks.name}
                        </p>
                    )}
                </div>

                <div className="mx-auto max-w-3xl space-y-2 border-t border-primary/10 pt-6 text-xs font-bold leading-relaxed text-text-sub md:text-sm">
                    <p className="whitespace-pre-wrap">{footer.rights}</p>
                    <p className="font-poppins text-[11px] uppercase tracking-[0.18em] text-text-sub/80">
                        Copyright &copy; {year} Bunbuku Arisa Fan Site
                    </p>
                </div>
            </div>
        </footer>
    );
}
