import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

export function expireTags(tags: string[]) {
  for (const tag of tags) {
    try {
      revalidateTag(tag, { expire: 0 });
    } catch {
      // вне запроса Next.js (например, из скрипта) сбрасывать нечего, это не ошибка
    }
  }
}

export const revalidateAfterChange =
  (...tags: string[]): CollectionAfterChangeHook =>
  ({ doc, previousDoc, context }) => {
    if (context?.disableRevalidate) return doc;
    // черновик, который никогда не был опубликован, сайт не касается
    if (doc._status && doc._status !== "published" && previousDoc?._status !== "published") return doc;
    expireTags(tags);
    return doc;
  };

export const revalidateAfterDelete =
  (...tags: string[]): CollectionAfterDeleteHook =>
  ({ doc, context }) => {
    if (!context?.disableRevalidate) expireTags(tags);
    return doc;
  };

export const revalidateGlobal =
  (...tags: string[]): GlobalAfterChangeHook =>
  ({ doc, context }) => {
    if (!context?.disableRevalidate) expireTags(tags);
    return doc;
  };