// components/layout/MobileMenu.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const links = [
  { label: "Попробовать бесплатно", href: "/", badge: "Free" },
  { label: "Тарифный план", href: "/tarif" },
  { label: "Доступные регионы", href: "/#countries" },
];

const appear = (open: boolean, index: number) => ({
  className: `transition-[opacity,transform] duration-300 ${
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`,
  style: { transitionDelay: open ? `${120 + index * 70}ms` : "0ms" },
});

const MobileMenu = ({ showModal, setShowModal }: Props) => {
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowModal(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal, setShowModal]);

  return (
    <div
      id="mobile-menu"
      inert={!showModal}
      className={`absolute inset-x-0 top-0 pt-[96px] z-50 flex h-svh flex-col overflow-y-auto bg-bg px-[16px] pb-8 pt-4 transition-[opacity,transform,visibility] duration-300 xl:hidden ${
        showModal ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      {/* мягкое оранжевое свечение в углу */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_35%_at_100%_0%,rgba(255,60,26,0.14),transparent)]"
      />

      <nav aria-label="Мобильное меню" className="relative">
        <ul className="flex flex-col gap-3">
          {links.map((l, i) => {
            const a = appear(showModal, i);
            return (
              <li key={l.label} className={a.className} style={a.style}>
                <Link
                  href={l.href}
                  onClick={() => setShowModal(false)}
                  className={`flex items-center justify-between gap-4 rounded-[25px] border px-6 py-5 text-left transition-colors active:bg-white active:text-black ${
                    i === 0
                      ? "border-button-dark-border bg-bg-country-border"
                      : "border-bg-country-border bg-bg-country"
                  }`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-[8px] text-text-gray">/ 0{i + 1} /</span>
                    <span className="flex items-center gap-2 text-[18px] leading-[120%] tracking-[-0.03em]">
                      {l.label}
                      {l.badge && (
                        <span className="rounded-button bg-button-orange px-[6px] py-[3px] text-[8px] leading-none text-white">
                          {l.badge}
                        </span>
                      )}
                    </span>
                  </span>

                  <Image
                    src="/icons/arrow-right.svg"
                    alt=""
                    width={5}
                    height={10}
                    className="opacity-30"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* нижний блок: вход и призыв, прижат к низу */}
      {(() => {
        const a = appear(showModal, links.length);
        return (
          <div className={`relative mt-auto flex flex-col items-center gap-4 pt-10 ${a.className}`} style={a.style}>
            <Link
              href="/"
              onClick={() => setShowModal(false)}
              className="flex w-full items-center justify-center gap-2 rounded-[55px] border-[0.5px] border-button-dark-border bg-button-dark py-[18px] text-[14px] transition-colors active:bg-white active:text-black"
            >
              <Image src="/icons/sign-in.svg" alt="" width={12} height={12} />
              Войти
            </Link>

            <ButtonLink iconBoolean href="/tarif" className="w-full py-[22px]">
              Подключить бесплатно
            </ButtonLink>

            <p className="text-[11px] leading-[120%] tracking-[-0.05em] text-text-gray">
              Для новых пользователей 3 дня бесплатно
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default MobileMenu;