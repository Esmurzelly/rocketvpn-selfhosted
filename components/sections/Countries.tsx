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
]

const Countries = (props: Props) => {
    return (
        <section id="countries" className="flex flex-col items-center px-[16px] xl:px-0 xl:w-[1180px] xl:mx-auto mt-[64px]">
            <h2 className="text-[26px] xl:text-[56px] leading-[120%] tracking-[-0.05em] text-center xl:text-left w-full">Доступные страны</h2>

            <div className="mt-[25px] -mx-4 overflow-auto w-full grid no-scrollbar xl:mx-0 xl:overflow-visible xl:px-0">
                <ul className="grid w-max grid-cols-[repeat(4,240px)] xl:grid-cols-[repeat(4,280px)] gap-[10px] xl:gap-[20px] xl:w-full xl:grid-rows-5">
                    {items.map((item) => (
                        <li className="rounded-button w-full flex flex-row items-center justify-between bg-bg-country border border-bg-country-border p-[10px]" key={item.id}>
                            <div className="flex flex-row items-center gap-3">
                                {item.id === 19 ?
                                    <Image
                                        src={item.imagePath}
                                        alt={item.imgAlt}
                                        width={44}
                                        height={44}
                                        sizes=""
                                        className="max-w-[44px] bg-white p-[5px] rounded-full h-[44px]"
                                    />
                                    :
                                    <Image
                                        src={item.imagePath}
                                        alt={item.imgAlt}
                                        width={44}
                                        height={44}
                                        sizes=""
                                        className="max-w-[44px]"
                                    />
                                }

                                <div className="flex flex-col items-start">
                                    <span className="text-[14px] xl:text-[17px]">{item.name}</span>
                                    {item.id === 12 ? <span className="text-[12px] xl:text-[15px] text-text-gray">YouTube без рекламы</span> : ""}
                                </div>
                            </div>
                            {item.id === 0 || item.id === 4 || item.id === 8 || item.id === 12 || item.id === 16 ? <Image
                                src="/icons/blitz.svg"
                                alt="blitz"
                                width={12}
                                height={18}
                                sizes=""
                                className="max-w-[20px] mr-[19px]"
                            /> : ""}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Countries