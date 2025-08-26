import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubscribeSuccess() {
 return (
  <main className="flex-1 py-[20vmin] font-montserrat">
   <div className="max-w-2xl w-4/5 mx-auto space-y-8 p-8 text-center">
    <div className="space-y-6">
     {/* Success Icon */}
     <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <svg
       className="w-8 h-8 text-green-600"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
       />
      </svg>
     </div>

     <h1 className="relative z-10 text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground font-raleway font-bold">
      Subscription Confirmed!
     </h1>

     <p className="text-lg md:text-xl font-montserrat relative z-10 text-muted-foreground">
      Thank you for subscribing to the RAC Hurlingham newsletter. You&apos;re
      now part of our community!
     </p>

     <div className="space-y-4 text-sm md:text-base text-muted-foreground">
      <p>
       You&apos;ll receive our latest updates, event announcements, and club
       news directly in your inbox.
      </p>
      <p>We respect your privacy and you can unsubscribe at any time.</p>
     </div>

     <div className="pt-8 space-y-4">
      <Link href="/">
       <Button size="lg" className="w-full md:w-auto">
        Return to Home
       </Button>
      </Link>
     </div>
    </div>
   </div>
  </main>
 );
}
