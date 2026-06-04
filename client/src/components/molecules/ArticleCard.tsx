import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types/cms";
import { getMediaUrl } from "@/lib/cms";
import { formatDate, readingTime } from "@/lib/blog";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";

type Variant = "compact" | "default" | "featured";

interface ArticleCardProps {
 article: Article;
 variant?: Variant;
}

const CategoryBadge = ({ name }: { name: string }) => (
 <span className="mb-3.5 inline-flex w-fit items-center rounded-full bg-cranberry/10 px-[11px] py-[5px] font-montserrat text-[11.5px] font-semibold uppercase tracking-[0.05em] text-cranberry">
  {name}
 </span>
);

const Meta = ({ article }: { article: Article }) => (
 <div className="mt-auto flex items-center gap-2.5 pt-1">
  <Avatar name={article.author?.name} />
  <div className="font-montserrat text-[12.5px] text-neutral-600 dark:text-neutral-400">
   <span className="font-semibold text-neutral-800 dark:text-neutral-200">
    {article.author?.name || "Rotaract Hurlingham"}
   </span>
   <span>
    {" · "}
    {formatDate(article.publishedAt)} · {readingTime(article.content)} min read
   </span>
  </div>
 </div>
);

/** Article card used across the home blog section, /blog grid, and related strip. */
const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
 const coverUrl = getMediaUrl(article.cover?.url);
 const href = `/blog/${article.slug}`;

 // ---- compact (home) ----
 if (variant === "compact") {
  return (
   <Link
    href={href}
    className="group grid grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-[10px] border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-neutral-900"
   >
    <div className="relative aspect-[16/9] overflow-hidden">
     {coverUrl && (
      <Image
       src={coverUrl}
       alt={article.title}
       fill
       sizes="(max-width: 768px) 100vw, 360px"
       className="object-cover transition-opacity duration-200 group-hover:opacity-80"
      />
     )}
    </div>
    <div className="px-5 pt-5">
     <h3 className="m-0 font-raleway text-[19px] font-semibold text-neutral-800 group-hover:underline dark:text-neutral-100">
      {article.title}
     </h3>
    </div>
    <div className="px-5 pt-2">
     <p className="m-0 line-clamp-2 font-montserrat text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
      {article.description}
     </p>
    </div>
    <div className="flex items-center gap-2 p-5 font-montserrat text-sm text-neutral-800 dark:text-neutral-200">
     Read more <ArrowRight className="size-4" />
    </div>
   </Link>
  );
 }

 // ---- featured (blog top) ----
 if (variant === "featured") {
  return (
   <Link
    href={href}
    className="group grid overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-neutral-900 md:grid-cols-[1.1fr_1fr]"
   >
    <div className="relative min-h-[320px] overflow-hidden">
     {coverUrl && (
      <Image
       src={coverUrl}
       alt={article.title}
       fill
       sizes="(max-width: 768px) 100vw, 600px"
       className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
     )}
    </div>
    <div className="flex flex-col justify-center p-9">
     {article.category?.name && <CategoryBadge name={article.category.name} />}
     <h3 className="m-0 font-raleway text-[28px] font-bold leading-tight text-neutral-800 group-hover:underline dark:text-neutral-100">
      {article.title}
     </h3>
     <p className="mb-[18px] mt-2.5 line-clamp-3 font-montserrat text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
      {article.description}
     </p>
     <Meta article={article} />
    </div>
   </Link>
  );
 }

 // ---- default (grid + related) ----
 return (
  <Link
   href={href}
   className="group grid grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-neutral-900"
  >
   <div className="relative aspect-[16/10] overflow-hidden">
    {coverUrl && (
     <Image
      src={coverUrl}
      alt={article.title}
      fill
      sizes="(max-width: 768px) 100vw, 360px"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
     />
    )}
   </div>
   <div className="flex flex-col p-5">
    {article.category?.name && <CategoryBadge name={article.category.name} />}
    <h3 className="m-0 font-raleway text-[19px] font-bold leading-snug text-neutral-800 group-hover:underline dark:text-neutral-100">
     {article.title}
    </h3>
    <p className="mb-[18px] mt-2.5 line-clamp-2 font-montserrat text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
     {article.description}
    </p>
    <Meta article={article} />
   </div>
  </Link>
 );
};

export default ArticleCard;
