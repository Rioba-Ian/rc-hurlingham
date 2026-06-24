import type { Metadata } from "next";
import { fetchArticles } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import BlogList from "@/components/organisms/blog/BlogList";

export const metadata: Metadata = {
 title: "Blog",
 description:
  "News, project recaps and insights from the Rotaract Club of Hurlingham community.",
 openGraph: {
  title: "Blog | Rotaract Club of Hurlingham",
  description:
   "News, project recaps and insights from the Rotaract Club of Hurlingham community.",
  type: "website",
 },
};

export default async function BlogPage() {
 const { data } = await fetchArticles();

 return (
  <section className="pb-24 pt-32">
   <SectionHeading
    kicker="Our Stories"
    title="The Blog"
    underline
    sub="News, project recaps and insights from the Rotaract community in Hurlingham."
    className="mb-12"
   />
   <BlogList articles={data ?? []} />
  </section>
 );
}
