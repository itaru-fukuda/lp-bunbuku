import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    color?: "primary" | "accent" | "tertiary";
}

export default function SectionTitle({ title, subtitle, className, color = "primary" }: SectionTitleProps) {
    const colorMap = {
        primary: "text-primary",
        accent: "text-accent",
        tertiary: "text-tertiary",
    };

    return (
        <div className={cn("text-center mb-12", className)}>
            {subtitle && (
                <span className={cn("block text-sm md:text-base font-bold tracking-wider uppercase mb-2", colorMap[color])}>
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                {title}
            </h2>
            <div className={cn("w-16 h-1 mx-auto mt-4 rounded-full", `bg-${color}`)} />
        </div>
    );
}
