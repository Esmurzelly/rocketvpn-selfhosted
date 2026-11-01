import Faq from '@/components/sections/Faq'
import { conditionsFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata("conditions");

type Props = {}

const page = (props: Props) => {
    return (
        <main>
            <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
                <div className="text-left max-w-[1180px] mx-auto">
                    <h1 className='text-[26px] xl:text-[56px] max-w-[870px] tracking-[-0.05em]'>Условия предоставления услуг <br className='hidden xl:block' /> Rocket VPN</h1>
                    <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[620px] xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Условия использования сервиса Rocket VPN: порядок подключения, оплаты, предоставления услуг, права и обязанности пользователей и исполнителя.</p>
                </div>

                <div className="max-w-[1180px] mx-auto text-left mt-[64px] xl:mt-[96px] space-y-[32px] xl:space-y-[40px]">
                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>1. Подключение и доступ</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN предоставляет доступ к VPN-сервису на основании выбранного пользователем тарифа. После оформления подписки пользователь получает возможность подключаться к доступным серверам, использовать приложения на совместимых устройствах и пользоваться функциями сервиса в течение оплаченного периода.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>2. Оплата и продление</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Перед оплатой рекомендуется ознакомиться со стоимостью тарифа, сроком действия подписки, порядком продления и условиями возврата средств. Актуальная информация о цене, доступных регионах и продолжительности подписки указывается на странице тарифов и в личном кабинете пользователя.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>3. Ответственность пользователя</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Пользователь самостоятельно отвечает за сохранность данных своей учетной записи и корректное использование сервиса. Запрещается применять Rocket VPN для действий, нарушающих законодательство, права третьих лиц, работу информационных систем или правила сервисов, к которым осуществляется подключение.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>4. Доступность сервиса</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN стремится обеспечивать стабильную работу серверов и приложений, однако скорость и доступность отдельных ресурсов могут зависеть от интернет-провайдера, выбранного региона, загрузки сети, характеристик устройства и технических ограничений сторонних платформ.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>5. Обновления и поддержка</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Сервис может обновлять приложения, серверную инфраструктуру и порядок подключения для повышения безопасности и стабильности работы. При возникновении вопросов по тарифу, оплате или использованию VPN пользователь может обратиться в службу поддержки Rocket VPN.</p>
                    </div>
                </div>
            </section>
            <Faq title="Ответы на вопросы" items={conditionsFaq} defaultOpenFirst={true} groupName="faq-conditions" />
        </main>
    )
}

export default page