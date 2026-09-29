import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string | React.ReactNode;
    subtitle?: string;
    className?: string;
    color?: "primary" | "accent" | "tertiary";
}

export default function SectionTitle({ title, subtitle, className, color = "primary" }: SectionTitleProps) {
    const colorMap = {
        primary: "text-[#a13d70]",
        accent: "text-[#876018]",
        tertiary: "text-[#346c7d]",
    };

    return (
        <div className={cn("text-center mb-12", className)}>
            {subtitle && (
                <span className={cn("block text-sm md:text-base font-bold tracking-wider uppercase mb-2", colorMap[color])}>
                    {subtitle}
                </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl break-words font-bold text-text-main">
                {title}
            </h2>
            <div className={cn("w-16 h-1 mx-auto mt-4 rounded-full", `bg-${color}`)} />
        </div>
    );
}
