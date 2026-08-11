"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Plus, Minus, ArrowRight, Check } from "lucide-react";
import { Product } from "@/types/shop";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl border border-border bg-background p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === idx
                        ? "border-cranberry ring-2 ring-cranberry/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cranberry/10 px-3 py-1 font-montserrat text-xs font-bold uppercase tracking-wider text-cranberry">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-full bg-secondary-yellow px-3 py-1 font-montserrat text-xs font-extrabold text-neutral-900">
                  {product.badge}
                </span>
              )}
            </div>

            <h2 className="mt-3 font-raleway text-2xl font-bold text-foreground">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-3 font-montserrat text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="size-4 fill-amber-500 text-amber-500" />
                <span className="font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviewCount} club member reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-raleway text-3xl font-extrabold text-cranberry">
                KSh {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-montserrat text-base text-muted-foreground line-through">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-4 font-montserrat text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="mt-6">
                <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 font-montserrat text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? "border-cranberry bg-cranberry text-white shadow-md"
                          : "border-border bg-background text-foreground hover:border-cranberry/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div className="mt-5">
                <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Color: <span className="font-semibold text-muted-foreground">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`relative size-8 rounded-full border-2 transition-transform ${
                        selectedColor === col.name ? "scale-110 border-cranberry ring-2 ring-cranberry/30" : "border-border"
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && (
                        <Check className={`absolute inset-0 m-auto size-4 ${col.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border bg-card px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-montserrat text-sm font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                onClick={handleAdd}
                className="flex-1 h-12 rounded-xl bg-cranberry font-montserrat font-semibold text-white shadow-lg hover:bg-cranberry/90"
              >
                <ShoppingBag className="mr-2 size-5" /> Add to Shopping Bag
              </Button>
            </div>

            {/* View Full Product Link */}
            <div className="mt-6 border-t pt-4 text-center">
              <Link
                href={`/shop/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-cranberry hover:underline"
              >
                View Full Product Specs & Features <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
