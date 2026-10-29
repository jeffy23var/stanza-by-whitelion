import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/site-content";

type FramedImageProps = {
    image: SiteImage;
    sizes: string;
    className?: string;
    /** Slow zoom when an ancestor with the `group` class is hovered */
    zoom?: boolean;
};

/** A next/image filling its frame: cover crops, or cut-out products on a matching backdrop. */
export default function FramedImage({ image, sizes, className, zoom = false }: FramedImageProps) {
    const contain = image.fit === "contain";

    return (
        <div
            className={cn("relative overflow-hidden bg-surface", className)}
            style={contain && image.backdrop ? { backgroundColor: image.backdrop } : undefined}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                className={cn(
                    contain ? "object-contain p-[12%]" : "object-cover",
                    zoom &&
                        "transition-transform duration-[1400ms] ease-quiet motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]",
                )}
                style={image.position ? { objectPosition: image.position } : undefined}
            />
        </div>
    );
}
