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

  const posts = await payload.find({
    collection: "posts",
    where: {
      and: [{ _status: { equals: "published" } }, { "seo.noindex": { not_equals: true } }],
    },
    pagination: false,
    depth: 0,
  });

  return [
    ...docs.map((d) => ({ url: d.slug === "home" ? `${site.url}/` : `${site.url}/${d.slug}` })),
    ...posts.docs.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}