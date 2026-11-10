export type Plan = {
  id: string;
  tabLabel: string;
  short: string;
  benefit: number;
  perMonth: number;
  total: number;
  payUrl: string;
};

export const plans: Plan[] = [
  { id: "1m",  tabLabel: "На 1 месяц",    short: "1 месяц",    benefit: 0,   perMonth: 190, total: 190,  payUrl: "/pay/1m" },
  { id: "3m",  tabLabel: "На 3 месяца",   short: "3 месяца",   benefit: 60,  perMonth: 170, total: 510,  payUrl: "/pay/3m" },
  { id: "6m",  tabLabel: "На 6 месяцев",  short: "6 месяцев",  benefit: 230, perMonth: 152, total: 910,  payUrl: "/pay/6m" },
  { id: "12m", tabLabel: "На 12 месяцев", short: "12 месяцев", benefit: 630, perMonth: 138, total: 1650, payUrl: "/pay/12m" },
];

export const devices = [
  { label: "Android", icon: "/icons/android.svg" },
  { label: "iPhone / iPad / MacOS", icon: "/icons/apple.svg" },
  { label: "Android / Google TV", icon: "/icons/monitor.svg" },
  { label: "Windows", icon: "/icons/win.svg" },
];

export const NAV_ITEMS = [
  { title: "Попробовать бесплатно", url: "/#home" },
  { title: "Тарифный план", url: "/#tarif" },
  { title: "Доступные регионы", url: "/#countries" },
];