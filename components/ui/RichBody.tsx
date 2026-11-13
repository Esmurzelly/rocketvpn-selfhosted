import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Page } from "@/payload-types";
import { richConverters, tableClasses } from "./rich-shared";

export default function RichBody({
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
        [&_p]:mt-6 [&_p]:text-[12px] [&_p]:leading-[140%] xl:[&_p]:text-[18px]
        [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:pl-6
        [&_a]:underline [&>:first-child]:mt-0
        ${tableClasses} ${className}`}
    >
      <RichText data={data} converters={richConverters} />
    </div>
  );
}