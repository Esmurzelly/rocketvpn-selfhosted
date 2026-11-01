import Logo from "@/components/ui/Logo";
import ButtonLink from "@/components/ui/ButtonLink";

type Props = {
  title?: string;
  text?: string;
  href?: string;
  buttonLabel?: string;
};

export default function CtaFinal({
  title = "Начните пользоваться Rocket VPN уже сегодня",
  text = "Подключите быстрый и стабильный VPN для всех нужных сервисов — без сложных настроек и лишних действий",
  href = "/",
  buttonLabel = "Подключить VPN",
}: Props) {
  return (
    <section className="mt-[80px] flex flex-col items-center px-[17px] text-center xl:mt-[162px]">
      <Logo className="text-[14px] xl:text-[18px] !py-2 !border-none" />

      <h2 className="mt-4 max-w-[320px] text-[24px] leading-[120%] tracking-[-0.05em] xl:max-w-[528px] xl:text-[48px]">
        {title}
      </h2>

      <p className="mt-5 max-w-[300px] text-[13px] leading-[140%] xl:max-w-[420px] xl:text-[18px]">
        {text}
      </p>

      <ButtonLink iconBoolean href={href} className="mt-9 xl:mt-10 min-w-[210px] px-[26.5px] py-[25px]">
        {buttonLabel}
      </ButtonLink>
    </section>
  );
}