import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/layout/container";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { HeroDrawing } from "./hero-drawing";
import { publicLinks } from "@/lib/links";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><Container className="hero-grid">
    <h1 id="hero-title">Websites that turn your<br className="hero-break" /> visitors into customers.</h1>
    <HeroDrawing><KifaruGraphic stage="sketch" pose="hero" theme="dark" /></HeroDrawing>
    <div className="hero-copy"><p className="hero-description">Get a website that makes a strong first impression, builds trust, and<br className="hero-break" /> makes it easier for customers to choose you.</p>
    <div className="hero-actions"><a href="#work" className="button">View Projects <ArrowRightIcon size={21} aria-hidden="true" /></a>
    {publicLinks.whatsapp ? <a className="button button-secondary" href={publicLinks.whatsapp}><WhatsappLogoIcon size={24} aria-hidden="true" />WhatsApp Me</a> : <button className="button button-secondary" type="button" disabled title="WhatsApp details will be added before launch."><WhatsappLogoIcon size={24} aria-hidden="true" />WhatsApp Me</button>}</div></div>
  </Container></section>;
}
