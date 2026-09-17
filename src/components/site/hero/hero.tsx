import { ArrowUpRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/layout/container";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { HeroDrawing } from "./hero-drawing";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">Websites that turn your visitors into customers.</h1>
          <p className="hero-description">Get a website that makes a strong first impression, builds trust, and makes it easier for customers to choose you.</p>
          <div className="hero-actions">
            <a href="#work" className="button">View Projects <ArrowUpRightIcon size={19} aria-hidden="true" /></a>
            <button className="button button-secondary" type="button" disabled title="WhatsApp contact will be available once contact details are confirmed." aria-label="WhatsApp Me, coming soon"><WhatsappLogoIcon size={20} aria-hidden="true" />WhatsApp Me</button>
          </div>
        </div>
        <HeroDrawing><KifaruGraphic stage="sketch" pose="hero" /></HeroDrawing>
      </Container>
    </section>
  );
}
