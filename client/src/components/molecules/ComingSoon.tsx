import React from "react";
import { Rocket } from "lucide-react";
import { Button } from "../ui/button";
import RotaractLogo from "@/assets/club_logo.png";
import Link from "next/link";
import Image from "next/image";

export default function ComingSoon() {
 return (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
   <div className="max-w-2xl text-center space-y-8">
    {/* Icon */}
    <div className="flex justify-center">
     <Image
      src={RotaractLogo}
      alt="Rotaract Club of Hurlingham Logo"
      width={200}
      height={64}
     />
    </div>

    {/* Heading */}
    <div className="space-y-4">
     <h1 className="text-4xl md:text-5xl font-bold text-foreground">
      Coming Soon
     </h1>
     <p className="text-lg md:text-xl text-muted-foreground">
      We&apos;re working hard to bring you something amazing. Stay tuned for
      updates!
     </p>
    </div>

    {/* Description */}
    <p className="text-base text-muted-foreground max-w-md mx-auto">
     We&apos;re excited to launch this feature and can&apos;t wait to share it
     with you. In the meantime, feel free to explore other areas of our site or
     get in touch with us.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
     <Button asChild size="lg" variant="default">
      <Link href="/">Back to Home</Link>
     </Button>
     <Button asChild size="lg" variant="outline">
      <Link href="/contact">Contact Us</Link>
     </Button>
    </div>
   </div>
  </section>
 );
}
