"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-background shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
          <div className="flex h-full flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cranberry/10 text-cranberry">
                  <ShoppingBag className="size-5" />
                </div>
                <div>
                  <h2 className="font-raleway text-lg font-bold text-foreground">Your Shopping Bag</h2>
                  <p className="font-montserrat text-xs text-muted-foreground">
                    {cartCount === 1 ? "1 item selected" : `${cartCount} items selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ShoppingBag className="size-10" />
                  </div>
                  <h3 className="font-raleway text-lg font-bold text-foreground">Your bag is empty</h3>
                  <p className="mt-1 max-w-xs font-montserrat text-sm text-muted-foreground">
                    Support Rotaract Club of Hurlingham community projects by grabbing some official merchandise!
                  </p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    asChild
                    className="mt-6 bg-cranberry text-white hover:bg-cranberry/90"
                  >
                    <Link href="/shop">Browse Merchandise</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-4 rounded-2xl border bg-card p-3.5 shadow-sm transition-all hover:border-cranberry/30"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="line-clamp-1 font-raleway font-semibold text-foreground hover:text-cranberry transition-colors"
                        >
                          {item.product.name}
                        </Link>

                        <div className="mt-1 flex flex-wrap items-center gap-2 font-montserrat text-xs text-muted-foreground">
                          {item.selectedSize && (
                            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">
                              {item.selectedColor}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-raleway font-bold text-cranberry text-sm">
                            KSh {(item.product.price * item.quantity).toLocaleString()}
                          </span>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-1 rounded-lg border bg-background px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-5 text-center font-montserrat text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t bg-card p-6 shadow-lg">
                <div className="space-y-2 font-montserrat text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Fulfillment</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Fellowship Pickup available</span>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4 flex items-center justify-between">
                  <span className="font-raleway text-base font-bold text-foreground">Total</span>
                  <span className="font-raleway text-xl font-bold text-cranberry">
                    KSh {subtotal.toLocaleString()}
                  </span>
                </div>

                <Button
                  asChild
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 w-full h-12 rounded-xl bg-cranberry font-montserrat font-semibold text-white shadow-lg hover:bg-cranberry/90"
                >
                  <Link href="/shop/checkout" className="flex items-center justify-center gap-2">
                    Proceed to Checkout <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
