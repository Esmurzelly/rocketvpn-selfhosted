export const validateLink = (value?: string | null): true | string => {
  if (!value) return true;
  return /^(\/|https?:\/\/|tg:\/\/|mailto:)/.test(value)
    ? true
    : "Ссылка должна начинаться с «/», «https://», «tg://» или «mailto:»";
};