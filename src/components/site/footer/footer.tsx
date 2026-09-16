import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main"><div><a className="wordmark" href="#top">Barry Dev Studio<span aria-hidden="true">.</span></a><p>Thoughtful websites. Better customer journeys.</p></div><nav aria-label="Footer navigation"><a href="#process">The Process</a><a href="#work">Work</a><a href="#contact">Contact</a></nav></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Barry Dev Studio. All rights reserved.</p><a href="#top">Back to top ↑</a></div>
      </Container>
    </footer>
  );
}
