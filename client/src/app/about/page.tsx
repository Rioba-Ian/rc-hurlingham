import type { Metadata } from "next";
import About from "@/components/organisms/about/About";

export const metadata: Metadata = {
 title: "About Us | Rotaract Club of Hurlingham",
 description:
  "Learn about the Rotaract Club of Hurlingham — young leaders in Nairobi taking action through service, leadership, and friendship under the motto Service Above Self.",
};

export default function AboutPage() {
 return <About />;
}
