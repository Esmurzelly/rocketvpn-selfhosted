// import type { MetadataRoute } from "next";
// import { seo } from "@/content/seo";
// import { site } from "@/lib/site";

// export default function sitemap(): MetadataRoute.Sitemap {
//   return Object.keys(seo).map((key) => ({
//     url: key === "home" ? `${site.url}/` : `${site.url}/${key}`,
//   }));
// }

import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { "seo.noindex": { not_equals: true } },
    pagination: false,
    depth: 0,
  });

  return docs.map((d) => ({
    url: d.slug === "home" ? `${site.url}/` : `${site.url}/${d.slug}`,
  }));
}