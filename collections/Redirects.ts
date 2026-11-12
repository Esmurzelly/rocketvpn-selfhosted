import type { CollectionConfig } from "payload";

const PATH = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/;

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: { singular: "Переадресация", plural: "Переадресации" },
  admin: {
    useAsTitle: "from",
    defaultColumns: ["from", "to", "auto", "updatedAt"],
    description: "При смене адреса страницы запись создаётся автоматически. Здесь же можно добавить переадресацию вручную.",
  },
  // публично читать не нужно: сайт обращается к базе напрямую
  access: { read: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: "from",
      type: "text",
      label: "Старый адрес",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Начинается с «/», например: /old-page" },
      validate: async (value: string | null | undefined, { req }: any) => {
        const v = value ?? "";
        if (!PATH.test(v)) return "Формат: /адрес или /раздел/адрес (латиница, цифры, дефис)";

        // на адресе, где уже есть страница, переадресация не сработает
        const parts = v.split("/").filter(Boolean);
        if (parts.length === 1) {
          const { totalDocs } = await req.payload.count({
            collection: "pages",
            where: { slug: { equals: parts[0] } },
            req,
          });
          if (totalDocs > 0) return "На этом адресе уже есть страница";
        }
        return true;
      },
    },
    {
      name: "to",
      type: "text",
      label: "Новый адрес",
      required: true,
      admin: { description: "Адрес на сайте (/new-page) или полная ссылка (https://…)" },
      validate: (value: string | null | undefined, { siblingData }: any) => {
        const v = value ?? "";
        if (!PATH.test(v) && !/^https?:\/\//.test(v)) return "Укажите адрес вида /new-page или https://…";
        if (v === (siblingData as { from?: string }).from) return "Старый и новый адрес совпадают";
        return true;
      },
    },
    {
      name: "auto",
      type: "checkbox",
      label: "Создана автоматически",
      defaultValue: false,
      admin: { readOnly: true, position: "sidebar" },
    },
  ],
};