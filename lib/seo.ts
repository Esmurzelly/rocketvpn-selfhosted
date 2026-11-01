import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { site } from "@/lib/site";

export function buildMetadata(key: string): Metadata {
  const p = seo[key];
  if (!p) return {};

  const path = key === "home" ? "/" : `/${key}`;
  const description = p.main_description ?? p.description;

  return {
    title: { absolute: p.title },
    description,
    keywords: p.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: p.title,
      description,
      url: path,
      siteName: site.name,
      locale: "ru_RU",
      type: "website",
      images: [{ url: "/og.png", width: 1440, height: 740, alt: site.name }],
    },
  };
}