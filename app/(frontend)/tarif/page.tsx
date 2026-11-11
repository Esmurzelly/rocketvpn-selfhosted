import Faq from '@/components/sections/Faq'
import Hero from '@/components/sections/Hero'
import Pricing from '@/components/sections/Pricing'
import { getPage, toFaqItems } from '@/lib/pages'
import { buildMetadata } from '@/lib/seo'
import NotFound from '../not-found'

export const dynamic = "force-dynamic";

type Props = {}

export async function generateMetadata() {
  return buildMetadata("tarif");
}

const page = async (props: Props) => {
  const page = await getPage("tarif");
  if (!page) NotFound();

  return (
    <main>
      <Hero h1_string={page?.h1} description={page?.heroText ?? undefined} ctaHref={page?.ctaUrl || undefined} />
      <Pricing />
      <Faq items={toFaqItems(page?.faq)} defaultOpenFirst groupName="faq-tarif" />
    </main>
  )
}

export default page