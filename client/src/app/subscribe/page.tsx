"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Subscribe() {
 const [email, setEmail] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [message, setMessage] = useState<{
  type: "success" | "error";
  text: string;
 } | null>(null);
 const searchParams = useSearchParams();

 useEffect(() => {
  const error = searchParams.get("error");
  if (error) {
   const errorMessages = {
    "missing-token": "Verification link is missing the required token.",
    "invalid-token": "Invalid verification link. Please try subscribing again.",
    "invalid-data": "Invalid subscription data. Please try subscribing again.",
    "expired-token":
     "Verification link has expired. Please subscribe again to get a new link.",
    "verification-failed": "Verification failed. Please try subscribing again.",
   };

   setMessage({
    type: "error",
    text:
     errorMessages[error as keyof typeof errorMessages] ||
     "An error occurred. Please try again.",
   });
  }
 }, [searchParams]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage(null);

  try {
   const response = await fetch("/api/newsletter/subscribe", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
   });

   const data = await response.json();

   if (response.ok) {
    setMessage({
     type: "success",
     text:
      "Verification email sent! Please check your inbox and click the confirmation link.",
    });
    setEmail("");
   } else {
    setMessage({
     type: "error",
     text: data.error || "Something went wrong. Please try again.",
    });
   }
  } catch (error) {
   setMessage({
    type: "error",
    text: "Network error. Please check your connection and try again.",
   });
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <main className="flex-1 py-[20vmin] font-montserrat">
   <div className="max-w-2xl w-4/5 mx-auto space-y-8 p-8">
    <h1 className="relative z-10 text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-raleway font-bold">
     Subscribe to our newsletter
    </h1>
    <p className="text-sm md:text-lg font-montserrat text-center relative z-10">
     Get the latest news and updates from our club. We&apos;ll send you an email
     when we launch.
    </p>

    {message && (
     <div
      className={`p-4 rounded-lg text-center ${
       message.type === "success"
        ? "bg-green-50 border border-green-200 text-green-800"
        : "bg-red-50 border border-red-200 text-red-800"
      }`}
     >
      {message.text}
     </div>
    )}

    <form
     onSubmit={handleSubmit}
     className="flex flex-col items-center justify-center space-y-8"
    >
     <Input
      type="email"
      placeholder="hello@rotaract.co.ke"
      className="w-full relative z-10"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      disabled={isLoading}
     />
     <Button type="submit" size={"lg"} disabled={isLoading}>
      {isLoading ? "Sending..." : "Subscribe"}
     </Button>
    </form>
   </div>
  </main>
 );
}
