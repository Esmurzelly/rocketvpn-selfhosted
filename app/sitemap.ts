import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const fetchSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const [pages, posts] = await Promise.all([
      payload.find({
        collection: "pages",
        where: { "seo.noindex": { not_equals: true } },
        pagination: false,
        depth: 0,
      }),
      payload.find({
        collection: "posts",
        where: {
          and: [{ _status: { equals: "published" } }, { "seo.noindex": { not_equals: true } }],
        },
        pagination: false,
        depth: 0,
      }),
    ]);

    return {
      pages: pages.docs.map((d) => d.slug),
      posts: posts.docs.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt })),
    };
  },
  ["sitemap"],
  { tags: ["pages", "posts"], revalidate: 3600 },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, posts } = await fetchSitemap();

  return [
    ...pages.map((slug) => ({ url: slug === "home" ? `${site.url}/` : `${site.url}/${slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}