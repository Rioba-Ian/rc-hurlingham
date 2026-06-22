import {
 Article,
 Cover,
 Event,
 StrapiListResponse,
 StrapiSingleResponse,
} from "@/types/cms";

type MediaSize = "thumbnail" | "small" | "medium" | "large";

/**
 * Resolve a cover's URL, preferring a responsive `formats` size when available
 * and falling back to the original upload. Use a small size for thumbnails and
 * a larger one for hero/banner images to avoid shipping oversized media.
 */
export function coverUrl(
 cover?: Cover | null,
 size?: MediaSize,
): string | null {
 if (!cover) return null;
 const sized = size ? cover.formats?.[size]?.url : undefined;
 return getMediaUrl(sized ?? cover.url);
}

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

/**
 * The events collection uses capitalized field names (`Date`, `Location`).
 * Normalize to the lowercase `Event` shape the UI uses (defensive: also
 * accepts already-lowercase fields in case the collection is renamed later).
 */
type RawEvent = Omit<Event, "date" | "location" | "cover"> & {
 Date?: string;
 Location?: string | null;
 date?: string;
 location?: string | null;
 // The events collection stores cover as a repeatable media field (array).
 cover?: Cover | Cover[] | null;
};

function normalizeEvent(e: RawEvent): Event {
 const cover = Array.isArray(e.cover) ? (e.cover[0] ?? null) : (e.cover ?? null);
 return {
  ...(e as unknown as Event),
  date: e.Date ?? e.date ?? "",
  location: e.Location ?? e.location ?? null,
  cover,
 };
}

export async function fetchEvents(): Promise<StrapiListResponse<Event>> {
 const empty: StrapiListResponse<Event> = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
 };

 if (!CMS_URL || !CMS_TOKEN) {
  console.warn("CMS configuration missing, returning empty events list");
  return empty;
 }

 try {
  const url = `${CMS_URL}/api/events?populate=*`;
  const response = await fetch(url, {
   headers: getHeaders(),
   next: { revalidate: 60 },
  });

  if (!response.ok) {
   console.error(
    `Failed to fetch events: ${response.status} - ${response.statusText}`,
   );
   return empty;
  }

  const json = (await response.json()) as StrapiListResponse<RawEvent>;
  return { data: (json.data ?? []).map(normalizeEvent), meta: json.meta };
 } catch (error) {
  console.error("Error fetching events:", error);
  return empty;
 }
}

export async function fetchEventBySlug(
 slug: string,
): Promise<StrapiSingleResponse<Event>> {
 if (!CMS_URL || !CMS_TOKEN) {
  console.warn("CMS configuration missing, returning null event");
  return { data: null };
 }

 try {
  const url = `${CMS_URL}/api/events?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const response = await fetch(url, {
   headers: getHeaders(),
   next: { revalidate: 60 },
  });

  if (!response.ok) {
   console.error(
    `Failed to fetch event: ${response.status} - ${response.statusText}`,
   );
   return { data: null };
  }

  const list = (await response.json()) as StrapiListResponse<RawEvent>;
  const raw = list.data[0];
  return { data: raw ? normalizeEvent(raw) : null };
 } catch (error) {
  console.error("Error fetching event:", error);
  return { data: null };
 }
}
