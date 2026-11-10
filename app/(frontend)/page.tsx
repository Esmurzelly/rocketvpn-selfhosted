import Countries from "@/components/sections/Countries";
import CtaBanner from "@/components/sections/CtaBanner";
import CtaFinal from "@/components/sections/CtaFinal";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Whyus from "@/components/sections/Whyus";
import JsonLd from "@/components/seo/JsonLd";
import { homeFaq } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function Home() {
  return (
    <main>
      <Hero h1_string="Быстрый VPN для свободного доступа в интернет" description="Rocket VPN для свободного и безопасного доступа в интернет. Высокая скорость, стабильные серверы, поддержка Windows, Android, iPhone, macOS и Android TV." />
      <Whyus />
      <Countries />
      <CtaBanner />
      <Pricing />
      <Faq title="Ответы на вопросы" items={homeFaq} defaultOpenFirst={true} groupName="faq-home" />
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
