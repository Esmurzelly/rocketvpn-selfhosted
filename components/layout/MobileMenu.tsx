"use client";

import Image from "next/image";
import Link from "next/link";
import { legalLinks } from "@/content/footer";

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

const links = [
  { label: "Попробовать бесплатно", href: "/" },
  { label: "Тарифный план", href: "/tarif" },
  { label: "Доступные регионы", href: "/#countries" },
];

const MobileMenu = ({ showModal, setShowModal }: Props) => {
  const close = () => setShowModal(false);

  return (
    <div
      id="mobile-menu"
      inert={!showModal}
      className={`fixed inset-0 z-[70] transition-[opacity,visibility] duration-300 xl:hidden ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
      />

      <div
        className={`absolute border-l border-white/10 inset-y-0 right-0 w-[75%] max-w-[340px] transition-transform duration-300 ease-out ${
          showModal ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть меню"
          className="absolute right-[calc(100%+9px)] top-[22px] grid size-10 place-items-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="flex h-full flex-col overflow-y-auto border border-bg-country-border bg-[linear-gradient(160deg,#191B1E_0%,#101113_100%)] px-[20px] pb-8 pt-[20px] text-right">
          <Link
            href="/"
            onClick={close}
            className="flex min-h-11 items-center gap-1.5 self-end rounded-[55px] border-[0.5px] border-button-dark-border bg-button-dark px-[26px] py-[13.5px] text-[14px]"
          >
            <Image src="/icons/sign-in.svg" alt="" width={12} height={12} />
            Войти
          </Link>

          <nav aria-label="Мобильное меню" className="mt-[56px]">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block py-3 text-[13px] leading-[140%] tracking-[-0.03em] transition-colors active:text-button-orange"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <hr className="my-[27px] border-0 border-t border-bg-country-border" />

          <Link href="/" onClick={close} aria-label="Rocket VPN — главная" className="flex items-center gap-2 self-end">
            <Image src="/icons/logo.svg" alt="" width={24} height={24} />
            <span className="text-[17px] font-medium">RocketVPN</span>
          </Link>

          <ul className="mt-6 flex flex-col gap-[14px] text-nowrap">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="text-[12px] leading-[130%] text-text-gray transition-colors active:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[12px] tracking-[-0.05em] text-text-gray/60">
            © {new Date().getFullYear()} RocketVPN. <br />
            Все права защищены
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;