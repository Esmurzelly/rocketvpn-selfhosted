import Faq from '@/components/sections/Faq'
import { proxyFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("proxy");

type Props = {}

const Proxy = (props: Props) => {
    return (
        <main>
            <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
                <div className="text-left xl:text-center">
                    <h1 className='text-[26px] xl:text-[56px] max-w-[880px] mx-auto tracking-[-0.05em]'>Что такое прокси-сервер и чем прокси отличается от VPN</h1>
                    <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Простое объяснение, что такое прокси-сервер, как он работает, для чего используется и чем прокси отличается от полноценного VPN-соединения.</p>
                </div>

                <div className="max-w-[880px] mx-auto text-left xl:text-center mt-[64px] xl:mt-[96px] space-y-[24px]">
                    <h2 className='text-[22px] xl:text-[32px]'>Что такое прокси?</h2>

                    <p className='text-[12px] xl:text-[18px] leading-[140%]'>Прокси-сервер — это промежуточный узел между вашим устройством и сайтом или сервисом, к которому вы подключаетесь. Вместо прямого обращения запрос сначала проходит через прокси, а уже затем отправляется на нужный ресурс. В результате сайт видит IP-адрес прокси-сервера, а не исходный адрес пользователя.</p>
                    <p className='text-[12px] xl:text-[18px] leading-[140%]'>Прокси используют для доступа к отдельным сайтам и приложениям, смены IP-адреса, работы с мессенджерами, автоматизации задач и маршрутизации трафика через другой регион. Например, прокси может применяться только для Telegram, браузера или конкретной программы, не затрагивая остальное интернет-соединение на устройстве.</p>
                    <p className='text-[12px] xl:text-[18px] leading-[140%]'>При этом прокси и VPN работают по-разному. Прокси обычно перенаправляет трафик отдельного приложения и не всегда шифрует данные. VPN создает защищенный канал для всего соединения или выбранных приложений, поэтому лучше подходит для безопасного использования интернета, общественных Wi-Fi-сетей, просмотра видео и работы с сервисами.</p>
                    <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN объединяет удобное подключение, стабильную скорость и защиту трафика. Пользователю не нужно вручную искать адрес прокси, порт и параметры авторизации — достаточно выбрать нужный режим и подключиться.</p>
                </div>
            </section>
            <Faq title="Ответы на вопросы" items={proxyFaq} defaultOpenFirst={true} groupName="faq-proxy" />
        </main>
    )
}

export default Proxy