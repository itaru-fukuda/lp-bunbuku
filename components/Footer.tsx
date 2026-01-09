import content from "@/data/content.json";

export default function Footer() {
    const { footer } = content;

    return (
        <footer className="bg-text-main text-white py-10">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm md:text-base opacity-80 mb-2">
                    {footer.notice}
                </p>
                <p className="text-xs md:text-sm opacity-60">
                    {footer.rights}
                </p>
                <div className="mt-8 text-xs text-gray-500">
                    © {new Date().getFullYear()} Bunbuku Arisa Unofficial Fan Site
                </div>
            </div>
        </footer>
    );
}
