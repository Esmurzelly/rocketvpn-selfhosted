import Image, { getImageProps } from "next/image";
import ButtonLink from "../ui/ButtonLink";
import type { HeroPicture } from "@/content/hero-pictures";
import { getSettings } from "@/lib/site-data";

const stats = [
  { n: "01", value: "186k+", label: "активных пользователей" },
  { n: "02", value: "75+", label: "серверов по всему миру" },
  { n: "03", value: "25+", label: "доступных стран" },
];

const pictureAlt: Record<HeroPicture, string> = {
  phone: "Приложение Rocket VPN на смартфоне",
  "phone-2": "Приложение Rocket VPN на смартфоне",
  "phone-3": "Приложение Rocket VPN на смартфоне",
  laptop: "Приложение Rocket VPN на ноутбуке",
  "laptop-2": "Приложение Rocket VPN на ноутбуке",
  tv: "Приложение Rocket VPN на телевизоре",
};


type Props = {
  h1_string?: string;
  description?: string;
  picture?: HeroPicture;
  ctaHref?: string | undefined;
};


export default async function Hero({ picture = "phone", h1_string = `${'Свобода в интернете с Rocket VPN'}`, ctaHref, description = "Одно решение для всего: обход белых списков, прокси для Telegram, YouTube без рекламы. Подключился — и просто пользуешься" }: Props) {
  const settings = await getSettings();

  const phone_types = picture === "phone" || picture === "phone-2" || picture === "phone-3";
  
  const wide = picture === "laptop" || picture === "laptop-2" || picture === "tv";
  const alt = pictureAlt[picture];

  const { props: desktop } = getImageProps({
    src: `/images/${picture}-top.png`,
    alt,
    width: 588,
    height: 547,
    sizes: "(min-width: 1440px) 588px, 40vw",
  });

  const { props: mobile } = getImageProps({
    src: `/images/${picture}-top-mobile.png`,
    alt,
    width: 272,
    height: 346,
    sizes: "272px",
    className: `h-auto xl:w-[588px] ${phone_types ? "xl:ml-[60px]" : "xl:ml-0"} xl:min-w-0 xl:max-w-none xl:shrink-0 ${wide ? "max-w-[420px]" : "min-w-[220px]"
      }`,
  });

  return (
    <section id="home" className="scroll-mt-28 rounded-b-[30px] xl:rounded-b-[60px] bg-card-total w-full">
      <div
        className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 pb-[39px] xl:pb-[0px] pt-[90px] text-center
          xl:grid xl:grid-cols-[342px_minmax(0,1fr)_290px] xl:items-center xl:gap-x-6
          xl:text-left"
      >
        <div className="xl:w-[430px] xl:h-full xl:mt-[100px]">
          <h1 className="px-[38px] xl:px-0 xl:w-[500px] text-[38px] leading-[120%] tracking-[-0.05em] xl:text-[54px]">
            {h1_string}
          </h1>

          <p className="px-[38px] xl:px-0 mt-[20px] xl:mt-[30px] text-[12.5px] leading-[140%] tracking-[-0.05em] xl:text-[18px]">
            {description}
          </p>

          <ButtonLink
            iconBoolean
            className="mx-auto mt-[24px] xl:mt-[34px] min-w-[203px] py-[20px] xl:mx-0 xl:px-[44px] xl:py-[25px]"
            href={ctaHref || settings.ctaUrl}
          >
            Подключить бесплатно
          </ButtonLink>

          <hr className="mx-auto my-[15px] xl:my-[25px] h-px w-[203px] border-0 bg-bg-button-tarif-gray xl:mx-0" />

          <div className="mx-auto flex w-[60%] flex-row items-start gap-[14px] xl:mx-0">
            <Image
              src="/icons/users.svg"
              alt=""
              width={22}
              height={22}
              className="hidden xl:block"
            />
            <p className="w-full text-[11px] leading-[120%] tracking-[-0.05em] text-text-gray xl:text-[12px]">
              Для новых пользователей действует бесплатный пробный период на 3 дня
            </p>
          </div>
        </div>

        {/* xl: wrapper vanished, phone and stats are cols */}
        <div className={`flex justify-center xl:contents ${wide ? "flex-col items-center gap-8" : "items-center"
          }`}>

          <picture className="xl:flex xl:justify-center">
            <source
              media="(min-width: 1280px)"
              srcSet={desktop.srcSet}
              sizes={desktop.sizes}
              width={desktop.width}
              height={desktop.height}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...mobile} loading="eager" fetchPriority="high" />
          </picture>

          <ul className={`text-left xl:flex xl:flex-col xl:gap-8 xl:pl-[60px] xl:h-full xl:mt-[100px] xl:text-nowrap ${wide ? "grid w-full grid-cols-3 gap-x-4 px-[20px]" : "flex flex-col gap-8"
            }`}>
            {stats.map((s) => (
              <li key={s.n} className="flex flex-col items-start">
                <span className="text-[8px] text-text-gray xl:text-[12px]">/ {s.n} /</span>
                <span className="mt-[12px] text-[32px] leading-[120%] tracking-[-0.05em] xl:ml-[20px] xl:text-[56px]">
                  {s.value}
                </span>
                <span className="text-[12px] xl:ml-[16px] xl:text-[18px]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}