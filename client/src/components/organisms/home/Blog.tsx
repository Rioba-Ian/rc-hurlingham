import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from "@/components/molecules/card";
import { fetchArticles, getMediaUrl } from "@/lib/cms";

export default async function Blog() {
 const { data } = await fetchArticles();

 return (
  <section className="py-16 px-4 max-w-7xl mx-auto">
   <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16 ">
    <div className="text-center">
     <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
      Latest from Our Blog
     </h2>
     <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
      Stay updated with our latest news, events, and insights from the Rotaract
      community.
     </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
     {data?.slice(0, 3).map((article) => {
      const coverUrl = getMediaUrl(article?.cover?.url);
      return (
       <Card
        key={article.id}
        className="grid grid-rows-[auto_auto_1fr_auto] w-full"
       >
        {coverUrl && (
         <div className="aspect-[16/9] w-full">
          <Link
           href={`/blog/${article.slug}`}
           className="transition-opacity duration-200 fade-in hover:opacity-70"
          >
           <Image
            src={coverUrl}
            alt={article.title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
           />
          </Link>
         </div>
        )}
        <CardHeader>
         <h3 className="text-lg font-semibold hover:underline md:text-xl">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
         </h3>
        </CardHeader>
        <CardContent>
         <p className="text-muted-foreground">{article.description}</p>
        </CardContent>
        <CardFooter>
         <Link
          href={`/blog/${article.slug}`}
          className="flex items-center text-foreground hover:underline"
         >
          Read more
          <ArrowRight className="ml-2 size-4" />
         </Link>
        </CardFooter>
       </Card>
      );
     })}
    </div>
   </div>

   <div className="text-center py-8">
    <Link
     href="/blog"
     className="inline-flex items-center px-6 py-3 bg-cranberry text-white rounded-lg hover:bg-cranberry/90 transition-colors font-medium"
    >
     View All Articles
    </Link>
   </div>
  </section>
 );
}
