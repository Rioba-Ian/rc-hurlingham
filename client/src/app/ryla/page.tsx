import type { Metadata } from "next";
import ComingSoon from "@/components/molecules/ComingSoon";

export const metadata: Metadata = {
 title: "RYLA",
 description:
  "Rotary Youth Leadership Awards (RYLA) with the Rotaract Club of Hurlingham — coming soon.",
};

export default function RylaPage() {
 return (
  <main className="flex flex-col">
   <ComingSoon />
  </main>
 );
}
