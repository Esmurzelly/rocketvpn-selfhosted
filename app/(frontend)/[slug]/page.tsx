import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import { getPage, toFaqItems } from "@/lib/pages";
import { RichText } from "@payloadcms/richtext-lexical/react";
import TextPage from "@/components/sections/TextPage";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic"; // временно: каждая страница читается из базы при каждом запросе

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata(slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const faq = toFaqItems(page.faq);

  if (page.template === "text") return <TextPage page={page} align="center" />;
  if (page.template === "document") return <TextPage page={page} align="left" />;

  return (
    <main>
      <Hero
        picture={page.heroPicture ?? "phone"}
        h1_string={page.h1}
        description={page.heroText ?? undefined}
        ctaHref={page.ctaUrl || undefined}
      />

      {page.content && (
        <div
          className="mx-auto mt-[64px] max-w-[860px] px-[16px] text-left xl:mt-[96px] xl:text-center
            [&_h2]:mt-10 [&_h2]:text-[22px] xl:[&_h2]:text-[32px]
            [&_h3]:mt-8 [&_h3]:text-[18px] xl:[&_h3]:text-[24px]
            [&_p]:mt-6 [&_p]:text-[12px] [&_p]:leading-[140%] xl:[&_p]:text-[18px]
            [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:pl-6
            [&_a]:underline"
        >
          <RichText data={page.content} />
        </div>
      )}


      {faq.length > 0 && <Faq items={faq} groupName={`faq-${slug}`} />}
      <CtaFinal />
    </main>
  );
}