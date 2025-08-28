import { Article, StrapiListResponse, StrapiSingleResponse } from "@/types/cms";

const CMS_URL = process.env.STRAPI_CMS_URI as string;
const CMS_TOKEN = process.env.STRAPI_CMS_API_KEY as string;

function getHeaders(): HeadersInit {
 return {
  Authorization: `Bearer ${CMS_TOKEN}`,
  Accept: "application/json",
 };
}

export function getMediaUrl(path?: string | null): string | null {
 if (!path) return null;
 if (path.startsWith("http")) return path;
 return `${CMS_URL}${path}`;
}

export async function fetchArticles(): Promise<StrapiListResponse<Article>> {
 const url = `${CMS_URL}/api/articles?populate=*`;
 const response = await fetch(url, {
  headers: getHeaders(),
  next: { revalidate: 60 },
 });
 if (!response.ok) {
  throw new Error(`Failed to fetch articles: ${response.status}`);
 }
 return response.json();
}

export async function fetchArticleBySlug(
 slug: string
): Promise<StrapiSingleResponse<Article>> {
 const url = `${CMS_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
 const response = await fetch(url, {
  headers: getHeaders(),
  next: { revalidate: 60 },
 });
 if (!response.ok) {
  throw new Error(`Failed to fetch article: ${response.status}`);
 }
 const list = (await response.json()) as StrapiListResponse<Article>;
 const item: Article | undefined = list.data[0];
 return { data: item ?? null };
}
