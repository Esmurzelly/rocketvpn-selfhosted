import type { CollectionConfig } from "payload";
import { deleteRedirectsHook, slugRedirectHook } from "../lib/redirect-hooks";
import { contentEditor } from "../lib/rich-text";
import { revalidateAfterChange, revalidateAfterDelete } from "@/lib/revalidate";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const previewUrl = (slug?: string | null) =>
  slug ? `${SERVER_URL}/next/preview?path=${encodeURIComponent(`/blog/${slug}`)}` : null;

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Статья", plural: "Статьи" },
  defaultSort: "-publishedAt",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "publishedAt"],
    // предпросмотр рядом с формой: телефон и компьютер
    livePreview: {
      url: ({ data }) => previewUrl(data?.slug),
      breakpoints: [
        { label: "Телефон", name: "mobile", width: 375, height: 812 },
        { label: "Компьютер", name: "desktop", width: 1440, height: 900 },
      ],
    },
    // кнопка «Предпросмотр» в новой вкладке
    preview: (doc) => previewUrl(doc?.slug as string | undefined),
  },
  access: {
    // без входа видны только опубликованные
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  versions: {
    maxPerDoc: 30,
    drafts: { autosave: { interval: 800 } },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // дата заполняется при первой публикации, если её не задали вручную
        if (data._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [slugRedirectHook("/blog"), revalidateAfterChange("posts")],
    afterDelete: [deleteRedirectsHook("/blog"), revalidateAfterDelete("posts")],
  },
  fields: [
    { name: "title", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Адрес статьи",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Латиница, цифры и дефис. Статья будет по адресу /blog/адрес. При смене адреса со старого создаётся переадресация",
      },
      validate: async (value: string | null | undefined, { req, id }: any) => {
        const slug = value ?? "";
        if (!/^[a-z0-9-]+$/.test(slug)) return "Допустимы только строчные латинские буквы, цифры и дефис";

        const { totalDocs } = await req.payload.count({
          collection: "posts",
          where: { slug: { equals: slug }, ...(id ? { id: { not_equals: id } } : {}) },
          req,
        });
        return totalDocs > 0 ? "Статья с таким адресом уже существует" : true;
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Дата публикации",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Краткое описание",
      required: true,
      maxLength: 300,
      admin: { description: "Показывается в списке статей. До 300 символов" },
    },
    { name: "cover", type: "upload", relationTo: "media", label: "Обложка", required: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Текст",
          fields: [
            {
              name: "content",
              type: "richText",
              label: "Текст статьи",
              required: true,
              editor: contentEditor({ images: true }),
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
                { name: "title", type: "text", label: "Title", admin: { description: "Пусто: возьмётся название статьи" } },
                { name: "description", type: "textarea", label: "Description", admin: { description: "Пусто: возьмётся краткое описание" } },
                { name: "keywords", type: "text", label: "Keywords" },
                { name: "canonical", type: "text", label: "Canonical", admin: { description: "Пусто: подставится адрес статьи" } },
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
                { name: "image", type: "upload", relationTo: "media", label: "OG Image", admin: { description: "Пусто: обложка статьи" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};