"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, ShoppingBag, Store, ShieldCheck, Truck, Sparkles } from "lucide-react";
import ClubLogo from "@/assets/club_logo.png";
import ThemeSwitch from "@/components/molecules/ThemeSwitch";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

function ShopHeader() {
  const { toggleCart, cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-40 w-full px-3 pt-3">
      <div
        className={cn(
          "mx-auto max-w-[1080px] rounded-2xl border border-border/80 bg-background/80 px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-6",
          isScrolled && "shadow-xl border-cranberry/30 bg-background/90"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Store Logo (Links back to main website) */}
          <div className="flex items-center gap-3">
            <Link href="/" title="Return to Main Website" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <Image
                src={ClubLogo}
                alt="Rotaract Club of Hurlingham Logo"
                width={140}
                height={50}
                className="h-auto w-[110px] sm:w-[140px]"
              />
            </Link>
          </div>

          {/* Center: Store Nav Links */}
          <nav className="hidden md:flex items-center gap-6 font-montserrat text-xs font-semibold">
            <Link href="/shop" className="text-foreground hover:text-cranberry transition-colors">
              Merchandise Store
            </Link>
            <Link href="/shop/checkout" className="text-muted-foreground hover:text-cranberry transition-colors">
              Checkout
            </Link>
          </nav>

          {/* Right: Theme Switch & Shopping Bag */}
          <div className="flex items-center gap-3">
            <ThemeSwitch />

            <button
              onClick={toggleCart}
              className="relative flex h-10 items-center gap-2 rounded-xl bg-cranberry px-3.5 font-montserrat text-xs font-bold text-white shadow-md transition-all hover:bg-cranberry/90"
              aria-label="Open Cart"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-white font-montserrat text-[11px] font-extrabold text-cranberry shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ShopFooter() {
  return (
    <footer className="border-t border-border bg-card py-16 text-card-foreground">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1: Store Intro */}
          <div>
            <Link href="/" title="Return to Main Website" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src={ClubLogo}
                alt="Rotaract Club of Hurlingham"
                width={140}
                height={50}
                className="h-auto w-[120px]"
              />
            </Link>
            <p className="mt-4 font-montserrat text-xs leading-relaxed text-muted-foreground">
              Official merchandise store of the Rotaract Club of Hurlingham. Wear the impact and support community service projects across Nairobi and Kenya.
            </p>
          </div>

          {/* Column 2: Pickup & Support */}
          <div>
            <h4 className="font-raleway text-sm font-bold text-foreground">Fellowship Pickup & Delivery</h4>
            <p className="mt-3 font-montserrat text-xs leading-relaxed text-muted-foreground">
              Free pickup available at our bi-weekly Rotaract Hurlingham fellowship meetings in Nairobi.
            </p>
            <div className="mt-4 space-y-2 font-montserrat text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-cranberry" />
                <span>Nationwide Courier Delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-cranberry" />
                <span>M-Pesa & Card Payment Protection</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Store Links */}
          <div>
            <h4 className="font-raleway text-sm font-bold text-foreground">Merchandise Store Links</h4>
            <ul className="mt-3 space-y-2 font-montserrat text-xs text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-cranberry transition-colors">
                  All Merchandise Catalog
                </Link>
              </li>
              <li>
                <Link href="/shop/checkout" className="hover:text-cranberry transition-colors">
                  Cart & Checkout
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cranberry transition-colors">
                  Contact Store Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center font-montserrat text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Rotaract Club of Hurlingham Store. All proceeds directly fund club service initiatives.
        </div>
      </div>
    </footer>
  );
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <ShopHeader />
      <div className="flex-1">{children}</div>
      <ShopFooter />
    </div>
  );
}
