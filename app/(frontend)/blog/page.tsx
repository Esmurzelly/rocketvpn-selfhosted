import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";

// export const metadata = buildMetadata("blog");

export async function generateMetadata() {
  return buildMetadata("blog");
}

const title = "Блог Rocket VPN — новости, инструкции и полезные статьи о VPN";
const description =
  "Статьи Rocket VPN о безопасности, конфиденциальности, настройке VPN, доступе к сервисам, приложениям, играм, нейросетям и стриминговым платформам.";

export default function BlogPage() {
  return (
    <main>
      <section className="px-[16px] pb-[40px] pt-[100px] xl:pt-[160px]">
        <div className="mx-auto max-w-[1080px] text-left xl:text-center">
          <h1 className="text-[26px] leading-[120%] tracking-[-0.05em] xl:text-[56px]">{title}</h1>
          <p className="mt-[20px] max-w-[740px] text-[12px] leading-[130%] xl:mx-auto xl:mt-[30px] xl:text-[18px] xl:leading-[140%]">
            {description}
          </p>
        </div>

        <ul className="mx-auto mt-[64px] grid max-w-[480px] gap-[24px] xl:gap-[20px] xl:mt-[80px] xl:max-w-page xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.title}>
              <article className="flex h-full flex-col rounded-[30px] border border-bg-country-border bg-bg-country p-[12px]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-bg">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 1280px) 380px, 480px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col items-center  pb-[14px] mt-[16px] text-center xl:px-[20px] xl:pb-[18px]">
                  <h2 className="max-w-[260px] text-[18px] leading-[130%] tracking-[-0.03em] xl:text-[20px]">
                    {post.title}
                  </h2>
                  <p className="mt-[10px] xl:mt-[12px] max-w-[260px] text-[14px] leading-[140%] text-text-gray xl:text-[16px]">
                    {post.description}
                  </p>

                  <Link
                    href={post.href}
                    aria-label={`Подробнее: ${post.title}`}
                    className="mt-[20px] xl:mt-[24px] flex w-full max-w-[210px] items-center justify-center rounded-button bg-white py-[14px] text-[14px] text-black transition hover:brightness-90"
                  >
                    Подробнее
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}