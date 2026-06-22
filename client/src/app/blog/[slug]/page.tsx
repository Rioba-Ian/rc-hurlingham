import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
 fetchArticleBySlug,
 fetchArticles,
 coverUrl as pickCover,
} from "@/lib/cms";
import { formatDate, readingTime } from "@/lib/blog";
import Avatar from "@/components/molecules/Avatar";
import RichText from "@/components/molecules/RichText";
import ArticleCard from "@/components/molecules/ArticleCard";
import ArticleShare from "@/components/organisms/blog/ArticleShare";
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
 const coverUrl = pickCover(data?.cover, "large") ?? undefined;

 return {
  title,
  description,
  openGraph: {
   title,
   description,
   type: "article",
   images: coverUrl ? [{ url: coverUrl, alt: title }] : undefined,
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
  return (
   <div className="mx-auto max-w-3xl px-4 py-40 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
    Article not found.
   </div>
  );
 }
 const coverUrl = pickCover(data.cover, "large");
 const hasContent = Array.isArray(data.content) && data.content.length > 0;

 // Related: other articles (prefer same category), newest first, max 3.
 const { data: all } = await fetchArticles();
 const others = (all ?? []).filter((a) => a.slug !== data.slug);
 const sameCategory = data.category?.name
  ? others.filter((a) => a.category?.name === data.category?.name)
  : [];
 const related = [
  ...sameCategory,
  ...others.filter((a) => !sameCategory.includes(a)),
 ].slice(0, 3);

 return (
  <article className="pb-24">
   <div className="mx-auto max-w-[760px] px-6 pt-32">
    <Link
     href="/blog"
     className="mb-7 inline-flex items-center gap-2 font-montserrat text-sm text-neutral-600 transition-colors hover:text-cranberry dark:text-neutral-400"
    >
     <ArrowLeft className="size-4" /> Back to all articles
    </Link>

    {data.category?.name && (
     <div className="mb-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.06em] text-cranberry">
      {data.category.name}
     </div>
    )}

    <h1 className="m-0 font-raleway text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
     {data.title}
    </h1>

    <div className="mt-6 flex items-center gap-3">
     <Avatar name={data.author?.name} size={42} />
     <div className="font-montserrat text-sm">
      <div className="font-semibold text-neutral-800 dark:text-neutral-200">
       {data.author?.name || "Rotaract Hurlingham"}
      </div>
      <div className="text-[13px] text-neutral-600 dark:text-neutral-400">
       {formatDate(data.publishedAt)} · {readingTime(data.content)} min read
      </div>
     </div>
    </div>
   </div>

   {coverUrl && (
    <div className="mx-auto mt-8 max-w-[920px] px-6">
     <Image
      src={coverUrl}
      alt={data.title}
      width={1200}
      height={630}
      priority
      className="h-[clamp(240px,42vw,460px)] w-full rounded-2xl object-cover"
     />
    </div>
   )}

   <div className="mx-auto mt-6 max-w-[760px] px-6">
    {hasContent ? (
     <RichText content={data.content} />
    ) : (
     data.description && (
      <p className="font-montserrat text-[16.5px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
       {data.description}
      </p>
     )
    )}

    <ArticleShare title={data.title} />
   </div>

   {related.length > 0 && (
    <div className="mx-auto mt-4 max-w-[1140px] px-6">
     <h2 className="mb-6 font-raleway text-2xl font-bold text-neutral-900 dark:text-neutral-100">
      More from the blog
     </h2>
     <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {related.map((a) => (
       <ArticleCard key={a.id} article={a} variant="default" />
      ))}
     </div>
    </div>
   )}
  </article>
 );
}
