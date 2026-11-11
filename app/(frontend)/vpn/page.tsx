import CtaFinal from '@/components/sections/CtaFinal'
import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import { getPage, toFaqItems } from '@/lib/pages'
import { buildMetadata } from '@/lib/seo'
import NotFound from '../not-found'

type Props = {}

export async function generateMetadata() {
  return buildMetadata("vpn");
}

const page = async (props: Props) => {
  const page = await getPage("vpn");
  if (!page) NotFound();

  return (
    <main>
      <Hero h1_string={page?.h1} description={page?.heroText ?? undefined} ctaHref={page?.ctaUrl || undefined} />
      <ServicesGrid />
      <Faq items={toFaqItems(page?.faq)} defaultOpenFirst groupName="faq-vpn" />
      <CtaFinal />
    </main>
  )
}

export default page