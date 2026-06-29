"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Users, Globe, ZoomIn } from "lucide-react";

interface RylaDetailsProps {
  onImageClick: (image: { src: string; alt: string }) => void;
}

export default function RylaDetails({ onImageClick }: RylaDetailsProps) {
  return (
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
              onClick={() => onImageClick({
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
  );
}
