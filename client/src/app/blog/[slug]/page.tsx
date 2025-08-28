import Image from "next/image";
import { fetchArticleBySlug, getMediaUrl } from "@/lib/cms";
import type { Metadata } from "next";

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const { data } = await fetchArticleBySlug(slug);
 const title = data?.title ?? "Article";
 const description = data?.description ?? undefined;
 const coverUrl = getMediaUrl(data?.cover?.url ?? null) ?? undefined;

 return {
  title,
  description,
  openGraph: {
   title,
   description,
   images: coverUrl ? [{ url: coverUrl }] : undefined,
  },
  twitter: {
   card: coverUrl ? "summary_large_image" : "summary",
   title,
   description,
   images: coverUrl ? [coverUrl] : undefined,
  },
 };
}

export default async function ArticlePage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const { data } = await fetchArticleBySlug(slug);
 if (!data) {
  return <div className="max-w-3xl mx-auto p-6">Article not found.</div>;
 }
 const coverUrl = getMediaUrl(data.cover?.url);

 return (
  <article className="mx-auto max-w-4xl px-4 py-20 lg:py-32">
   <header className="mb-8">
    <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{data.title}</h1>
    {data.description && (
     <p className="mt-3 text-muted-foreground lg:text-lg">{data.description}</p>
    )}
   </header>

   {coverUrl && (
    <div className="mb-8">
     <Image
      src={coverUrl}
      alt={data.title}
      width={1200}
      height={630}
      className="h-auto w-full rounded-md object-cover"
      priority
     />
    </div>
   )}

   <div className="prose prose-invert max-w-none">
    {/* Render rich content blocks here if needed later */}
    <p>Content coming soon.</p>
   </div>
  </article>
 );
}
