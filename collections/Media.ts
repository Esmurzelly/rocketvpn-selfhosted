import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// на сервере обязательно задайте MEDIA_DIR вне папки проекта;
// без неё используется папка media в корне проекта (как сейчас)
const mediaDir = process.env.MEDIA_DIR || path.resolve(dirname, "../media");

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Файл", plural: "Медиафайлы" },
  access: { read: () => true },
  upload: {
    staticDir: mediaDir,
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 800 }, // для списка статей
    ],
    // оригинал не больше 2400 px по ширине: не копим огромные файлы на диске
    resizeOptions: { width: 2400, withoutEnlargement: true },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Описание картинки (alt)",
      admin: { description: "Коротко, что на картинке. Нужно для доступности и поиска" },
    },
  ],
};