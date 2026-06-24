import type { Metadata } from "next";
import SubscribeUser from "@/components/organisms/SubscribeUser";
import { Suspense } from "react";

const description =
 "Subscribe to the Rotaract Club of Hurlingham newsletter for the latest news, events, and project updates.";

export const metadata: Metadata = {
 title: "Subscribe",
 description,
 openGraph: { title: "Subscribe", description },
};

export default function Subscribe() {
 return (
  <main className="flex-1 py-[20vmin] font-montserrat">
   <Suspense fallback={<div>Loading...</div>}>
    <SubscribeUser />
   </Suspense>
  </main>
 );
}
