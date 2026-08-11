"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, Smartphone } from "lucide-react";
import { OrderDetails } from "@/types/shop";
import { Button } from "@/components/ui/button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "HURL-8942";

  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("rc_hurlingham_last_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse order from sessionStorage", e);
    }
  }, []);

  return (
    <div className="mx-auto max-w-[800px] px-6 text-center">
      {/* Animated Checkmark */}
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-12 animate-in zoom-in-50 duration-300" />
      </div>

      <span className="rounded-full bg-cranberry/10 px-4 py-1.5 font-montserrat text-xs font-bold uppercase tracking-wider text-cranberry">
        Order Confirmed
      </span>

      <h1 className="mt-3 font-raleway text-3xl font-extrabold text-foreground sm:text-4xl">
        Thank You for Supporting Rotaract Hurlingham!
      </h1>

      <p className="mt-3 font-montserrat text-base text-muted-foreground">
        Your merchandise order has been received. Your order reference number is{" "}
        <strong className="font-bold text-cranberry">{orderId}</strong>.
      </p>

      {/* M-Pesa STK / Till Payment Instructions */}
      {order?.customer.paymentMethod === "mpesa" && (
        <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-left sm:p-8">
          <div className="flex items-center gap-3">
            <Smartphone className="size-6 text-emerald-600" />
            <h3 className="font-raleway text-lg font-bold text-foreground">M-Pesa Payment Guide</h3>
          </div>

          <p className="mt-2 font-montserrat text-sm text-muted-foreground">
            An M-Pesa prompt has been dispatched to <strong className="text-foreground">{order.customer.phone}</strong>. If you missed the prompt, you can manually complete the payment:
          </p>

          <div className="mt-4 rounded-2xl border bg-card p-4 font-montserrat text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paybill / Till Number:</span>
              <span className="font-bold text-foreground">247247 (Equity)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Number:</span>
              <span className="font-bold text-cranberry">{orderId}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-muted-foreground">Amount to Pay:</span>
              <span className="font-extrabold text-emerald-600">KSh {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Card */}
      {order && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-left shadow-sm sm:p-8">
          <h3 className="font-raleway text-lg font-bold text-foreground border-b pb-3">Order Details</h3>

          {/* Customer Info */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 font-montserrat text-xs text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground block">Customer:</span>
              <span>{order.customer.fullName} ({order.customer.email})</span>
            </div>

            <div>
              <span className="font-semibold text-foreground block">Fulfillment:</span>
              <span>
                {order.customer.fulfillmentMethod === "pickup"
                  ? "Fellowship Meeting Pickup (Free)"
                  : `Courier Delivery (${order.customer.deliveryAddress})`}
              </span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="mt-6 border-t pt-4 divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3 font-montserrat text-sm">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image src={item.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground">{item.product.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.selectedSize && `Size: ${item.selectedSize}`} • Qty: {item.quantity}
                  </p>
                </div>

                <span className="font-raleway font-bold text-foreground">
                  KSh {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 border-t pt-4 flex items-center justify-between font-montserrat">
            <span className="font-bold text-foreground">Total Paid / Due</span>
            <span className="font-raleway text-2xl font-extrabold text-cranberry">
              KSh {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="h-12 rounded-xl bg-cranberry font-montserrat font-semibold text-white px-6">
          <Link href="/shop" className="flex items-center gap-2">
            <ShoppingBag className="size-4" /> Continue Shopping
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-12 rounded-xl border-border font-montserrat font-semibold px-6">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center p-6 text-center">
            <div className="font-montserrat text-sm text-muted-foreground animate-pulse">
              Loading order summary...
            </div>
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
