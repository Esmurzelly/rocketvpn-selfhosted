// lib/redirect-hooks.ts
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
} from "payload";

// У коллекций без черновиков (страницы) поля _status нет: такой материал считается опубликованным
const isLive = (status?: string | null) => !status || status === "published";

// До записи: запоминаем адрес, который СЕЙЧАС работает на сайте
export const captureSlugHook =
  (collectionSlug: string): CollectionBeforeChangeHook =>
  async ({ data, operation, originalDoc, req }) => {
    if (operation !== "update" || !originalDoc?.id) return data;

    // сохранение черновика сайт не меняет
    if (!isLive(data?._status)) return data;

    try {
      const live = (await req.payload.findByID({
        collection: collectionSlug as never,
        id: originalDoc.id,
        draft: false, // опубликованная версия, а не последний черновик
        depth: 0,
        req,
        overrideAccess: true,
      })) as { slug?: string; _status?: string };

      // старый адрес существовал на сайте только если материал был опубликован
      if (isLive(live._status) && live.slug) {
        req.context.liveSlug = live.slug;
      }
    } catch {
      // материала нет или он ещё ни разу не публиковался
    }

    return data;
  };

// После записи: создаём переадресацию со старого адреса на новый
export const slugRedirectHook =
  (basePath: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req, collection, context }) => {
    if (context?.skipRedirectHook) return doc;

    // черновики не меняют публичные адреса
    if (!isLive(doc._status)) return doc;

    const newPath = `${basePath}/${doc.slug}`;
    const oldSlug = context?.liveSlug as string | undefined;

    // 1. если новый адрес раньше был «старым» в переадресации, она теряет смысл
    await req.payload.delete({
      collection: "redirects",
      where: { from: { equals: newPath } },
      req,
    });

    if (operation !== "update" || !oldSlug || oldSlug === doc.slug) return doc;

    const oldPath = `${basePath}/${oldSlug}`;

    // 2. цепочки: всё, что вело на старый адрес, теперь ведёт на новый
    await req.payload.update({
      collection: "redirects",
      where: { to: { equals: oldPath } },
      data: { to: newPath },
      req,
    });

    // 3. переадресация со старого адреса: обновляем существующую или создаём новую
    const existing = await req.payload.find({
      collection: "redirects",
      where: { from: { equals: oldPath } },
      limit: 1,
      depth: 0,
      req,
    });

    if (existing.docs[0]) {
      await req.payload.update({
        collection: "redirects",
        id: existing.docs[0].id,
        data: { to: newPath, auto: true },
        req,
      });
    } else {
      await req.payload.create({
        collection: "redirects",
        data: { from: oldPath, to: newPath, auto: true },
        req,
      });
    }

    // 4. canonical, заданный вручную на старый адрес, обновляем тоже
    const seo = (doc as { seo?: { canonical?: string | null } }).seo;
    if (seo?.canonical === oldPath) {
      await req.payload.update({
        collection: collection.slug as never,
        id: doc.id,
        data: { seo: { ...seo, canonical: newPath } } as never,
        req,
        context: { skipRedirectHook: true },
      });
    }

    return doc;
  };

export const deleteRedirectsHook =
  (basePath: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    await req.payload.delete({
      collection: "redirects",
      where: { to: { equals: `${basePath}/${doc.slug}` } },
      req,
    });
    return doc;
  };