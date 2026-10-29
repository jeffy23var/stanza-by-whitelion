"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/site/logo";
import { cn } from "@/lib/utils";
import { CONTACT, NAV } from "@/lib/site-content";

export default function SiteHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Drawer: lock page scroll, close on Escape, keep Tab focus inside
    useEffect(() => {
        if (!open) return;
        const drawer = drawerRef.current;
        const toggle = toggleRef.current;
        document.body.style.overflow = "hidden";
        drawer?.querySelector<HTMLElement>("a, button")?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }
            if (e.key !== "Tab" || !drawer) return;
            const items = Array.from(drawer.querySelectorAll<HTMLElement>("a, button"));
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
            toggle?.focus();
        };
    }, [open]);

    // Close the drawer if the viewport grows past the mobile breakpoint
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const onChange = () => mq.matches && setOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
                // No backdrop-filter while open: it would make the header the containing block for the fixed drawer
                open
                    ? "border-line bg-background"
                    : scrolled
                      ? "border-line bg-background/90 backdrop-blur-md"
                      : "border-transparent bg-gradient-to-b from-background/70 to-transparent",
            )}
        >
            <div className="container-x flex h-[72px] items-center justify-between gap-6">
                <Link href="/" aria-label="Stanza by Whitelion, home" className="rounded-sm">
                    <Logo />
                </Link>

                <nav aria-label="Brands" className="hidden md:block">
                    <ul className="flex items-center gap-8 lg:gap-10">
                        {NAV.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "relative py-2 text-[0.8125rem] tracking-[0.08em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-brass after:transition-transform after:duration-500 hover:text-foreground hover:after:scale-x-100",
                                            active ? "text-foreground after:scale-x-100" : "text-foreground/85 after:scale-x-0",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <a
                                href="#enquire"
                                className="inline-flex h-10 items-center border border-brass/70 px-5 text-[0.75rem] font-medium tracking-[0.18em] text-brass uppercase transition-colors duration-300 hover:bg-brass hover:text-background"
                            >
                                Enquire
                            </a>
                        </li>
                    </ul>
                </nav>

                <button
                    ref={toggleRef}
                    type="button"
                    className="-mr-2 inline-flex size-11 items-center justify-center md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-drawer"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span aria-hidden="true" className="relative block h-3 w-6">
                        <span
                            className={cn(
                                "absolute left-0 h-px w-6 bg-foreground transition-transform duration-300",
                                open ? "top-1.5 rotate-45" : "top-0",
                            )}
                        />
                        <span
                            className={cn(
                                "absolute left-0 h-px w-6 bg-foreground transition-transform duration-300",
                                open ? "top-1.5 -rotate-45" : "top-3",
                            )}
                        />
                    </span>
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={drawerRef}
                        id="mobile-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-background md:hidden"
                    >
                        <nav aria-label="Brands" className="container-x flex min-h-full flex-col py-10">
                            <ul className="border-t border-line">
                                <li className="border-b border-line">
                                    <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                                        <span className="font-serif text-4xl">Home</span>
                                        <span className="text-xs tracking-[0.2em] text-brass">00</span>
                                    </Link>
                                </li>
                                {NAV.map((item, i) => (
                                    <li key={item.href} className="border-b border-line">
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            aria-current={pathname === item.href ? "page" : undefined}
                                            className="flex items-baseline justify-between py-5"
                                        >
                                            <span className="font-serif text-4xl">{item.label}</span>
                                            <span className="text-xs tracking-[0.2em] text-brass">0{i + 1}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#enquire"
                                onClick={() => setOpen(false)}
                                className="mt-10 inline-flex h-14 items-center justify-center bg-brass text-[0.8125rem] font-medium tracking-[0.18em] text-background uppercase"
                            >
                                Enquire
                            </a>
                            <a href={CONTACT.phoneHref} className="mt-auto pt-10 text-sm text-muted-foreground">
                                Call {CONTACT.phoneDisplay}
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
