import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/pages";
import { getPublishedPosts, formatDate } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata("blog");
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getPage("blog"), getPublishedPosts()]);
  if (!page) notFound();

  return (
    <main>
      <section className="px-[16px] pb-[40px] pt-[100px] xl:pt-[160px]">
        <div className="mx-auto max-w-[880px] text-left xl:text-center">
          <h1 className="text-[26px] leading-[120%] tracking-[-0.05em] xl:text-[56px]">{page.h1}</h1>
          {page.heroText && (
            <p className="mt-[20px] max-w-[740px] text-[12px] leading-[130%] xl:mx-auto xl:mt-[30px] xl:text-[18px] xl:leading-[140%]">
              {page.heroText}
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-text-gray">Статей пока нет</p>
        ) : (
          <ul className="mx-auto mt-[48px] grid max-w-[480px] gap-[18px] xl:mt-[80px] xl:max-w-page xl:grid-cols-3 xl:gap-5">
            {posts.map((post) => {
              const cover = typeof post.cover === "object" ? post.cover : null;
              return (
                <li key={post.id}>
                  <article className="flex h-full flex-col rounded-[30px] border border-bg-country-border bg-bg-country p-[10px]">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-bg">
                      {cover?.url && (
                        <img src={cover.url} alt={cover.alt ?? ""} loading="lazy" className="size-full object-cover" />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col items-center px-[14px] pb-[14px] pt-[18px] text-center xl:px-[20px] xl:pb-[18px] xl:pt-[22px]">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt} className="text-[11px] text-text-gray xl:text-[12px]">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-2 max-w-[260px] text-[16px] leading-[130%] tracking-[-0.03em] xl:text-[18px]">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[260px] text-[12px] leading-[140%] text-text-gray xl:text-[13px]">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Подробнее: ${post.title}`}
                        className="mt-6 flex w-full max-w-[210px] items-center justify-center rounded-button bg-white py-[14px] text-[12px] text-black transition hover:brightness-90 xl:mt-auto"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}