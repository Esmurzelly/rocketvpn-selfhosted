import type { CollectionConfig } from "payload";
import { RESERVED_SLUGS, LOCKED_SLUGS } from "../lib/slug-rules";
import { slugRedirectHook } from "../lib/redirect-hooks";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Страница", plural: "Страницы" },
  admin: {
    useAsTitle: "h1",
    defaultColumns: ["h1", "slug", "template", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [slugRedirectHook("")],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Адрес страницы",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Латиница, цифры и дефис. При смене адреса со старого автоматически создаётся переадресация",
      },
      validate: async (value: string | null | undefined, { req, id }: any) => {
        const slug = value ?? "";

        if (!/^[a-z0-9-]+$/.test(slug)) return "Допустимы только строчные латинские буквы, цифры и дефис";
        if (RESERVED_SLUGS.includes(slug)) return "Этот адрес зарезервирован, выберите другой";

        // адрес страниц, подключённых в коде, менять нельзя
        if (id) {
          const current = await req.payload.findByID({ collection: "pages", id, depth: 0, req });
          if (LOCKED_SLUGS.includes(current.slug) && current.slug !== slug) {
            return "Адрес этой страницы менять нельзя: она подключена в коде сайта";
          }
        }

        // дубль
        const { totalDocs } = await req.payload.count({
          collection: "pages",
          where: { slug: { equals: slug }, ...(id ? { id: { not_equals: id } } : {}) },
          req,
        });
        if (totalDocs > 0) return "Страница с таким адресом уже существует";

        return true;
      },
    },
    {
      name: "template",
      type: "select",
      label: "Вид страницы",
      defaultValue: "landing",
      required: true,
      admin: { position: "sidebar" },
      options: [
        { label: "С верхним блоком (лендинг)", value: "landing" },
        { label: "Текстовая страница (по центру)", value: "text" },
        { label: "Документ (текст слева)", value: "document" },
      ],
    },
    { name: "h1", type: "text", label: "Заголовок H1", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Контент",
          admin: { description: "Цены подставляются кодами: {{3m.price}}, {{3m.month}}, {{3m.old}}, {{3m.benefit}}. Вместо 3m можно 1m, 6m, 12m" },
          fields: [
            {
              name: "heroText",
              type: "textarea",
              label: "Текст под заголовком (верхний блок)",
            },
            {
              name: "heroPicture",
              type: "select",
              label: "Картинка в верхнем блоке",
              defaultValue: "phone",
              options: [
                { label: "Телефон", value: "phone" },
                { label: "Телефон 2 (Android, iPhone)", value: "phone-2" },
                { label: "Телефон 3", value: "phone-3" },
                { label: "Ноутбук", value: "laptop" },
                { label: "Ноутбук 2", value: "laptop-2" },
                { label: "Телевизор", value: "tv" },
              ],
            },
            {
              name: "ctaUrl",
              type: "text",
              label: "Ссылка кнопки «Подключить»",
              admin: { description: "Если пусто, будет использована ссылка по умолчанию" },
            },
            { name: "content", type: "richText", label: "Текст страницы" },
          ],
        },
        {
          label: "FAQ",
          admin: { description: "Цены подставляются кодами: {{3m.price}}, {{3m.month}}, {{3m.old}}, {{3m.benefit}}. Вместо 3m можно 1m, 6m, 12m" },
          fields: [
            {
              name: "faq",
              type: "array",
              label: "Вопросы и ответы",
              labels: { singular: "Вопрос", plural: "Вопросы" },
              admin: { initCollapsed: true, description: "Порядок меняется перетаскиванием" },
              fields: [
                { name: "question", type: "text", label: "Вопрос", required: true },
                { name: "answer", type: "textarea", label: "Ответ", required: true },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "SEO-настройки",
              fields: [
                { name: "title", type: "text", label: "Title", admin: { description: "Рекомендуется до 60–70 символов" } },
                { name: "description", type: "textarea", label: "Description" },
                { name: "keywords", type: "text", label: "Keywords" },
                {
                  name: "canonical",
                  type: "text",
                  label: "Canonical",
                  admin: { description: "Оставьте пустым: подставится адрес страницы" },
                },
                { name: "noindex", type: "checkbox", label: "Запретить индексацию", defaultValue: false },
              ],
            },
          ],
        },
        {
          label: "Open Graph",
          fields: [
            {
              name: "og",
              type: "group",
              label: "Превью в соцсетях и мессенджерах",
              fields: [
                { name: "title", type: "text", label: "OG Title", admin: { description: "Пусто: возьмётся Title" } },
                { name: "description", type: "textarea", label: "OG Description", admin: { description: "Пусто: возьмётся Description" } },
                { name: "image", type: "upload", relationTo: "media", label: "OG Image", admin: { description: "Пусто: картинка по умолчанию" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};