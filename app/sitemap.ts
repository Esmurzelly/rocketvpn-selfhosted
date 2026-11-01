import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seo).map((key) => ({
    url: key === "home" ? `${site.url}/` : `${site.url}/${key}`,
  }));
}