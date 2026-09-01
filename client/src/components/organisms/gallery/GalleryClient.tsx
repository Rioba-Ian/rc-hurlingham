"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Image as ImageIcon,
  FolderOpen,
  Search,
  Download,
  Share2,
  Play,
  ArrowRight,
  Tag,
  Check,
} from "lucide-react";
import { GalleryAlbum } from "@/types/cms";
import { coverUrl } from "@/lib/cms";

export interface SinglePhoto {
  id: string | number;
  url: string;
  thumbUrl: string;
  alt: string;
  caption?: string | null;
  groupTitle: string;
  groupSlug: string;
  date?: string | null;
  categoryName?: string;
}

export interface PhotoGroup {
  id: string | number;
  title: string;
  slug: string;
  date?: string | null;
  categoryName?: string;
  coverUrl?: string | null;
  photos: SinglePhoto[];
  description?: string | null;
}

interface GalleryClientProps {
  albums: GalleryAlbum[];
}

export default function GalleryClient({ albums }: GalleryClientProps) {
  // 1. Process and normalize albums from Strapi CMS
  const groups: PhotoGroup[] = useMemo(() => {
    const list: PhotoGroup[] = [];

    albums.forEach((album) => {
      const albumCover = coverUrl(album.coverImage, "large") || coverUrl(album.coverImage, "medium");
      const photosList: SinglePhoto[] = [];
      const catName = album.category?.name || "General";

      // Include cover image if available
      if (album.coverImage?.url) {
        photosList.push({
          id: `album-cover-${album.id}-${album.coverImage.id}`,
          url: coverUrl(album.coverImage) || album.coverImage.url,
          thumbUrl: coverUrl(album.coverImage, "small") || album.coverImage.url,
          alt: album.coverImage.alternativeText || album.eventTitle,
          caption: album.coverImage.caption,
          groupTitle: album.eventTitle,
          groupSlug: album.slug,
          date: album.date,
          categoryName: catName,
        });
      }

      // Include all album photos
      (album.Photos || []).forEach((photo, idx) => {
        if (!photo?.url) return;
        // Avoid duplicate if cover image is already included as photo[0]
        if (album.coverImage && photo.url === album.coverImage.url) return;

        photosList.push({
          id: `album-${album.id}-photo-${photo.id || idx}`,
          url: coverUrl(photo) || photo.url,
          thumbUrl: coverUrl(photo, "small") || photo.url,
          alt: photo.alternativeText || `${album.eventTitle} photo ${idx + 1}`,
          caption: photo.caption,
          groupTitle: album.eventTitle,
          groupSlug: album.slug,
          date: album.date,
          categoryName: catName,
        });
      });

      // Extract text caption string if blocks or raw text
      let descString = "";
      if (typeof album.caption === "string") {
        descString = album.caption;
      } else if (Array.isArray(album.caption)) {
        descString = album.caption
          .map((block: any) =>
            (block.children || []).map((child: any) => child.text || "").join("")
          )
          .join(" ");
      }

      if (photosList.length > 0) {
        list.push({
          id: `album-${album.id}`,
          title: album.eventTitle,
          slug: album.slug,
          date: album.date,
          categoryName: catName,
          coverUrl: albumCover || photosList[0]?.url,
          photos: photosList,
          description: descString.trim() || undefined,
        });
      }
    });

    return list;
  }, [albums]);

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const set = new Set<string>();
    groups.forEach((g) => {
      if (g.categoryName) set.add(g.categoryName);
    });
    return Array.from(set);
  }, [groups]);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [lightboxState, setLightboxState] = useState<{
    groupIndex: number;
    photoIndex: number;
  } | null>(null);

  // Featured Hero Album (most recent album)
  const featuredGroup = useMemo(() => {
    return groups.length > 0 ? groups[0] : null;
  }, [groups]);

  // Filter groups based on search & category filter pills
  const filteredGroups = useMemo(() => {
    return groups
      .map((group) => {
        // Category pill check
        if (
          activeCategoryFilter !== "All" &&
          group.categoryName?.toLowerCase() !== activeCategoryFilter.toLowerCase()
        ) {
          return null;
        }

        // Search check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = group.title.toLowerCase().includes(q);
          const matchesCat = group.categoryName?.toLowerCase().includes(q);
          const matchingPhotos = group.photos.filter(
            (p) =>
              p.alt.toLowerCase().includes(q) ||
              (p.caption && p.caption.toLowerCase().includes(q))
          );

          if (!matchesTitle && !matchesCat && matchingPhotos.length === 0) {
            return null;
          }

          return {
            ...group,
            photos: matchesTitle || matchesCat ? group.photos : matchingPhotos,
          };
        }

        return group;
      })
      .filter((g): g is PhotoGroup => g !== null);
  }, [groups, activeCategoryFilter, searchQuery]);

  // Total stats
  const totalPhotos = useMemo(
    () => groups.reduce((acc, g) => acc + g.photos.length, 0),
    [groups]
  );

  // Keyboard navigation & body scroll lock for lightbox modal
  useEffect(() => {
    if (!lightboxState) return;

    const currentGroup = filteredGroups[lightboxState.groupIndex];
    if (!currentGroup) return;

    const totalInGroup = currentGroup.photos.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxState(null);
      } else if (e.key === "ArrowRight") {
        setLightboxState((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            photoIndex: (prev.photoIndex + 1) % totalInGroup,
          };
        });
      } else if (e.key === "ArrowLeft") {
        setLightboxState((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            photoIndex: (prev.photoIndex - 1 + totalInGroup) % totalInGroup,
          };
        });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxState, filteredGroups]);

  // Current active photo object for lightbox
  const currentPhoto = useMemo(() => {
    if (!lightboxState) return null;
    const group = filteredGroups[lightboxState.groupIndex];
    if (!group) return null;
    return group.photos[lightboxState.photoIndex] || null;
  }, [lightboxState, filteredGroups]);

  // Download image helper
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "gallery-photo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank");
    }
  };

  // Share link helper
  const handleShare = (photo: SinglePhoto) => {
    if (navigator.share) {
      navigator.share({
        title: photo.groupTitle,
        text: photo.alt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. Page Header & Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-raleway text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Moments & Impact in Action
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Photos from our community service projects, club events, RYLA, and fellowship socials.
          </p>

          {/* Dynamic Counter Stats */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <strong className="text-neutral-800 dark:text-neutral-200">
                {groups.length}
              </strong>{" "}
              Album{groups.length !== 1 ? "s" : ""}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <strong className="text-neutral-800 dark:text-neutral-200">
                {totalPhotos}
              </strong>{" "}
              Photo{totalPhotos !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* 2. Featured Album Hero Card */}
        {featuredGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group/hero min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10"
          >
            {/* Background Cover Media */}
            {featuredGroup.coverUrl && (
              <Image
                src={featuredGroup.coverUrl}
                alt={featuredGroup.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center opacity-70 group-hover/hero:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            {/* Hero Card Content */}
            <div className="relative z-10 space-y-4 max-w-2xl text-white">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  MOST RECENT
                </span>
                {featuredGroup.categoryName && (
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider">
                    {featuredGroup.categoryName}
                  </span>
                )}
              </div>

              <h2 className="font-raleway text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-sm">
                {featuredGroup.title}
              </h2>

              {featuredGroup.description && (
                <p className="text-neutral-300 text-sm sm:text-base line-clamp-2 leading-relaxed">
                  {featuredGroup.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <Link
                  href={`/gallery/${featuredGroup.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-bold hover:bg-neutral-100 transition-all flex items-center gap-2 shadow-md hover:scale-105"
                >
                  Open album <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() =>
                    setLightboxState({ groupIndex: 0, photoIndex: 0 })
                  }
                  className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold backdrop-blur-md transition-all flex items-center gap-2 border border-white/20"
                >
                  <Play className="w-4 h-4 fill-white" /> Start slideshow
                </button>

                <div className="flex items-center gap-3 text-neutral-300 text-xs sm:text-sm font-medium ml-auto sm:ml-0">
                  {featuredGroup.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-400" />
                      {new Date(featuredGroup.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <span>·</span>
                  <span>{featuredGroup.photos.length} photos</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Filter Bar & Search Input */}
        {groups.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            {/* Category Filter Pills */}
            <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <button
                onClick={() => setActiveCategoryFilter("All")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategoryFilter === "All"
                    ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                    : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800"
                }`}
              >
                All ({groups.length})
              </button>
              {categories.map((cat) => {
                const catCount = groups.filter(
                  (g) => g.categoryName?.toLowerCase() === cat.toLowerCase()
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                      activeCategoryFilter.toLowerCase() === cat.toLowerCase()
                        ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                        : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800"
                    }`}
                  >
                    {cat} ({catCount})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by event title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4. Grouped Album Grid */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-pink-50 dark:bg-pink-950/50 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {searchQuery ? "No matching albums found" : "No photo albums published yet"}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              {searchQuery
                ? `Try adjusting your search query "${searchQuery}" or switching filter tabs.`
                : "Gallery albums published in Strapi CMS will appear here."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-sm"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-14">
            {filteredGroups.map((group, groupIdx) => (
              <section
                key={group.id}
                className="space-y-6 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm"
              >
                {/* Album Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/gallery/${group.slug}`}
                        className="font-raleway text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-2.5"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-600 dark:bg-pink-500 inline-block shrink-0" />
                        <span>{group.title}</span>
                      </Link>
                      {group.categoryName && (
                        <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-semibold uppercase shrink-0">
                          {group.categoryName}
                        </span>
                      )}
                    </div>
                    {group.description && (
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                        {group.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                    {group.date && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 shrink-0" />
                        <span>
                          {new Date(group.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 text-xs font-semibold whitespace-nowrap">
                      {group.photos.length} Photo{group.photos.length !== 1 ? "s" : ""}
                    </span>
                    <Link
                      href={`/gallery/${group.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 hover:underline transition-colors whitespace-nowrap py-1.5 pl-1"
                    >
                      View album <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.photos.map((photo, photoIdx) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: photoIdx * 0.04 }}
                      onClick={() =>
                        setLightboxState({ groupIndex: groupIdx, photoIndex: photoIdx })
                      }
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800 shadow-sm cursor-zoom-in"
                    >
                      <Image
                        src={photo.thumbUrl || photo.url}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                        <div className="self-end">
                          <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white inline-flex items-center justify-center shadow-md">
                            <ZoomIn className="w-4 h-4" />
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold truncate drop-shadow-sm">
                            {photo.alt}
                          </p>
                          {photo.caption && (
                            <p className="text-[11px] text-neutral-300 line-clamp-1">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* 5. Fullscreen Lightbox / Slideshow Modal */}
        <AnimatePresence>
          {lightboxState && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
            >
              {/* Top Navigation Bar */}
              <div className="p-4 sm:p-6 flex items-center justify-between z-10 text-white border-b border-white/10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-pink-600 text-xs font-bold uppercase tracking-wider">
                    {currentPhoto.groupTitle}
                  </span>
                  {currentPhoto.categoryName && (
                    <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-xs font-medium text-neutral-300">
                      {currentPhoto.categoryName}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                    Photo {lightboxState.photoIndex + 1} of{" "}
                    {filteredGroups[lightboxState.groupIndex].photos.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download Action */}
                  <button
                    onClick={() =>
                      handleDownload(
                        currentPhoto.url,
                        `${currentPhoto.groupSlug}-${lightboxState.photoIndex + 1}.jpg`
                      )
                    }
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm focus:outline-none"
                    title="Download photo"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {/* Share Action */}
                  <button
                    onClick={() => handleShare(currentPhoto)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm focus:outline-none relative"
                    title="Share link"
                  >
                    {copiedShare ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Close Action */}
                  <button
                    onClick={() => setLightboxState(null)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                {/* Previous Button */}
                {filteredGroups[lightboxState.groupIndex].photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const totalInGroup =
                        filteredGroups[lightboxState.groupIndex].photos.length;
                      setLightboxState((prev) =>
                        prev
                          ? {
                              ...prev,
                              photoIndex:
                                (prev.photoIndex - 1 + totalInGroup) %
                                totalInGroup,
                            }
                          : null
                      );
                    }}
                    className="absolute left-4 sm:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm hover:scale-105"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Main Photo Display */}
                <motion.div
                  key={currentPhoto.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentPhoto.url}
                    alt={currentPhoto.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Next Button */}
                {filteredGroups[lightboxState.groupIndex].photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const totalInGroup =
                        filteredGroups[lightboxState.groupIndex].photos.length;
                      setLightboxState((prev) =>
                        prev
                          ? {
                              ...prev,
                              photoIndex: (prev.photoIndex + 1) % totalInGroup,
                            }
                          : null
                      );
                    }}
                    className="absolute right-4 sm:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm hover:scale-105"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Bottom Caption & Thumbnail Strip */}
              <div className="p-4 sm:p-6 bg-black/80 border-t border-white/10 text-white space-y-3 z-10">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <p className="text-sm font-semibold">{currentPhoto.alt}</p>
                  {currentPhoto.caption && (
                    <p className="text-xs text-neutral-400">
                      {currentPhoto.caption}
                    </p>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {filteredGroups[lightboxState.groupIndex].photos.length > 1 && (
                  <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-3xl mx-auto no-scrollbar">
                    {filteredGroups[lightboxState.groupIndex].photos.map(
                      (thumb, idx) => (
                        <button
                          key={thumb.id}
                          onClick={() =>
                            setLightboxState((prev) =>
                              prev ? { ...prev, photoIndex: idx } : null
                            )
                          }
                          className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                            idx === lightboxState.photoIndex
                              ? "ring-2 ring-pink-500 scale-105 opacity-100"
                              : "opacity-40 hover:opacity-80"
                          }`}
                        >
                          <Image
                            src={thumb.thumbUrl || thumb.url}
                            alt={thumb.alt}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
