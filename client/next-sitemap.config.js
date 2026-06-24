/** @type {import('next-sitemap').IConfig} */
const siteUrl =
 process.env.SITE_URL ||
 process.env.NEXT_PUBLIC_BASE_URL ||
 "http://localhost:3000";

const CMS_URL = process.env.STRAPI_CMS_URI;
const CMS_TOKEN = process.env.STRAPI_CMS_API_KEY;

/** Fetch published slugs for a Strapi collection (best-effort; never fails the build). */
async function fetchSlugs(collection) {
 if (!CMS_URL || !CMS_TOKEN) return [];
 try {
  const res = await fetch(
   `${CMS_URL}/api/${collection}?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=100`,
   { headers: { Authorization: `Bearer ${CMS_TOKEN}` } },
  );
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data || [])
   .filter((e) => e && e.slug)
   .map((e) => ({ slug: e.slug, updatedAt: e.updatedAt }));
 } catch {
  return [];
 }
}

module.exports = {
 siteUrl,
 generateRobotsTxt: true,
 // Post-action / noindex pages and non-page assets shouldn't be in the sitemap.
 exclude: ["/subscribe/success", "/manifest.json", "/opengraph-image.png"],
 robotsTxtOptions: {
  policies: [{ userAgent: "*", allow: "/" }],
 },
 // Dynamic CMS routes aren't discoverable from the build output, so add them here.
 additionalPaths: async (config) => {
  const [articles, events] = await Promise.all([
   fetchSlugs("articles"),
   fetchSlugs("events"),
  ]);
  const make = (prefix) => (item) =>
   config.transform(config, `${prefix}/${item.slug}`).then((entry) => ({
    ...entry,
    lastmod: item.updatedAt || entry.lastmod,
   }));
  return [
   ...(await Promise.all(articles.map(make("/blog")))),
   ...(await Promise.all(events.map(make("/events")))),
  ];
 },
};
