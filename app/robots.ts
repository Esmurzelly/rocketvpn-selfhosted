import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";

  return {
    rules: isProd
      ? {
          userAgent: "*",
          allow: ["/", "/api/media/"],
          disallow: ["/admin", "/api/"],
        }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}