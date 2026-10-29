"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import FramedImage from "@/components/site/framed-image";
import SectionHeading from "@/components/site/section-heading";
import { FEATURED } from "@/lib/site-content";

function ArrowButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={dir === "prev" ? "Previous pieces" : "Next pieces"}
            aria-controls="featured-track"
            className="inline-flex size-12 items-center justify-center border border-line text-lg transition-colors duration-300 enabled:hover:border-brass enabled:hover:text-brass disabled:opacity-35"
        >
            <span aria-hidden="true">{dir === "prev" ? "←" : "→"}</span>
        </button>
    );
}

export default function Featured() {
    const trackRef = useRef<HTMLUListElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [update]);

    const page = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector("li");
        const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollBy({ left: dir * step * Math.max(1, Math.floor(el.clientWidth / step)), behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <section id="featured" aria-labelledby="featured-title" className="scroll-mt-[72px] py-28 sm:py-36 lg:py-44">
            <div className="container-x flex flex-wrap items-end justify-between gap-8">
                <SectionHeading id="featured-title" eyebrow="Featured pieces">
                    Selected from the <em>collections</em>.
                </SectionHeading>
                <div className="flex gap-3">
                    <ArrowButton dir="prev" disabled={atStart} onClick={() => page(-1)} />
                    <ArrowButton dir="next" disabled={atEnd} onClick={() => page(1)} />
                </div>
            </div>

            <ul
                id="featured-track"
                ref={trackRef}
                aria-label="Featured pieces"
                className="relative mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-6 [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent] sm:scroll-px-8 sm:px-8 lg:mt-20 lg:scroll-px-12 lg:px-12 xl:scroll-px-[max(3rem,calc((100vw-1320px)/2+3rem))] xl:px-[max(3rem,calc((100vw-1320px)/2+3rem))]"
            >
                {FEATURED.map((piece, i) => (
                    <li key={piece.name} className="w-[78%] max-w-[340px] shrink-0 snap-start sm:w-[44%] lg:w-[30%] xl:w-[300px]">
                        <Link href={piece.href} className="group relative block">
                            <FramedImage
                                image={piece.image}
                                zoom
                                sizes="(min-width: 1024px) 340px, (min-width: 640px) 44vw, 78vw"
                                className="aspect-[4/5]"
                            />
                            <p className="mt-5 text-[0.6875rem] tracking-[0.22em] text-brass uppercase">{piece.brand}</p>
                            <p className="mt-2 font-serif text-2xl leading-tight">{piece.name}</p>
                            <span className="sr-only">
                                , piece {i + 1} of {FEATURED.length}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
