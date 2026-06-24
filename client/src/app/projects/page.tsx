import type { Metadata } from "next";
import ComingSoon from "@/components/molecules/ComingSoon";

export const metadata: Metadata = {
 title: "Projects",
 description:
  "Explore the community service projects of the Rotaract Club of Hurlingham — coming soon.",
};

export default function ProjectsPage() {
 return (
  <main className="flex flex-col">
   <ComingSoon />
  </main>
 );
}
