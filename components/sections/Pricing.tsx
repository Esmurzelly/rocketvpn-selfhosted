import Image from "next/image";
import PricingPlans from "@/components/layout/PricingPrice"

const card =
  "relative flex flex-col overflow-hidden border border-bg-country-border bg-card-gray p-5 xl:p-[35px] " +
  "rounded-[30px] xl:rounded-[35px] xl:p-6 xl:w-full";

export default function Pricing() {
  return (
    <section id="tarif" className="scroll-mt-28 mt-[64px] xl:mt-[75px] px-[16px] xl:mx-auto xl:w-[1240px] xl:px-[30px]">
      <h2 className="mx-auto w-[260px] xl:w-auto text-center text-[25px] leading-[120%] tracking-[-0.05em] xl:mx-0 xl:text-left xl:text-[46px]">
        Чем дольше подписка, <br className="hidden xl:block" /> тем ниже стоимость месяца
      </h2>

      <div className="mt-6 xl:mt-10">
        <PricingPlans />

        <div className="mt-8 xl:mt-5 grid gap-4 xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-[20px]">
          <article
            className={`${card} bg-card-price-list isolate min-h-[288px] xl:min-h-[320px] 
    before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-['']
    before:bg-[url('/images/circle-bg.png')] before:top-[40%] before:bg-cover before:bg-bottom before:bg-no-repeat`}
          >
            <h3 className="text-[16px] leading-[120%] xl:text-[20px]">Гарантия возврата средств</h3>
            <p className="mt-3 text-[14px] xl:text-[16px] leading-[140%] text-text-gray xl:max-w-full">
              Если вам не понравится <br /> или не подойдет Rocket VPN
            </p>

            <Image
              src="/images/circle.png"
              alt=""
              width={260}
              height={160}
              className="mt-[40px] xl:mt-[10px] h-auto w-full max-w-[260px] xl:max-w-[300px] self-center"
            />
          </article>

          <article className={`${card} min-h-[320px] xl:min-h-[320px] bg-card-price-list`}>
            <h3 className="text-[16px] leading-[120%] xl:text-[20px]">Рекомендуй Rocket VPN</h3>
            <p className="mt-3 text-[14px] xl:text-[16px] leading-[140%] text-text-gray xl:max-w-full">
              Получай 190 ₽ за каждого друга,
              который оплатил подписку. Используй баланс для оплаты своей подписки
            </p>
            <Image
              src="/images/sum.png"
              alt=""
              width={220}
              height={200}
              className="mt-auto scale-[117%] xl:scale-[100%] max-w-full h-auto w-full self-center xl:absolute xl:bottom-10 xl:top-[100%]"
            />
          </article>

          <article className={`${card} min-h-[320px] xl:min-h-[320px] bg-card-price-list`}>
            <h3 className="text-[16px] leading-[120%] xl:text-[20px]">Реферальная программа</h3>
            <p className="mt-3 text-[14px] xl:text-[16px] leading-[140%] text-text-gray xl:max-w-full">
              Получай пожизненные % с каждой
              оплаты привлеченных юзеров. Выводи на карту или оплачивай ими подписку
            </p>
            <Image
              src="/images/rub.png"
              alt=""
              width={220}
              height={200}
              className="mt-auto scale-[150%] xl:scale-[160%] xl:-rotate-15 h-auto w-full max-w-[200px] self-center xl:absolute xl:bottom-10 xl:right-[10%] xl:top-[97%]"
            />
          </article>
        </div>
      </div>
    </section>
  );
}