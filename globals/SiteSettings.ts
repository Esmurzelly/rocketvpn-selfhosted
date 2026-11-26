import type { GlobalConfig } from "payload";
import { validateLink } from "../lib/validate-link";
import { revalidateGlobal } from "@/lib/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Ссылки кнопок",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal("settings")] },
  fields: [
    {
      name: "ctaUrl",
      type: "text",
      label: "Кнопки «Подключить VPN» и «Подключить бесплатно»",
      required: true,
      validate: validateLink,
      admin: { description: "Куда ведут оранжевые кнопки на всём сайте. Для отдельной страницы можно задать свою ссылку в самой странице" },
    },
    {
      name: "trialUrl",
      type: "text",
      label: "Кнопка «Попробовать за 0₽»",
      validate: validateLink,
      admin: { description: "Если пусто, используется ссылка основной кнопки" },
    },
    {
      name: "loginUrl",
      type: "text",
      label: "Кнопка «Войти»",
      validate: validateLink,
    },
  ],
};