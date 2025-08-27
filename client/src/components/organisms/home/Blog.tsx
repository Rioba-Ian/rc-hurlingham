import React from "react";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/molecules/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Sample blog articles data
const blogArticles = [
 {
  id: "post-1",
  title: "Getting Started with shadcn/ui Components",
  summary:
   "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
  label: "Tutorial",
  author: "Sarah Chen",
  published: "1 Jan 2024",
  url: "https://shadcnblocks.com",
  image: "/images/block/placeholder-dark-1.svg",
 },
 {
  id: "post-2",
  title: "Building Accessible Web Applications",
  summary:
   "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
  label: "Accessibility",
  author: "Marcus Rodriguez",
  published: "1 Jan 2024",
  url: "https://shadcnblocks.com",
  image: "/images/block/placeholder-dark-1.svg",
 },
 {
  id: "post-3",
  title: "Modern Design Systems with Tailwind CSS",
  summary:
   "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
  label: "Design Systems",
  author: "Emma Thompson",
  published: "1 Jan 2024",
  url: "https://shadcnblocks.com",
  image: "/images/block/placeholder-dark-1.svg",
 },
];

export default function Blog() {
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

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
     {blogArticles.map((article) => (
      <Card key={article.id} className="grid grid-rows-[auto_auto_1fr_auto]">
       <div className="aspect-[16/9] w-full">
        <a
         href={article.url}
         target="_blank"
         className="transition-opacity duration-200 fade-in hover:opacity-70"
        >
         <Image
          src={article.image}
          alt={article.title}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
         />
        </a>
       </div>
       <CardHeader>
        <h3 className="text-lg font-semibold hover:underline md:text-xl">
         <a href={article.url} target="_blank">
          {article.title}
         </a>
        </h3>
       </CardHeader>
       <CardContent>
        <p className="text-muted-foreground">{article.summary}</p>
       </CardContent>
       <CardFooter>
        <a
         href={article.url}
         target="_blank"
         className="flex items-center text-foreground hover:underline"
        >
         Read more
         <ArrowRight className="ml-2 size-4" />
        </a>
       </CardFooter>
      </Card>
     ))}
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
