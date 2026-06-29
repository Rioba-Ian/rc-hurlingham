"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import RylaHero from "@/components/organisms/ryla/RylaHero";
import RylaTheme from "@/components/organisms/ryla/RylaTheme";
import RylaDetails from "@/components/organisms/ryla/RylaDetails";
import RylaTimeline from "@/components/organisms/ryla/RylaTimeline";
import RylaCTA from "@/components/organisms/ryla/RylaCTA";
import { useLightbox } from "@/hooks/use-lightbox";

export default function RylaPageClient() {
  const { selectedImage, open, close } = useLightbox();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <RylaHero />
      <RylaTheme onImageClick={(img) => open(img.src, img.alt)} />
      <RylaDetails onImageClick={(img) => open(img.src, img.alt)} />
      <RylaTimeline />
      <RylaCTA />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={close}
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
