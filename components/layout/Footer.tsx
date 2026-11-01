import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { footerColumns, legalLinks } from "@/content/footer";

const linkClass = "text-[12px] xl:text-[16px] text-text-gray transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="w-full mt-[84px] px-[16px] pb-10 xl:mx-auto xl:mt-[120px] xl:w-[1240px] xl:px-0">
      <div className="max-w-[1180px] mx-auto grid grid-cols-2 gap-x-6 gap-y-5 xl:grid-cols-[250px_repeat(4,1fr)]">
        <div className="col-span-2 w-fit xl:col-span-1 text-[14px]">
          <Logo className="!py-2 !px-0 !border-none" />
          
        </div>

        {footerColumns.map((col) => (
          <nav className="" key={col.title} aria-label={col.title}>
            <p className="text-[14px] xl:text-[18px]">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 border-t border-bg-country-border py-10 xl:grid xl:grid-cols-[250px_1fr] xl:gap-x-6">
        <p className="order-last text-[11px] leading-[140%] text-text-gray xl:order-first">
          © 2026 RocketVPN. <br className="xl:hidden" />
          Все права защищены
        </p>

        <ul className="flex flex-col gap-2 text-[12px] xl:flex-row xl:gap-8">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}