import Link from "next/link";
import FramedImage from "@/components/site/framed-image";
import SectionHeading from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import { COLLECTIONS } from "@/lib/site-content";

export default function Collections() {
    return (
        <section
            id="collections"
            aria-labelledby="collections-title"
            className="scroll-mt-[72px] border-t border-line py-28 sm:py-36 lg:py-44"
        >
            <div className="container-x">
                <SectionHeading id="collections-title" eyebrow="The collections">
                    Four houses, <em>one</em> language.
                </SectionHeading>

                <ol className="mt-20 space-y-24 sm:space-y-32 lg:mt-28 lg:space-y-40">
                    {COLLECTIONS.map((c, i) => {
                        const flip = i % 2 === 1;
                        return (
                            <li key={c.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
                                <Reveal className={cn("lg:col-span-7", flip && "lg:order-last lg:col-start-6")}>
                                    <Link
                                        href={c.href}
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        className="group block"
                                    >
                                        <FramedImage
                                            image={c.image}
                                            zoom
                                            sizes="(min-width: 1320px) 740px, (min-width: 1024px) 56vw, 100vw"
                                            className="aspect-[4/3] lg:aspect-[5/4]"
                                        />
                                    </Link>
                                </Reveal>

                                <Reveal
                                    delay={0.1}
                                    className={cn("lg:col-span-4", flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9")}
                                >
                                    <p className="flex items-center gap-4 text-[0.75rem] tracking-[0.22em] text-muted-foreground uppercase">
                                        <span className="font-serif text-xl tracking-normal text-brass">{c.number}</span>
                                        <span aria-hidden="true" className="h-px w-8 bg-line" />
                                        {c.domain}
                                    </p>
                                    <h3 className="display mt-6 text-4xl sm:text-5xl">{c.name}</h3>
                                    <p className="mt-4 font-serif text-2xl leading-snug text-foreground/90 italic">
                                        {c.tagline}
                                    </p>
                                    <p className="mt-6 leading-[1.75] text-muted-foreground">{c.description}</p>

                                    <ul aria-label={`${c.shortName} categories`} className="mt-8 flex flex-wrap gap-2">
                                        {c.chips.map((chip) => (
                                            <li
                                                key={chip}
                                                className="border border-line px-3 py-1.5 text-[0.75rem] leading-snug text-foreground/80"
                                            >
                                                {chip}
                                            </li>
                                        ))}
                                        {c.more && (
                                            <li className="px-3 py-1.5 text-[0.75rem] leading-snug text-brass">
                                                +{c.more} more
                                            </li>
                                        )}
                                    </ul>

                                    <Link
                                        href={c.href}
                                        className="group mt-10 inline-flex min-h-11 items-center gap-3 border-b border-brass/50 pb-1 text-[0.8125rem] font-medium tracking-[0.14em] text-brass uppercase transition-colors hover:border-brass"
                                    >
                                        Discover {c.shortName}
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-500 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </Reveal>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
