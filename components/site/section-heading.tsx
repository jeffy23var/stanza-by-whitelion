import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

type SectionHeadingProps = {
    id?: string;
    eyebrow: string;
    /** Wrap the emphasised word in <em> */
    children: ReactNode;
    className?: string;
};

export default function SectionHeading({ id, eyebrow, children, className }: SectionHeadingProps) {
    return (
        <Reveal className={cn("max-w-3xl", className)}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={id} className="display mt-6 text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
                {children}
            </h2>
        </Reveal>
    );
}
