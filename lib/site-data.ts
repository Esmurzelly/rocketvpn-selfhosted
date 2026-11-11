import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { PLANS, rub, type PlanView } from "@/lib/tariffs";

export const getSettings = cache(async () => {
  const payload = await getPayload({ config });
  const s = await payload.findGlobal({ slug: "site-settings" });
  return {
    ctaUrl: s.ctaUrl || "/tarif",
    trialUrl: s.trialUrl || s.ctaUrl || "/tarif",
    loginUrl: s.loginUrl || "/",
  };
});

export const getPlans = cache(async (): Promise<PlanView[]> => {
  const payload = await getPayload({ config });
  const [data, settings] = await Promise.all([
    payload.findGlobal({ slug: "tariffs" }),
    getSettings(),
  ]);

  const groups = { "1m": data.plan1m, "3m": data.plan3m, "6m": data.plan6m, "12m": data.plan12m };

  return PLANS.map((p) => {
    const g = groups[p.id];
    const price = g?.price ?? 0;
    const oldPrice = g?.oldPrice ?? price;
    const benefit = Math.max(oldPrice - price, 0);

    return {
      id: p.id,
      tabLabel: p.tabLabel,
      short: p.short,
      benefit,
      benefitText: rub(benefit),
      perMonthText: rub(Math.round(price / p.months)),
      priceText: rub(price),
      oldPriceText: rub(oldPrice),
      payUrl: g?.payUrl || settings.ctaUrl,
    };
  });
});