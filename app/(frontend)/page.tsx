import Countries from "@/components/sections/Countries";
import CtaBanner from "@/components/sections/CtaBanner";
import CtaFinal from "@/components/sections/CtaFinal";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Whyus from "@/components/sections/Whyus";
import JsonLd from "@/components/seo/JsonLd";
import { getPage, toFaqItems } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import NotFound from "./not-found";


export async function generateMetadata() {
  return buildMetadata("home");
}

export default async function Home() {
  const page = await getPage("home");
  if (!page) NotFound();

  return (
    <main>
      <Hero h1_string={page?.h1} description={page?.heroText ?? undefined} ctaHref={page?.ctaUrl || undefined} />
      <Whyus />
      <Countries />
      <CtaBanner />
      <Pricing />
      <Faq items={toFaqItems(page?.faq)} defaultOpenFirst groupName="faq-home" />
      <CtaFinal />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Rocket VPN",
          url: "https://rkt-vpn.com",
          logo: "https://rkt-vpn.com/icons/logo.svg",
        }}
      />
    </main>
  );
}
