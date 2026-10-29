"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CONTACT, ENQUIRY_BRANDS, ENQUIRY_ROLES } from "@/lib/site-content";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
    "mt-2 block w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] focus:border-brass focus:shadow-[0_1px_0_0_var(--brass)] focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-destructive";

// Transparent like the text fields; the open list gets a dark background so its options stay readable
const selectClass =
    "cursor-pointer appearance-none bg-[length:12px] bg-[right_2px_center] bg-no-repeat pr-6 [background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' fill='none' stroke='%23c9a96e' stroke-width='1.2'/%3E%3C/svg%3E\")] [&_option]:bg-surface [&_option]:text-foreground";

function Field({
    label,
    hint,
    error,
    className,
    children,
}: {
    label: string;
    hint?: string;
    error?: string;
    className?: string;
    children: (ids: { id: string; describedBy?: string }) => ReactNode;
}) {
    const id = useId();
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
        <div className={className}>
            <label htmlFor={id} className="text-[0.75rem] tracking-[0.18em] text-muted-foreground uppercase">
                {label}
            </label>
            {children({ id, describedBy })}
            {hint && (
                <p id={hintId} className="mt-2 text-xs text-muted-foreground">
                    {hint}
                </p>
            )}
            {error && (
                <p id={errorId} className="mt-2 text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

/** Fired by "Enquire" buttons on product cards to pre-fill the form. */
export const ENQUIRE_EVENT = "stanza:enquire";
export type EnquireDetail = { brand?: string; product?: string };

export function requestEnquiry(detail: EnquireDetail) {
    window.dispatchEvent(new CustomEvent<EnquireDetail>(ENQUIRE_EVENT, { detail }));
}

export default function EnquiryForm({ defaultBrand = ENQUIRY_BRANDS[0] }: { defaultBrand?: string }) {
    const formRef = useRef<HTMLFormElement>(null);
    const thanksRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const onEnquire = (e: Event) => {
            const { brand, product } = (e as CustomEvent<EnquireDetail>).detail ?? {};
            const form = formRef.current;
            if (!form) return;
            const brandSelect = form.elements.namedItem("brand") as HTMLSelectElement | null;
            const productInput = form.elements.namedItem("product") as HTMLInputElement | null;
            if (brand && brandSelect) brandSelect.value = brand;
            if (product && productInput) productInput.value = product;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            document.getElementById("enquire")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
            // Focus the name field once the scroll has settled, without jumping
            window.setTimeout(() => form.querySelector<HTMLElement>('[name="name"]')?.focus({ preventScroll: true }), reduce ? 0 : 700);
        };
        window.addEventListener(ENQUIRE_EVENT, onEnquire);
        return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
    }, []);

    const validate = (data: FormData) => {
        const next: Record<string, string> = {};
        if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
        const phone = String(data.get("phone") ?? "").replace(/[\s()-]/g, "");
        if (!/^\+?\d{10,13}$/.test(phone)) next.phone = "Please enter a phone or WhatsApp number, e.g. 98765 43210.";
        const email = String(data.get("email") ?? "").trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please check your email address.";
        return next;
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const found = validate(data);
        setErrors(found);
        if (Object.keys(found).length) {
            form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/__forms.html", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus("sent");
            requestAnimationFrame(() => thanksRef.current?.focus());
        } catch {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
                <motion.div
                    key="thanks"
                    ref={thanksRef}
                    tabIndex={-1}
                    role="status"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="border-t border-line pt-12 focus:outline-none"
                >
                    <p className="display text-5xl sm:text-6xl">
                        Thank <em className="text-brass">you</em>.
                    </p>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                        Your enquiry has reached our team — we&apos;ll be in touch shortly.
                    </p>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    ref={formRef}
                    name="enquiry"
                    method="POST"
                    noValidate
                    onSubmit={onSubmit}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
                >
                    <input type="hidden" name="form-name" value="enquiry" />
                    <div hidden aria-hidden="true">
                        <label>
                            Leave this field empty
                            <input name="bot-field" tabIndex={-1} autoComplete="off" />
                        </label>
                    </div>

                    <Field label="Full name" error={errors.name}>
                        {({ id, describedBy }) => (
                            <input
                                id={id}
                                name="name"
                                autoComplete="name"
                                required
                                aria-invalid={!!errors.name}
                                aria-describedby={describedBy}
                                className={fieldClass}
                            />
                        )}
                    </Field>
                    <Field label="Phone / WhatsApp" error={errors.phone}>
                        {({ id, describedBy }) => (
                            <input
                                id={id}
                                name="phone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                required
                                aria-invalid={!!errors.phone}
                                aria-describedby={describedBy}
                                className={fieldClass}
                            />
                        )}
                    </Field>
                    <Field label="Email (optional)" error={errors.email}>
                        {({ id, describedBy }) => (
                            <input
                                id={id}
                                name="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={describedBy}
                                className={fieldClass}
                            />
                        )}
                    </Field>
                    <Field label="City">
                        {({ id }) => (
                            <input id={id} name="city" autoComplete="address-level2" className={fieldClass} />
                        )}
                    </Field>
                    <Field label="Brand of interest">
                        {({ id }) => (
                            <select id={id} name="brand" defaultValue={defaultBrand} className={cn(fieldClass, selectClass)}>
                                {ENQUIRY_BRANDS.map((b) => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>
                        )}
                    </Field>
                    <Field label="I am a">
                        {({ id }) => (
                            <select id={id} name="role" defaultValue={ENQUIRY_ROLES[0]} className={cn(fieldClass, selectClass)}>
                                {ENQUIRY_ROLES.map((r) => (
                                    <option key={r}>{r}</option>
                                ))}
                            </select>
                        )}
                    </Field>
                    <Field label="Product of interest" className="sm:col-span-2">
                        {({ id }) => (
                            <input id={id} name="product" placeholder="e.g. Q08 panels, Millie fans, sliding gate" className={fieldClass} />
                        )}
                    </Field>
                    <Field label="Your project" className="sm:col-span-2">
                        {({ id }) => (
                            <textarea
                                id={id}
                                name="message"
                                rows={4}
                                placeholder="Rooms, timelines, finishes you have in mind…"
                                className={cn(fieldClass, "resize-y")}
                            />
                        )}
                    </Field>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group inline-flex h-14 w-full items-center justify-center gap-3 bg-brass px-10 text-[0.8125rem] font-medium tracking-[0.16em] text-background uppercase transition-colors duration-300 hover:bg-foreground disabled:opacity-60 sm:w-auto"
                        >
                            {status === "sending" ? "Sending…" : "Send enquiry"}
                            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                        <p className="mt-5 text-sm text-muted-foreground">
                            We reply within one working day. Your details are used only to respond to this enquiry.
                        </p>
                        <p role="alert" className="mt-3 text-sm text-destructive empty:hidden">
                            {status === "error" &&
                                `Sorry, your enquiry couldn't be sent. Please try again, or call us on ${CONTACT.phoneDisplay}.`}
                        </p>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
