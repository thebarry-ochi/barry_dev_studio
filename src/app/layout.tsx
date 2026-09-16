import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { MotionProvider } from "@/components/providers/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: site.url,
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: site.url ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    title: site.name,
    description: site.description,
    siteName: site.name,
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: { card: "summary", title: site.name, description: site.description },
  robots: { index: site.indexable, follow: site.indexable },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
