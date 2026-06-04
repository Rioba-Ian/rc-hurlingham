import { fetchArticles } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import ArticleCard from "@/components/molecules/ArticleCard";
import Link from "next/link";

export default async function Blog() {
 const { data } = await fetchArticles();

 // Don't render the section if there are no articles
 if (!data || data.length === 0) {
  return null;
 }

 return (
  <section className="mx-auto max-w-[1140px] px-6 py-24">
   <SectionHeading
    title="Latest from Our Blog"
    sub="Stay updated with our latest news, events, and insights from the Rotaract community."
   />
   <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
    {data.slice(0, 3).map((article) => (
     <ArticleCard key={article.id} article={article} variant="compact" />
    ))}
   </div>
   <div className="mt-12 text-center">
    <Link
     href="/blog"
     className="inline-flex items-center rounded-[10px] bg-cranberry px-7 py-3 font-montserrat font-medium text-white transition-colors hover:bg-cranberry/90"
    >
     View All Articles
    </Link>
   </div>
  </section>
 );
}
