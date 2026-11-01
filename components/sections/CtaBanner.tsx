import Image from 'next/image'
import ButtonLink from '../ui/ButtonLink';

const features = [
  "Поддержка всех операционных систем: Windows, MacOS, Android, iOS, Android TV и другие",
  "Без ограничений по количеству устройств. Используйте одновременно на телефоне, ноутбуке и телевизоре",
  "Пошаговые инструкции по подключению VPN на все устройства",
];

const CtaBanner = () => {
  return (
    <section className="mt-[64px] px-[16px] xl:mx-auto xl:w-[1240px] xl:px-0">
      <div className="flex flex-col items-center overflow-hidden rounded-[30px] xl:rounded-[60px] bg-card-total border border-bg-country-border pt-[30px] xl:min-h-[744px] xl:flex-row xl:pt-0">
        {/* text: desktop right */}
        <div className="px-[30px] xl:w-[42%] xl:self-center xl:px-0 xl:py-[56px] xl:pr-[40px]">
          <h2 className="w-full text-left text-[26px] leading-[120%] tracking-[-0.05em] xl:w-[405px] xl:text-[56px]">
            Одна подписка на всех ваших устройствах
          </h2>

          <ul className="mt-[25px] flex flex-col items-start gap-[24px] text-left xl:ml-[30px] xl:w-[365px]">
            {features.map((text) => (
              <li
                key={text}
                className="ml-[10px] text-[13px] xl:relative xl:text-[17px] xl:leading-[140%]
                  before:-ml-[18px] before:-mt-[4px] before:block before:size-4.5
                  before:bg-[url('/icons/arrow-down.svg')] before:bg-contain before:bg-center before:bg-no-repeat before:content-['']
                  xl:before:absolute xl:before:-left-[26px] xl:before:-top-[10px] xl:before:m-0 xl:before:size-6"
              >
                {text}
              </li>
            ))}
          </ul>

          <div className="hidden mt-[40px] items-center gap-[20px] xl:flex">
            <ButtonLink iconBoolean={true} className="min-w-[237px] px-[26.5px] py-[25px]" href="/tarif">Подключить VPN</ButtonLink>

            <div className="h-[58px] w-px bg-[#191B20]" />

            <div className="flex items-center gap-[14px]">
              <Image src="/icons/users.svg" alt="" width={17} height={13} className="min-w-[17px]" />
              <span className="w-[175px] text-[11px] leading-[130%] tracking-[-0.05em] text-text-gray">
                Для новых пользователей действует бесплатный пробный период на 3 дня
              </span>
            </div>
          </div>
        </div>

        {/* laptop + R: desktop left */}
        <div
          className="relative mx-auto mt-[37px] w-full
    before:pointer-events-none before:absolute before:opacity-15 before:z-0 before:aspect-square before:content-['']
    before:-right-[46%] before:top-[3%] before:w-[175%]
    before:bg-[url('/images/latter-r.png')] before:bg-contain before:bg-no-repeat
    xl:order-first xl:mx-0 xl:mt-0 xl:w-[58%] xl:self-stretch
    xl:before:left-[5%] xl:before:right-auto xl:before:top-[8%] xl:before:aspect-auto
    xl:before:h-[92%] xl:before:w-[96%] xl:before:bg-left-bottom"
        >
          <Image
            src="/images/laptop-with-phone.png"
            alt="Приложение Rocket VPN на ноутбуке"
            width={257}
            height={328}
            className="relative left-[2%] top-[3%] z-10 h-auto w-full min-w-[257px]
      xl:absolute xl:left-[6%] xl:top-[2%] xl:w-[566px] xl:min-w-0 xl:max-w-none"
          />
        </div>
      </div>
    </section>
  )
}

export default CtaBanner