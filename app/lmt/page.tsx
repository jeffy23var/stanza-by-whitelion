import type { Metadata } from "next";
import BrandPage from "@/components/brand/brand-page";
import { BRANDS } from "@/lib/brand-content";

const brand = BRANDS.lmt;

export const metadata: Metadata = {
    title: brand.name,
    description: brand.metaDescription,
    openGraph: { title: `${brand.name} — Stanza by Whitelion`, description: brand.metaDescription, images: [brand.tile.src] },
};

export default function Page() {
    return <BrandPage id="lmt" />;
}
