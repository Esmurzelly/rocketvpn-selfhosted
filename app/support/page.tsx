import Faq from '@/components/sections/Faq'
import { supportFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

type Props = {}

export const metadata = buildMetadata("support");

const page = (props: Props) => {
  return (
    <main>
      <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
        <div className="text-left xl:text-center">
          <h1 className='text-[26px] xl:text-[56px] max-w-[880px] mx-auto tracking-[-0.05em]'>Поддержка Rocket VPN 24/7 — помощь с подключением и настройкой</h1>
          <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Служба поддержки Rocket VPN работает круглосуточно. Поможем с установкой, подключением, оплатой, тарифами и настройкой VPN на разных устройствах.</p>
        </div>

        <div className="xl:flex xl:flex-row xl:justify-between max-w-[1180px] xl:gap-[40px] mx-auto text-left mt-[64px] xl:mt-[96px] space-y-[40px]">
          <div className="space-y-[24px]">
            <h2 className='text-[22px] xl:text-[32px]'>Помощь с подключением</h2>

            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Служба поддержки Rocket VPN помогает решать вопросы, связанные с установкой приложения, подключением к серверам, выбором тарифа, оплатой подписки и работой VPN на разных устройствах. Обратиться за помощью можно в любое время — поддержка работает круглосуточно, без выходных и праздников.</p>
            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Специалисты помогают пользователям Windows, macOS, Linux, Android, iPhone, iPad и Android TV. При обращении желательно сразу указать устройство, версию операционной системы, тип подключения к интернету, выбранный сервер и краткое описание проблемы. Это помогает быстрее определить причину и предложить конкретное решение.</p>
          </div>

          <div className="space-y-[24px]">
            <h2 className='text-[22px] xl:text-[32px]'>Решение вопросов</h2>

            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Через поддержку можно уточнить, почему VPN не подключается, что делать при снижении скорости, как сменить сервер, как восстановить подписку после оплаты и как настроить Rocket VPN на новом устройстве. Большинство вопросов решается без сложных технических действий — достаточно выполнить несколько пошаговых рекомендаций.</p>
            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Также команда поддержки консультирует по работе Rocket VPN с YouTube, Telegram, Discord, ChatGPT, стриминговыми платформами, играми и другими сервисами. При необходимости пользователь может приложить скриншот ошибки, чтобы специалист быстрее разобрался в ситуации.</p>
          </div>
        </div>
      </section>
      <Faq title="Ответы на вопросы" items={supportFaq} defaultOpenFirst={true} groupName="faq-support" />
    </main>
  )
}

export default page