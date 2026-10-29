"use client";

/**
 * Perspective tunnel hero — adapted from 21st.dev "perspective-tunnel-hero"
 * (@daiwiikharihar) for the Stanza design system.
 *
 * Changes from the original:
 * - Driven by native page scroll (a tall section with a sticky 100svh stage)
 *   instead of capturing the wheel. The original called preventDefault on
 *   every wheel event, which trapped the page and did nothing on touch screens.
 * - Images, copy and actions come in as props, so the homepage and every brand
 *   page can fly through their own pieces.
 * - Brass / warm-black palette, serif type, next/image, product cut-outs on a
 *   matching backdrop.
 * - Reduced motion: no flight and no parallax; a still, composed spread of
 *   cards around the title instead.
 */

import Image from "next/image";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TunnelImage = {
    src: string;
    /** Card caption, e.g. the product name */
    title: string;
    /** Small label above the caption, e.g. the brand */
    label?: string;
    href?: string;
    /** "contain" for cut-out product shots, shown on `backdrop` */
    fit?: "cover" | "contain";
    backdrop?: string;
    position?: string;
};

type TunnelCardData = {
    item: TunnelImage;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
};

type Stage = { width: number; height: number; isMobile: boolean };

const SPRING = { stiffness: 60, damping: 25, mass: 0.5 };

function layoutCards(images: TunnelImage[]): TunnelCardData[] {
    return images.map((item, i) => {
        // Golden-angle spiral keeps neighbours apart around the title
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX: 0.3 + (i % 3) * 0.07,
            radiusFactorY: 0.27 + (i % 2) * 0.08,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4) * 1.5),
            index: i,
        };
    });
}

function useStage(): Stage {
    const [stage, setStage] = useState<Stage>({ width: 1440, height: 900, isMobile: false });
    useEffect(() => {
        const update = () =>
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return stage;
}

/** Pointer position in -1..1, springy. Off for touch and reduced motion. */
function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING);
    const y = useSpring(rawY, SPRING);

    useEffect(() => {
        if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

function CardFace({ item, sizes }: { item: TunnelImage; sizes: string }) {
    const contain = item.fit === "contain";
    return (
        <div
            className="group relative h-full w-full overflow-hidden bg-surface shadow-2xl shadow-black/70 ring-1 ring-foreground/15 transition-[box-shadow] duration-500 hover:ring-brass/70"
            style={contain && item.backdrop ? { backgroundColor: item.backdrop } : undefined}
        >
            <Image
                src={item.src}
                alt=""
                fill
                sizes={sizes}
                draggable={false}
                className={cn(
                    contain ? "object-contain p-[14%]" : "object-cover",
                    "transition-transform duration-[1400ms] ease-quiet group-hover:scale-[1.06]",
                )}
                style={item.position ? { objectPosition: item.position } : undefined}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 sm:p-5">
                {item.label && (
                    <span className="text-[0.5625rem] tracking-[0.26em] text-brass uppercase sm:text-[0.625rem]">
                        {item.label}
                    </span>
                )}
                <span className="mt-1 font-serif text-base leading-tight text-[#f6f1e8] sm:text-lg">{item.title}</span>
            </div>
        </div>
    );
}

function cardWidthFor(stage: Stage) {
    return stage.isMobile
        ? Math.max(120, Math.min(170, stage.width * 0.36))
        : Math.max(180, Math.min(260, stage.width * 0.17));
}

type TunnelCardProps = {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: Stage;
};

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    // Each card flies from far to near over a slice of the scroll; slices overlap
    const span = 0.5;
    const start = (card.index / Math.max(1, total - 1)) * (1 - span) * 0.92;
    const end = start + span;
    const local = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 380 : 520;
    const z = useTransform(local, [0, 1], [farZ, nearZ]);
    const opacity = useTransform(local, [0, 0.18, 0.8, 0.97], [0, 1, 1, 0]);

    const width = cardWidthFor(stage);
    const baseX = card.angleCos * stage.width * card.radiusFactorX;
    const baseY = card.angleSin * stage.height * card.radiusFactorY;
    const pan = stage.isMobile ? 18 : 45;

    const transform = useTransform([z, pointer.x, pointer.y], (values: number[]) => {
        const [currZ, px, py] = values;
        return `translate3d(calc(-50% + ${baseX - px * pan}px), calc(-50% + ${baseY - py * pan}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    });

    const face = <CardFace item={card.item} sizes={stage.isMobile ? "170px" : "260px"} />;

    return (
        <motion.div
            style={{ width, transform, opacity, zIndex: card.index + 1 }}
            className="absolute top-1/2 left-1/2 aspect-[4/5] select-none will-change-transform"
        >
            {/* Decorative for assistive tech and keyboard: the same links exist in the page content */}
            {card.item.href ? (
                <a href={card.item.href} tabIndex={-1} aria-hidden="true" className="pointer-events-auto block h-full w-full">
                    {face}
                </a>
            ) : (
                <div aria-hidden="true" className="h-full w-full">
                    {face}
                </div>
            )}
        </motion.div>
    );
}

/** Still layout for reduced motion: a few cards resting around the title. */
function StillCards({ cards, stage }: { cards: TunnelCardData[]; stage: Stage }) {
    const width = cardWidthFor(stage) * 0.8;
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {cards.slice(0, stage.isMobile ? 4 : 6).map((card) => (
                <div
                    key={card.index}
                    className="absolute top-1/2 left-1/2 aspect-[4/5] opacity-45"
                    style={{
                        width,
                        transform: `translate(calc(-50% + ${card.angleCos * stage.width * 0.38}px), calc(-50% + ${card.angleSin * stage.height * 0.36}px)) rotate(${card.rotationZ}deg)`,
                    }}
                >
                    <CardFace item={card.item} sizes="200px" />
                </div>
            ))}
        </div>
    );
}

export type PerspectiveTunnelHeroProps = {
    images: TunnelImage[];
    /** Small uppercase label above the title */
    eyebrow?: ReactNode;
    /** The page's h1 content; wrap the emphasised word in <em> */
    title: ReactNode;
    titleId?: string;
    description?: ReactNode;
    /** Buttons / links under the description */
    actions?: ReactNode;
    /** Anything under the actions, e.g. a brand row or stats */
    footer?: ReactNode;
    /** Content pinned to the top of the stage, e.g. a breadcrumb */
    topSlot?: ReactNode;
    /** Scroll distance of the flight, in viewport heights (default 2.6) */
    length?: number;
    /** Where the "Scroll" cue jumps to */
    skipTo?: string;
    className?: string;
};

export default function PerspectiveTunnelHero({
    images,
    eyebrow,
    title,
    titleId,
    description,
    actions,
    footer,
    topSlot,
    length = 2.6,
    skipTo,
    className,
}: PerspectiveTunnelHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion() ?? false;
    const stage = useStage();
    const cards = layoutCards(images);

    // 0 when the section top meets the viewport top, 1 when its bottom meets the viewport bottom
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });
    const pointer = useCameraParallax(!reduce);

    // Title starts fully legible (it is the page's h1), then recedes toward the viewer
    const titleScale = useTransform(progress, [0, 1], [1, 1.22]);
    const titleOpacity = useTransform(progress, [0, 0.62, 0.86], [1, 1, 0]);
    const titleBlur = useTransform(progress, [0.6, 0.86], ["blur(0px)", "blur(6px)"]);
    const cueOpacity = useTransform(progress, [0, 0.08], [1, 0]);
    const ringScale = useTransform(progress, [0, 1], [1, 1.9]);
    const ringOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.6, 0]);
    const stageFade = useTransform(progress, [0.9, 1], [1, 0.35]);

    return (
        <section
            ref={sectionRef}
            aria-labelledby={titleId}
            className={cn("relative", className)}
            style={{ height: reduce ? "100svh" : `${Math.round(length * 100)}svh` }}
        >
            <motion.div
                style={{ opacity: reduce ? 1 : stageFade }}
                className="sticky top-0 flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-background"
            >
                {/* Perspective lives on this inner wrapper so the sticky parent stays flat */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
                >
                    {/* Warm dot grid and brass glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(201_169_110/0.22)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(201_169_110/0.14)_0%,transparent_65%)]"
                    />

                    {/* Depth rings */}
                    <motion.div
                        aria-hidden="true"
                        style={{ scale: reduce ? 1 : ringScale, opacity: reduce ? 1 : ringOpacity }}
                        className="pointer-events-none absolute flex items-center justify-center"
                    >
                        <div className="absolute h-[50vmin] w-[50vmin] rounded-full border border-brass/20" />
                        <div className="absolute h-[78vmin] w-[78vmin] rounded-full border border-dashed border-foreground/10" />
                    </motion.div>

                    {/* Cards */}
                    {reduce ? (
                        <StillCards cards={cards} stage={stage} />
                    ) : (
                        <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                            {cards.map((card) => (
                                <TunnelCard
                                    key={card.item.src + card.index}
                                    card={card}
                                    progress={progress}
                                    pointer={pointer}
                                    total={cards.length}
                                    stage={stage}
                                />
                            ))}
                        </div>
                    )}

                    {/* Anchor typography */}
                    <motion.div
                        style={reduce ? undefined : { scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
                        className="relative z-0 flex max-w-4xl flex-col items-center px-5 text-center"
                    >
                        {/* Soft pool of darkness keeps the copy above 4.5:1 when cards pass behind it */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 bg-[radial-gradient(ellipse_at_center,var(--background)_35%,transparent_72%)]"
                        />
                        {eyebrow && (
                            <div className="fade-in-load">
                                <p className="eyebrow">{eyebrow}</p>
                            </div>
                        )}
                        <div className="fade-in-load" style={{ animationDelay: "0.12s" }}>
                            <h1
                                id={titleId}
                                className="display mt-5 text-[2.75rem] leading-[0.95] sm:mt-6 sm:text-7xl lg:text-[6.25rem]"
                            >
                                {title}
                            </h1>
                        </div>
                        {description && (
                            <div className="fade-in-load" style={{ animationDelay: "0.24s" }}>
                                <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-foreground/85 sm:mt-7 sm:text-lg">
                                    {description}
                                </p>
                            </div>
                        )}
                        {actions && (
                            <div
                                className="fade-in-load mt-8 flex w-full flex-col justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4 [&>*]:h-12 sm:[&>*]:h-14"
                                style={{ animationDelay: "0.36s" }}
                            >
                                {actions}
                            </div>
                        )}
                        {footer && (
                            <div className="fade-in-load" style={{ animationDelay: "0.5s" }}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>

                {topSlot && <div className="absolute inset-x-0 top-[88px] z-10">{topSlot}</div>}

                {/* Scroll cue */}
                <motion.a
                    href={skipTo ?? "#main-content"}
                    style={{ opacity: reduce ? 1 : cueOpacity }}
                    className="absolute bottom-6 z-10 flex flex-col items-center gap-3 text-[0.625rem] tracking-[0.3em] text-muted-foreground uppercase"
                >
                    <span>Scroll to explore</span>
                    <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line">
                        <span className="absolute inset-x-0 top-0 h-1/2 bg-brass motion-safe:animate-[scroll-cue_2.4s_var(--ease-quiet)_infinite]" />
                    </span>
                </motion.a>
            </motion.div>
        </section>
    );
}
