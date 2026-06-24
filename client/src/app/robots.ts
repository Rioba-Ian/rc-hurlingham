import type { MetadataRoute } from "next";

const BASE =
 process.env.SITE_URL ||
 process.env.NEXT_PUBLIC_BASE_URL ||
 "https://rotaractclubofhurlingham.co.ke";

export default function robots(): MetadataRoute.Robots {
 return {
  rules: {
   userAgent: "*",
   allow: "/",
   // Post-action / noindex pages
   disallow: ["/subscribe/success"],
  },
  sitemap: `${BASE}/sitemap.xml`,
  host: BASE,
 };
}
