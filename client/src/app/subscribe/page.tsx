import SubscribeUser from "@/components/organisms/SubscribeUser";
import { Suspense } from "react";

export default function Subscribe() {
 return (
  <main className="flex-1 py-[20vmin] font-montserrat">
   <Suspense fallback={<div>Loading...</div>}>
    <SubscribeUser />
   </Suspense>
  </main>
 );
}
