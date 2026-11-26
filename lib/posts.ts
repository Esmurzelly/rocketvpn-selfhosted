import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

const fetchPublishedPost = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
      limit: 1,
      depth: 2, // обложка и картинки внутри текста
    });
    return res.docs[0] ?? null;
  },
  ["post-by-slug"],
  { tags: ["posts", "media"], revalidate: 3600 },
);

export const getPost = cache(async (slug: string, draft = false) => {
  // черновики для предпросмотра никогда не кешируются
  if (draft) {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      draft: true,
      limit: 1,
      depth: 2,
    });
    return res.docs[0] ?? null;
  }
  return fetchPublishedPost(slug);
});

export const getPublishedPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
    });
    return docs;
  },
  ["published-posts"],
  { tags: ["posts", "media"], revalidate: 3600 },
);

export const formatDate = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
    : "";