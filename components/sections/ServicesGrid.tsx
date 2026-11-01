import Image from "next/image";
import Link from "next/link";
import { serviceGroups, type ServiceGroup } from "@/content/services";

type Props = {
  groups?: ServiceGroup[];
  headingTag?: "h2" | "h3";
};

export default function ServicesGrid({ groups = serviceGroups, headingTag: Heading = "h2" }: Props) {
  return (
    <section className="px-4 mt-[33px] xl:mt-[60px] xl:mx-auto xl:max-w-page xl:px-0">
      <div className="flex flex-col gap-8">
        {groups.map((group, index) => (
          <div
            key={group.title}
            className={index > 0 ? "xl:border-t xl:border-bg-country-border xl:pt-[30px]" : ""}
          >
            <Heading className="text-[15px] leading-[120%] tracking-[-0.03em] xl:text-[28px]">
              {group.title}
            </Heading>

            <ul className="mt-[18px] xl:mt-[25px] grid grid-cols-3 gap-[8px] xl:gap-[15px] md:grid-cols-6">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-[65px] flex-col items-center justify-center gap-2 rounded-[12px] border border-bg-country-border bg-bg-country text-[10px] leading-[120%] tracking-[-0.02em] transition-colors hover:border-button-dark-border hover:bg-bg-button-tarif-gray xl:h-[128px] xl:rounded-[16px] xl:text-[18px]"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={32}
                      height={32}
                      className="size-6 xl:size-[50px]"
                    />
                    <span className="text-[12px] xl:text-[17px] leading-[120%] tracking-[-0.05em]">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}