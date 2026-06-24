"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
 Carousel,
 type CarouselApi,
 CarouselContent,
 CarouselItem,
} from "@/components/molecules/carousel";
import { cn } from "@/lib/utils";

export interface GalleryPhoto {
 thumb: string;
 full: string;
 alt: string;
}

const arrowBtn =
 "flex size-9 items-center justify-center rounded-full border border-border text-neutral-700 transition-colors hover:border-cranberry hover:text-cranberry disabled:opacity-40 disabled:hover:border-border disabled:hover:text-neutral-700 dark:text-neutral-200";

/** Event photo gallery: a carousel of large photos that open a lightbox. */
const EventGallery = ({ photos }: { photos: GalleryPhoto[] }) => {
 const count = photos.length;
 const [api, setApi] = useState<CarouselApi>();
 const [selected, setSelected] = useState(0);
 const [canPrev, setCanPrev] = useState(false);
 const [canNext, setCanNext] = useState(false);
 const [index, setIndex] = useState<number | null>(null); // lightbox index
 const open = index !== null;

 useEffect(() => {
  if (!api) return;
  const update = () => {
   setSelected(api.selectedScrollSnap());
   setCanPrev(api.canScrollPrev());
   setCanNext(api.canScrollNext());
  };
  update();
  api.on("select", update);
  api.on("reInit", update);
  return () => {
   api.off("select", update);
  };
 }, [api]);

 const close = useCallback(() => setIndex(null), []);
 const lbPrev = useCallback(
  () => setIndex((i) => (i === null ? i : (i - 1 + count) % count)),
  [count],
 );
 const lbNext = useCallback(
  () => setIndex((i) => (i === null ? i : (i + 1) % count)),
  [count],
 );

 useEffect(() => {
  if (!open) return;
  const onKey = (e: KeyboardEvent) => {
   if (e.key === "Escape") close();
   else if (e.key === "ArrowLeft") lbPrev();
   else if (e.key === "ArrowRight") lbNext();
  };
  window.addEventListener("keydown", onKey);
  document.body.style.overflow = "hidden";
  return () => {
   window.removeEventListener("keydown", onKey);
   document.body.style.overflow = "";
  };
 }, [open, close, lbPrev, lbNext]);

 if (count === 0) return null;

 return (
  <section className="mt-10">
   <div className="mb-4 flex items-center justify-between">
    <h2 className="font-raleway text-[22px] font-bold text-neutral-900 dark:text-neutral-100">
     Photos
    </h2>
    {count > 1 && (
     <div className="flex gap-2">
      <button
       type="button"
       aria-label="Previous photo"
       onClick={() => api?.scrollPrev()}
       disabled={!canPrev}
       className={arrowBtn}
      >
       <ChevronLeft className="size-5" />
      </button>
      <button
       type="button"
       aria-label="Next photo"
       onClick={() => api?.scrollNext()}
       disabled={!canNext}
       className={arrowBtn}
      >
       <ChevronRight className="size-5" />
      </button>
     </div>
    )}
   </div>

   <Carousel setApi={setApi} opts={{ align: "start", loop: count > 1 }}>
    <CarouselContent>
     {photos.map((p, i) => (
      <CarouselItem key={i} className="basis-full sm:basis-4/5 lg:basis-2/3">
       <button
        type="button"
        onClick={() => setIndex(i)}
        aria-label={`Open photo ${i + 1}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border"
       >
        <Image
         src={p.thumb}
         alt={p.alt}
         fill
         sizes="(max-width: 640px) 100vw, 66vw"
         className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
       </button>
      </CarouselItem>
     ))}
    </CarouselContent>
   </Carousel>

   {count > 1 && (
    <div className="mt-4 flex justify-center gap-2">
     {photos.map((_, i) => (
      <button
       key={i}
       type="button"
       aria-label={`Go to photo ${i + 1}`}
       onClick={() => api?.scrollTo(i)}
       className={cn(
        "h-2 rounded-full transition-all duration-300",
        selected === i
         ? "w-6 bg-cranberry"
         : "w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600",
       )}
      />
     ))}
    </div>
   )}

   {/* Lightbox */}
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
        lbPrev();
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
        lbNext();
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
