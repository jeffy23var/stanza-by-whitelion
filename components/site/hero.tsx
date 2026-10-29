import Link from "next/link";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { HOME_TUNNEL } from "@/lib/brand-content";
import { NAV } from "@/lib/site-content";

export const primaryCta =
    "group inline-flex h-14 items-center justify-center gap-3 bg-brass px-8 text-[0.8125rem] font-medium tracking-[0.16em] text-background uppercase transition-colors duration-300 hover:bg-foreground";
export const secondaryCta =
    "inline-flex h-14 items-center justify-center border border-foreground/40 bg-background/40 px-8 text-[0.8125rem] font-medium tracking-[0.16em] uppercase backdrop-blur-sm transition-colors duration-300 hover:border-foreground hover:bg-foreground/5";

export default function Hero() {
    return (
        <PerspectiveTunnelHero
            images={HOME_TUNNEL}
            titleId="hero-title"
            eyebrow="Authorised distributor"
            title={
                <>
                    The art of the <em>complete</em> space.
                </>
            }
            description="Stanza by Whitelion curates four distinguished brands — Whitelion intelligence, PARÉ surfaces, LUFT air and LMT automation — so every touch, plane, breeze and arrival is considered."
            actions={
                <>
                    <a href="#collections" className={primaryCta}>
                        Explore the collections
                        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                    <a href="#enquire" className={secondaryCta}>
                        Book a consultation
                    </a>
                </>
            }
            footer={
                <nav aria-label="Our brands" className="mt-5 sm:mt-10">
                    <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.75rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {NAV.map((item, i) => (
                            <li key={item.href} className="flex items-center gap-3">
                                {i > 0 && (
                                    <span aria-hidden="true" className="text-brass">
                                        ·
                                    </span>
                                )}
                                <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            }
            skipTo="#about"
        />
    );
}
