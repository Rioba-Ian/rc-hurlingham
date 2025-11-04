"use client";

import React from "react";
import { AlertCircle, Home, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import RotaractLogo from "@/assets/club_logo.png";

const navigationSuggestions = [
 { name: "Home", href: "/" },
 { name: "About Us", href: "/about" },
 { name: "Events", href: "/events" },
 { name: "Blog", href: "/blog" },
 { name: "Contact", href: "/contact" },
];

export default function NotFound() {
 return (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-32">
   <div className="max-w-3xl w-full space-y-12">
    <div className="text-center space-y-6">
     <div className="space-y-3">
      <h1 className="text-5xl md:text-6xl font-bold text-foreground">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
       Page Not Found
      </h2>
      <p className="text-lg text-muted-foreground">
       Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
     </div>
    </div>

    {/* Description */}
    <div className="bg-card border rounded-lg p-6 md:p-8 space-y-4">
     <p className="text-base text-card-foreground">
      The page you&apos;re trying to access either doesn&apos;t exist or has
      been moved. This could happen if:
     </p>
     <ul className="space-y-3 text-sm text-card-foreground list-disc list-inside">
      <li>The URL was typed incorrectly</li>
      <li>The page has been removed or archived</li>
      <li>You followed an outdated link</li>
      <li>There&apos;s a temporary technical issue</li>
     </ul>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
     <Button asChild size="lg" variant="default" className="gap-2">
      <Link href="/">
       <Home className="w-4 h-4" />
       Back to Home
      </Link>
     </Button>
     <Button asChild size="lg" variant="outline" className="gap-2">
      <Link href="/contact">
       <Mail className="w-4 h-4" />
       Get Help
      </Link>
     </Button>
    </div>

    {/* Navigation Suggestions */}
    <div className="space-y-4">
     <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide">
      Or explore these popular pages
     </p>
     <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {navigationSuggestions.map((item) => (
       <Link
        key={item.href}
        href={item.href}
        className="relative group px-4 py-3 text-center rounded-md border border-border bg-background/50 hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-all duration-200 dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
       >
        {item.name}
       </Link>
      ))}
     </div>
    </div>

    {/* Help Section */}
    <div className="bg-cranberry/5 dark:bg-cranberry/10 border border-cranberry/20 rounded-lg p-6 md:p-8 space-y-4">
     <div className="flex items-start gap-4">
      <Search className="w-5 h-5 text-cranberry mt-1 flex-shrink-0" />
      <div className="space-y-2">
       <h3 className="font-semibold text-foreground">
        Can&apos;t find what you need?
       </h3>
       <p className="text-sm text-muted-foreground">
        Visit our{" "}
        <Link
         href="/contact"
         className="text-cranberry hover:underline font-medium"
        >
         contact page
        </Link>{" "}
        or reach out to us directly. We&apos;re here to help!
       </p>
      </div>
     </div>
    </div>

    {/* Footer Message */}
    <p className="text-center text-xs text-muted-foreground">
     Error Code: 404 | Rotaract Club of Hurlingham
    </p>
   </div>
  </section>
 );
}
