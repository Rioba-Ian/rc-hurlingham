import { Card, CardContent, CardHeader } from "@/components/molecules/card";
import { fetchArticles, getMediaUrl } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data } = await fetchArticles();

  return (
    <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="container mx-auto flex flex-col gap-10 lg:px-16">
        <div className="text-center">
          <h1 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground md:text-base lg:text-lg">
            Read the latest articles and updates from our club.
          </p>
        </div>

        {!data || data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {data.map((article) => {
              const coverUrl = getMediaUrl(article?.cover?.url);
              return (
                <Card
                  key={article.id}
                  className="grid grid-rows-[auto_auto_1fr]"
                >
                  {coverUrl && (
                    <div className="aspect-[16/9] w-full">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="transition-opacity duration-200 fade-in hover:opacity-90"
                      >
                        <Image
                          src={coverUrl}
                          alt={article.title}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>
                  )}
                  <CardHeader>
                    <h2 className="text-xl font-semibold hover:underline">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
