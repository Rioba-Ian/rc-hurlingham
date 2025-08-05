import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubscribeCTA() {
 return (
  <main className="py-32">
   <section className=" w-full container mx-auto">
    <div className="text-center space-y-4">
     <h2 className="xl:text-6xl/none text-3xl font-semibold sm:text-5xl tracking-tight font-raleway">
      Subscribe to our newsletter
     </h2>
     <p className="text-xl text-muted-foreground pt-1">
      Get the latest news and updates from our club.
     </p>
    </div>
    <div className="mt-10 flex items-center justify-center w-full">
     <Button asChild>
      <Link href="/subscribe">Subscribe</Link>
     </Button>
    </div>
   </section>
  </main>
 );
}
