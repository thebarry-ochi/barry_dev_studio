import { Container } from "@/components/layout/container";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <Container className="contact-grid">
        <div className="contact-copy"><p className="eyebrow">Let’s talk</p><h2 id="contact-title">Get a free website audit.</h2><p>Find out what’s working, what’s getting in the way, and where your website could work harder for your business.</p></div>
        <ContactForm />
        <div className="contact-details"><p className="contact-detail-label">Contact details <span>(placeholders)</span></p><p><span>Phone</span><span>+254 700 000 000</span></p><p><span>Email</span><span>projects@barrydevstudio.com</span></p></div>
      </Container>
    </section>
  );
}
