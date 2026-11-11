import type { CollectionConfig } from "payload";

// адреса, которые заняты самим сайтом или админкой
const RESERVED_SLUGS = ["admin", "api", "dev-import", "dev-import-text"];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Страница", plural: "Страницы" },
  admin: {
    useAsTitle: "h1",
    defaultColumns: ["h1", "slug", "template", "updatedAt"],
  },
  access: { read: () => true },
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
        description: "Только латиница, цифры и дефис: telegram, dota2, tarif. Главная страница: home",
      },
      validate: (value?: string | null) => {
        if (!/^[a-z0-9-]+$/.test(value ?? "")) {
          return "Допустимы только строчные латинские буквы, цифры и дефис";
        }
        if (RESERVED_SLUGS.includes(value as string)) {
          return "Этот адрес зарезервирован, выберите другой";
        }
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