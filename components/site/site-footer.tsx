import Link from "next/link";
import Logo from "@/components/site/logo";
import { COLLECTIONS, CONTACT } from "@/lib/site-content";

const STUDIO = [
    { label: "Collections", href: "/#collections" },
    { label: "Featured pieces", href: "/#featured" },
    { label: "Why Stanza", href: "/#why" },
    { label: "Book a consultation", href: "#enquire" },
];

const linkClass = "inline-flex min-h-10 items-center text-foreground/80 transition-colors hover:text-brass";

export default function SiteFooter() {
    return (
        <footer className="border-t border-line pt-20 pb-10 sm:pt-28">
            <div className="container-x">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                        <Link href="/" aria-label="Stanza by Whitelion, home" className="inline-block">
                            <Logo />
                        </Link>
                        <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-foreground/85 italic">
                            Four distinguished brands. One partner for the entire space.
                        </p>
                    </div>

                    <nav aria-labelledby="footer-brands" className="lg:col-span-2 lg:col-start-6">
                        <h2 id="footer-brands" className="eyebrow">
                            Brands
                        </h2>
                        <ul className="mt-6 space-y-1">
                            {COLLECTIONS.map((c) => (
                                <li key={c.id}>
                                    <Link href={c.href} className={linkClass}>
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-labelledby="footer-studio" className="lg:col-span-2">
                        <h2 id="footer-studio" className="eyebrow">
                            Studio
                        </h2>
                        <ul className="mt-6 space-y-1">
                            {STUDIO.map((s) => (
                                <li key={s.href}>
                                    <a href={s.href} className={linkClass}>
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="lg:col-span-3">
                        <h2 className="eyebrow">Visit</h2>
                        <address className="mt-6 space-y-4 not-italic">
                            <a href={CONTACT.phoneHref} className={linkClass}>
                                {CONTACT.phoneDisplay}
                            </a>
                            <a
                                href={CONTACT.mapsHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block leading-relaxed text-foreground/80 transition-colors hover:text-brass"
                            >
                                {CONTACT.addressLines.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                                <span className="mt-2 inline-block text-[0.75rem] tracking-[0.18em] text-brass uppercase">
                                    Open in Google Maps
                                    <span className="sr-only"> (opens in a new tab)</span> ↗
                                </span>
                            </a>
                        </address>
                    </div>
                </div>

                <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:justify-between sm:gap-10">
                    <p className="shrink-0">© Stanza by Whitelion. Authorised distributor.</p>
                    <p className="max-w-2xl sm:text-right">
                        Whitelion, AirQube, PARÉ, LUFT and LMT Automation names, marks and product images belong to their
                        respective owners. Specifications are subject to change.
                    </p>
                </div>
            </div>
        </footer>
    );
}
