import Faq from '@/components/sections/Faq'
import { contactsFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

type Props = {}

export const metadata = buildMetadata("contacts");

const page = (props: Props) => {
  return (
    <main>
      <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
        <div className="text-left xl:text-center">
          <h1 className='text-[26px] xl:text-[56px] max-w-[880px] mx-auto tracking-[-0.05em]'>Контакты Rocket VPN — связь с поддержкой сервиса</h1>
          <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Контактная информация Rocket VPN. Свяжитесь со службой поддержки по вопросам подключения, тарифов, оплаты, настройки VPN и работы приложений.</p>
        </div>

        <div className="max-w-[860px] mx-auto text-left xl:text-center mt-[64px] xl:mt-[96px] space-y-[24px]">
          <h2 className='text-[22px] xl:text-[32px]'>Контакты</h2>

          <p className='text-[12px] xl:text-[18px] leading-[140%]'>Связаться с командой Rocket VPN можно по вопросам подключения, настройки приложений, оплаты подписки, выбора тарифа и работы сервиса на разных устройствах. Поддержка помогает пользователям Windows, macOS, Linux, Android, iPhone, iPad и Android TV.</p>
          <p className='text-[12px] xl:text-[18px] leading-[140%]'>Перед обращением желательно указать устройство, операционную систему, выбранную страну подключения и кратко описать проблему. Например: VPN не подключается, снизилась скорость, не открывается нужный сервис, не проходит платеж или требуется помощь с установкой приложения.</p>
          <p className='text-[12px] xl:text-[18px] leading-[140%]'>Служба поддержки Rocket VPN работает круглосуточно. Большинство вопросов по подключению, тарифам и настройке можно решить без сложных технических действий. Пользователю достаточно описать ситуацию и, при необходимости, приложить скриншот ошибки.</p>
          <p className='text-[12px] xl:text-[18px] leading-[140%]'>Также через страницу контактов можно уточнить условия подписки, порядок возврата средств, доступность серверов, совместимость с устройствами и особенности использования Rocket VPN для YouTube, Telegram, Discord, ChatGPT, стриминга, игр и других сервисов.</p>
        </div>
      </section>
      <Faq title="Ответы на вопросы" items={contactsFaq} defaultOpenFirst={true} groupName="faq-contacts" />

    </main>
  )
}

export default page