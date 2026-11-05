"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import Logo from "../ui/Logo";

const pill =
  "text-center px-4 py-[13.5px] bg-button-dark border-[0.5px] rounded-[55px] border-button-dark-border";

const NAV_ITEMS = [
  { title: "Попробовать бесплатно", url: "/#home" },
  { title: "Тарифный план", url: "/#tarif" },
  { title: "Доступные регионы", url: "/#countries" },
];

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showModal);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowModal(false);
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKey);
    };
  }, [showModal]);


  useEffect(() => {
    // Отслеживаем секции только на главной странице
    if (pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const sections = NAV_ITEMS.map(({ url }) =>
      document.getElementById(url.split("#")[1])
    ).filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.35;

      // Если пользователь дошёл до конца страницы
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (isAtBottom) {
        setActiveSection("tarif");
        return;
      }

      let currentSection = sections[0];

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= activationLine) {
          currentSection = section;
        }

        if (
          rect.top <= activationLine &&
          rect.bottom > activationLine
        ) {
          currentSection = section;
          break;
        }
      }

      setActiveSection(currentSection.id);
    };

    // Определяем активную секцию сразу после перехода
    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return (
    <header className="w-full fixed inset-x-0 top-0 z-50 text-[14px]">
      <div className="relative max-w-[1180px] mx-auto z-[60] flex items-center justify-between gap-2 px-[15px] xl:px-0 py-[20px]">
        <Logo />

        <nav className="hidden xl:flex w-[472px] text-center">
          <ul className="flex flex-row items-center w-full bg-bg py-2 px-2 rounded-[55px]">
            {NAV_ITEMS.map(({ title, url }) => {
              const sectionId = url.split("#")[1];
              const isActive = activeSection === sectionId;

              return (
                <li
                  key={url}
                  className={`relative rounded-button py-[13px] px-[18px] flex w-1/3 cursor-pointer text-white/90 text-[10px] leading-[120%] tracking-[-0.05em] transition-colors
            ${isActive
                      ? "bg-bg-country-border"
                      : "hover:text-white/100 duration-200"
                    }`}
                >
                  {url === "/#home" && (
                    <span className="absolute bg-button-orange rounded-button -top-1 left-9/10 -translate-x-1/2 text-[8px] px-[6px] py-[3px] text-white whitespace-nowrap">
                      Free
                    </span>
                  )}

                  <Link
                    className="w-full"
                    href={url}
                    onClick={() => setShowModal(false)}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div>
          <Link href="/" className={`${pill} hidden xl:flex min-w-[123px] items-center gap-[6px] xl:px-[37px] xl:py-[18px] text-[12px]`}>
            <Image
              src="/icons/sign-in.svg"
              alt="sign-in.svg"
              width={10}
              height={10}
              priority
              className=""
            />
            Войти
          </Link>

          <button
            type="button"
            onClick={() => setShowModal(!showModal)}
            aria-expanded={showModal}
            aria-label={showModal ? "Закрыть меню" : "Открыть меню"}
            className={`${pill} min-w-[90px] xl:hidden`}
          >
            Меню
          </button>
        </div>
      </div>

      <MobileMenu showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
}