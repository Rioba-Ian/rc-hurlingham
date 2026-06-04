"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Article } from "@/types/cms";
import ArticleCard from "@/components/molecules/ArticleCard";
import { cn } from "@/lib/utils";

const BlogList = ({ articles }: { articles: Article[] }) => {
 const [active, setActive] = useState("All");
 const [query, setQuery] = useState("");

 const categories = useMemo(() => {
  const set = new Set<string>();
  articles.forEach((a) => a.category?.name && set.add(a.category.name));
  return Array.from(set);
 }, [articles]);

 const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  return articles.filter((a) => {
   const okCat = active === "All" || a.category?.name === active;
   const haystack = `${a.title} ${a.description ?? ""} ${
    a.author?.name ?? ""
   }`.toLowerCase();
   return okCat && (!q || haystack.includes(q));
  });
 }, [articles, active, query]);

 const showFeatured = active === "All" && !query.trim();
 const [featured, ...rest] = filtered;
 const grid = showFeatured ? rest : filtered;

 const chips = categories.length > 0 ? ["All", ...categories] : [];

 return (
  <div>
   {/* Filter + search bar (only when categories exist) */}
   {(chips.length > 0 || articles.length > 0) && (
    <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 px-6">
     <div className="flex flex-wrap gap-2.5">
      {chips.map((c) => {
       const on = c === active;
       return (
        <button
         key={c}
         type="button"
         onClick={() => setActive(c)}
         className={cn(
          "rounded-full border px-4 py-2 font-montserrat text-[13.5px] font-medium transition-colors",
          on
           ? "border-cranberry bg-cranberry text-white"
           : "border-border bg-white text-neutral-600 hover:border-cranberry/40 dark:bg-neutral-900 dark:text-neutral-300",
         )}
        >
         {c}
        </button>
       );
      })}
     </div>
     <div className="relative w-full max-w-[240px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
      <input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search articles"
       className="h-10 w-full rounded-full border border-border bg-white pl-9 pr-3.5 font-montserrat text-sm text-neutral-800 outline-none transition focus:border-cranberry focus:ring-2 focus:ring-cranberry/15 dark:bg-neutral-900 dark:text-neutral-100"
      />
     </div>
    </div>
   )}

   <div className="mx-auto max-w-[1140px] px-6 pt-8">
    {articles.length === 0 ? (
     <p className="py-16 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
      No articles yet. Check back soon!
     </p>
    ) : filtered.length === 0 ? (
     <p className="py-16 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
      No articles match your search.
     </p>
    ) : (
     <>
      {showFeatured && featured && (
       <div className="mb-9">
        <ArticleCard article={featured} variant="featured" />
       </div>
      )}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
       {grid.map((a) => (
        <ArticleCard key={a.id} article={a} variant="default" />
       ))}
      </div>
     </>
    )}
   </div>
  </div>
 );
};

export default BlogList;
