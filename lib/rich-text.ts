import {
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

type Options = { images?: boolean };

export const contentEditor = ({ images = false }: Options = {}) =>
  lexicalEditor({
    features: ({ defaultFeatures }) => [
      // стандартные возможности без собственных вариантов заголовков и загрузки
      ...defaultFeatures.filter((f) => !["heading", "upload"].includes(f.key)),
      // H1 в тексте не нужен: у страницы или статьи он уже есть
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
      EXPERIMENTAL_TableFeature(),
      ...(images
        ? [
            UploadFeature({
              collections: {
                media: {
                  fields: [
                    { name: "caption", type: "text", label: "Подпись под картинкой" },
                    {
                      name: "alt",
                      type: "text",
                      label: "Alt-текст",
                      admin: { description: "Если пусто, возьмётся описание файла из раздела Media" },
                    },
                    {
                      name: "size",
                      type: "select",
                      label: "Размер на странице",
                      defaultValue: "full",
                      options: [
                        { label: "Маленькая", value: "small" },
                        { label: "Средняя", value: "medium" },
                        { label: "На всю ширину", value: "full" },
                      ],
                    },
                  ],
                },
              },
            }),
          ]
        : []),
    ],
  });