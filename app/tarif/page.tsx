import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import Pricing from '@/components/sections/Pricing'
import { tarifFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo'

type Props = {}

export const metadata = buildMetadata("tarif");

const page = (props: Props) => {
  return (
    <main>
      <Hero h1_string='Тарифы Rocket VPN' description='Сравните тарифы Rocket VPN, выберите подходящий срок подписки и подключите быстрый VPN для смартфона, компьютера, телевизора и других устройств.' />
      <Pricing />
      <Faq title="Ответы на вопросы" items={tarifFaq} defaultOpenFirst={true} groupName="faq-tarif" />
    </main>
  )
}

export default page