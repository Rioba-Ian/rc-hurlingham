"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, MapPin, Truck, Smartphone, CreditCard, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutFormData, FulfillmentMethod, PaymentMethod } from "@/types/shop";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    fulfillmentMethod: "pickup",
    deliveryAddress: "",
    city: "Nairobi",
    pickupLocation: "Rotaract Hurlingham Bi-Weekly Fellowship Meeting",
    paymentMethod: "mpesa",
    notes: "",
    promoCode: "",
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = formData.fulfillmentMethod === "courier" ? 300 : 0;
  const discountAmount = Math.round((subtotal * promoDiscountPercent) / 100);
  const totalAmount = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = formData.promoCode?.trim().toUpperCase();

    if (code === "HURLINGHAM10" || code === "ROTARACT10") {
      setAppliedPromo(code);
      setPromoDiscountPercent(10);
    } else if (code === "FELLOWSHIP") {
      setAppliedPromo(code);
      setPromoDiscountPercent(15);
    } else {
      setPromoError("Invalid promo code. Try 'HURLINGHAM10'");
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in your contact details before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `HURL-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Store completed order data in sessionStorage for success page display
      const orderSummary = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: formData,
        items,
        subtotal,
        shippingFee,
        discount: discountAmount,
        totalAmount,
      };
      sessionStorage.setItem("rc_hurlingham_last_order", JSON.stringify(orderSummary));

      clearCart();
      setIsSubmitting(false);
      router.push(`/shop/checkout/success?orderId=${orderId}`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center pt-28">
        <h1 className="font-raleway text-3xl font-bold text-foreground">Your Shopping Bag is Empty</h1>
        <p className="mt-2 font-montserrat text-muted-foreground">
          Add some Rotaract Club of Hurlingham merchandise items before checking out.
        </p>
        <Button asChild className="mt-6 bg-cranberry text-white">
          <Link href="/shop">Browse Merchandise Store</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-[1080px] px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-montserrat text-sm font-medium text-muted-foreground hover:text-cranberry transition-colors"
          >
            <ArrowLeft className="size-4" /> Return to Store
          </Link>
        </div>

        <h1 className="font-raleway text-3xl font-extrabold text-foreground sm:text-4xl">
          Complete Your Merchandise Order
        </h1>
        <p className="mt-1 font-montserrat text-sm text-muted-foreground">
          Fill in your details below to finalize your Rotaract Hurlingham merchandise order.
        </p>

        {/* Two-Column Layout */}
        <form onSubmit={handleSubmitOrder} className="mt-8 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Form Details (7 cols) */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Customer Information */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-raleway text-xl font-bold text-foreground flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-cranberry/10 font-montserrat text-xs font-bold text-cranberry">
                  1
                </span>
                Customer Contact Details
              </h2>

              <div className="mt-6 space-y-4 font-montserrat text-sm">
                <div>
                  <label className="block font-semibold text-foreground mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Mutua"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 transition-all focus:border-cranberry focus:outline-none focus:ring-2 focus:ring-cranberry/20"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-semibold text-foreground mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 transition-all focus:border-cranberry focus:outline-none focus:ring-2 focus:ring-cranberry/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-foreground mb-1.5">M-Pesa / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0712 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 transition-all focus:border-cranberry focus:outline-none focus:ring-2 focus:ring-cranberry/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Fulfillment Method */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-raleway text-xl font-bold text-foreground flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-cranberry/10 font-montserrat text-xs font-bold text-cranberry">
                  2
                </span>
                Fulfillment & Delivery
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fulfillmentMethod: "pickup" })}
                  className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                    formData.fulfillmentMethod === "pickup"
                      ? "border-cranberry bg-cranberry/5 ring-2 ring-cranberry/20"
                      : "border-border bg-background hover:border-cranberry/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-raleway font-bold text-foreground">
                      <MapPin className="size-5 text-cranberry" /> Fellowship Pickup
                    </span>
                    <span className="rounded-full bg-emerald-600/10 px-2.5 py-0.5 font-montserrat text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      FREE
                    </span>
                  </div>
                  <p className="mt-2 font-montserrat text-xs text-muted-foreground">
                    Collect at Rotaract Hurlingham Fellowship Meeting in Nairobi.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, fulfillmentMethod: "courier" })}
                  className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                    formData.fulfillmentMethod === "courier"
                      ? "border-cranberry bg-cranberry/5 ring-2 ring-cranberry/20"
                      : "border-border bg-background hover:border-cranberry/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-raleway font-bold text-foreground">
                      <Truck className="size-5 text-cranberry" /> Courier Delivery
                    </span>
                    <span className="font-montserrat text-xs font-bold text-foreground">
                      KSh 300
                    </span>
                  </div>
                  <p className="mt-2 font-montserrat text-xs text-muted-foreground">
                    Doorstep / Parcel delivery anywhere in Nairobi & Kenya.
                  </p>
                </button>
              </div>

              {formData.fulfillmentMethod === "courier" && (
                <div className="mt-6 space-y-4 font-montserrat text-sm border-t pt-4">
                  <div>
                    <label className="block font-semibold text-foreground mb-1.5">Delivery Physical Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Building, Street, Area / Estate Name"
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 transition-all focus:border-cranberry focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Method */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-raleway text-xl font-bold text-foreground flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-cranberry/10 font-montserrat text-xs font-bold text-cranberry">
                  3
                </span>
                Payment Options
              </h2>

              <div className="mt-6 space-y-3">
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "mpesa" })}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === "mpesa"
                      ? "border-cranberry bg-cranberry/5 ring-2 ring-cranberry/20"
                      : "border-border bg-background hover:border-cranberry/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="size-6 text-emerald-600" />
                    <div>
                      <span className="font-raleway font-bold text-foreground block">M-Pesa Express</span>
                      <span className="font-montserrat text-xs text-muted-foreground">Instant STK push notification sent to your phone</span>
                    </div>
                  </div>
                  {formData.paymentMethod === "mpesa" && <Check className="size-5 text-cranberry" />}
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === "card"
                      ? "border-cranberry bg-cranberry/5 ring-2 ring-cranberry/20"
                      : "border-border bg-background hover:border-cranberry/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-6 text-blue-600" />
                    <div>
                      <span className="font-raleway font-bold text-foreground block">Credit / Debit Card</span>
                      <span className="font-montserrat text-xs text-muted-foreground">Visa, Mastercard & online banking</span>
                    </div>
                  </div>
                  {formData.paymentMethod === "card" && <Check className="size-5 text-cranberry" />}
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "delivery" })}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    formData.paymentMethod === "delivery"
                      ? "border-cranberry bg-cranberry/5 ring-2 ring-cranberry/20"
                      : "border-border bg-background hover:border-cranberry/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-amber-600" />
                    <div>
                      <span className="font-raleway font-bold text-foreground block">Pay on Fellowship Pickup</span>
                      <span className="font-montserrat text-xs text-muted-foreground">Pay via M-Pesa Till or Cash when receiving your items</span>
                    </div>
                  </div>
                  {formData.paymentMethod === "delivery" && <Check className="size-5 text-cranberry" />}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-raleway text-xl font-bold text-foreground">Order Summary</h2>

              {/* Items List */}
              <div className="mt-4 max-h-60 overflow-y-auto divide-y">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image src={item.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 font-montserrat text-xs">
                      <h4 className="line-clamp-1 font-semibold text-foreground">{item.product.name}</h4>
                      <p className="text-muted-foreground">
                        {item.selectedSize && `Size: ${item.selectedSize}`} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-raleway font-bold text-sm text-foreground">
                      KSh {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-cranberry" />
                  <span className="font-montserrat text-xs font-semibold text-foreground">Have a promo code?</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. HURLINGHAM10"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    className="h-10 flex-1 rounded-xl border border-border bg-background px-3 font-montserrat text-xs uppercase focus:border-cranberry focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="h-10 rounded-xl bg-muted px-4 font-montserrat text-xs font-bold text-foreground hover:bg-accent"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="mt-1.5 font-montserrat text-xs text-emerald-600 font-semibold">
                    ✓ Promo code {appliedPromo} applied ({promoDiscountPercent}% off)
                  </p>
                )}
                {promoError && (
                  <p className="mt-1.5 font-montserrat text-xs text-destructive">{promoError}</p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="mt-6 border-t pt-4 space-y-2.5 font-montserrat text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-foreground">KSh {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Fulfillment Fee</span>
                  <span className="font-semibold text-foreground">
                    {shippingFee === 0 ? "FREE (Pickup)" : `KSh ${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({promoDiscountPercent}%)</span>
                    <span>-KSh {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t pt-3 flex items-center justify-between">
                  <span className="font-raleway text-base font-bold text-foreground">Total Amount</span>
                  <span className="font-raleway text-2xl font-extrabold text-cranberry">
                    KSh {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full h-13 rounded-xl bg-cranberry font-montserrat text-base font-bold text-white shadow-xl hover:bg-cranberry/90 disabled:opacity-50"
              >
                {isSubmitting ? "Processing Order..." : `Confirm Order (KSh ${totalAmount.toLocaleString()})`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
