// import type { Metadata } from "next";
// import { seo } from "@/content/seo";
// import { site } from "@/lib/site";

// export function buildMetadata(key: string): Metadata {
//   const p = seo[key];
//   if (!p) return {};

//   const path = key === "home" ? "/" : `/${key}`;
//   const description = p.main_description ?? p.description;

//   return {
//     title: { absolute: p.title },
//     description,
//     keywords: p.keywords,
//     alternates: { canonical: path },
//     openGraph: {
//       title: p.title,
//       description,
//       url: path,
//       siteName: site.name,
//       locale: "ru_RU",
//       type: "website",
//       images: [{ url: "/og.png", width: 1440, height: 740, alt: site.name }],
//     },
//   };
// }


// lib/seo.ts
import type { Metadata } from "next";
import { getPage } from "@/lib/pages";

const DEFAULT_OG = { url: "/og.png", width: 1440, height: 740 };

export async function buildMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  if (!page) return {};

  const path = slug === "home" ? "/" : `/${slug}`;
  const title = page.seo?.title || page.h1;
  const description = page.seo?.description || undefined;
  const canonical = page.seo?.canonical || path;
  const img = typeof page.og?.image === "object" ? page.og.image : null;

  return {
    title: { absolute: title },
    description,
    keywords: page.seo?.keywords || undefined,
    alternates: { canonical },
    // undefined не перекрывает настройку из layout
    robots: page.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page.og?.title || title,
      description: page.og?.description || description,
      url: canonical,
      siteName: "Rocket VPN",
      locale: "ru_RU",
      type: "website",
      images: [
        img?.url
          ? { url: img.url, width: img.width ?? undefined, height: img.height ?? undefined, alt: title }
          : { ...DEFAULT_OG, alt: title },
      ],
    },
  };
}