import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="section">
      <Container>
        <h1>Barry Dev Studio</h1>
        <p className="prose-width">Website in development.</p>
      </Container>
    </main>
  );
}
