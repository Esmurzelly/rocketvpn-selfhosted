import { FaqItem } from "@/content/faq";

type Props = {
  items: FaqItem[];
  title?: string;
  defaultOpenFirst?: boolean;
  groupName?: string;
};


export default function Faq({
  items,
  title = "Ответы на вопросы",
  defaultOpenFirst = true,
  groupName = "faq",
}: Props) {
  return (
    <section className="mt-[64px] xl:mt-[120px] px-[16px] xl:mx-auto xl:w-[980px] xl:px-0">
      <h2 className="text-center text-[26px] leading-[120%] tracking-[-0.05em] xl:text-[56px]">
        {title}
      </h2>

      <div className="mt-6 flex flex-col gap-[8px] xl:mt-12">
        {items.map((item, i) => (
          <details
            key={item.question}
            name={groupName}
            open={defaultOpenFirst && i === 0}
            className="group rounded-card-faq-mobile xl:rounded-card-faq-desktop border border-bg-country-border bg-bg-country px-5 py-4 xl:px-8 xl:py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="text-[11px] leading-[130%] xl:text-[18px]">{item.question}</span>

              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#232629] text-button-accordeon-toggle transition-transform duration-200 group-open:rotate-45 xl:size-13"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 1v10M1 6h10" />
                </svg>
              </span>
            </summary>

            <p className="mt-3 break-words max-w-[83%] xl:max-w-[90%] text-[9px] leading-[140%] text-text-gray xl:text-[16px]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}