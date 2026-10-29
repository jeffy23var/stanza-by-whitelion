"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const WORDS = ["Intelligence", "Surfaces", "Air", "Arrival", "Whitelion", "PARÉ", "LUFT", "LMT"];

function Run() {
    return (
        <span className="flex shrink-0 items-center">
            {WORDS.map((w) => (
                <span key={w} className="flex items-center">
                    <span className={cn("px-8 sm:px-12", ["Intelligence", "Surfaces", "Air", "Arrival"].includes(w) && "italic")}>
                        {w}
                    </span>
                    <span aria-hidden="true" className="text-brass">
                        ·
                    </span>
                </span>
            ))}
        </span>
    );
}

export default function Marquee() {
    const [paused, setPaused] = useState(false);

    return (
        <section aria-label="Our disciplines and brands" className="relative border-y border-line py-10 sm:py-14">
            <p className="sr-only">Intelligence, Surfaces, Air, Arrival — Whitelion, PARÉ, LUFT, LMT.</p>
            <div aria-hidden="true" className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                <div
                    className="flex w-max font-serif text-5xl text-foreground/90 motion-safe:animate-[marquee_60s_linear_infinite] sm:text-7xl lg:text-8xl"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                >
                    <Run />
                    <Run />
                </div>
            </div>
            <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                className="absolute right-3 bottom-2 inline-flex min-h-11 items-center px-2 text-[0.625rem] tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-foreground motion-reduce:hidden sm:right-8 lg:right-12"
            >
                {paused ? "Play" : "Pause"}
                <span className="sr-only"> scrolling text</span>
            </button>
        </section>
    );
}
