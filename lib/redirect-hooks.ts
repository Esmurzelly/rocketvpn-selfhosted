import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const slugRedirectHook =
  (basePath: string): CollectionAfterChangeHook =>
    async ({ doc, previousDoc, operation, req, collection, context }) => {
      if (context?.skipRedirectHook) return doc;

      // сохранение черновика не меняет адреса на сайте
      if (doc._status && doc._status !== "published") return doc;

      const newPath = `${basePath}/${doc.slug}`;

      // 1. новый адрес не должен оставаться «старым» в какой-то переадресации
      await req.payload.delete({
        collection: "redirects",
        where: { from: { equals: newPath } },
        req,
      });

      if (operation !== "update" || !previousDoc || previousDoc.slug === doc.slug) return doc;

      // старый адрес не работал, если материал раньше не был опубликован
      if (previousDoc._status && previousDoc._status !== "published") return doc;

      const oldPath = `${basePath}/${previousDoc.slug}`;

      // 2. цепочки: всё, что вело на старый адрес, теперь ведёт на новый
      await req.payload.update({
        collection: "redirects",
        where: { to: { equals: oldPath } },
        data: { to: newPath },
        req,
      });

      // 3. переадресация со старого адреса
      await req.payload.create({
        collection: "redirects",
        data: { from: oldPath, to: newPath, auto: true },
        req,
      });

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