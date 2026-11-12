import type { Metadata } from "next";
import { getPage } from "@/lib/pages";
import { draftMode } from "next/headers";
import { getPost } from "./posts";

const DEFAULT_OG = { url: "/og.png", width: 1440, height: 740 };

export async function buildMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  if (!page) return {};

  const path = slug === "home" ? "/" : `/${slug}`;
  const title = page.seo?.title || page.h1;
  const description = page.seo?.description || undefined;
  const canonical = page.seo?.canonical || path;
  const img = typeof page.og?.image === "object" ? page.og.image : null;

  return {
    title: { absolute: title },
    description,
    keywords: page.seo?.keywords || undefined,
    alternates: { canonical },
    // undefined не перекрывает настройку из layout
    robots: page.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page.og?.title || title,
      description: page.og?.description || description,
      url: canonical,
      siteName: "Rocket VPN",
      locale: "ru_RU",
      type: "website",
      images: [
        img?.url
          ? { url: img.url, width: img.width ?? undefined, height: img.height ?? undefined, alt: title }
          : { ...DEFAULT_OG, alt: title },
      ],
    },
  };
}

export async function buildPostMetadata(slug: string): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const post = await getPost(slug, isEnabled);
  if (!post) return {};

  const path = `/blog/${slug}`;
  const title = post.seo?.title || `${post.title} | Rocket VPN`;
  const description = post.seo?.description || post.excerpt;
  const canonical = post.seo?.canonical || path;
  const cover = typeof post.cover === "object" ? post.cover : null;
  const ogImg = typeof post.og?.image === "object" && post.og.image ? post.og.image : cover;

  return {
    title: { absolute: title },
    description,
    keywords: post.seo?.keywords || undefined,
    alternates: { canonical },
    robots: post.seo?.noindex || isEnabled ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.og?.title || title,
      description: post.og?.description || description,
      url: canonical,
      siteName: "Rocket VPN",
      locale: "ru_RU",
      type: "article",
      images: ogImg?.url
        ? [{ url: ogImg.url, width: ogImg.width ?? undefined, height: ogImg.height ?? undefined, alt: title }]
        : [{ url: "/og.png", width: 1440, height: 740, alt: title }],
    },
  };
}