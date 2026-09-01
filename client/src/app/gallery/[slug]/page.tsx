import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GalleryClient from "@/components/organisms/gallery/GalleryClient";
import { fetchGalleryAlbumBySlug } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await fetchGalleryAlbumBySlug(slug);
  const title = data?.eventTitle ? `${data.eventTitle} | Photo Gallery` : "Gallery Album";

  return {
    title,
    description: `Photo album for ${data?.eventTitle || "Rotaract Club of Hurlingham"}.`,
  };
}

export default async function SingleGalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: album } = await fetchGalleryAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <GalleryClient albums={[album]} />
    </main>
  );
}
