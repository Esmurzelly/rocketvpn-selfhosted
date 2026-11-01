"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { plans, devices } from "@/content/tariffs";
import ButtonLink from "../ui/ButtonLink";

export default function PricingPlans() {
  const [activeId, setActiveId] = useState("3m"); // на десктопе по умолчанию 3 месяца

  return (
    <div className="flex flex-col bg-card-price-list mt-[18px] gap-4 xl:grid xl:grid-cols-[22%_minmax(0,1fr)_29%] xl:rounded-[40px] xl:border xl:border-bg-country-border  xl:p-4">
      {/* desktop */}
      <ul className="hidden xl:flex xl:flex-col xl:gap-3">
        {plans.map((p) => {
          const active = p.id === activeId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActiveId(p.id)}
                aria-pressed={active}
                className={`flex cursor-pointer w-full items-center justify-between rounded-[25px] border border-bg-country-border px-5 py-5 text-left text-[14px] xl:text-[18px] transition-colors ${
                  active ? "bg-bg" : "bg-bg-button-tarif-gray"
                }`}
              >
                <span>
                  <span className="block">{p.tabLabel}</span>
                  <span className="mt-1 block text-[11px] xl:text-[16px] text-text-gray">
                    {p.benefit ? `Выгода ${p.benefit}₽` : "Без выгоды"}
                  </span>
                </span>
                <Image src="/icons/arrow-right.svg" className="opacity-30" alt="" width={5} height={10} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* mobile / aktive tarif (desktop) */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 xl:mx-0 xl:grid xl:snap-none xl:overflow-visible xl:px-0">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`flex flex-col min-w-[280px]
              max-xl:w-[88%] max-xl:shrink-0 max-xl:snap-start max-xl:rounded-card-choose-mobile
              max-xl:border max-xl:border-bg-country-border max-xl:p-5
              xl:h-full xl:px-6 xl:py-4
              ${p.id === activeId ? "" : "xl:hidden"}`}
          >
            <h3 className="text-[18px] leading-[120%] xl:text-[36px]">
              {p.short}
              <span className="hidden xl:inline"> подписки</span>
            </h3>

            <p className="mt-3 text-[13px] leading-[130%] text-text-gray xl:text-[16px]">
              Количество подключаемых <br className="hidden xl:block" /> устройств неограниченно
            </p>

            <ul className="mt-5 flex flex-wrap gap-[6px] xl:w-[375px]">
              {devices.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center gap-1.5 rounded-button border border-bg-country-border bg-bg-country px-[8px] py-[5px] xl:px-[10px] xl:py-[8px] text-[11px] text-text-gray"
                >
                  <Image src={d.icon} alt={d.label} width={10} height={10} className="xl:w-[15px]" />
                  {d.label}
                </li>
              ))}
            </ul>

            <div className="mt-[75px] flex flex-col items-center gap-3 xl:flex-row xl:items-center xl:gap-[18px] xl:pt-10">
              <ButtonLink href="/" iconBoolean={false} className="w-full py-[25px] text-[12px] xl:w-auto xl:px-10">Перейти к оплате</ButtonLink>

              <div className="text-center xl:text-left">
                <p className="text-[12px] xl:text-[26px]">
                  {p.perMonth} ₽
                  <span className="xl:hidden"> в месяц</span>
                  <span className="hidden xl:inline"> / месяц</span>
                </p>
                <p className="hidden text-[11px] xl:text-[18px] text-text-gray xl:block">
                  К оплате: {p.total}₽
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="relative mt-0 flex flex-col rounded-card-choose-mobile border border-bg-country-border bg-bg-button-tarif-gray p-5 xl:rounded-[28px] xl:p-6">
        <span aria-hidden="true" className="absolute rounded-[1px] right-5 top-4 size-1 bg-button-orange" />
        <h3 className="text-[17px] leading-[130%] tracking-[0.05%] xl:text-[26px]">
          Или начните <br /> с пробной подписки
        </h3>
        <p className="mt-2 text-[13px] xl:text-[16px] leading-[140%] text-text-gray">
          Для новых пользователей <br /> 3 дня бесплатно
        </p>
        <Link
          href="/"
          className="mt-[40px] xl:w-[210px] text-center rounded-button bg-white py-[22px] xl:py-[26px] text-[12px] xl:text-[16px] text-black xl:mt-auto"
        >
          Попробовать за 0₽
        </Link>
      </aside>
    </div>
  );
}