import { PhoneIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/layout/container";
import { ContactForm } from "./contact-form";
export function Contact() {
 return <section id="contact" className="contact section" aria-labelledby="contact-title"><Container className="contact-grid">
 <div className="contact-copy"><p className="eyebrow">Contact Me</p><h2 id="contact-title">Get a free website<br/>audit.</h2><p className="contact-intro">Interested in a free website audit? Reach out to me to book the audit and get a website redesign strategy tailored to your business.</p>
 <div className="contact-details"><p><span className="contact-icon"><PhoneIcon size={25}/></span><span>Tel:<br/>+254 700 000 000</span></p><p><span className="contact-icon"><EnvelopeSimpleIcon size={25}/></span><span>Email:<br/>projects@barrydevstudio.com</span></p><small>Contact details are placeholders until launch.</small></div></div><ContactForm/></Container></section>;
}
