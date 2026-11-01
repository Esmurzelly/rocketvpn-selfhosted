import Faq from '@/components/sections/Faq'
import { vpnProtocolsFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("aboutvpn");

type Props = {}

const Aboutvpn = (props: Props) => {
    return (
        <main>
            <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px]'>
                <h1 className='text-[26px] xl:text-[56px] max-w-[900px] mx-auto leading-[120%] tracking-[-0.05em]'>Протоколы VPN: виды, отличия и принцип работы</h1>
                <p className='mt-[20px] xl:mt-[24px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] leading-[120%] xl:leading-[140%] tracking-[-0.05em]'>Что такое протоколы VPN, как они работают и чем отличаются. Обзор популярных технологий, безопасности, скорости соединения и выбора подходящего протокола.</p>
            </section>
            <Faq title="Ответы на вопросы" items={vpnProtocolsFaq} defaultOpenFirst={true} groupName="faq-about-vpn" />
        </main>
    )
}

export default Aboutvpn