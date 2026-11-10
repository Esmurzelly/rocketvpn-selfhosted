import CtaFinal from '@/components/sections/CtaFinal'
import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import { vpnFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo'

type Props = {}

export const metadata = buildMetadata("vpn");

const page = (props: Props) => {
  return (
    <main>
      <Hero h1_string='VPN для любых сервисов и задач' description='Rocket VPN открывает доступ ко всем популярным сайтам, приложениям и сервисам: обходите блокировки, ограничения провайдеров, смотрите видео, играйте и общайтесь без ограничений' />
      <ServicesGrid />
      <Faq title="Ответы на вопросы" items={vpnFaq} defaultOpenFirst={true} groupName="faq-vpn" />
      <CtaFinal />
    </main>
  )
}

export default page