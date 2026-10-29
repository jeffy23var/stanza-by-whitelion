"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site-content";

function format(n: number, pad: number, suffix: string) {
    return String(Math.round(n)).padStart(pad, "0") + suffix;
}

function Stat({ value, pad, suffix, label }: (typeof STATS)[number]) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, value, {
            duration: value > 50 ? 2 : 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: setShown,
        });
        return () => controls.stop();
    }, [inView, reduce, value]);

    return (
        <div ref={ref} className="flex flex-col border-t border-line pt-6">
            <dt className="order-last text-[0.75rem] tracking-[0.2em] text-muted-foreground uppercase">{label}</dt>
            <dd className="mb-4 font-serif text-6xl leading-none text-brass lining-nums tabular-nums lg:text-7xl">
                {/* Screen readers get the final number; the counting one is visual only */}
                <span className="sr-only">{format(value, pad, suffix)}</span>
                <span aria-hidden="true">{format(reduce ? value : shown, pad, suffix)}</span>
            </dd>
        </div>
    );
}

export default function Stats() {
    return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {STATS.map((s) => (
                <Stat key={s.label} {...s} />
            ))}
        </dl>
    );
}
