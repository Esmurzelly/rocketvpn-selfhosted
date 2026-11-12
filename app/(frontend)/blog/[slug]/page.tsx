/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import ArticleBody from "@/components/ui/ArticleBody";
import CtaFinal from "@/components/sections/CtaFinal";
import RefreshRouteOnSave from "@/components/ui/RefreshRouteOnSave";
import { getPost, formatDate } from "@/lib/posts";
import { findRedirect } from "@/lib/redirects";
import { buildPostMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPostMetadata(slug);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = await getPost(slug, isEnabled);

  if (!post) {
    // сюда попадёт и старый адрес статьи, у которого есть переадресация
    const to = await findRedirect(`/blog/${slug}`);
    if (to) permanentRedirect(to);
    notFound();
  }

  const cover = typeof post.cover === "object" ? post.cover : null;

  return (
    <main>
      {isEnabled && (
        <>
          <RefreshRouteOnSave />
          <div className="fixed bottom-4 left-4 z-[80] rounded-button bg-button-orange px-4 py-2 text-[12px]">
            Режим предпросмотра ·{" "}
            <a href={`/next/exit-preview?path=${encodeURIComponent(`/blog/${slug}`)}`} className="underline">
              выйти
            </a>
          </div>
        </>
      )}

      <article className="px-[16px] pb-[40px] pt-[100px] xl:pt-[160px]">
        <div className="mx-auto max-w-[860px]">
          <Link href="/blog" className="text-[12px] text-text-gray transition-colors hover:text-white xl:text-[14px]">
            ← Все статьи
          </Link>

          <h1 className="mt-6 text-[26px] leading-[120%] tracking-[-0.05em] xl:text-[48px]">{post.title}</h1>

          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="mt-4 block text-[12px] text-text-gray xl:text-[14px]">
              {formatDate(post.publishedAt)}
            </time>
          )}

          {cover?.url && (
            <img
              src={cover.url}
              alt={cover.alt ?? ""}
              width={cover.width ?? undefined}
              height={cover.height ?? undefined}
              className="mt-8 h-auto w-full rounded-[20px] xl:rounded-[30px]"
            />
          )}

          <ArticleBody data={post.content} className="mt-10" />
        </div>
      </article>

      <CtaFinal />
    </main>
  );
}