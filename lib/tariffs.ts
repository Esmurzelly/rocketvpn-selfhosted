export const PLANS = [
  { id: "1m", months: 1, tabLabel: "На 1 месяц", short: "1 месяц" },
  { id: "3m", months: 3, tabLabel: "На 3 месяца", short: "3 месяца" },
  { id: "6m", months: 6, tabLabel: "На 6 месяцев", short: "6 месяцев" },
  { id: "12m", months: 12, tabLabel: "На 12 месяцев", short: "12 месяцев" },
] as const;

export type PlanView = {
  id: string;
  tabLabel: string;
  short: string;
  benefit: number;
  benefitText: string;
  perMonthText: string;
  priceText: string;
  oldPriceText: string;
  payUrl: string;
};

const nf = new Intl.NumberFormat("ru-RU");
export const rub = (n: number) => `${nf.format(n)}\u00A0₽`;