import type { MetadataRoute } from "next";
import { fetchArticles, fetchEvents, fetchProjects } from "@/lib/cms";

const BASE =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://rotaractclubofhurlingham.co.ke";

// Refresh dynamic entries periodically (matches the CMS fetch revalidate).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/ryla`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
        { url: `${BASE}/subscribe`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ];

    // Dynamic CMS routes (best-effort — fetchers return empty on failure).
    const [{ data: articles }, { data: events }, { data: projects }] = await Promise.all([
        fetchArticles(),
        fetchEvents(),
        fetchProjects(),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = (articles ?? [])
        .filter((a) => a.slug)
        .map((a) => ({
            url: `${BASE}/blog/${a.slug}`,
            lastModified: a.updatedAt || a.publishedAt || now,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    const eventRoutes: MetadataRoute.Sitemap = (events ?? [])
        .filter((e) => e.slug)
        .map((e) => ({
            url: `${BASE}/events/${e.slug}`,
            lastModified: e.updatedAt || e.publishedAt || now,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    const projectRoutes: MetadataRoute.Sitemap = (projects ?? [])
        .filter((p) => p.slug)
        .map((p) => ({
            url: `${BASE}/projects/${p.slug}`,
            lastModified: p.updatedAt || p.publishedAt || now,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    return [...staticRoutes, ...articleRoutes, ...eventRoutes, ...projectRoutes];
}
