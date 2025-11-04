"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
 title?: string;
 description?: string;
 phone?: string;
 email?: string;
 address?: string;
}

export const Contact2 = ({
 title = "Contact Us",
 description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
 phone = "+254 700 000000",
 email = "hello@rotaracthurlingham.com",
 address = "Haddash Hotel, Ralph Bunche St, UpperHill, Nairobi, Kenya",
}: Contact2Props) => {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
  "idle"
 );
 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
 });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const { id, value } = e.target;
  setFormData((prev) => ({
   ...prev,
   [id]: value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
   // Simulate form submission - replace with your actual API endpoint
   const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   if (response.ok) {
    setSubmitStatus("success");
    setFormData({
     firstName: "",
     lastName: "",
     email: "",
     subject: "",
     message: "",
    });
    setTimeout(() => setSubmitStatus("idle"), 5000);
   } else {
    setSubmitStatus("error");
    setTimeout(() => setSubmitStatus("idle"), 5000);
   }
  } catch (error) {
   console.error("Contact form error:", error);
   setSubmitStatus("error");
   setTimeout(() => setSubmitStatus("idle"), 5000);
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <section className="py-16 md:py-48 px-4">
   <div className="container mx-auto">
    <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 lg:flex-row lg:gap-16">
     {/* Left Section - Contact Info */}
     <div className="flex max-w-md flex-col justify-between gap-12">
      <div className="space-y-3">
       <h1 className="text-4xl md:text-5xl font-bold text-foreground">
        {title}
       </h1>
       <p className="text-base text-muted-foreground">{description}</p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
       <h3 className="text-xl font-semibold text-foreground">Get in Touch</h3>

       {/* Email */}
       <div className="flex gap-4">
        <div className="flex-shrink-0">
         <div className="flex items-center justify-center h-10 w-10 rounded-md bg-cranberry/10">
          <Mail className="h-5 w-5 text-cranberry" />
         </div>
        </div>
        <div className="space-y-1">
         <p className="font-medium text-foreground">Email</p>
         <a
          href={`mailto:${email}`}
          className="text-muted-foreground hover:text-cranberry transition-colors"
         >
          {email}
         </a>
        </div>
       </div>

       {/* Phone */}
       <div className="flex gap-4">
        <div className="flex-shrink-0">
         <div className="flex items-center justify-center h-10 w-10 rounded-md bg-cranberry/10">
          <Phone className="h-5 w-5 text-cranberry" />
         </div>
        </div>
        <div className="space-y-1">
         <p className="font-medium text-foreground">Phone</p>
         <a
          href={`tel:${phone}`}
          className="text-muted-foreground hover:text-cranberry transition-colors"
         >
          {phone}
         </a>
        </div>
       </div>

       {/* Address */}
       <div className="flex gap-4">
        <div className="flex-shrink-0">
         <div className="flex items-center justify-center h-10 w-10 rounded-md bg-cranberry/10">
          <MapPin className="h-5 w-5 text-cranberry" />
         </div>
        </div>
        <div className="space-y-1">
         <p className="font-medium text-foreground">Location</p>
         <p className="text-muted-foreground">{address}</p>
        </div>
       </div>
      </div>
     </div>

     {/* Right Section - Form */}
     <div className="w-full max-w-lg flex flex-col gap-6 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div>
       <h2 className="text-2xl font-semibold text-card-foreground">
        Send us a Message
       </h2>
       <p className="text-sm text-muted-foreground mt-1">
        We&apos;ll get back to you as soon as possible.
       </p>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
       <div className="flex gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
        <div>
         <p className="font-medium text-green-900 dark:text-green-400">
          Message Sent!
         </p>
         <p className="text-sm text-green-800 dark:text-green-300">
          Thank you for contacting us. We&apos;ll be in touch soon.
         </p>
        </div>
       </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
       <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
         <p className="font-medium text-red-900 dark:text-red-400">
          Error Sending Message
         </p>
         <p className="text-sm text-red-800 dark:text-red-300">
          Please try again or contact us directly.
         </p>
        </div>
       </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
       {/* First and Last Name */}
       <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full gap-2">
         <Label htmlFor="firstName" className="text-foreground">
          First Name
         </Label>
         <Input
          type="text"
          id="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={isSubmitting}
         />
        </div>
        <div className="grid w-full gap-2">
         <Label htmlFor="lastName" className="text-foreground">
          Last Name
         </Label>
         <Input
          type="text"
          id="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={isSubmitting}
         />
        </div>
       </div>

       {/* Email */}
       <div className="grid w-full gap-2">
        <Label htmlFor="email" className="text-foreground">
         Email Address
        </Label>
        <Input
         type="email"
         id="email"
         placeholder="john@example.com"
         value={formData.email}
         onChange={handleChange}
         required
         disabled={isSubmitting}
        />
       </div>

       {/* Subject */}
       <div className="grid w-full gap-2">
        <Label htmlFor="subject" className="text-foreground">
         Subject
        </Label>
        <Input
         type="text"
         id="subject"
         placeholder="How can we help?"
         value={formData.subject}
         onChange={handleChange}
         required
         disabled={isSubmitting}
        />
       </div>

       {/* Message */}
       <div className="grid w-full gap-2">
        <Label htmlFor="message" className="text-foreground">
         Message
        </Label>
        <Textarea
         id="message"
         placeholder="Tell us more about your inquiry..."
         className="min-h-[120px] resize-none"
         value={formData.message}
         onChange={handleChange}
         required
         disabled={isSubmitting}
        />
       </div>

       {/* Submit Button */}
       <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        variant="default"
       >
        {isSubmitting ? "Sending..." : "Send Message"}
       </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">
       We respect your privacy. Your information is safe with us.
      </p>
     </div>
    </div>
   </div>
  </section>
 );
};
