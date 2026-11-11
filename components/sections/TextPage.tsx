import Faq from "@/components/sections/Faq";
import RichBody from "@/components/ui/RichBody";
import { toFaqItems } from "@/lib/pages";
import type { Page } from "@/payload-types";

export default function TextPage({ page, align }: { page: Page; align: "center" | "left" }) {
  const center = align === "center";
  const faq = toFaqItems(page.faq);

  return (
    <main>
      <section className="px-[14px] pb-[40px] pt-[100px] leading-[120%] xl:pt-[160px]">
        <div className={`mx-auto max-w-[1180px] text-left ${center ? "xl:text-center" : ""}`}>
          <h1 className={`text-[26px] tracking-[-0.05em] xl:text-[56px] ${center ? "mx-auto max-w-[880px]" : "max-w-[870px]"}`}>
            {page.h1}
          </h1>
          {page.heroText && (
            <p className={`mt-[20px] text-[12px] xl:mt-[30px] xl:text-[18px] xl:leading-[140%] ${center ? "mx-auto max-w-[740px]" : "max-w-[620px]"}`}>
              {page.heroText}
            </p>
          )}
        </div>

        {page.content && (
          <RichBody
            data={page.content}
            className={`mx-auto mt-[64px] text-left xl:mt-[96px] ${
              center ? "max-w-[880px] xl:text-center" : "max-w-[1180px] [&>*]:max-w-[870px]"
            }`}
          />
        )}
      </section>

      {faq.length > 0 && <Faq items={faq} groupName={`faq-${page.slug}`} />}
    </main>
  );
}