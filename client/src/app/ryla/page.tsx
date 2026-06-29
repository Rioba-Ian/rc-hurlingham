"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Globe, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  ZoomIn,
  X
} from "lucide-react";

// UTM link helper
const RYLA_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page";
const RYLA_REG_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page#stay";

// Framer Motion Animation Variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function RylaPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pamojaPillars = [
    {
      letter: "P",
      title: "Purpose & People",
      description: "Know yourself. Know your community. Fostering self-discovery and alignment with community needs.",
      color: "#e6007e"
    },
    {
      letter: "A",
      title: "Action & Accountability",
      description: "Stop planning. Start doing. Transitioning from ideas to execution with measurable responsibility.",
      color: "#00a7b5"
    },
    {
      letter: "M",
      title: "Management & Mobilization",
      description: "Ideas need a plan. Plans need resources. Coordinating logistics, finances, and human capital.",
      color: "#e08c12"
    },
    {
      letter: "O",
      title: "Opportunity & Ownership",
      description: "Every problem is a leadership opportunity. Taking charge of challenges and driving sustainable change.",
      color: "#8e2d8e"
    },
    {
      letter: "J",
      title: "Journey",
      description: "Cross-cultural collaboration and networking. Bridging regional districts to build lasting connections.",
      color: "#016b78"
    },
    {
      letter: "A",
      title: "Advancement",
      description: "Sustainability, scale, and leadership legacy. Leaving a lasting impact on the next generation.",
      color: "#0a2540"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Apply & Discover",
      description: "Submit your application. We look for passionate young leaders (ages 18-30) in Nairobi who are eager to develop their skills and serve the community."
    },
    {
      number: "02",
      title: "Orientation & Prep",
      description: "Meet your cohort and facilitators. Participate in pre-event icebreakers and establish personal growth goals for the program."
    },
    {
      number: "03",
      title: "The RYLA Camp",
      description: "An intensive multi-day experience packed with leadership seminars, outdoor challenges, expert guest speakers, and collaborative workshops."
    },
    {
      number: "04",
      title: "Action & Mentorship",
      description: "Apply your newly acquired skills. Graduates receive continued mentorship and opportunities to lead signature projects within the Rotaract Club."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center border-b border-border bg-radial from-cranberry/10 via-transparent to-transparent">
        {/* Decorative Grid and Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cranberry/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cranberry/10 border border-cranberry/20 text-cranberry text-xs md:text-sm font-semibold mb-6 uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" /> Districts 9215 & 9216 Flagship Event
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-raleway tracking-tight leading-none mb-6"
          >
            RYLA PAMOJA &apos;26 <br />
            <span className="bg-gradient-to-r from-cranberry via-orange-500 to-secondary-yellow bg-clip-text text-transparent">
              Njoo Diani
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-montserrat text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Join young professionals and leaders from across East Africa for 3 days and 3 nights of leadership development, cross-cultural connection, and coastal adventure.
          </motion.p>

          {/* Quick Event Details Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 text-xs md:text-sm font-montserrat text-muted-foreground bg-card border border-border rounded-2xl py-3.5 px-6 w-fit mx-auto shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cranberry" />
              <span>5th – 8th November 2026</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cranberry" />
              <span>Diani, Kenya</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={RYLA_REG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-cranberry text-white font-montserrat font-semibold transition-all hover:bg-cranberry/90 hover:shadow-lg hover:shadow-cranberry/20 flex items-center justify-center gap-2"
            >
              Register — Late Bird <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={RYLA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] border border-border bg-card hover:bg-muted font-montserrat font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Learn More at RYLA Kenya <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. RYLA Pamoja '26 Theme (P-A-M-O-J-A) */}
      <section id="theme" className="py-24 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 max-w-[1080px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-cranberry uppercase tracking-widest mb-3 font-montserrat">
              The Pamoja Philosophy
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-raleway text-neutral-800 dark:text-neutral-100">
              Leadership, Spelled Out
            </h3>
            <p className="mt-4 text-muted-foreground font-montserrat">
              <span className="font-semibold text-foreground">Pamoja</span> means <span className="font-semibold text-foreground">together</span>. This year&apos;s theme is a six-part leadership journey that carries delegates from self-discovery all the way to lasting regional impact.
            </p>
          </div>

          {/* Pillar Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pamojaPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ borderColor: pillar.color, translateY: -4 }}
                className="group relative overflow-hidden p-7 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span 
                    className="font-raleway font-black text-6xl leading-none transition-transform duration-300 group-hover:scale-110 select-none"
                    style={{ color: pillar.color }}
                  >
                    {pillar.letter}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                    Pillar 0{idx + 1}
                  </span>
                </div>
                <h4 className="font-raleway text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {pillar.title}
                </h4>
                <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pamoja Theme Blueprint Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 space-y-4"
          >
            <div 
              onClick={() => setSelectedImage({
                src: "https://res.cloudinary.com/drxurk7lu/image/upload/v1782730686/rc-hurlingham/pamoja-theme_glkzuj.avif",
                alt: "The Pamoja blueprint — how each PAMOJA pillar maps to a regional Mini RYLA on the road to Diani"
              })}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-card shadow-md cursor-zoom-in group"
            >
              <Image 
                src="https://res.cloudinary.com/drxurk7lu/image/upload/v1782730686/rc-hurlingham/pamoja-theme_glkzuj.avif" 
                alt="The Pamoja blueprint — how each PAMOJA pillar maps to a regional Mini RYLA on the road to Diani"
                fill
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover md:object-contain transition-opacity duration-300 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <span className="text-white bg-black/70 px-4 py-2 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                  <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
                </span>
              </div>
            </div>
            <p className="text-center text-xs md:text-sm text-muted-foreground font-montserrat italic">
              The Pamoja blueprint — each pillar comes alive at a regional Mini RYLA, building toward the Main RYLA in Diani.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. The Diani Experience Details */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 max-w-[1080px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Text and Logistics */}
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-cranberry uppercase tracking-widest font-montserrat">
                  Coastal Adventure & Learning
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold font-raleway text-neutral-800 dark:text-neutral-100">
                  3 Days & 3 Nights in Diani
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Hosted at the stunning <span className="font-semibold text-foreground">Gold Sands International Hotel</span> in Diani, Kenya, RYLA Pamoja &apos;26 brings together young change-makers from Districts 9215 and 9216. 
                </p>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  This is more than just lectures. Expect outdoor leadership challenges on the beach, collaborative workshops, networking sessions with regional Rotary leaders, and a coastal journey that integrates fellowship and professional growth.
                </p>
              </div>

              {/* Logistics Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-montserrat text-sm border-t border-border pt-6">
                <div className="flex gap-3 items-start">
                  <Calendar className="h-5 w-5 text-cranberry shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100">Dates</p>
                    <p className="text-muted-foreground">5th – 8th Nov 2026</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <MapPin className="h-5 w-5 text-cranberry shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100">Venue</p>
                    <p className="text-muted-foreground">Gold Sands Hotel, Diani</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Users className="h-5 w-5 text-cranberry shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100">Host Districts</p>
                    <p className="text-muted-foreground">Districts 9215 & 9216</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Globe className="h-5 w-5 text-cranberry shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100">Ubuntu Express</p>
                    <p className="text-muted-foreground">SGR train packages available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Event Poster/Image */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedImage({
                  src: "https://res.cloudinary.com/drxurk7lu/image/upload/v1782303224/Whats_App_Image_2026_06_23_at_10_58_43_d373ee69ad.jpg",
                  alt: "RYLA Pamoja '26 Event Poster - Njoo Diani"
                })}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-card shadow-lg group cursor-zoom-in"
              >
                <Image 
                  src="https://res.cloudinary.com/drxurk7lu/image/upload/v1782303224/Whats_App_Image_2026_06_23_at_10_58_43_d373ee69ad.jpg"
                  alt="RYLA Pamoja '26 Event Poster - Njoo Diani"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="text-white bg-black/70 px-4 py-2 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Journey Timeline */}
      <section className="py-24 relative bg-muted/20">
        <div className="absolute inset-0 bg-radial from-secondary-yellow/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[880px]">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-sm font-semibold text-cranberry uppercase tracking-widest mb-3 font-montserrat">
              The Experience
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-raleway text-neutral-800 dark:text-neutral-100">
              Your RYLA Journey
            </h3>
            <p className="mt-4 text-muted-foreground font-montserrat">
              Here is how we guide you through the RYLA journey from candidate to empowered leader.
            </p>
          </div>

          <div className="relative border-l border-border dark:border-neutral-800 ml-4 md:ml-32 space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-88px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[13px] top-1.5 h-6 w-6 rounded-full border-4 border-background bg-border group-hover:bg-cranberry group-hover:border-cranberry/30 transition-all duration-300" />
                
                {/* Timeline Step Number (shows on left of timeline for desktop) */}
                <div className="hidden md:block absolute -left-32 top-0 w-24 text-right pr-4">
                  <span className="font-raleway text-4xl font-extrabold text-muted-foreground/30 group-hover:text-cranberry/40 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Content Card */}
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2.5 md:hidden">
                    <span className="font-raleway text-xl font-bold text-cranberry">
                      {step.number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                  <h4 className="font-raleway text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    {step.title}
                  </h4>
                  <p className="font-montserrat text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Registration/Interest CTA */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 max-w-[1080px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-neutral-900 text-neutral-50 px-8 py-16 md:p-16 text-center shadow-xl border border-white/10"
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-cranberry/30 via-transparent to-secondary-yellow/15 pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-cranberry/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-bold font-raleway mb-6 leading-tight">
                Ready to join us in Diani?
              </h3>
              <p className="text-sm md:text-base font-montserrat text-neutral-300 mb-10 leading-relaxed">
                Late Bird registration is now open on the official RYLA Kenya portal. Choose your accommodation suite (Rafiki sharing, Pamoja group, or Safari single) with payment plan options.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={RYLA_REG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-cranberry text-white font-montserrat font-semibold transition-all hover:bg-cranberry/90 hover:shadow-lg hover:shadow-cranberry/20 flex items-center justify-center gap-2"
                >
                  Register Now — Late Bird <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href={RYLA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] border border-white/20 bg-white/5 hover:bg-white/10 text-white font-montserrat font-semibold transition-colors"
                >
                  Learn More about Packages
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-[110]"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {selectedImage.alt && (
                <p className="mt-4 text-center text-white/90 font-montserrat text-xs md:text-sm max-w-2xl px-4 select-none">
                  {selectedImage.alt}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
