import Image from "next/image"

type Props = {}

const items = [
    { id: 0, name: "Англия", imagePath: "/icons/flags/eng.svg", imgAlt: "eng" },
    { id: 1, name: "США", imagePath: "/icons/flags/usa.svg", imgAlt: "usa" },
    { id: 2, name: "Эстония", imagePath: "/icons/flags/est.svg", imgAlt: "est" },
    { id: 3, name: "Болгария", imagePath: "/icons/flags/blg.svg", imgAlt: "blg" },

    { id: 4, name: "Нидерланды", imagePath: "/icons/flags/hol.svg", imgAlt: "hol" },
    { id: 5, name: "Финляндия", imagePath: "/icons/flags/fin.svg", imgAlt: "fin" },
    { id: 6, name: "Беларусь", imagePath: "/icons/flags/bel.svg", imgAlt: "bel" },
    { id: 7, name: "Южная Корея", imagePath: "/icons/flags/kor.svg", imgAlt: "kor" },

    { id: 8, name: "Польша", imagePath: "/icons/flags/pol.svg", imgAlt: "pol" },
    { id: 9, name: "Франция", imagePath: "/icons/flags/fra.svg", imgAlt: "fra" },
    { id: 10, name: "Казахстан", imagePath: "/icons/flags/kaz.svg", imgAlt: "kaz" },
    { id: 11, name: "Япония", imagePath: "/icons/flags/jap.svg", imgAlt: "jap" },

    { id: 12, name: "Россия", imagePath: "/icons/flags/rus.svg", imgAlt: "rus" },
    { id: 13, name: "Канада", imagePath: "/icons/flags/can.svg", imgAlt: "can" },
    { id: 14, name: "Армения", imagePath: "/icons/flags/arm.svg", imgAlt: "arm" },
    { id: 15, name: "Индия", imagePath: "/icons/flags/ind.svg", imgAlt: "ind" },

    { id: 16, name: "Германия", imagePath: "/icons/flags/ger.svg", imgAlt: "ger" },
    { id: 17, name: "Литва", imagePath: "/icons/flags/lit.svg", imgAlt: "lit" },
    { id: 18, name: "Мексика", imagePath: "/icons/flags/mex.svg", imgAlt: "mex" },
    { id: 19, name: "Обход Белых списков", imagePath: "/icons/flags/progress.svg", imgAlt: "list" },
];

const FAST_IDS = [0, 4, 8, 12, 16];

const BADGE_ID = 19;

const Countries = () => {
  return (
    <section id="countries" className="mt-[64px] flex scroll-mt-28 flex-col items-center px-[16px] xl:mx-auto xl:w-[1180px] xl:px-0">
      <h2 className="w-full text-center text-[26px] leading-[120%] tracking-[-0.05em] xl:text-left xl:text-[56px]">
        Доступные страны
      </h2>

      <div className="no-scrollbar -mx-4 mt-[25px] self-stretch overflow-x-auto overflow-y-hidden px-4 xl:mx-0 xl:overflow-visible xl:px-0">
        <ul className="grid w-max grid-cols-[repeat(4,240px)] gap-[10px] xl:w-full xl:grid-cols-[repeat(4,280px)] xl:grid-rows-5 xl:gap-[20px]">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex w-full flex-row items-center justify-between rounded-button border border-bg-country-border bg-bg-country px-[10px] py-[6px]"
            >
              <div className="flex flex-row items-center gap-3">
                {item.id === BADGE_ID ? (
                  <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-white">
                    <Image src={item.imagePath} alt="" width={24} height={24} className="size-[22px]" />
                  </span>
                ) : (
                  <Image src={item.imagePath} alt="" width={44} height={44} className="size-[44px] shrink-0" />
                )}

                <div className="flex flex-col items-start">
                  <span className="text-[14px] xl:text-[17px]">{item.name}</span>
                  {item.id === 12 && (
                    <span className="text-[12px] text-text-gray xl:text-[15px]">YouTube без рекламы</span>
                  )}
                </div>
              </div>

              {FAST_IDS.includes(item.id) && (
                <Image src="/icons/blitz.svg" alt="" width={12} height={18} className="mr-[19px] max-w-[20px]" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};


export default Countries