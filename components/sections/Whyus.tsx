import Image from "next/image";
import Speedometer from "./Speedometer";

const card =
    "relative overflow-hidden border border-bg-country-border bg-card-gray p-[20px] pb-[0px] " +
    "rounded-card-choose-mobile xl:rounded-card-choose-desktop " +
    "rounded-[30px]";

const title = "text-[16px] leading-[120%] xl:text-[20px]";
const text = "mt-3 text-[12px] xl:text-[16px] leading-[140%] text-text-gray";
const tag =
    "rounded-button border border-bg-country-border px-3 py-1 text-[10px] xl:text-[14px] xl:text-nowrap text-text-gray";


type Props = {}

const Whyus = (props: Props) => {
    return (
        <section className="bg-bg flex flex-col items-center px-[16px] xl:px-0 mt-[54px] xl:mt-[74px] text-center xl:w-[1180px] xl:mx-auto">
            <div className="mx-auto w-full max-w-content">
                <h2 className="text-[26px] xl:text-[56px] leading-[120%] tracking-[-0.05em] w-[188px] xl:w-auto mx-auto xl:text-left">Почему нас выбирают?</h2>

                <div className="mt-15 text-left grid gap-4 xl:mt-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)] xl:grid-rows-2">
                    <article className={`${card} flex flex-col xl:p-[35px] xl:row-span-2 !pb-[0px]`}>
                        <h3 className={title}>
                            Безграничный доступ <br /> к глобальному контенту
                        </h3>
                        <p className={`${text} xl:w-[319px]`}>
                            Обходите географические блокировки и получайте доступ к социальным
                            сетям, стриминговым платформам и сайтам
                        </p>

                        <div className="xl:relative xl:h-full xl:flex xl:flex-col">
                            <span
                                className="absolute left-1/2 top-24 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-button border border-[#1C1E24] bg-[#101113] px-[16px] py-[7px] text-[14px] text-text-gray xl:flex
    after:absolute after:left-1/2 after:top-full after:-mt-[5px] after:size-[10px] after:-translate-x-1/2 after:rotate-45
    after:border-b after:rounded-[2px] after:border-r after:border-[#1C1E24] after:bg-[#101113] after:content-['']"
                            >
                                Нидерланды
                                <Image
                                    src="/icons/network.svg"
                                    alt=""
                                    width={11}
                                    height={11}
                                    className="max-w-[11px]"
                                />
                            </span>
                            <Image
                                src="/images/phone-apps.png"
                                alt="Смартфон с приложениями ChatGPT, YouTube, Discord и Rocket VPN"
                                width={247}
                                height={400}
                                sizes="(min-width: 1024px) 247px, 100vw"
                                className="mx-auto mt-auto xl:mt-[70px] h-auto w-full max-w-[247px] xl:max-w-[310px] pt-[34px] xl:pt-[83px]"
                            />
                        </div>

                    </article>

                    <article className={`${card} flex flex-col gap-6 xl:gap-20 xl:p-[35px] xl:flex-row xl:items-center xl:justify-between`}>
                        <div className="xl:max-w-[260px] flex-1 h-full xl:flex xl:flex-col xl:items-start xl:justify-between">
                            <h3 className={title}>
                                Стабильная скорость <br /> и никаких ограничений
                            </h3>
                            <p className={text}>
                                Серверы в 25+ странах оптимизированы для работы с ресурсоёмкими задачами
                            </p>
                            <ul className="mt-3 flex flex-col items-start justify-between gap-2 ">
                                <li className={tag}>безлимитный трафик</li>
                                <li className={tag}>без ограничений по количеству устройств</li>
                            </ul>
                        </div>

                        <div className="xl:flex xl:flex-col xl:self-stretch pb-[23px] xl:pb-0">
                            {/* <Image
                                src="/images/speed.png"
                                alt="Спидометр и загрузка файла на высокой скорости"
                                width={220}
                                height={118}
                                className="mx-auto h-auto w-full max-w-[300px] self-center xl:w-[420px]"
                            /> */}

                            <Speedometer />

                            <div className="flex flex-row items-center gap-3 xl:mt-auto">
                                <Image
                                    src="/icons/video-player.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="h-auto w-full max-w-[32px] self-end xl:max-w-[42px]"
                                />

                                <div className="mt-[30px] xl:mt-[0px] flex w-full flex-col items-start gap-[3px]">
                                    <p className="text-[10px] leading-[135%] tracking-[-0.02em] xl:text-[13px]">Breaking Bad.mp4</p>

                                    <div className="flex w-full flex-row items-center justify-between">
                                        <span className="text-[7px] leading-[135%] tracking-[-0.02em] text-text-gray xl:text-[9px]">2.64GB</span>
                                        <span className="text-[7px] leading-[135%] tracking-[-0.02em] text-text-gray xl:text-[9px]">67.7%</span>
                                    </div>

                                    <div className="relative h-[1.65px] w-full rounded-[9px] bg-gray-200">
                                        <div className="absolute left-0 top-0 h-full w-2/3 rounded-l-[9px] bg-button-orange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className={`${card} !pb-4 flex flex-col gap-6 xl:gap-[82px] xl:p-[35px] xl:flex-row xl:items-center xl:justify-between`}>
                        <div className="max-w-[95%] xl:max-w-[290px] xl:h-full">
                            <h3 className={title}>
                                Высокий уровень <br /> безопасности пользователей
                            </h3>
                            <p className={`${text}`}>
                                Шифрование AES-256 и защита от утечек DNS. Даже ваш интернет-провайдер
                                не получит доступ к истории посещений
                            </p>
                        </div>

                        <div className="h-full w-full flex flex-col justify-between">
                            <div className="mt-[35px] xl:mt-0 mb-[26px] xl:mb-[7px] flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-1">
                                    <Image
                                        src="/icons/power-off.svg"
                                        alt="Защита Rocket VPN"
                                        width={6}
                                        height={6}
                                        className="h-auto w-full max-w-[6px] xl:max-w-[9px] self-center"
                                    />
                                    <span className='text-[8px] xl:text-[10px] text-text-gray leading-[120%] tracking-[-0.02em]'>Подключено</span>
                                </div>

                                <span className='text-[8px] xl:text-[10px] text-text-gray leading-[120%] tracking-[-0.02em]'>Rocket VPN</span>
                            </div>

                            <Image
                                src="/images/protection.png"
                                alt="Защита Rocket VPN"
                                width={225}
                                height={177}
                                className="h-auto w-full mx-auto max-w-[225px] xl:max-w-[300px] self-center"
                            />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Whyus