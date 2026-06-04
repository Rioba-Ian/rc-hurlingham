import { fetchArticles } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import BlogList from "@/components/organisms/blog/BlogList";

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
