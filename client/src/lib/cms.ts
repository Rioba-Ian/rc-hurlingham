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
  // Return empty data if CMS URL is not configured (e.g., during build)
  if (!CMS_URL || !CMS_TOKEN) {
    console.warn("CMS configuration missing, returning empty articles list");
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    };
  }

  try {
    const url = `${CMS_URL}/api/articles?populate=*`;
    const response = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch articles: ${response.status} - ${response.statusText}`,
      );
      // Return empty data instead of throwing during build
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
      };
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Return empty data instead of throwing during build
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    };
  }
}

export async function fetchArticleBySlug(
  slug: string,
): Promise<StrapiSingleResponse<Article>> {
  // Return null data if CMS URL is not configured (e.g., during build)
  if (!CMS_URL || !CMS_TOKEN) {
    console.warn("CMS configuration missing, returning null article");
    return { data: null };
  }

  try {
    const url = `${CMS_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const response = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch article: ${response.status} - ${response.statusText}`,
      );
      return { data: null };
    }

    const list = (await response.json()) as StrapiListResponse<Article>;
    const item: Article | undefined = list.data[0];
    return { data: item ?? null };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { data: null };
  }
}
