// Brand-page data: copy, catalogue and tunnel images for /whitelion, /pare, /luft and /lmt.
// Product names come from the brands' own catalogues and image files.

import type { TunnelImage } from "@/components/ui/perspective-tunnel-hero";
import type { SiteImage } from "@/lib/site-content";

export type BrandId = "whitelion" | "pare" | "luft" | "lmt";

export type Product = {
    name: string;
    category: string;
    spec: string;
    image: SiteImage;
};

export type Brand = {
    id: BrandId;
    name: string;
    shortName: string;
    /** Value used in the enquiry form's brand select */
    enquiryName: string;
    domain: string;
    href: string;
    tagline: string;
    description: string;
    metaDescription: string;
    detailHeading: string;
    features: { title: string; body: string }[];
    categories: string[];
    products: Product[];
    /** Image used on the "Continue to" tiles of other brand pages */
    tile: SiteImage;
};

// ---------- helpers ----------

const AQ_BACKDROP = "#e9e5df";
const AQ_DARK = "#1c1c1c";

function aq(file: string, name: string, category: string, spec: string, backdrop = AQ_BACKDROP): Product {
    return {
        name,
        category,
        spec,
        image: { src: `/images/airqube/${file}.webp`, alt: `Whitelion AirQube ${name}`, fit: "contain", backdrop },
    };
}

function luft(file: string, name: string, category: string, spec: string, position = "50% 30%"): Product {
    return {
        name,
        category,
        spec,
        image: { src: `/images/luft/${file}.webp`, alt: `LUFT ${name} in a furnished room`, position },
    };
}

function pare(file: string, name: string, category: string, spec: string, position = "50% 50%"): Product {
    return {
        name,
        category,
        spec,
        image: { src: `/images/pare/${file}.webp`, alt: `PARÉ ${name}`, position },
    };
}

const LMT_CATEGORY: Record<string, string> = {
    "gate-automation": "Gate Automation",
    "boom-barriers": "Boom Barriers",
    "residential-shutters": "Residential Shutters",
    "commercial-industrial-shutters": "Commercial Industrial Shutters",
    "garage-doors": "Garage Doors",
    "automated-roofs": "Automated Roofs",
    "high-speed-doors": "High-Speed Doors",
    "industrial-doors": "Industrial Doors",
    "loading-bay": "Loading Bay",
    "sliding-swing-doors": "Sliding & Swing Doors",
    "outdoor-blinds": "Outdoor Blinds",
};

const LMT_SPEC: Record<string, string> = {
    "Gate Automation": "Motorised opening for residential and commercial gates.",
    "Boom Barriers": "Controlled vehicle entry for estates, offices and car parks.",
    "Residential Shutters": "Quiet, motorised security for windows and openings.",
    "Commercial Industrial Shutters": "Heavy-duty rolling shutters for shopfronts and plants.",
    "Garage Doors": "Sectional overhead doors, automated end to end.",
    "Automated Roofs": "Open the sky at a touch; close it for rain.",
    "High-Speed Doors": "Rapid-cycle doors for clean, cold and busy spaces.",
    "Industrial Doors": "Large-span doors for warehouses and workshops.",
    "Loading Bay": "Dock equipment for safe, sealed loading.",
    "Sliding & Swing Doors": "Automatic pedestrian entrances in glass and metal.",
    "Outdoor Blinds": "Motorised shade and screening for terraces.",
};

const LMT_FILES = [
    "gate-automation-sliding-gate",
    "gate-automation-swing-gate",
    "gate-automation-cantilever-sliding-gate",
    "gate-automation-telescopic-sliding-gate",
    "gate-automation-retractable-gate",
    "boom-barriers-boom-barrier",
    "boom-barriers-folding-articulated-boom-barrier",
    "boom-barriers-advertisement-boom-barrier",
    "residential-shutters-spyro-residential-shutter",
    "residential-shutters-aluminium-shutter",
    "residential-shutters-aluminium-perforated-shutter",
    "residential-shutters-galvalume-european-full-flat-shutter",
    "residential-shutters-perforated-galvalume-cnc-shutter",
    "residential-shutters-polycarbonate-shutter",
    "residential-shutters-customized-grill-type-ss-shutter",
    "commercial-industrial-shutters-aluminium-rolling-shutter",
    "commercial-industrial-shutters-fire-rated-rolling-shutter",
    "commercial-industrial-shutters-galvalume-rolling-shutter",
    "commercial-industrial-shutters-galvanised-rolling-shutter",
    "commercial-industrial-shutters-grill-rolling-shutter",
    "commercial-industrial-shutters-ms-rolling-shutter",
    "commercial-industrial-shutters-stainless-steel-shutter",
    "commercial-industrial-shutters-transparent-rolling-shutter",
    "garage-doors-garage-sectional-overhead-door",
    "garage-doors-transparent-garage-door",
    "garage-doors-american-door",
    "garage-doors-european-door",
    "automated-roofs-automated-glass-roof",
    "automated-roofs-automated-louvers",
    "automated-roofs-automatic-roof-shutter",
    "automated-roofs-honeycomb-roof",
    "high-speed-doors-anti-crush-high-speed-door",
    "high-speed-doors-clean-room-high-speed-door",
    "high-speed-doors-clean-reset-door",
    "high-speed-doors-flexi-roll-up-door",
    "high-speed-doors-fold-up-high-speed-door",
    "high-speed-doors-prime-cold-door",
    "high-speed-doors-prime-food-door",
    "high-speed-doors-prime-freezer-door",
    "industrial-doors-industrial-sectional-overhead-door",
    "industrial-doors-industrial-sliding-door",
    "industrial-doors-polycarbonate-sliding-folding-door",
    "industrial-doors-retractable-dock-shelter",
    "loading-bay-dock-leveler",
    "loading-bay-dock-shelter",
    "sliding-swing-doors-automatic-sliding-door",
    "sliding-swing-doors-automatic-swing-door",
    "sliding-swing-doors-sliding-folding-door",
    "sliding-swing-doors-telescopic-sliding-doors",
    "outdoor-blinds-expel-outdoor-blinds",
];

const SMALL_WORDS = new Set(["and"]);
const UPPER_WORDS: Record<string, string> = { ms: "MS", ss: "SS", cnc: "CNC" };

function titleCase(slug: string) {
    return slug
        .split("-")
        .map((w) => UPPER_WORDS[w] ?? (SMALL_WORDS.has(w) ? w : w[0].toUpperCase() + w.slice(1)))
        .join(" ")
        .replace("Customized", "Customised")
        .replace("Leveler", "Leveller");
}

function lmtProducts(): Product[] {
    return LMT_FILES.map((file) => {
        const prefix = Object.keys(LMT_CATEGORY).find((p) => file.startsWith(p + "-"))!;
        const category = LMT_CATEGORY[prefix];
        const name = titleCase(file.slice(prefix.length + 1));
        return {
            name,
            category,
            spec: LMT_SPEC[category],
            image: { src: `/images/lmt/${file}.webp`, alt: `LMT ${name}` },
        };
    });
}

// ---------- brands ----------

const WHITELION: Brand = {
    id: "whitelion",
    name: "Whitelion AirQube",
    shortName: "Whitelion",
    enquiryName: "Whitelion AirQube",
    domain: "Intelligence",
    href: "/whitelion",
    tagline: "The home, under a single touch.",
    description:
        "AirQube smart-home controls by Whitelion — glass switch panels, smart displays, sockets, sensors, locks and gateways that orchestrate lighting, curtains, climate and scenes.",
    metaDescription:
        "The home, under a single touch. AirQube smart-home controls by Whitelion — glass switch panels, smart displays, sockets, sensors, locks and gateways that orchestrate lighting, curtains, climate and scenes.",
    detailHeading: "Whitelion",
    features: [
        { title: "Glass panels", body: "Q-series touch panels with haptic feedback, scenes and two-way linkage." },
        { title: "Smart displays", body: "4, 8 and 10-inch control centres with time, weather and room control." },
        { title: "Connected", body: "Zigbee & Matter gateways, sensors, smart locks and the AirHome Pro app." },
    ],
    categories: [
        "Switch Panels",
        "Power & Charging",
        "Smart Displays",
        "App & Control",
        "Curtains & Access",
        "Sensors",
        "Gateways",
        "Lighting Drivers",
    ],
    products: [
        aq("q08", "Q08 Glass Switch Panel", "Switch Panels", "Eight labelled scene keys on tempered glass.", "#d9d6d1"),
        aq("q04", "Q04 Glass Switch Panel", "Switch Panels", "Four-key touch panel with haptic feedback.", "#d9d6d1"),
        aq("q04_pro", "Q04 Pro Panel with Display", "Switch Panels", "Four keys plus a clock and weather strip.", "#d9d6d1"),
        aq("q91_socket", "Q91 Universal Socket", "Power & Charging", "Glass-fronted universal power socket.", AQ_DARK),
        aq("q92_usb_socket", "Q92 USB Socket", "Power & Charging", "Universal socket with USB-A and USB-C charging.", AQ_DARK),
        aq("smart_display_10_inch", "10-inch Smart Display", "Smart Displays", "Whole-home control centre for lights, curtains and scenes."),
        aq("smart_display_8_inch", "8-inch Smart Display", "Smart Displays", "Wall-mounted control with room and scene tiles."),
        aq("smart_display_4_inch", "4-inch Smart Display", "Smart Displays", "Compact display with time, weather and quick scenes."),
        aq("airhome_pro_app", "AirHome Pro App", "App & Control", "Every room, scene and schedule from your phone."),
        aq("airremote", "AirRemote", "App & Control", "Handheld scene and RGB remote."),
        aq("airblaster", "AirBlaster", "App & Control", "IR blaster that brings ACs and TVs into the app.", "#cfcac3"),
        aq("aircurtain", "AirCurtain Motor", "Curtains & Access", "Quiet motorised track for curtains and sheers."),
        aq("airlock", "AirLock Smart Lock", "Curtains & Access", "Fingerprint, PIN and app unlocking."),
        aq("airsensor_range", "AirSensor Range", "Sensors", "Door, motion, smoke and gas sensors."),
        aq("airgateway_zigbee", "AirGateway Zigbee", "Gateways", "Hub that links every AirQube device."),
        aq("airgateway_zigbee_matter_pro", "AirGateway Zigbee + Matter Pro", "Gateways", "Zigbee hub with Matter for cross-brand control.", "#cfcac3"),
        aq("airdriver_dimming_driver", "AirDriver Dimming Driver", "Lighting Drivers", "Constant-current driver for smooth dimming."),
        aq("airdriver_rgb_cw_controller", "AirDriver RGB + CW Controller", "Lighting Drivers", "Colour and tunable-white LED control."),
    ],
    tile: { src: "/images/airqube/smart_display_10_inch.webp", alt: "", fit: "contain", backdrop: AQ_BACKDROP },
};

const PARE: Brand = {
    id: "pare",
    name: "PARÉ",
    shortName: "PARÉ",
    enquiryName: "PARÉ",
    domain: "Surfaces",
    href: "/pare",
    tagline: "The warmth of wood, engineered to endure.",
    description:
        "Wood-look ceilings, wall panels, exterior facades, LVT and laminate flooring — architectural surfaces that bring the richness of timber to every plane of a space, without its upkeep.",
    metaDescription:
        "PARÉ architectural surfaces from Stanza by Whitelion — wood-look ceiling and wall panels, exterior facades, LVT and HDF laminate flooring.",
    detailHeading: "PARÉ",
    features: [
        { title: "Ceilings & walls", body: "INNOV2+ profiles — Dome, Prism, Stripes, Unic and Wave — in 17+ shades." },
        { title: "Interior panels", body: "LUXE Panelo, Flut and Verto panels with matching trims for homes and hotels." },
        { title: "Facades & floors", body: "DURA+ exterior cladding, LVT luxury vinyl tile and TOUGH HDF laminate." },
    ],
    categories: [
        "Exterior facade",
        "Interior/exterior ceiling and wall panels",
        "Interior architectural panels",
        "Flooring",
        "Laminate flooring",
    ],
    products: [
        pare("dura-plus-page-03", "DURA+ Exterior Facade", "Exterior facade", "Weather-ready wood-look cladding for elevations.", "78% 50%"),
        pare("dura-plus-page-04", "DURA+ Facade Cladding", "Exterior facade", "Horizontal timber-look boards for villas and frontages.", "75% 50%"),
        pare("innov2-plus-page-07", "INNOV2+ Slatted Ceiling", "Interior/exterior ceiling and wall panels", "Linear ceiling system over a working studio."),
        pare("innov2-plus-page-12", "INNOV2+ Wall Panels", "Interior/exterior ceiling and wall panels", "Fluted wall profiles in 17+ shades.", "80% 50%"),
        pare("innov2-plus-page-46", "INNOV2+ Feature Wall", "Interior/exterior ceiling and wall panels", "Vertical slats for full-height feature walls.", "85% 50%"),
        pare("innov2-plus-page-37", "INNOV2+ Pastel Shades", "Interior/exterior ceiling and wall panels", "Profiles in a softer, pastel palette.", "25% 50%"),
        pare("luxe-page-06", "LUXE Panels — Luxury Homes", "Interior architectural panels", "Timber-look ceilings and walls for living spaces."),
        pare("luxe-page-07", "LUXE Panels — Hotels & Resorts", "Interior architectural panels", "Warm, water-tolerant panels for suites and baths."),
        pare("luxe-page-14", "LUXE Outdoor Ceiling", "Interior architectural panels", "Slatted soffits for verandas and lobbies."),
        pare("luxe-page-08", "LUXE Panelo", "Interior architectural panels", "Broad fluted panel for restaurants and lounges.", "20% 50%"),
        pare("lvt-page-02", "LVT Flooring — Workplace", "Flooring", "Luxury vinyl tile for open-plan offices."),
        pare("lvt-page-05", "LVT Flooring — Lobby", "Flooring", "Wood-look plank for high-traffic floors."),
        pare("lvt-page-06", "LVT Flooring — Library", "Flooring", "Warm amber plank for reading rooms and studies."),
        pare("lvt-page-09", "LVT Flooring — Residence", "Flooring", "Honey-toned plank for homes."),
        pare("lvt-page-13", "LVT Flooring — Hospitality", "Flooring", "Waterproof plank for cafés and lounges.", "40% 50%"),
        pare("lvt-page-15", "LVT Flooring — Living", "Flooring", "Light oak tone for bright living rooms."),
        pare("tough-page-01", "TOUGH HDF Laminate", "Laminate flooring", "Interlocking HDF laminate in deep walnut.", "50% 30%"),
        pare("tough-page-03", "TOUGH Laminate — Office", "Laminate flooring", "Hard-wearing laminate for workspaces.", "50% 30%"),
        pare("tough-page-11", "TOUGH Laminate — Education", "Laminate flooring", "Durable floors for classrooms and schools."),
        pare("tough-page-15", "TOUGH Laminate — Library", "Laminate flooring", "Rich, warm plank for reading rooms."),
    ],
    tile: { src: "/images/pare/luxe-page-06.webp", alt: "" },
};

const LUFT: Brand = {
    id: "luft",
    name: "LUFT",
    shortName: "LUFT",
    enquiryName: "LUFT",
    domain: "Air",
    href: "/luft",
    tagline: "Air, sculpted into design.",
    description:
        "Designer ceiling, wall and pedestal fans with whisper-quiet DC motors, alongside air purification — chosen from the LUFT 2025 collection to become the quiet centrepiece of a room.",
    metaDescription:
        "LUFT designer fans from Stanza by Whitelion — ceiling, hugger, wall and pedestal fans with DC motors, exhaust fans and air purifiers.",
    detailHeading: "LUFT",
    features: [
        { title: "Ceiling fans", body: "Sculpted blades in walnut, teak, brass and black, with quiet DC motors." },
        { title: "Huggers & wall fans", body: "Low-profile huggers for lower ceilings; wall fans for terraces and kitchens." },
        { title: "Air care", body: "Pedestal fans, exhaust fans and air purifiers to round out the room." },
    ],
    categories: ["Ceiling fans", "Hugger fans", "Wall fans", "Pedestal & portable fans", "Exhaust fans", "Air purifiers"],
    products: [
        luft("black-white-walnut-p026", "Millie", "Ceiling fans", "Walnut blades, brass body, veranda-ready.", "50% 15%"),
        luft("a-jetstream-p088", "Jetstream", "Ceiling fans", "Three black blades, DC motor.", "50% 15%"),
        luft("1-with-p018", "Supra with Rod", "Ceiling fans", "White blades on a downrod for tall rooms.", "50% 15%"),
        luft("a-twin-fan-p032", "Wiscon Twin Fan", "Ceiling fans", "Twin heads in brass with a light kit.", "50% 15%"),
        luft("ae-hexair-p146", "Hexair", "Ceiling fans", "Five walnut blades with an integrated light.", "50% 15%"),
        luft("b-e-iny-p104", "Shoalhaven", "Ceiling fans", "Brushed blades over calm bedrooms.", "50% 15%"),
        luft("bali-p094", "Bali", "Ceiling fans", "Woven-look blades for resort interiors.", "50% 15%"),
        luft("berlinetta-p190", "Berlinetta", "Ceiling fans", "Retractable blades around a light.", "50% 15%"),
        luft("black-white-walnut-p156", "Accura", "Ceiling fans", "Five-blade walnut fan for living rooms.", "50% 15%"),
        luft("black-white-walnut-p176", "Swank DC", "Ceiling fans", "Sculpted three-blade DC fan.", "50% 15%"),
        luft("black-white-walnut-p182", "Cadillac", "Ceiling fans", "Clean white blades for darker rooms.", "50% 15%"),
        luft("carolina-p098", "Carolina", "Ceiling fans", "Long walnut blades, lofty ceilings.", "50% 15%"),
        luft("carolina-xl-p100", "Carolina XL", "Ceiling fans", "Oversized span for open-plan spaces.", "50% 15%"),
        luft("ee-8-ee-ic-enigma-p126", "Enigma", "Ceiling fans", "Industrial cage-style fan.", "50% 15%"),
        luft("emma-p024", "Emma", "Ceiling fans", "Cream blades and brass for kitchens.", "50% 15%"),
        luft("fijian-p122", "Fijian", "Ceiling fans", "White blades for airy interiors.", "50% 15%"),
        luft("le-ce-p152", "Kodiak", "Ceiling fans", "White three-blade fan with a light.", "50% 15%"),
        luft("miura-p028", "Miura", "Ceiling fans", "Five-blade brass fan for dining rooms.", "50% 15%"),
        luft("nautica-p068", "Nautica", "Ceiling fans", "Teak-tone blades, DC efficiency.", "50% 15%"),
        luft("nordic-p108", "Nordic", "Ceiling fans", "Matte black, Scandinavian lines.", "50% 15%"),
        luft("pentarosa-p036", "Pentarosa", "Ceiling fans", "Five rosewood blades and brass.", "50% 15%"),
        luft("retractable-p076", "Glint", "Ceiling fans", "Crystal chandelier with retractable blades.", "50% 15%"),
        luft("riviera-p070", "Riviera", "Ceiling fans", "Low, broad blades for coastal homes.", "50% 15%"),
        luft("sierra-p154", "Sierra", "Ceiling fans", "Wood-tone fan for bright living rooms.", "50% 15%"),
        luft("slate-p010", "Slate", "Ceiling fans", "Bronze blades over neutral rooms.", "50% 15%"),
        luft("sos-seee-p066", "Peregrine", "Ceiling fans", "Multi-blade DC fan with a light.", "50% 15%"),
        luft("ss-lel-delet-ba-p090", "Atlanta", "Ceiling fans", "Eight-blade fan for outdoor lounges.", "50% 15%"),
        luft("tidal-fim-p012", "Tidal Waterproof", "Ceiling fans", "Rated for verandas and wet areas.", "50% 15%"),
        luft("warp-p008", "Warp", "Ceiling fans", "Curved blades in black and walnut.", "50% 15%"),
        luft("zf-res-hugger-p020", "Supra Hugger", "Hugger fans", "Flush-mount Supra for lower ceilings.", "50% 15%"),
        luft("havana-p116", "Havana Hugger", "Hugger fans", "Compact black hugger for alcoves.", "50% 15%"),
        luft("itsy-max-hugger-p052", "Itsy Max Hugger", "Hugger fans", "Small-room hugger in black and wood.", "50% 15%"),
        luft("a-s-h-g-r-e-y-teak-wood-p048", "Itsy Mini", "Hugger fans", "Mini hugger in antique brass.", "50% 15%"),
        luft("cadillag-hugger-p184", "Cadillac Hugger", "Hugger fans", "Low-profile Cadillac for kitchens.", "50% 15%"),
        luft("fioranojraser-wall-ean-p046", "Fiorano Raser Wall Fan", "Wall fans", "Brass-armed wall fan.", "50% 30%"),
        luft("j-wiscon-ceiling-wall-p030", "Wiscon Ceiling/Wall", "Wall fans", "Twin brass heads for dining rooms.", "50% 25%"),
        luft("tidal-mini-wall-fan-p016", "Tidal Mini Wall Fan", "Wall fans", "Compact caged wall fan.", "50% 25%"),
        luft("wall-fan-p006", "Jet DC Wall Fan", "Wall fans", "Black DC wall fan for studies.", "50% 25%"),
        luft("wall-fan-type-1-p112", "Havana Wall Fan", "Wall fans", "Swan-neck wall fan in black.", "50% 25%"),
        luft("white-teak-p194", "Spyder Pedestal", "Pedestal & portable fans", "Pedestal fan in white teak.", "50% 40%"),
        luft("mno-exhaust-e-em-p212", "Exhaust Fan Range", "Exhaust fans", "Wall and window exhaust fans.", "50% 30%"),
        luft("purifier-mag-p216", "Volume Air Purifier", "Air purifiers", "Room air purifier.", "50% 60%"),
    ],
    tile: { src: "/images/luft/black-white-walnut-p026.webp", alt: "", position: "50% 20%" },
};

const LMT: Brand = {
    id: "lmt",
    name: "LMT Automation",
    shortName: "LMT",
    enquiryName: "LMT Automation",
    domain: "Arrival",
    href: "/lmt",
    tagline: "Every entrance, effortlessly in motion.",
    description:
        "Automated gates, boom barriers, high-speed doors, rolling shutters, garage doors, automated roofs and loading-bay systems — engineered for smooth, secure, everyday movement.",
    metaDescription:
        "LMT entrance automation from Stanza by Whitelion — automated gates, boom barriers, shutters, garage doors, high-speed doors, automated roofs and loading bays.",
    detailHeading: "LMT",
    features: [
        { title: "Gates & barriers", body: "Sliding, swing, cantilever and telescopic gates, with boom barriers for entries." },
        { title: "Doors & shutters", body: "Residential and industrial shutters, garage doors and rapid high-speed doors." },
        { title: "Roofs & bays", body: "Automated glass roofs and louvres, dock levellers and shelters." },
    ],
    categories: Object.values(LMT_CATEGORY),
    products: lmtProducts(),
    tile: { src: "/images/lmt/residential-shutters-spyro-residential-shutter.webp", alt: "", position: "60% 50%" },
};

export const BRANDS: Record<BrandId, Brand> = { whitelion: WHITELION, pare: PARE, luft: LUFT, lmt: LMT };
export const BRAND_ORDER: BrandId[] = ["whitelion", "pare", "luft", "lmt"];

export function toTunnel(p: Product, brand: Brand): TunnelImage {
    return {
        src: p.image.src,
        title: p.name,
        label: brand.shortName,
        href: "#catalogue",
        fit: p.image.fit,
        backdrop: p.image.backdrop,
        position: p.image.position,
    };
}

/** A spread of pieces for a brand's tunnel: alternates categories so the flight feels varied. */
export function brandTunnel(brand: Brand, count = 10): TunnelImage[] {
    const byCat = brand.categories.map((c) => brand.products.filter((p) => p.category === c));
    const picked: Product[] = [];
    for (let round = 0; picked.length < count && round < 20; round++) {
        for (const list of byCat) {
            if (list[round] && picked.length < count) picked.push(list[round]);
        }
    }
    return picked.map((p) => toTunnel(p, brand));
}

/** Homepage tunnel: lifestyle-led mix across all four brands. */
export const HOME_TUNNEL: TunnelImage[] = [
    { src: "/images/luft/black-white-walnut-p026.webp", title: "Millie Ceiling Fan", label: "LUFT", href: "/luft", position: "50% 15%" },
    { src: "/images/pare/luxe-page-06.webp", title: "LUXE Wall Panels", label: "PARÉ", href: "/pare" },
    { src: "/images/airqube/smart_display_10_inch.webp", title: "10-inch Smart Display", label: "Whitelion", href: "/whitelion", fit: "contain", backdrop: AQ_BACKDROP },
    { src: "/images/lmt/automated-roofs-automated-glass-roof.webp", title: "Automated Glass Roof", label: "LMT", href: "/lmt" },
    { src: "/images/luft/pentarosa-p036.webp", title: "Pentarosa", label: "LUFT", href: "/luft", position: "50% 15%" },
    { src: "/images/pare/innov2-plus-page-07.webp", title: "INNOV2+ Slatted Ceiling", label: "PARÉ", href: "/pare" },
    { src: "/images/airqube/q08.webp", title: "Q08 Glass Panel", label: "Whitelion", href: "/whitelion", fit: "contain", backdrop: "#d9d6d1" },
    { src: "/images/lmt/garage-doors-transparent-garage-door.webp", title: "Transparent Garage Door", label: "LMT", href: "/lmt" },
    { src: "/images/luft/miura-p028.webp", title: "Miura", label: "LUFT", href: "/luft", position: "50% 15%" },
    { src: "/images/pare/lvt-page-02.webp", title: "LVT Flooring", label: "PARÉ", href: "/pare" },
    { src: "/images/airqube/airlock.webp", title: "AirLock Smart Lock", label: "Whitelion", href: "/whitelion", fit: "contain", backdrop: AQ_BACKDROP },
    { src: "/images/lmt/residential-shutters-spyro-residential-shutter.webp", title: "Spyro Shutter", label: "LMT", href: "/lmt", position: "65% 50%" },
];
