"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/shop";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cranberry/35 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`rounded-full px-3 py-1 font-montserrat text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                product.badge === "Popular"
                  ? "bg-cranberry"
                  : product.badge === "New"
                  ? "bg-emerald-600"
                  : product.badge === "Limited"
                  ? "bg-amber-600"
                  : "bg-rose-600"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-full bg-secondary-yellow px-2.5 py-0.5 font-montserrat text-xs font-extrabold text-neutral-900 shadow">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex size-11 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-white dark:bg-neutral-800 dark:text-white"
              title="Quick View"
            >
              <Eye className="size-5" />
            </button>
          )}
          <button
            onClick={() => addToCart(product)}
            className="flex size-11 items-center justify-center rounded-full bg-cranberry text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-cranberry/90"
            title="Add to Cart"
          >
            <ShoppingBag className="size-5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="uppercase tracking-wider text-cranberry font-semibold">{product.category}</span>
          <div className="flex items-center gap-1 font-montserrat text-amber-500">
            <Star className="size-3.5 fill-amber-500 text-amber-500" />
            <span className="font-bold text-foreground">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        <Link href={`/shop/${product.slug}`} className="mt-2 block">
          <h3 className="line-clamp-1 font-raleway text-base font-bold text-foreground transition-colors hover:text-cranberry">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 line-clamp-2 font-montserrat text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Footer Price & CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <div className="font-raleway text-lg font-extrabold text-cranberry">
              KSh {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="font-montserrat text-xs text-muted-foreground line-through">
                KSh {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="rounded-xl bg-cranberry/10 text-cranberry hover:bg-cranberry hover:text-white transition-colors font-montserrat text-xs font-semibold"
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </div>
  );
};
