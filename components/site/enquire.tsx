import EnquiryForm from "@/components/site/enquiry-form";
import SectionHeading from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CONTACT } from "@/lib/site-content";

export default function Enquire({ defaultBrand }: { defaultBrand?: string }) {
    return (
        <section
            id="enquire"
            aria-labelledby="enquire-title"
            className="scroll-mt-[72px] border-t border-line bg-surface py-28 sm:py-36 lg:py-44"
        >
            <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                    <SectionHeading id="enquire-title" eyebrow="Private consultation">
                        Let us shape your <em>space</em>.
                    </SectionHeading>
                    <Reveal delay={0.1}>
                        <p className="mt-8 max-w-md text-lg leading-[1.75] text-foreground/85">
                            Tell us about your home or project. Our specialists will respond with recommendations,
                            finishes and a tailored quote across all four brands.
                        </p>
                        <p className="mt-10 text-sm text-muted-foreground">
                            Prefer to talk?{" "}
                            <a
                                href={CONTACT.phoneHref}
                                className="text-brass underline decoration-brass/40 underline-offset-4 hover:decoration-brass"
                            >
                                {CONTACT.phoneDisplay}
                            </a>
                        </p>
                    </Reveal>
                </div>
                <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
                    <EnquiryForm defaultBrand={defaultBrand} />
                </Reveal>
            </div>
        </section>
    );
}
