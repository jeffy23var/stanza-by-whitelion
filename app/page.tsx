import Collections from "@/components/site/collections";
import Enquire from "@/components/site/enquire";
import Featured from "@/components/site/featured";
import Hero from "@/components/site/hero";
import Intro from "@/components/site/intro";
import Marquee from "@/components/site/marquee";
import QuoteBand from "@/components/site/quote-band";
import WhyStanza from "@/components/site/why-stanza";

export default function Home() {
    return (
        <main id="main" tabIndex={-1} className="focus:outline-none">
            <Hero />
            <Intro />
            <Collections />
            <Marquee />
            <Featured />
            <QuoteBand />
            <WhyStanza />
            <Enquire />
        </main>
    );
}
