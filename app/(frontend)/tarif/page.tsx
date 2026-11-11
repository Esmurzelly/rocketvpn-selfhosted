import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import Pricing from '@/components/sections/Pricing'
import { tarifFaq } from '@/content/faq'
import { getPage, toFaqItems } from '@/lib/pages'
import { buildMetadata } from '@/lib/seo'
import NotFound from '../not-found'

type Props = {}

// export const metadata = buildMetadata("tarif");

export async function generateMetadata() {
  return buildMetadata("tarif");
}

const page = async (props: Props) => {
  const page = await getPage("tarif");
  if (!page) NotFound();

  return (
    <main>
      {/* <Hero h1_string='Тарифы Rocket VPN' description='Сравните тарифы Rocket VPN, выберите подходящий срок подписки и подключите быстрый VPN для смартфона, компьютера, телевизора и других устройств.' /> */}
      <Hero h1_string={page?.h1} description={page?.heroText ?? undefined} ctaHref={page?.ctaUrl || undefined} />
      <Pricing />
      {/* <Faq title="Ответы на вопросы" items={tarifFaq} defaultOpenFirst={true} groupName="faq-tarif" /> */}
      <Faq items={toFaqItems(page?.faq)} groupName="faq-tarif" />
    </main>
  )
}

export default page