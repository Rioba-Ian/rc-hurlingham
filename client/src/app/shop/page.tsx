"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ShieldCheck, HeartHandshake, Truck, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCategory, Product } from "@/types/shop";
import { ProductCard } from "@/components/molecules/shop/ProductCard";
import { QuickViewModal } from "@/components/molecules/shop/QuickViewModal";

const CATEGORIES: ProductCategory[] = [
  "All",
  "Apparel",
  "Accessories",
  "Pins & Badges",
  "Drinkware",
  "Stationery"
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "newest">("popular");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return a.badge === "New" ? -1 : 1;
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cranberry/10 via-background to-background py-16 dark:from-cranberry/20">
        <div className="mx-auto max-w-[1080px] px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cranberry/30 bg-cranberry/10 px-4 py-1.5 font-montserrat text-xs font-bold uppercase tracking-wider text-cranberry">
            <Sparkles className="size-4" /> Official Rotaract Merchandise
          </div>

          <h1 className="mt-4 font-raleway text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Wear the Impact. <br />
            <span className="text-cranberry">Support the Mission.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-montserrat text-base text-muted-foreground sm:text-lg">
            100% of proceeds from our merchandise sales directly fund community service projects, youth empowerment, and local initiatives led by the Rotaract Club of Hurlingham.
          </p>

          {/* Search & Filter Bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search hoodies, polo shirts, lapel pins, flasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-13 w-full rounded-2xl border border-border bg-card pl-12 pr-4 font-montserrat text-sm shadow-sm transition-all focus:border-cranberry focus:outline-none focus:ring-2 focus:ring-cranberry/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Content */}
      <div className="mx-auto max-w-[1080px] px-6">
        {/* Category Pills & Sorting Bar */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 font-montserrat text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-cranberry text-white shadow-md shadow-cranberry/20"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <label className="font-montserrat text-xs font-semibold text-muted-foreground">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-border bg-card px-3 py-2 font-montserrat text-xs font-medium text-foreground focus:border-cranberry focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="my-16 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-8" />
            </div>
            <h3 className="font-raleway text-xl font-bold text-foreground">No merchandise found</h3>
            <p className="mt-1 font-montserrat text-sm text-muted-foreground">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 font-montserrat text-xs font-bold text-cranberry hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Value Propositions Banner */}
        <section className="mt-20 rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-cranberry/10 text-cranberry">
                <HeartHandshake className="size-7" />
              </div>
              <h4 className="font-raleway text-lg font-bold text-foreground">Community Impact</h4>
              <p className="mt-2 font-montserrat text-xs leading-relaxed text-muted-foreground">
                100% of profits fund local service projects in education, environment, health, and economic empowerment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-cranberry/10 text-cranberry">
                <Truck className="size-7" />
              </div>
              <h4 className="font-raleway text-lg font-bold text-foreground">Convenient Pickup</h4>
              <p className="mt-2 font-montserrat text-xs leading-relaxed text-muted-foreground">
                Collect your merchandise for free at our regular Hurlingham fellowship meetings or request courier delivery.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-cranberry/10 text-cranberry">
                <ShieldCheck className="size-7" />
              </div>
              <h4 className="font-raleway text-lg font-bold text-foreground">Secure Payments</h4>
              <p className="mt-2 font-montserrat text-xs leading-relaxed text-muted-foreground">
                Seamless checkout supporting M-Pesa Express, Credit/Debit cards, and Pay on Delivery options.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
