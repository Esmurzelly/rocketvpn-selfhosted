/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

const SIZE: Record<string, string> = {
  small: "max-w-[320px]",
  medium: "max-w-[560px]",
  full: "max-w-full",
};

export const richConverters: JSXConvertersFunction<any> = ({ defaultConverters }): any => ({
  ...defaultConverters,

  upload: ({ node }: any) => {
    const media = node.value;
    if (!media || typeof media !== "object" || !media.url) return null;

    const size = SIZE[node.fields?.size ?? "full"] ?? SIZE.full;
    const alt = node.fields?.alt || media.alt || "";
    const caption = node.fields?.caption;

    return (
      <figure className={`mx-auto my-8 ${size}`}>
        <img
          src={media.url}
          alt={alt}
          width={media.width ?? undefined}
          height={media.height ?? undefined}
          loading="lazy"
          className="h-auto w-full rounded-[16px]"
        />
        {caption && (
          <figcaption className="mt-2 text-center text-[11px] text-text-gray xl:text-[13px]">{caption}</figcaption>
        )}
      </figure>
    );
  },

  // широкая таблица прокручивается вбок внутри своего блока, страница не ломается
  table: ({ node, nodesToJSX }: any) => (
    <div
      className="my-8 overflow-x-auto rounded-[12px] border border-bg-country-border"
      tabIndex={0}
      role="region"
      aria-label="Таблица, прокручивается по горизонтали"
    >
      <table className="w-full border-collapse">
        <tbody>{nodesToJSX({ nodes: node.children })}</tbody>
      </table>
    </div>
  ),
  tablerow: ({ node, nodesToJSX }: any) => <tr>{nodesToJSX({ nodes: node.children })}</tr>,
  tablecell: ({ node, nodesToJSX }: any) => {
    const Tag = node.headerState ? "th" : "td";
    return (
      <Tag
        colSpan={node.colSpan > 1 ? node.colSpan : undefined}
        rowSpan={node.rowSpan > 1 ? node.rowSpan : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
});

// оформление таблиц: подключается к обёртке текста
export const tableClasses = `
  [&_table]:text-[12px] xl:[&_table]:text-[15px]
  [&_td]:min-w-[110px] [&_td]:border [&_td]:border-bg-country-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-left [&_td]:align-top
  [&_th]:min-w-[110px] [&_th]:border [&_th]:border-bg-country-border [&_th]:bg-bg-country [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:align-top
  [&_td_p]:mt-0 [&_td_p]:text-[12px] xl:[&_td_p]:text-[15px] [&_td_p]:leading-[140%]
  [&_th_p]:mt-0 [&_th_p]:text-[12px] xl:[&_th_p]:text-[15px] [&_th_p]:leading-[140%]
  [&_tr:first-child>*]:border-t-0 [&_tr:last-child>*]:border-b-0
  [&_tr>*:first-child]:border-l-0 [&_tr>*:last-child]:border-r-0
`;