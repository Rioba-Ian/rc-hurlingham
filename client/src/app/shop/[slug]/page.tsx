"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ShoppingBag, ArrowLeft, Plus, Minus, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/molecules/shop/ProductCard";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  const { addToCart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center pt-28">
        <h1 className="font-raleway text-3xl font-bold text-foreground">Merchandise Not Found</h1>
        <p className="mt-2 font-montserrat text-muted-foreground">
          The requested merchandise item does not exist or has been discontinued.
        </p>
        <Button asChild className="mt-6 bg-cranberry text-white">
          <Link href="/shop">Back to Merchandise Store</Link>
        </Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(false);
    router.push("/shop/checkout");
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-[1080px] px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-montserrat text-sm font-medium text-muted-foreground hover:text-cranberry transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Merchandise Store
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-neutral-100 dark:bg-neutral-900 shadow-sm">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
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
                    className={`relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedImage === idx
                        ? "border-cranberry ring-2 ring-cranberry/30 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cranberry/10 px-3.5 py-1 font-montserrat text-xs font-bold uppercase tracking-wider text-cranberry">
                {product.category}
              </span>
              {product.badge && (
                <span className="rounded-full bg-secondary-yellow px-3 py-1 font-montserrat text-xs font-extrabold text-neutral-900">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-raleway text-3xl font-extrabold text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-4 font-montserrat text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="size-4 fill-amber-500 text-amber-500" />
                <span className="font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{product.reviewCount} Rotaract member reviews</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">In Stock</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-raleway text-4xl font-extrabold text-cranberry">
                KSh {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-montserrat text-xl text-muted-foreground line-through">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-5 font-montserrat text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="mt-6 border-t border-border pt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-montserrat text-xs font-bold uppercase tracking-wider text-foreground">
                    Select Size
                  </label>
                  <span className="font-montserrat text-xs text-muted-foreground">Standard Unisex Fit</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-11 min-w-12 items-center justify-center rounded-xl border px-4 font-montserrat text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "border-cranberry bg-cranberry text-white shadow-md shadow-cranberry/20"
                          : "border-border bg-card text-foreground hover:border-cranberry/50"
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
              <div className="mt-6">
                <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                  Color Variant: <span className="font-semibold text-muted-foreground">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`relative size-9 rounded-full border-2 transition-transform ${
                        selectedColor === col.name ? "scale-110 border-cranberry ring-4 ring-cranberry/20" : "border-border"
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

            {/* Quantity and Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-12 items-center rounded-xl border bg-card px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center font-montserrat text-base font-bold">
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
                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                className="h-12 flex-1 rounded-xl bg-cranberry font-montserrat font-semibold text-white shadow-lg hover:bg-cranberry/90"
              >
                <ShoppingBag className="mr-2 size-5" /> Add to Shopping Bag
              </Button>

              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="h-12 rounded-xl border-cranberry text-cranberry hover:bg-cranberry/10 font-montserrat font-semibold"
              >
                Buy Now
              </Button>
            </div>

            {/* Key Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 font-montserrat text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Truck className="size-5 text-cranberry" />
                <span>Free Fellowship Pickup</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-5 text-cranberry" />
                <span>M-Pesa & Card Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specs Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Features */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-raleway text-xl font-bold text-foreground">Product Highlights</h3>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-muted-foreground">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-cranberry/10 text-cranberry">
                    <Check className="size-3" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications Table */}
          {product.specs && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-raleway text-xl font-bold text-foreground">Specifications</h3>
              <div className="mt-4 divide-y border-t font-montserrat text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-3">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="font-semibold text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Merchandise Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-border pt-16">
            <h2 className="font-raleway text-2xl font-bold text-foreground">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
