import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="section">
      <Container>
        <h1>Page not found</h1>
        <p>The page you requested could not be found.</p>
        <Link href="/">Return home</Link>
      </Container>
    </main>
  );
}
