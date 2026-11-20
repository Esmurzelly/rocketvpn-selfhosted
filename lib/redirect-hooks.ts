
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
} from "payload";

// Получаем slug последней опубликованной версии до сохранения изменений
export const capturePublishedSlugHook: CollectionBeforeChangeHook =
  async ({ data, operation, originalDoc, req }) => {
    console.log("[capturePublishedSlugHook]", {
      operation,
      incomingSlug: data?.slug,
      status: data?._status,
      documentId: originalDoc?.id,
    });

    // Нас интересует только публикация существующей статьи
    if (
      operation !== "update" ||
      data?._status !== "published" ||
      !originalDoc?.id
    ) {
      return data;
    }

    try {
      const live = await req.payload.findByID({
        collection: "posts",
        id: originalDoc.id,
        draft: false,
        depth: 0,
        req,
        overrideAccess: true,
      });

      console.log("[capturePublishedSlugHook] published version:", {
        slug: live.slug,
        status: live._status,
      });

      // Сохраняем только реально существовавший опубликованный адрес
      if (live._status === "published" && live.slug) {
        req.context.liveSlug = live.slug;
      }
    } catch (error) {
      // Например, статья ещё ни разу не публиковалась
      console.log(
        "[capturePublishedSlugHook] No previous published version:",
        error,
      );
    }

    return data;
  };

export const slugRedirectHook =
  (basePath: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req, context }) => {
    console.log("=== slugRedirectHook FIRED ===", {
      operation,
      slug: doc.slug,
      status: doc._status,
    });

    if (context?.skipRedirectHook) return doc;

    // Черновики не меняют публичные адреса
    if (doc._status !== "published") return doc;

    const newPath = `${basePath}/${doc.slug}`;

    // Получаем старый slug из контекста того же запроса публикации
    const oldSlug = req.context.liveSlug as string | undefined;

    console.log("[slugRedirectHook] captured old slug:", oldSlug);

    // Убираем редирект, если новый адрес ранее использовался как старый
    await req.payload.delete({
      collection: "redirects",
      where: { from: { equals: newPath } },
      req,
    });

    // Нет старой опубликованной версии или адрес не изменился
    if (!oldSlug || oldSlug === doc.slug) {
      return doc;
    }

    const oldPath = `${basePath}/${oldSlug}`;

    // Обновляем цепочки редиректов, которые вели на старый адрес
    await req.payload.update({
      collection: "redirects",
      where: { to: { equals: oldPath } },
      data: { to: newPath },
      req,
    });

    // Проверяем, существует ли уже редирект со старого адреса
    const existing = await req.payload.find({
      collection: "redirects",
      where: { from: { equals: oldPath } },
      limit: 1,
      depth: 0,
      req,
    });

    if (existing.docs[0]) {
      // Обновляем существующий редирект вместо создания дубликата
      await req.payload.update({
        collection: "redirects",
        id: existing.docs[0].id,
        data: { to: newPath, auto: true },
        req,
      });
    } else {
      // Создаём новый редирект
      await req.payload.create({
        collection: "redirects",
        data: {
          from: oldPath,
          to: newPath,
          auto: true,
        },
        req,
      });
    }

    // Обновляем canonical, если он указывал на старый URL
    const seo = (doc as {
      seo?: { canonical?: string | null };
    }).seo;

    if (seo?.canonical === oldPath) {
      await req.payload.update({
        collection: "posts",
        id: doc.id,
        data: {
          seo: { ...seo, canonical: newPath },
        } as never,
        req,
        context: { skipRedirectHook: true },
      });
    }

    console.log("[slugRedirectHook] redirect created:", {
      from: oldPath,
      to: newPath,
    });

    return doc;
  };

export const deleteRedirectsHook =
  (basePath: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    await req.payload.delete({
      collection: "redirects",
      where: {
        to: { equals: `${basePath}/${doc.slug}` },
      },
      req,
    });

    return doc;
  };
