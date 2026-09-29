import type { MetadataRoute } from "next";
import { SITE_URL, sitePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map(({ href, priority, changeFrequency }) => ({
    url: `${SITE_URL}${href}`, priority, changeFrequency,
  }));
}
