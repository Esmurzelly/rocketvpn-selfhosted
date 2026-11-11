// lib/pages.ts
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Page } from "@/payload-types";
import type { FaqItem } from "@/content/faq";

// cache не даёт читать одну страницу из базы дважды за один запрос
export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1, // подтягивает картинку Open Graph
  });
  return res.docs[0] ?? null;
});

export function toFaqItems(faq: Page["faq"]): FaqItem[] {
  return (faq ?? []).map((f) => ({ question: f.question, answer: f.answer }));
}