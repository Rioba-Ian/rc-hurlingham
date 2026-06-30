"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Tag, Award, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/cms";
import { getMediaUrl, coverUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";
import RichText from "@/components/molecules/RichText";

interface ProjectDetailClientProps {
  project: Project;
}

const statusStyles = {
  Ongoing: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
  Completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",
  Upcoming: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50"
};

// Fallback high-quality Unsplash image for mock detail view
const MOCK_DETAIL_IMAGE = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80";

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Determine cover image URL
  const bannerSrc = project.id < 0 
    ? MOCK_DETAIL_IMAGE 
    : getMediaUrl(project.coverImage?.url);

  const hasContent = Array.isArray(project.content) && project.content.length > 0;

  // Gather gallery photos
  const galleryPhotos = (project.Gallery ?? [])
    .map((p) => ({
      thumb: coverUrl(p, "medium") || p.url,
      full: coverUrl(p, "large") || p.url,
      alt: p.alternativeText || project.title,
    }))
    .filter((p) => Boolean(p.full));

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! + 1) % galleryPhotos.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! - 1 + galleryPhotos.length) % galleryPhotos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryPhotos.length]);

  // Lock body scroll when the fullscreen lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lightboxIndex]);

  return (
    <article className="pb-24">
      {/* 1. Cover Hero Banner */}
      <div className="relative h-[min(55vh,480px)] w-full overflow-hidden bg-neutral-950">
        {bannerSrc ? (
          <Image
            src={bannerSrc}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cranberry/80 to-cranberry" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(24,24,24,0.9),rgba(24,24,24,0.2))]" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
          <div className="mx-auto max-w-[1080px] text-white">
            <Link
              href="/projects"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 font-montserrat text-xs backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ArrowLeft className="size-3.5" /> All Projects
            </Link>
            <h1 className="m-0 font-raleway text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-tight tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Content & Sidebar Grid */}
      <div className="mx-auto grid max-w-[1080px] gap-12 px-6 pt-10 md:grid-cols-[1fr_350px]">
        {/* Main Content (Left Column) */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 mt-0 font-raleway text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Project Overview
            </h2>
            {hasContent ? (
              <RichText content={project.content} />
            ) : (
              project.description && (
                <p className="font-montserrat text-[16px] leading-[1.75] text-muted-foreground">
                  {project.description}
                </p>
              )
            )}
          </div>

          {/* Image Gallery (Carousel) */}
          {galleryPhotos.length > 0 && (
            <div className="border-t border-border pt-8 space-y-4">
              <h3 className="mb-2 font-raleway text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Project Gallery
              </h3>
              
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
                      src={galleryPhotos[carouselIndex].full}
                      alt={galleryPhotos[carouselIndex].alt}
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
                {galleryPhotos.length > 1 && (
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
                  {carouselIndex + 1} / {galleryPhotos.length}
                </div>
              </div>

              {/* Thumbnail Navigation Row */}
              {galleryPhotos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto py-2 scrollbar-none">
                  {galleryPhotos.map((photo, idx) => (
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
            </div>
          )}
        </div>

        {/* Sidebar (Right Column) */}
        <aside>
          <div className="sticky top-6 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
            {/* Status */}
            <div>
              <p className="font-montserrat text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Status
              </p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[project.projectStatus]}`}>
                {project.projectStatus}
              </span>
            </div>

            {/* Date */}
            <div>
              <p className="font-montserrat text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                Date
              </p>
              <div className="flex items-center gap-2.5 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                <Calendar className="size-4.5 text-cranberry shrink-0" />
                <span>{formatDate(project.date)}</span>
              </div>
            </div>

            {/* Location */}
            {project.Location && (
              <div>
                <p className="font-montserrat text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Location
                </p>
                <div className="flex items-start gap-2.5 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                  <MapPin className="size-4.5 text-cranberry shrink-0 mt-0.5" />
                  <span>{project.Location}</span>
                </div>
              </div>
            )}

            {/* Category */}
            {project.categories && project.categories.length > 0 && (
              <div>
                <p className="font-montserrat text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Focus Area
                </p>
                <div className="flex items-center gap-2.5 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
                  <Tag className="size-4.5 text-cranberry shrink-0" />
                  <span>{project.categories[0].name}</span>
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-4 border-t border-border">
              <Link
                href={`/contact?subject=Inquiry%20about%20Project:%20${encodeURIComponent(project.title)}`}
                className="flex h-[44px] w-full items-center justify-center rounded-xl bg-cranberry font-montserrat text-sm font-semibold text-white transition-colors hover:bg-cranberry/90 shadow-sm shadow-cranberry/10"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Lightbox Carousel Modal */}
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
            {galleryPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! - 1 + galleryPhotos.length) % galleryPhotos.length);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[110] shadow-md hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {galleryPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! + 1) % galleryPhotos.length);
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
                  src={galleryPhotos[lightboxIndex].full}
                  alt={galleryPhotos[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {galleryPhotos[lightboxIndex].alt && (
                <p className="mt-4 text-center text-white/90 font-montserrat text-xs md:text-sm max-w-2xl px-4 select-none">
                  {galleryPhotos[lightboxIndex].alt}
                </p>
              )}
            </motion.div>

            {/* Fullscreen Slide Count Indicator */}
            <div className="absolute bottom-6 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-semibold font-montserrat select-none">
              {lightboxIndex + 1} / {galleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
