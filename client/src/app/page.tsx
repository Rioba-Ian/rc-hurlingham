import type { Metadata } from "next";
import Home from "@/components/organisms/home/Home";

export const metadata: Metadata = {
 title: {
  absolute: "Rotaract Club of Hurlingham — Service Above Self in Nairobi",
 },
 description:
  "The Rotaract Club of Hurlingham is a community of young professionals in Nairobi serving through community projects, leadership development, and friendship — living the motto Service Above Self.",
 alternates: { canonical: "/" },
 openGraph: {
  title: "Rotaract Club of Hurlingham — Service Above Self in Nairobi",
  description:
   "A community of young professionals in Nairobi serving through community projects, leadership development, and friendship.",
 },
};

export default function HomePage() {
 return (
  <div className="h-full w-full">
   <Home />
  </div>
 );
}
