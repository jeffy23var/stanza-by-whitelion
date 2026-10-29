// All homepage copy and data. Brand sub-pages (/whitelion, /pare, /luft, /lmt)
// should import from here so names, links and images stay in one place.

export type SiteImage = {
    src: string;
    alt: string;
    /** "contain" for cut-out product shots, shown on a matching backdrop */
    fit?: "cover" | "contain";
    /** Backdrop behind contained images; picked to match the photo's own background */
    backdrop?: string;
    /** CSS object-position for cover crops */
    position?: string;
};

export const NAV = [
    { label: "Whitelion", href: "/whitelion" },
    { label: "PARÉ", href: "/pare" },
    { label: "LUFT", href: "/luft" },
    { label: "LMT", href: "/lmt" },
] as const;

export const CONTACT = {
    phoneDisplay: "+91 73493 15136",
    phoneHref: "tel:+917349315136",
    addressLines: ["1st Floor, L-248, Sector 6", "HSR Layout, Bengaluru", "Karnataka 560102"],
    mapsHref:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("1st Floor, L-248, Sector 6, HSR Layout, Bengaluru, Karnataka 560102"),
};

// Stand-in until the commissioned hero photograph is ready (see README note in the summary)
export const HERO_IMAGE: SiteImage = {
    src: "/img/hero.webp",
    alt: "A warm hotel-style lounge with walnut-panelled walls, a timber ceiling, soft armchairs and full-height windows onto a garden",
    position: "50% 60%",
};

export const QUOTE_IMAGE: SiteImage = {
    src: "/img/quote.webp",
    alt: "",
    position: "40% 70%",
};

export const STATS = [
    { value: 4, pad: 2, suffix: "", label: "Curated brands" },
    { value: 174, pad: 0, suffix: "+", label: "Signature pieces" },
    { value: 30, pad: 2, suffix: "", label: "Product categories" },
    { value: 1, pad: 2, suffix: "", label: "Point of contact" },
] as const;

export type Collection = {
    id: string;
    number: string;
    domain: string;
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    chips: string[];
    more?: number;
    href: string;
    image: SiteImage;
};

export const COLLECTIONS: Collection[] = [
    {
        id: "whitelion",
        number: "01",
        domain: "Intelligence",
        name: "Whitelion AirQube",
        shortName: "Whitelion",
        tagline: "The home, under a single touch.",
        description:
            "Glass switch panels, smart displays, sockets, sensors, locks and gateways that orchestrate lighting, curtains, climate and scenes.",
        chips: ["Switch Panels", "Power & Charging", "Smart Displays", "App & Control", "Curtains & Access"],
        more: 3,
        href: "/whitelion",
        image: {
            src: "/images/airqube/q08.webp",
            alt: "Whitelion AirQube Q08 glass touch panel with eight labelled scene keys",
            fit: "contain",
            backdrop: "#e7e2da",
        },
    },
    {
        id: "pare",
        number: "02",
        domain: "Surfaces",
        name: "PARÉ",
        shortName: "PARÉ",
        tagline: "The warmth of wood, engineered to endure.",
        description:
            "Wood-look ceilings, wall panels, exterior facades, LVT and laminate flooring — the richness of timber on every plane, without its upkeep.",
        chips: [
            "Exterior facade",
            "Interior/exterior ceiling and wall panels",
            "Interior architectural panels",
            "Flooring",
            "Laminate flooring",
        ],
        href: "/pare",
        image: {
            src: "/img/pare.webp",
            alt: "Study with a PARÉ wood-look slatted ceiling and matching slatted feature wall",
            position: "50% 40%",
        },
    },
    {
        id: "luft",
        number: "03",
        domain: "Air",
        name: "LUFT",
        shortName: "LUFT",
        tagline: "Air, sculpted into design.",
        description:
            "Designer ceiling, wall and pedestal fans with whisper-quiet DC motors, plus air purification, from the LUFT 2025 collection.",
        chips: ["Wall fans", "Ceiling fans", "Pedestal & portable fans", "Exhaust fans", "Air purifiers"],
        more: 1,
        href: "/luft",
        image: {
            src: "/img/luft.webp",
            alt: "LUFT Millie ceiling fan with walnut blades and a brass body above a sunlit veranda",
            position: "50% 18%",
        },
    },
    {
        id: "lmt",
        number: "04",
        domain: "Arrival",
        name: "LMT Automation",
        shortName: "LMT",
        tagline: "Every entrance, effortlessly in motion.",
        description:
            "Automated gates, boom barriers, high-speed doors, rolling shutters, garage doors, automated roofs and loading-bay systems.",
        chips: [
            "Gate Automation",
            "Residential Shutters",
            "Commercial Industrial Shutters",
            "Garage Doors",
            "Automated Roofs",
        ],
        more: 6,
        href: "/lmt",
        image: {
            src: "/images/lmt/residential-shutters-spyro-residential-shutter.webp",
            alt: "Modern house with LMT Spyro motorised rolling shutters lowered over corner glazing",
            position: "60% 50%",
        },
    },
];

export type FeaturedPiece = { brand: string; name: string; href: string; image: SiteImage };

export const FEATURED: FeaturedPiece[] = [
    {
        brand: "Whitelion AirQube",
        name: "Q08 Glass Switch Panel",
        href: "/whitelion",
        image: { src: "/images/airqube/q08.webp", alt: "Q08 glass touch panel", fit: "contain", backdrop: "#e7e2da" },
    },
    {
        brand: "LUFT",
        name: "Millie Ceiling Fan",
        href: "/luft",
        image: { src: "/img/luft.webp", alt: "Millie ceiling fan with walnut blades and brass body", position: "50% 12%" },
    },
    {
        brand: "PARÉ",
        name: "LVT Luxury Vinyl Tile Flooring",
        href: "/pare",
        image: { src: "/img/quote.webp", alt: "Herringbone wood-look LVT flooring in an open office", position: "35% 80%" },
    },
    {
        brand: "LMT Automation",
        name: "Automated Glass Roof",
        href: "/lmt",
        image: { src: "/images/lmt/automated-roofs-automated-glass-roof.webp", alt: "Automated louvred roof over a terrace at dusk" },
    },
    {
        brand: "Whitelion AirQube",
        name: "8-inch Smart Display",
        href: "/whitelion",
        image: {
            src: "/images/airqube/smart_display_8_inch.webp",
            alt: "8-inch smart display showing lighting, curtain and scene controls",
            fit: "contain",
            backdrop: "#1c1c1c",
        },
    },
    {
        brand: "LUFT",
        name: "Itsy Mini Ceiling Fan",
        href: "/luft",
        image: { src: "/img/itsy-mini.webp", alt: "Itsy Mini hugger fan in antique brass with wood-grain blades", position: "50% 10%" },
    },
    {
        brand: "PARÉ",
        name: "INNOV2+ Ceiling and Wall Systems",
        href: "/pare",
        image: { src: "/img/pare.webp", alt: "Slatted wood-look ceiling and wall panels in a study", position: "45% 30%" },
    },
    {
        brand: "LMT Automation",
        name: "Sliding Gate",
        href: "/lmt",
        image: { src: "/images/lmt/gate-automation-sliding-gate.webp", alt: "Slatted grey gate with an automatic opener arm" },
    },
    {
        brand: "Whitelion AirQube",
        name: "AirSensor Range",
        href: "/whitelion",
        image: {
            src: "/images/airqube/airsensor_range.webp",
            alt: "Door, motion, smoke and gas sensors arranged on stone plinths",
            fit: "contain",
            backdrop: "#f2eeea",
        },
    },
    {
        brand: "LMT Automation",
        name: "Spyro Residential Shutter",
        href: "/lmt",
        image: {
            src: "/images/lmt/residential-shutters-spyro-residential-shutter.webp",
            alt: "Motorised rolling shutters on a modern house",
            position: "70% 50%",
        },
    },
];

export const REASONS = [
    {
        numeral: "i.",
        title: "Four brands, one order",
        body: "Surfaces, air, smart control and access automation specified, supplied and coordinated from one desk.",
    },
    {
        numeral: "ii.",
        title: "Project-ready",
        body: "Dedicated support for architects, interior designers, builders and trade partners — from samples to site.",
    },
    {
        numeral: "iii.",
        title: "Expert guidance",
        body: "Help choosing the right model, finish and configuration so every piece belongs in its space.",
    },
];

export const ENQUIRY_BRANDS = ["All brands", "Whitelion AirQube", "PARÉ", "LUFT", "LMT Automation"];

export const ENQUIRY_ROLES = [
    "Homeowner",
    "Architect / Interior designer",
    "Builder / Developer",
    "Dealer / Trade partner",
    "Commercial / Industrial buyer",
];
