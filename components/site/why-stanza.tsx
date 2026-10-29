import SectionHeading from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { REASONS } from "@/lib/site-content";

export default function WhyStanza() {
    return (
        <section id="why" aria-labelledby="why-title" className="scroll-mt-[72px] py-28 sm:py-36 lg:py-44">
            <div className="container-x">
                <SectionHeading id="why-title" eyebrow="Why Stanza">
                    A single, <em>considered</em> partner.
                </SectionHeading>
                <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:mt-24">
                    {REASONS.map((r, i) => (
                        <li key={r.title}>
                            <Reveal delay={i * 0.1} className="border-t border-line pt-8">
                                <span aria-hidden="true" className="font-serif text-3xl text-brass italic">
                                    {r.numeral}
                                </span>
                                <h3 className="display mt-6 text-3xl">{r.title}</h3>
                                <p className="mt-4 leading-[1.75] text-muted-foreground">{r.body}</p>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
