import type { Metadata } from "next";
import ComingSoon from "@/components/molecules/ComingSoon";

export const metadata: Metadata = {
 title: "Gallery",
 description:
  "Photos from the Rotaract Club of Hurlingham's projects, events and socials — coming soon.",
};

export default function GalleryPage() {
 return (
  <main className="flex flex-col">
   <ComingSoon />
  </main>
 );
}
