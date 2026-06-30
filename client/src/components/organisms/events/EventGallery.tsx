"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
  thumb: string;
  full: string;
  alt: string;
}

const EventGallery = ({ photos }: { photos: GalleryPhoto[] }) => {
  const count = photos.length;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % count);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + count) % count);
  };

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! + 1) % count);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! - 1 + count) % count);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, count]);

  // Lock body scroll when the fullscreen lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lightboxIndex]);

  if (count === 0) return null;

  return (
    <section className="mt-10 space-y-4">
      <h2 className="font-raleway text-[22px] font-bold text-neutral-900 dark:text-neutral-100">
        Photos
      </h2>

      {/* Main Feature Carousel Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-card shadow-sm group/carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(carouselIndex)}
            className="relative w-full h-full cursor-zoom-in"
          >
            <Image
              src={photos[carouselIndex].full}
              alt={photos[carouselIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="text-white bg-black/75 px-4 py-2 rounded-full text-xs font-semibold opacity-0 hover:opacity-100 group-hover/carousel:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left/Right Navigation Buttons */}
        {count > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/55 hover:bg-black/75 text-white transition-all opacity-0 group-hover/carousel:opacity-100 shadow-md hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/55 hover:bg-black/75 text-white transition-all opacity-0 group-hover/carousel:opacity-100 shadow-md hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Slide Count Badge */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold font-montserrat select-none">
          {carouselIndex + 1} / {count}
        </div>
      </div>

      {/* Thumbnail Navigation Row */}
      {count > 1 && (
        <div className="flex gap-2.5 overflow-x-auto py-2 scrollbar-none">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className={`relative aspect-[16/10] w-20 sm:w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                carouselIndex === idx
                  ? "border-cranberry ring-2 ring-cranberry/25 scale-95"
                  : "border-border hover:border-neutral-400"
              }`}
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Carousel Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-[110]"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Navigation Arrow */}
            {count > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! - 1 + count) % count);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[110] shadow-md hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {count > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! + 1) % count);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[110] shadow-md hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Image Wrapper */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photos[lightboxIndex].full}
                  alt={photos[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {photos[lightboxIndex].alt && (
                <p className="mt-4 text-center text-white/90 font-montserrat text-xs md:text-sm max-w-2xl px-4 select-none">
                  {photos[lightboxIndex].alt}
                </p>
              )}
            </motion.div>

            {/* Fullscreen Slide Count Indicator */}
            <div className="absolute bottom-6 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-semibold font-montserrat select-none">
              {lightboxIndex + 1} / {count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventGallery;
