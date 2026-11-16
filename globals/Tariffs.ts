import type { Field, GlobalConfig } from "payload";
import { PLANS } from "../lib/tariffs";
import { validateLink } from "../lib/validate-link";
import { revalidateGlobal } from "../lib/revalidate";

const planGroup = (p: (typeof PLANS)[number]): Field => ({
  name: `plan${p.id}`,
  type: "group",
  label: p.short,
  fields: [
    {
      name: "price",
      type: "number",
      label: "Новая цена, ₽ (к оплате)",
      required: true,
      min: 0,
    },
    {
      name: "oldPrice",
      type: "number",
      label: "Старая цена, ₽ (без скидки)",
      required: true,
      min: 0,
      admin: { description: "Разница со старой ценой показывается на сайте как «Выгода»" },
      validate: (value: any, { siblingData }: any) => {
        const price = (siblingData as { price?: number }).price;
        if (typeof value !== "number") return "Укажите старую цену";
        if (typeof price === "number" && value < price) {
          return "Старая цена не может быть меньше новой";
        }
        return true;
      },
    },
    {
      name: "payUrl",
      type: "text",
      label: "Ссылка кнопки «Перейти к оплате»",
      validate: validateLink,
      admin: { description: "Если пусто, используется ссылка из раздела «Ссылки кнопок»" },
    },
  ]
});

export const Tariffs: GlobalConfig = {
  slug: "tariffs",
  label: "Тарифы",
  access: { read: () => true },
  fields: PLANS.map(planGroup),
  hooks: { afterChange: [revalidateGlobal("tariffs")] }
};