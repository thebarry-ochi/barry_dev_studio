import { Header } from "@/components/site/header/header";
import { Hero } from "@/components/site/hero/hero";
import { Process } from "@/components/site/process/process";
import { Work } from "@/components/site/work/work";
import { About } from "@/components/site/about/about";
import { Contact } from "@/components/site/contact/contact";
import { Footer } from "@/components/site/footer/footer";

import { JourneyTransfer } from "@/components/site/journey/journey-transfer";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <JourneyTransfer>
          <Hero />
          <Process />
        </JourneyTransfer>
        <Work />
        <About portrait={{ src: "/assets/about/barry-sketch.png", alt: "Pencil sketch portrait of Barry with orange accents." }} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
