import type { PlanView } from "@/lib/tariffs";

const TOKEN = /\{\{(\w+)\.(price|month|old|benefit)\}\}/g;

export function fillTokens(text: string, plans: PlanView[]): string {
  return text.replace(TOKEN, (match, id: string, field: string) => {
    const p = plans.find((x) => x.id === id);
    if (!p) return match; // неизвестный код остаётся как есть, ошибка будет видна
    if (field === "price") return p.priceText;
    if (field === "month") return p.perMonthText;
    if (field === "old") return p.oldPriceText;
    if (field === "benefit") return p.benefitText;
    return match;
  });
}

// обходит дерево текста редактора и подставляет цены в текстовые узлы
export function fillLexical<T>(node: T, plans: PlanView[]): T {
  if (Array.isArray(node)) return node.map((n) => fillLexical(n, plans)) as T;
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([k, v]) => [
        k,
        k === "text" && typeof v === "string" ? fillTokens(v, plans) : fillLexical(v, plans),
      ]),
    ) as T;
  }
  return node;
}