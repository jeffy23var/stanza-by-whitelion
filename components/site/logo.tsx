import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <span className={cn("inline-flex items-baseline gap-2 leading-none", className)}>
            <span className="font-serif text-[1.75rem] font-semibold tracking-tight">Stanza</span>
            <span className="text-[0.625rem] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                by Whitelion
            </span>
        </span>
    );
}
