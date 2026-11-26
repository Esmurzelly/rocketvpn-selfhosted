// lib/pages.ts
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Page } from "@/payload-types";
import type { FaqItem } from "@/content/faq";
import { getPlans } from "@/lib/site-data";
import { fillTokens, fillLexical } from "@/lib/tokens";

const fetchPage = unstable_cache(
  async (slug: string): Promise<Page | null> => {
    //console.log("[db] page:", slug); // раскомментируйте для проверки кеша
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1, // подтягивает картинку Open Graph
    });
    return res.docs[0] ?? null;
  },
  ["page-by-slug"],
  { tags: ["pages", "media"], revalidate: 3600 },
);

// cache не даёт читать одну страницу дважды за один запрос
export const getPage = cache((slug: string) => fetchPage(slug));

export function toFaqItems(faq: Page["faq"]): FaqItem[] {
  return (faq ?? []).map((f) => ({ question: f.question, answer: f.answer }));
}

export async function getPageView(slug: string) {
  const [page, plans] = await Promise.all([getPage(slug), getPlans()]);
  if (!page) return null;

  return {
    ...page,
    faq: page.faq?.map((f) => ({
      ...f,
      question: fillTokens(f.question, plans),
      answer: fillTokens(f.answer, plans),
    })),
    content: page.content ? fillLexical(page.content, plans) : page.content,
  };
}