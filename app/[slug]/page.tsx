import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Faq from "@/components/sections/Faq";
import { faqBySlug } from "@/content/faq";
import CtaFinal from "@/components/sections/CtaFinal";
import { heroPictureBySlug } from "@/content/hero-pictures";
import FormattedText from "@/components/ui/FormattedText";

type Props = { params: Promise<{ slug: string }> };

const ownPages = ["home", "vpn", "tarif", "support", "contacts", "blog", "about", "aboutvpn", "proxy", "conditions", "policy", "cookies"];
const slugs = Object.keys(seo).filter((key) => !ownPages.includes(key));

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata(slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = seo[slug];
  const faq = faqBySlug[slug];

  if (!page) notFound();

  return (
    <main>
      <Hero picture={heroPictureBySlug[slug] ?? "phone"} h1_string={page.h1} description={page.main_description} />
      <div className="max-w-[860px] px-[16px] mx-auto text-left xl:text-center mt-[64px] xl:mt-[96px] space-y-[24px]">
          <h2 className='text-[22px] xl:text-[32px]'>{page.h1}</h2>

          <p className='text-[12px] xl:text-[18px] leading-[140%]'>
            <FormattedText text={page.description ?? ""} />
          </p>
          {page.description2 ? <p className='text-[12px] xl:text-[18px] leading-[140%]'>{page.description2}</p> : ""}
          {page.description3 ? <p className='text-[12px] xl:text-[18px] leading-[140%]'>{page.description3}</p> : ""}
          {page.description4 ? <p className='text-[12px] xl:text-[18px] leading-[140%]'>{page.description4}</p> : ""}
        </div>

      {faq && <Faq items={faq} defaultOpenFirst={true} groupName={`faq-${slug}`} />}
      <CtaFinal />
    </main>
  );
}