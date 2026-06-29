"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Tag, Award, X, ZoomIn } from "lucide-react";
import type { Project } from "@/types/cms";
import { getMediaUrl, coverUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";
import RichText from "@/components/molecules/RichText";
import { useLightbox } from "@/hooks/use-lightbox";

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
  const { selectedImage, open, close } = useLightbox();

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

  return (
    <article className="pb-24">
      {/* 1. Cover Hero Banner */}
      <div className="relative h-[min(50vh,440px)] w-full overflow-hidden bg-neutral-950">
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
          <div className="mx-auto max-w-[860px] text-white">
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
      <div className="mx-auto grid max-w-[860px] gap-10 px-6 pt-10 md:grid-cols-[1fr_300px]">
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

          {/* Image Gallery */}
          {galleryPhotos.length > 0 && (
            <div className="border-t border-border pt-8">
              <h3 className="mb-6 font-raleway text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Project Gallery
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => open(photo.full, photo.alt)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border bg-card shadow-sm cursor-zoom-in group"
                  >
                    <Image
                      src={photo.thumb}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
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

      {/* 3. Lightbox Modal */}
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
              onClick={(e) => e.stopPropagation()}
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
    </article>
  );
}
