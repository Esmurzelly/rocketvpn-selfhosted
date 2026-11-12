/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Page } from "@/payload-types";

const SIZE: Record<string, string> = {
  small: "max-w-[320px]",
  medium: "max-w-[560px]",
  full: "max-w-full",
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
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

  // на телефоне широкая таблица прокручивается вбок, а не ломает страницу
  table: ({ node, nodesToJSX }: any) => (
    <div className="my-8 overflow-x-auto rounded-[12px] border border-bg-country-border">
      <table className="w-full min-w-[520px] border-collapse text-left text-[12px] xl:text-[15px]">
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

export default function ArticleBody({
  data,
  className = "",
}: {
  data: NonNullable<Page["content"]>;
  className?: string;
}) {
  return (
    <div
      className={`[&_h2]:mt-10 [&_h2]:text-[22px] xl:[&_h2]:text-[32px]
        [&_h3]:mt-8 [&_h3]:text-[18px] xl:[&_h3]:text-[24px]
        [&_p]:mt-6 [&_p]:text-[13px] [&_p]:leading-[150%] xl:[&_p]:text-[18px]
        [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2
        [&_a]:underline [&>:first-child]:mt-0
        [&_td]:border [&_td]:border-bg-country-border [&_td]:px-3 [&_td]:py-2
        [&_th]:border [&_th]:border-bg-country-border [&_th]:bg-bg-country [&_th]:px-3 [&_th]:py-2 [&_th]:font-medium
        [&_td_p]:m-0 [&_th_p]:m-0 ${className}`}
    >
      <RichText data={data} converters={converters} />
    </div>
  );
}