import Faq from '@/components/sections/Faq'
import { aboutFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("about");

type Props = {}

const page = (props: Props) => {
  return (
    <main>
      <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
        <div className="text-left xl:text-center">
          <h1 className='text-[26px] xl:text-[56px] max-w-[880px] mx-auto tracking-[-0.05em]'>О Rocket VPN — надежный VPN-сервис для любых устройств</h1>
          <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Узнайте больше о Rocket VPN, принципах работы сервиса, инфраструктуре, безопасности, поддерживаемых устройствах и возможностях подключения.</p>
        </div>

        <div className="max-w-[880px] mx-auto text-left xl:text-center mt-[64px] xl:mt-[96px] space-y-[64px]">
          <div className="space-y-[24px] xl:space-y-[30px]">
            <h2 className='text-[22px] xl:text-[32px]'>О сервисе</h2>

            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN — это современный VPN-сервис, созданный для пользователей, которым важны свободный доступ к интернету, высокая скорость соединения и защита личных данных. Мы развиваем сервис с учетом современных требований к безопасности, стабильности подключения и удобству использования, чтобы VPN работал без сложных настроек и был доступен каждому.</p>
            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Сегодня Rocket VPN используют десятки тысяч пользователей для работы, общения, просмотра видео, игр, обучения и доступа к современным онлайн-сервисам. Наши серверы расположены в более чем 25 странах мира, что позволяет подобрать оптимальный маршрут подключения и обеспечить комфортную скорость практически для любых повседневных задач.</p>
          </div>
          
          <div className="space-y-[24px] xl:space-y-[30px]">
            <h2 className='text-[22px] xl:text-[32px]'>Устройства и безопасность</h2>

            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Мы поддерживаем все популярные платформы: Windows, macOS, Linux, Android, iPhone, iPad и Android TV. Одной подписки достаточно для подключения неограниченного количества устройств, поэтому пользоваться Rocket VPN можно одновременно дома, на работе и в поездках.</p>
            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Особое внимание мы уделяем безопасности. Для защиты соединения используются современные VPN-протоколы, надежное шифрование AES-256 и механизмы предотвращения утечек DNS. Это помогает защитить интернет-трафик при подключении через домашние сети, мобильный интернет и общественные точки Wi-Fi.</p>
          </div>

          <div className="space-y-[24px] xl:space-y-[30px]">
            <h2 className='text-[22px] xl:text-[32px]'>Простота подключения и развитие</h2>

            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Наша цель — сделать использование VPN максимально простым. Пользователю не нужно разбираться в настройках серверов, протоколов и маршрутизации трафика. Достаточно установить приложение, выбрать тариф и подключиться в один клик. Система автоматически подберет оптимальный способ подключения с учетом устройства, сети и текущих условий.</p>
            <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN постоянно развивается: мы расширяем сеть серверов, улучшаем производительность, добавляем поддержку новых сервисов и устройств, совершенствуем защиту соединения и оперативно реагируем на изменения интернет-инфраструктуры. Благодаря этому пользователи получают стабильный, быстрый и удобный VPN для работы, общения, развлечений и повседневного использования.</p>
          </div>
        </div>
      </section>
      <Faq title="Ответы на вопросы" items={aboutFaq} defaultOpenFirst={true} groupName="faq-about" />
    </main>
  )
}

export default page