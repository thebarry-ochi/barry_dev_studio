import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.indexable && site.url ? [{ url: site.url.href }] : [];
}
