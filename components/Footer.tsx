import content from "@/data/content.json";

export default function Footer() {
    const { footer } = content;

    return (
        <footer className="bg-text-main text-white py-12 relative z-50">
            <div className="container mx-auto px-4 text-center relative z-20">
                {/* Staff / Credits Section */}
                <div className="mb-10 px-6 py-6 border border-white/10 rounded-xl max-w-sm mx-auto bg-white/5 backdrop-blur-sm">
                    <h3 className="font-mochiy font-bold text-sm mb-4 border-b border-white/20 pb-2 inline-block px-4">
                        {footer.staff.title}
                    </h3>
                    <div className="text-xs space-y-1 mb-6">
                        <p className="opacity-80 leading-relaxed font-bold">
                            {footer.staff.roles}
                        </p>
                        <a 
                            href={footer.staff.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 mt-2 text-pink-300 hover:text-pink-200 transition-colors font-bold"
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            {footer.staff.name}
                        </a>
                    </div>
                    
                    {/* Special Thanks */}
                    {footer.staff.specialThanks && (
                        <>
                            <h3 className="font-mochiy font-bold text-sm mb-3 border-b border-white/20 pb-2 inline-block px-4 text-yellow-200">
                                {footer.staff.specialThanks.title}
                            </h3>
                            <div className="text-sm font-mochiy">
                                <p className="opacity-90 leading-relaxed font-bold text-yellow-100 drop-shadow-md">
                                    {footer.staff.specialThanks.name}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-sm md:text-base opacity-80 mb-2 font-bold whitespace-pre-wrap leading-relaxed">
                    {footer.notice}
                </p>
                <p className="text-xs md:text-sm opacity-60">
                    {footer.rights}
                </p>
                <div className="mt-10 text-[10px] text-gray-500 font-poppins tracking-wider">
                    © {new Date().getFullYear()} Bunbuku Arisa Fan Site
                </div>
            </div>
        </footer>
    );
}
