import type { Metadata } from "next";
import GalleryClient from "@/components/organisms/gallery/GalleryClient";
import { fetchGalleryAlbums } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Photo Gallery | Rotaract Club of Hurlingham",
  description:
    "Explore photo albums and memories from the Rotaract Club of Hurlingham's community projects, events, and socials.",
};

export default async function GalleryPage() {
  const albumsResponse = await fetchGalleryAlbums();
  const albums = albumsResponse.data ?? [];

  return (
    <main className="min-h-screen">
      <GalleryClient albums={albums} />
    </main>
  );
}
