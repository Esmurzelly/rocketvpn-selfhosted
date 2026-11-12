import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

export const getPost = cache(async (slug: string, draft = false) => {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "posts",
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    draft,
    limit: 1,
    depth: 2, // обложка и картинки внутри текста
  });
  return res.docs[0] ?? null;
});

export async function getPublishedPosts() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 100,
    depth: 1,
  });
  return docs;
}

export const formatDate = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
    : "";