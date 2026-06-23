"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
 thumb: string;
 full: string;
 alt: string;
}

/** Event photo gallery: responsive grid of thumbnails that open a lightbox. */
const EventGallery = ({ photos }: { photos: GalleryPhoto[] }) => {
 const [index, setIndex] = useState<number | null>(null);
 const open = index !== null;
 const count = photos.length;

 const close = useCallback(() => setIndex(null), []);
 const prev = useCallback(
  () => setIndex((i) => (i === null ? i : (i - 1 + count) % count)),
  [count],
 );
 const next = useCallback(
  () => setIndex((i) => (i === null ? i : (i + 1) % count)),
  [count],
 );

 useEffect(() => {
  if (!open) return;
  const onKey = (e: KeyboardEvent) => {
   if (e.key === "Escape") close();
   else if (e.key === "ArrowLeft") prev();
   else if (e.key === "ArrowRight") next();
  };
  window.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
  return () => {
   window.removeEventListener("keydown", onKey);
   document.body.style.overflow = "";
  };
 }, [open, close, prev, next]);

 if (count === 0) return null;

 return (
  <section className="mt-10">
   <h2 className="mb-4 font-raleway text-[22px] font-bold text-neutral-900 dark:text-neutral-100">
    Photos
   </h2>
   <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {photos.map((p, i) => (
     <button
      key={i}
      type="button"
      onClick={() => setIndex(i)}
      aria-label={`Open photo ${i + 1}`}
      className="group relative aspect-square overflow-hidden rounded-xl border border-border"
     >
      <Image
       src={p.thumb}
       alt={p.alt}
       fill
       sizes="(max-width: 640px) 50vw, 280px"
       className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
     </button>
    ))}
   </div>

   {open && index !== null && (
    <div
     className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
     onClick={close}
     role="dialog"
     aria-modal="true"
    >
     <button
      type="button"
      aria-label="Close"
      onClick={close}
      className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
     >
      <X className="size-5" />
     </button>

     {count > 1 && (
      <button
       type="button"
       aria-label="Previous photo"
       onClick={(e) => {
        e.stopPropagation();
        prev();
       }}
       className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
       <ChevronLeft className="size-6" />
      </button>
     )}

     <div
      className="relative h-[82vh] w-[92vw] max-w-5xl"
      onClick={(e) => e.stopPropagation()}
     >
      <Image
       src={photos[index].full}
       alt={photos[index].alt}
       fill
       sizes="92vw"
       className="object-contain"
       priority
      />
     </div>

     {count > 1 && (
      <button
       type="button"
       aria-label="Next photo"
       onClick={(e) => {
        e.stopPropagation();
        next();
       }}
       className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
       <ChevronRight className="size-6" />
      </button>
     )}

     {count > 1 && (
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-montserrat text-sm text-white/80">
       {index + 1} / {count}
      </div>
     )}
    </div>
   )}
  </section>
 );
};

export default EventGallery;
