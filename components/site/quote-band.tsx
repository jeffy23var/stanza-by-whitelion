import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { QUOTE_IMAGE } from "@/lib/site-content";

export default function QuoteBand() {
    return (
        <section aria-label="The Stanza philosophy" className="relative isolate overflow-hidden py-36 sm:py-48 lg:py-60">
            <Image
                src={QUOTE_IMAGE.src}
                alt={QUOTE_IMAGE.alt}
                fill
                sizes="100vw"
                className="-z-20 object-cover"
                style={{ objectPosition: QUOTE_IMAGE.position }}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/80" />
            <div className="container-x">
                <Reveal>
                    <figure className="mx-auto max-w-4xl text-center">
                        <blockquote className="font-serif text-[2.25rem] leading-[1.12] text-balance italic sm:text-5xl lg:text-[4rem]">
                            <p>“Luxury is in the details you feel before you notice them.”</p>
                        </blockquote>
                        <figcaption className="eyebrow mt-10 justify-center">The Stanza philosophy</figcaption>
                    </figure>
                </Reveal>
            </div>
        </section>
    );
}
