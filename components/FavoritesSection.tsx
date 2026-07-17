"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from "recharts";
import SectionTitle from "./SectionTitle";
import content from "@/data/content.json";

interface FavoritePoint {
    key: string;
    label: string;
    value: number;
    description: string;
}

interface AxisTickProps {
    x?: string | number;
    y?: string | number;
    textAnchor?: string;
    payload?: { value: string };
}

interface PointDotProps {
    cx?: number;
    cy?: number;
    index?: number;
    payload?: FavoritePoint;
}

const DESKTOP_CALLOUT_POSITIONS = [
    "left-1/2 top-0 -ml-28",
    "left-[76%] top-[23%]",
    "left-[74%] top-[82%]",
    "right-[74%] top-[82%]",
    "right-[76%] top-[23%]",
];

const DESKTOP_CALLOUT_ARROWS = [
    "-bottom-2 left-1/2 -translate-x-1/2 border-b border-r",
    "-left-2 top-1/2 -translate-y-1/2 border-b border-l",
    "-left-2 top-5 border-b border-l",
    "-right-2 top-5 border-r border-t",
    "-right-2 top-1/2 -translate-y-1/2 border-r border-t",
];

const MOBILE_LABEL_HIT_POSITIONS = [
    "left-1/2 top-[17%] -translate-x-1/2",
    "left-[68%] top-[34%]",
    "left-[56%] top-[61%]",
    "right-[56%] top-[61%]",
    "right-[68%] top-[34%]",
];

function createSparklePath(x: number, y: number, size: number) {
    return `M ${x} ${y - size} L ${x + size * 0.45} ${y - size * 0.45} L ${x + size} ${y} L ${x + size * 0.45} ${y + size * 0.45} L ${x} ${y + size} L ${x - size * 0.45} ${y + size * 0.45} L ${x - size} ${y} L ${x - size * 0.45} ${y - size * 0.45} Z`;
}

export default function FavoritesSection() {
    const { favorites } = content;
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const shouldReduceMotion = Boolean(useReducedMotion());
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [hasChartExpanded, setHasChartExpanded] = useState(false);
    const [hasChartAnimationFinished, setHasChartAnimationFinished] = useState(false);
    const [openPointKey, setOpenPointKey] = useState<string>(content.favorites.points[0]?.key ?? "voice");

    useEffect(() => {
        if (!isInView || shouldReduceMotion) return;

        // 0の形を先に描画し、カードが見え始めてから最終値へ展開する。
        const timer = window.setTimeout(() => setHasChartExpanded(true), 500);
        return () => window.clearTimeout(timer);
    }, [isInView, shouldReduceMotion]);

    const points = favorites.points as FavoritePoint[];
    const chartData = useMemo(
        () => points.map((point) => ({
            ...point,
            value: hasChartExpanded || shouldReduceMotion ? point.value : 0,
        })),
        [hasChartExpanded, points, shouldReduceMotion],
    );
    const openPoint = points.find((point) => point.key === openPointKey);

    const renderAxisTick = ({ x = 0, y = 0, textAnchor = "middle", payload }: AxisTickProps) => {
        if (!payload) return null;

        const tickX = Number(x);
        const tickY = Number(y);
        const anchor = textAnchor === "start" || textAnchor === "end" ? textAnchor : "middle";
        const isLongLabel = payload.value === "リスナーとの距離感";
        const pointKey = points.find((point) => point.label === payload.value)?.key;
        const isActive = pointKey === activeKey || pointKey === openPointKey;
        const lines = isLongLabel ? ["リスナーとの", "距離感"] : [payload.value];

        return (
            <text
                x={tickX}
                y={tickY}
                dy={isLongLabel ? -6 : 4}
                textAnchor={anchor}
                className={isActive
                    ? "pointer-events-none fill-[#B93678] text-[15px] font-bold transition-[fill,font-size] duration-200 lg:text-[12px] lg:font-semibold"
                    : "pointer-events-none fill-[#5C3F55] text-[11px] font-medium transition-[fill,font-size] duration-200 sm:text-[12px]"}
                style={isActive ? { filter: "drop-shadow(0 1px 2px rgba(185,54,120,0.2))" } : undefined}
            >
                {lines.map((line, index) => (
                    <tspan key={line} x={tickX} dy={index === 0 ? 0 : 15}>
                        {line}
                    </tspan>
                ))}
            </text>
        );
    };

    const renderPointDot = ({ cx = 0, cy = 0, index = 0, payload }: PointDotProps) => {
        const isActive = payload?.key === activeKey;
        const isPerfectScore = payload?.value === 5;
        const pointKey = payload?.key;
        const sparkleX = cx + 8;
        const sparkleY = cy - 8;
        const sparklePath = createSparklePath(sparkleX, sparkleY, 4);
        const sparklePathLeft = createSparklePath(cx - 10, cy + 1, 2.7);
        const sparklePathBottom = createSparklePath(cx + 6, cy + 10, 2.2);

        return (
            <motion.g
                role="button"
                tabIndex={0}
                aria-label={payload ? `${payload.label}の説明を表示` : undefined}
                aria-controls="favorite-point-description"
                onClick={() => pointKey && setOpenPointKey(pointKey)}
                onKeyDown={(event) => {
                    if (pointKey && (event.key === "Enter" || event.key === " ")) {
                        event.preventDefault();
                        setOpenPointKey(pointKey);
                    }
                }}
                onMouseEnter={() => pointKey && setActiveKey(pointKey)}
                onMouseLeave={() => setActiveKey(null)}
                onFocus={() => pointKey && setActiveKey(pointKey)}
                onBlur={() => setActiveKey(null)}
                initial={shouldReduceMotion || hasChartAnimationFinished ? false : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : {
                    duration: 0.32,
                    delay: index * 0.1,
                    ease: "easeOut",
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
                <circle cx={cx} cy={cy} r={18} fill="transparent" className="cursor-pointer" />
                {isPerfectScore && (
                    <>
                        <motion.circle
                            aria-hidden="true"
                            cx={cx}
                            cy={cy}
                            r={11}
                            fill="#FFD76A"
                            initial={false}
                            animate={shouldReduceMotion ? { opacity: 0.18, r: 11 } : {
                                opacity: [0.08, 0.32, 0.08],
                                r: [8, 15, 8],
                            }}
                            transition={shouldReduceMotion ? { duration: 0 } : {
                                duration: 1.8,
                                delay: index * 0.16,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                            style={{ filter: "drop-shadow(0 0 5px rgba(229,168,35,0.7))" }}
                        />
                        <motion.circle
                            aria-hidden="true"
                            cx={cx}
                            cy={cy}
                            r={8}
                            fill="none"
                            stroke="#F0B429"
                            strokeWidth={1.8}
                            initial={false}
                            animate={shouldReduceMotion ? { opacity: 0.45, r: 8 } : {
                                opacity: [0.25, 0.9, 0.25],
                                r: [7, 13, 7],
                            }}
                            transition={shouldReduceMotion ? { duration: 0 } : {
                                duration: 1.8,
                                delay: index * 0.18,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.g
                            aria-hidden="true"
                            initial={false}
                            animate={shouldReduceMotion ? { opacity: 0.65, rotate: 0 } : {
                                opacity: [0.15, 0.85, 0.15],
                                rotate: [0, 45, 90],
                            }}
                            transition={shouldReduceMotion ? { duration: 0 } : {
                                duration: 2.4,
                                delay: index * 0.16,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{ transformOrigin: `${cx}px ${cy}px` }}
                        >
                            <line x1={cx} y1={cy - 9} x2={cx} y2={cy - 15} stroke="#E5A823" strokeWidth={1.7} strokeLinecap="round" />
                            <line x1={cx + 9} y1={cy} x2={cx + 15} y2={cy} stroke="#E5A823" strokeWidth={1.7} strokeLinecap="round" />
                            <line x1={cx} y1={cy + 9} x2={cx} y2={cy + 15} stroke="#E5A823" strokeWidth={1.7} strokeLinecap="round" />
                            <line x1={cx - 9} y1={cy} x2={cx - 15} y2={cy} stroke="#E5A823" strokeWidth={1.7} strokeLinecap="round" />
                        </motion.g>
                        <motion.path
                            aria-hidden="true"
                            d={sparklePath}
                            fill="#FFD54F"
                            initial={false}
                            animate={shouldReduceMotion ? { opacity: 0.8, scale: 1 } : {
                                opacity: [0.2, 1, 0.2],
                                scale: [0.55, 1.35, 0.55],
                            }}
                            transition={shouldReduceMotion ? { duration: 0 } : {
                                duration: 1.45,
                                delay: 0.3 + index * 0.18,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                filter: "drop-shadow(0 0 4px rgba(229,168,35,0.85))",
                                transformOrigin: `${sparkleX}px ${sparkleY}px`,
                            }}
                        />
                        {[sparklePathLeft, sparklePathBottom].map((path, sparkleIndex) => (
                            <motion.path
                                key={path}
                                aria-hidden="true"
                                d={path}
                                fill={sparkleIndex === 0 ? "#FF8FC7" : "#FFF2A8"}
                                initial={false}
                                animate={shouldReduceMotion ? { opacity: 0.75, scale: 1 } : {
                                    opacity: [0.1, 1, 0.1],
                                    scale: [0.5, 1.25, 0.5],
                                }}
                                transition={shouldReduceMotion ? { duration: 0 } : {
                                    duration: 1.6,
                                    delay: 0.65 + sparkleIndex * 0.35 + index * 0.16,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    filter: "drop-shadow(0 0 3px rgba(255,110,180,0.65))",
                                    transformOrigin: sparkleIndex === 0 ? `${cx - 10}px ${cy + 1}px` : `${cx + 6}px ${cy + 10}px`,
                                }}
                            />
                        ))}
                    </>
                )}
                <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 7 : isPerfectScore ? 5.5 : 4.5}
                    fill={isPerfectScore ? "#FFF8D6" : "#FFFFFF"}
                    stroke={isActive ? "#B93678" : isPerfectScore ? "#E5A823" : "#D84F98"}
                    strokeWidth={isActive ? 3 : 2.5}
                    style={isPerfectScore ? { filter: "drop-shadow(0 0 5px rgba(229,168,35,0.9))" } : undefined}
                />
            </motion.g>
        );
    };

    return (
        <section
            id="favorites"
            ref={sectionRef}
            className="relative z-20 overflow-hidden bg-[rgba(255,253,247,0.90)] py-16 md:py-20"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    backgroundImage: "radial-gradient(rgba(200,121,216,0.25) 1.5px, transparent 1.5px)",
                    backgroundSize: "26px 26px",
                }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-pink-200/25 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-purple-200/25 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
                >
                    <SectionTitle
                        title={favorites.heading}
                        subtitle={favorites.subtitle}
                        color="primary"
                        className="mb-5"
                    />
                    <p className="mx-auto max-w-2xl whitespace-pre-line text-center text-sm leading-7 text-text-sub sm:text-base">
                        {favorites.description}
                    </p>
                </motion.div>

                <div className="mx-auto mt-10 max-w-5xl lg:mt-14">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
                        animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.72, delay: shouldReduceMotion ? 0 : 0.12, ease: "easeOut" }}
                        className="group/chart relative min-w-0 rounded-[2rem] border border-white/80 bg-white/65 p-3 shadow-[0_16px_50px_rgba(117,74,117,0.09)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-pink-200 hover:shadow-[0_20px_55px_rgba(180,92,145,0.14)] motion-reduce:transition-none sm:p-5 lg:p-6"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute left-7 top-7 text-lg text-pink-300/60">✦</span>
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-16 right-8 text-sm text-purple-300/60">✧</span>
                        <div className="relative h-[250px] w-full sm:h-[340px] lg:h-[620px]">
                            <div
                                role="group"
                                aria-label={favorites.chartAriaLabel}
                                className="absolute inset-0"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="55%"
                                        margin={{ top: 42, right: 48, bottom: 42, left: 48 }}
                                    >
                                        <PolarGrid stroke="#DFCDE2" strokeWidth={1} radialLines />
                                        <PolarAngleAxis
                                            dataKey="label"
                                            tick={renderAxisTick}
                                            tickLine={false}
                                            tickSize={30}
                                        />
                                        <PolarRadiusAxis
                                            domain={[0, 5]}
                                            tick={false}
                                            axisLine={false}
                                            tickCount={6}
                                        />
                                        <Radar
                                            key={hasChartExpanded || shouldReduceMotion ? "expanded" : "collapsed"}
                                            name="推し度"
                                            dataKey="value"
                                            stroke="#D84F98"
                                            strokeWidth={2.5}
                                            fill="#C879D8"
                                            fillOpacity={0.3}
                                            dot={renderPointDot}
                                            isAnimationActive={!shouldReduceMotion && hasChartExpanded && !hasChartAnimationFinished}
                                            animationBegin={80}
                                            animationDuration={1000}
                                            animationEasing="ease-out"
                                            onAnimationEnd={() => setHasChartAnimationFinished(true)}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {points.map((point, index) => (
                                <motion.article
                                    key={`desktop-callout-${point.key}`}
                                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
                                    animate={isInView || shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
                                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.45,
                                        delay: shouldReduceMotion ? 0 : 0.7 + index * 0.1,
                                        ease: "easeOut",
                                    }}
                                    onMouseEnter={() => setActiveKey(point.key)}
                                    onMouseLeave={() => setActiveKey(null)}
                                    className={`absolute z-20 hidden w-56 rounded-[1.25rem] border border-pink-100 bg-white/95 p-4 shadow-[0_10px_28px_rgba(180,92,145,0.12)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 hover:border-pink-200 hover:shadow-[0_14px_34px_rgba(180,92,145,0.17)] motion-reduce:transition-none lg:block ${DESKTOP_CALLOUT_POSITIONS[index]}`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`absolute h-4 w-4 rotate-45 border-pink-100 bg-white ${DESKTOP_CALLOUT_ARROWS[index]}`}
                                    />
                                    <h3 className="sr-only">{point.label}</h3>
                                    <div className="relative flex justify-end">
                                        <span
                                            aria-label={`5点満点中${point.value}点`}
                                            className="rounded-full bg-pink-50 px-3 py-1 font-[family-name:var(--font-poppins)] text-lg font-black leading-none text-primary shadow-sm"
                                        >
                                            <span aria-hidden="true">{point.value}/5点</span>
                                        </span>
                                    </div>
                                    <p className="relative mt-1.5 text-xs leading-5 text-text-sub">
                                        {point.description}
                                    </p>
                                </motion.article>
                            ))}

                            {points.map((point, index) => (
                                <button
                                    key={`mobile-label-hit-${point.key}`}
                                    type="button"
                                    aria-label={`${point.label}の説明を表示`}
                                    aria-pressed={openPointKey === point.key}
                                    aria-controls="favorite-point-description"
                                    onClick={() => setOpenPointKey(point.key)}
                                    onFocus={() => setActiveKey(point.key)}
                                    onBlur={() => setActiveKey(null)}
                                    className={`absolute z-30 h-14 touch-manipulation rounded-xl bg-transparent text-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden ${point.key === "distance" ? "w-32" : "w-24"} ${MOBILE_LABEL_HIT_POSITIONS[index]}`}
                                >
                                    <span className="sr-only">{point.label}</span>
                                </button>
                            ))}

                        </div>

                        <AnimatePresence mode="wait">
                            {openPoint && (
                                <motion.article
                                    id="favorite-point-description"
                                    key={openPoint.key}
                                    aria-live="polite"
                                    initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: -6 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -6 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
                                    className="relative mx-2 mb-5 overflow-visible rounded-[1.35rem] border border-pink-100 bg-white/95 p-4 shadow-[0_10px_28px_rgba(180,92,145,0.12)] lg:hidden"
                                >
                                    <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-pink-100 bg-white" />
                                    <div className="relative flex items-center justify-between gap-3">
                                        <h3 className="text-lg font-bold text-[#4B3045]">
                                            {openPoint.label}
                                        </h3>
                                        <span
                                            aria-label={`5点満点中${openPoint.value}点`}
                                            className="rounded-full bg-pink-50 px-3.5 py-1.5 font-[family-name:var(--font-poppins)] text-xl font-black leading-none text-primary shadow-sm"
                                        >
                                            <span aria-hidden="true">{openPoint.value}/5点</span>
                                        </span>
                                    </div>
                                    <p className="relative mt-2 text-sm leading-6 text-text-sub">
                                        {openPoint.description}
                                    </p>
                                </motion.article>
                            )}
                        </AnimatePresence>

                        <div className="mx-auto -mt-2 flex w-fit items-center gap-2 rounded-full border border-pink-100 bg-white/85 px-4 py-2 text-xs font-medium text-[#704D67] shadow-sm sm:text-sm">
                            <span aria-hidden="true" className="text-primary">♥</span>
                            {favorites.scaleLabel}
                        </div>
                    </motion.div>
                </div>

                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={isInView || shouldReduceMotion ? { opacity: 1 } : undefined}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.95 }}
                    className="mt-7 text-center text-xs leading-6 text-[#806C78] sm:text-sm"
                >
                    {favorites.note}
                </motion.p>
            </div>
        </section>
    );
}
