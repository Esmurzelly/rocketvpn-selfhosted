// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Страница не найдена | Rocket VPN",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/tarif", label: "Тарифы" },
  { href: "/vpn", label: "VPN для сервисов" },
  { href: "/support", label: "Поддержка 24/7" },
];

const pill =
  "rounded-[55px] cursor-pointer border-[0.5px] border-button-dark-border bg-button-dark px-5 py-[13px] text-[12px] transition-colors hover:bg-bg-button-tarif-gray xl:text-[14px]";

export default function NotFound() {
  return (
    <main className="w-full rounded-b-[30px] bg-card-total xl:rounded-b-[60px]">
      <div className="max-w-[1180px] mx-auto flex flex-col items-center justify-center px-[24px] pb-[80px] pt-[140px] text-center">
        <p
          aria-hidden="true"
          className="select-none bg-linear-to-b from-white/30 to-white/0 bg-clip-text text-[120px] font-medium leading-none tracking-[-0.05em] text-transparent xl:text-[220px]"
        >
          404
        </p>

        <h1 className="mt-2 text-[28px] leading-[120%] tracking-[-0.05em] xl:text-[48px]">
          Страница не найдена
        </h1>

        <p className="mt-4 max-w-[320px] text-[13px] leading-[140%] text-text-gray xl:max-w-[460px] xl:text-[18px]">
          Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную
          или выберите нужный раздел
        </p>

        <ButtonLink href="/" iconBoolean className="mt-8 px-[30px] xl:px-[60px] py-[16px] xl:py-[25px]">
          На главную
        </ButtonLink>

        <ul className="mt-8 flex flex-col xl:flex-row flex-wrap items-start xl:items-center justify-center gap-3">
          {links.map((l) => (
            <li key={l.href} className={pill}>
              <Link href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}