import Faq from '@/components/sections/Faq'
import { cookiesFaq } from '@/content/faq'
import { buildMetadata } from '@/lib/seo';

// export const metadata = buildMetadata("cookies");

export async function generateMetadata() {
  return buildMetadata("cookies");
}

type Props = {}

const page = (props: Props) => {
    return (
        <main>
            <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
                <div className="text-left max-w-[1180px] mx-auto">
                    <h1 className='text-[26px] xl:text-[56px] max-w-[870px] tracking-[-0.05em]'>Политика использования <br className='hidden xl:block' /> файлов cookies</h1>
                    <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[620px] xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Информация об использовании файлов cookies на сайте Rocket VPN, целях их применения, сроках хранения и способах управления настройками браузера.</p>
                </div>

                <div className="max-w-[1180px] mx-auto text-left mt-[64px] xl:mt-[96px] space-y-[32px] xl:space-y-[40px]">
                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>1. Для чего нужны cookies</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Сайт Rocket VPN использует файлы cookies и похожие технологии, чтобы корректно работать, запоминать пользовательские настройки, сохранять состояние авторизации, анализировать посещаемость и улучшать удобство использования сервиса.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>2. Как работают cookies</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Cookies представляют собой небольшие текстовые файлы, которые сохраняются браузером на устройстве пользователя. Они могут использоваться для распознавания повторного посещения, сохранения выбранного языка, настроек интерфейса, параметров сессии и других технических данных.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>3. Категории и согласие</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Часть cookies необходима для базовой работы сайта и не может быть отключена без потери отдельных функций. Другие cookies могут применяться для аналитики, оценки эффективности страниц, рекламы и персонализации контента. Такие технологии должны использоваться только после получения согласия пользователя, если это требуется применимым законодательством.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>4. Сторонние сервисы</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Rocket VPN может использовать собственные cookies и cookies сторонних сервисов, например систем аналитики, платёжных платформ, сервисов поддержки и встроенных элементов. Сторонние поставщики обрабатывают информацию в соответствии со своими политиками конфиденциальности.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>5. Управление в браузере</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Пользователь может изменить настройки cookies через браузер, удалить сохранённые файлы или запретить их использование. При этом отдельные функции сайта, личного кабинета, оплаты и авторизации могут работать некорректно.</p>
                    </div>

                    <div className="space-y-[16px] xl:space-y-[20px] max-w-[870px]">
                        <h2 className='text-[22px] xl:text-[32px]'>6. Состав и обновление политики</h2>
                        <p className='text-[12px] xl:text-[18px] leading-[140%]'>Политика cookies должна содержать фактический перечень используемых технологий, их назначение, срок хранения и категории данных. Если состав подключённых сервисов меняется, документ необходимо обновлять.</p>
                    </div>
                </div>
            </section>
            <Faq title="Ответы на вопросы" items={cookiesFaq} defaultOpenFirst={true} groupName="faq-cookies" />
        </main>
    )
}

export default page