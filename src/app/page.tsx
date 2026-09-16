import { Header } from "@/components/site/header/header";
import { Hero } from "@/components/site/hero/hero";
import { Process } from "@/components/site/process/process";
import { Work } from "@/components/site/work/work";
import { Contact } from "@/components/site/contact/contact";
import { Footer } from "@/components/site/footer/footer";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Process />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
