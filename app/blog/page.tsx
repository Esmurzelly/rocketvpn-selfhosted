import { buildMetadata } from "@/lib/seo";

type Props = {}

export const metadata = buildMetadata("blog");

const page = (props: Props) => {
  return (
    <main>
          <section className='pt-[100px] xl:pt-[160px] text-center px-[14px] pb-[40px] leading-[120%]'>
            <div className="text-left xl:text-center">
              <h1 className='text-[26px] xl:text-[56px] max-w-[880px] mx-auto tracking-[-0.05em]'>Блог Rocket VPN — новости, инструкции и полезные статьи о VPN</h1>
              <p className='mt-[20px] xl:mt-[30px] text-[12px] max-w-[740px] mx-auto xl:text-[18px] xl:leading-[140%] tracking-[-0.05em]'>Статьи Rocket VPN о безопасности, конфиденциальности, настройке VPN, доступе к сервисам, приложениям, играм, нейросетям и стриминговым платформам.</p>
            </div>
    
            <div className="min-w-[288px] min-h-[156px] max-w-[980px] max-h-[215px] bg-bg-country mx-auto mt-[64px] xl:mt-[96px] rounded-[20px] xl:rounded-[25px]">
            </div>
          </section>
        </main>
  )
}

export default page