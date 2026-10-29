import SectionHeading from "@/components/site/section-heading";
import Stats from "@/components/site/stats";
import { Reveal } from "@/components/site/reveal";

export default function Intro() {
    return (
        <section id="about" aria-labelledby="about-title" className="scroll-mt-[72px] py-28 sm:py-36 lg:py-44">
            <div className="container-x">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                    <SectionHeading id="about-title" eyebrow="Stanza by Whitelion" className="lg:col-span-6">
                        From the ceiling to the <em>gate</em>.
                    </SectionHeading>
                    <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-14">
                        <p className="text-lg leading-[1.75] text-foreground/85">
                            A stanza is a room in verse — a complete, composed space. We bring that idea to architecture:
                            one trusted partner for the surfaces you see, the air you feel, the controls you touch and the
                            entrances you pass through. For homeowners, architects, designers and developers alike.
                        </p>
                    </Reveal>
                </div>
                <div className="mt-20 lg:mt-28">
                    <Stats />
                </div>
            </div>
        </section>
    );
}
