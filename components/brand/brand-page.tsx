import Image from "next/image";
import Link from "next/link";
import Catalogue from "@/components/brand/catalogue";
import { primaryCta, secondaryCta } from "@/components/site/hero";
import Enquire from "@/components/site/enquire";
import { Reveal } from "@/components/site/reveal";
import SectionHeading from "@/components/site/section-heading";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { BRAND_ORDER, BRANDS, brandTunnel, type BrandId } from "@/lib/brand-content";
import { cn } from "@/lib/utils";

export default function BrandPage({ id }: { id: BrandId }) {
    const brand = BRANDS[id];
    const others = BRAND_ORDER.filter((b) => b !== id).map((b) => BRANDS[b]);

    return (
        <main id="main" tabIndex={-1} className="focus:outline-none">
            <PerspectiveTunnelHero
                images={brandTunnel(brand, 10)}
                titleId="brand-title"
                length={2.2}
                skipTo="#detail"
                topSlot={
                    <nav aria-label="Breadcrumb" className="container-x">
                        <ol className="flex items-center gap-3 text-[0.75rem] tracking-[0.16em] text-muted-foreground uppercase">
                            <li>
                                <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
                                    Stanza
                                </Link>
                            </li>
                            <li aria-hidden="true" className="text-brass">
                                /
                            </li>
                            <li aria-current="page" className="text-foreground/85">
                                {brand.name}
                            </li>
                        </ol>
                    </nav>
                }
                eyebrow={`${brand.domain} — authorised distributor`}
                title={brand.shortName}
                description={
                    <>
                        <span className="block font-serif text-2xl text-foreground italic sm:text-3xl">{brand.tagline}</span>
                        <span className="mt-5 hidden sm:block">{brand.description}</span>
                    </>
                }
                actions={
                    <>
                        <a href="#catalogue" className={primaryCta}>
                            View the collection
                            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                                →
                            </span>
                        </a>
                        <a href="#enquire" className={secondaryCta}>
                            Enquire
                        </a>
                    </>
                }
                footer={
                    <dl className="mt-7 flex justify-center gap-12 sm:mt-10">
                        {[
                            { v: brand.products.length, l: "Pieces" },
                            { v: brand.categories.length, l: "Categories" },
                        ].map((s) => (
                            <div key={s.l} className="flex flex-col items-center">
                                <dt className="order-last text-[0.6875rem] tracking-[0.22em] text-muted-foreground uppercase">{s.l}</dt>
                                <dd className="font-serif text-4xl leading-none sm:text-5xl text-brass lining-nums tabular-nums">
                                    {String(s.v).padStart(2, "0")}
                                </dd>
                            </div>
                        ))}
                    </dl>
                }
            />

            {/* In detail */}
            <section id="detail" aria-labelledby="detail-title" className="scroll-mt-[72px] py-28 sm:py-36">
                <div className="container-x">
                    <SectionHeading id="detail-title" eyebrow="The collection">
                        {brand.detailHeading}, <em>in detail</em>.
                    </SectionHeading>
                    {/* Phones skip this paragraph in the hero to keep it to one screen */}
                    <p className="mt-8 max-w-2xl text-lg leading-[1.75] text-foreground/85 sm:hidden">{brand.description}</p>
                    <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:mt-20">
                        {brand.features.map((f, i) => (
                            <li key={f.title}>
                                <Reveal delay={i * 0.1} className="border-t border-line pt-8">
                                    <span aria-hidden="true" className="font-serif text-3xl text-brass italic">
                                        {["i.", "ii.", "iii."][i]}
                                    </span>
                                    <h3 className="display mt-6 text-3xl">{f.title}</h3>
                                    <p className="mt-4 leading-[1.75] text-muted-foreground">{f.body}</p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Catalogue */}
            <section
                id="catalogue"
                aria-labelledby="catalogue-title"
                className="scroll-mt-[72px] border-t border-line py-28 sm:py-36"
            >
                <div className="container-x">
                    <SectionHeading id="catalogue-title" eyebrow={`${brand.products.length} pieces`}>
                        Browse the <em>pieces</em>.
                    </SectionHeading>
                    <div className="mt-14">
                        <Catalogue
                            brandName={brand.name}
                            enquiryName={brand.enquiryName}
                            categories={brand.categories}
                            products={brand.products}
                        />
                    </div>
                </div>
            </section>

            {/* Continue to */}
            <section aria-labelledby="continue-title" className="border-t border-line py-24 sm:py-32">
                <div className="container-x">
                    <h2 id="continue-title" className="eyebrow">
                        Continue to
                    </h2>
                    <ul className="mt-10 grid gap-6 md:grid-cols-3">
                        {others.map((b, i) => (
                            <li key={b.id}>
                                <Reveal delay={i * 0.08}>
                                    <Link href={b.href} className="group relative isolate block aspect-[4/5] overflow-hidden bg-surface md:aspect-[3/4]">
                                        <Image
                                            src={b.tile.src}
                                            alt=""
                                            fill
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                            className={cn(
                                                "-z-20 transition-transform duration-[1600ms] ease-quiet motion-safe:group-hover:scale-[1.06]",
                                                b.tile.fit === "contain" ? "object-contain p-[18%]" : "object-cover",
                                            )}
                                            style={{
                                                objectPosition: b.tile.position,
                                                backgroundColor: b.tile.fit === "contain" ? b.tile.backdrop : undefined,
                                            }}
                                        />
                                        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-7">
                                            <p className="text-[0.6875rem] tracking-[0.22em] text-brass uppercase">{b.domain}</p>
                                            <p className="mt-2 flex items-baseline justify-between font-serif text-4xl">
                                                {b.shortName}
                                                <span aria-hidden="true" className="text-2xl text-brass transition-transform duration-500 group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </Reveal>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Enquire defaultBrand={brand.enquiryName} />
        </main>
    );
}
