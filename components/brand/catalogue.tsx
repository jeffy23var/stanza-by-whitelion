"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import FramedImage from "@/components/site/framed-image";
import { requestEnquiry } from "@/components/site/enquiry-form";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/brand-content";

const ALL = "All";

type CatalogueProps = {
    brandName: string;
    enquiryName: string;
    categories: string[];
    products: Product[];
};

export default function Catalogue({ brandName, enquiryName, categories, products }: CatalogueProps) {
    const [active, setActive] = useState(ALL);
    const shown = active === ALL ? products : products.filter((p) => p.category === active);
    const counts = Object.fromEntries(categories.map((c) => [c, products.filter((p) => p.category === c).length]));

    return (
        <div>
            <div
                role="group"
                aria-label={`Filter ${brandName} pieces by category`}
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            >
                {[ALL, ...categories].map((c) => {
                    const on = active === c;
                    return (
                        <button
                            key={c}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setActive(c)}
                            className={cn(
                                "inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-[0.75rem] tracking-[0.12em] uppercase transition-colors duration-300",
                                on
                                    ? "border-brass bg-brass text-background"
                                    : "border-line text-foreground/80 hover:border-brass/60 hover:text-foreground",
                            )}
                        >
                            {c}
                            <span className={cn("tabular-nums", on ? "text-background/70" : "text-muted-foreground")}>
                                {c === ALL ? products.length : counts[c]}
                            </span>
                        </button>
                    );
                })}
            </div>

            <p aria-live="polite" className="sr-only">
                Showing {shown.length} {active === ALL ? "" : active} pieces
            </p>

            <motion.ul layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout" initial={false}>
                    {shown.map((p) => (
                        <motion.li
                            key={p.name}
                            layout
                            initial={{ opacity: 0, z: -120, scale: 0.94, transformPerspective: 1200 }}
                            animate={{ opacity: 1, z: 0, scale: 1, transformPerspective: 1200 }}
                            exit={{ opacity: 0, z: -120, scale: 0.94, transformPerspective: 1200 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex flex-col"
                        >
                            <FramedImage
                                image={p.image}
                                zoom
                                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                                className="aspect-[4/5]"
                            />
                            <p className="mt-5 text-[0.6875rem] tracking-[0.22em] text-brass uppercase">{p.category}</p>
                            <h3 className="mt-2 font-serif text-2xl leading-tight">{p.name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.spec}</p>
                            <button
                                type="button"
                                onClick={() => requestEnquiry({ brand: enquiryName, product: p.name })}
                                className="mt-4 inline-flex min-h-11 items-center gap-2 self-start border-b border-brass/40 text-[0.75rem] font-medium tracking-[0.16em] text-brass uppercase transition-colors hover:border-brass"
                            >
                                Enquire
                                <span className="sr-only"> about {p.name}</span>
                                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </div>
    );
}
