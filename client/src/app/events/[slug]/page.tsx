import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { fetchEventBySlug, coverUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";
import { isPast } from "@/lib/events";
import DateBadge from "@/components/molecules/DateBadge";
import RichText from "@/components/molecules/RichText";
import ArticleShare from "@/components/organisms/blog/ArticleShare";
import EventGallery from "@/components/organisms/events/EventGallery";

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const { data } = await fetchEventBySlug(slug);
 const title = data?.title ?? "Event";
 const description = data?.description ?? undefined;
 const ogImage = coverUrl(data?.cover, "large") ?? undefined;

 return {
  title,
  description,
  openGraph: {
   title,
   description,
   type: "article",
   images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
  },
  twitter: {
   card: ogImage ? "summary_large_image" : "summary",
   title,
   description,
   images: ogImage ? [ogImage] : undefined,
  },
 };
}

export default async function EventPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const { data } = await fetchEventBySlug(slug);
 if (!data) {
  return (
   <div className="mx-auto max-w-3xl px-4 py-40 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
    Event not found.
   </div>
  );
 }

 const heroSrc = coverUrl(data.cover, "large");
 const hasContent =
  (Array.isArray(data.content) && data.content.length > 0) ||
  (typeof data.content === "string" && data.content.trim().length > 0);
 const past = isPast(data.date);
 const rsvpLink = data.rsvpLink?.trim() || null;

 const galleryPhotos = (data.eventphoto ?? [])
  .map((p) => ({
   thumb: coverUrl(p, "medium"),
   full: coverUrl(p, "large"),
   alt: p.alternativeText || data.title,
  }))
  .filter((p): p is { thumb: string; full: string; alt: string } =>
   Boolean(p.thumb && p.full),
  );
 const time = new Date(data.date).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
 });

 return (
  <article className="pb-24">
   {/* Cover hero */}
   <div className="relative h-[min(52vh,460px)] overflow-hidden">
    {heroSrc ? (
     <Image
      src={heroSrc}
      alt={data.title}
      fill
      priority
      sizes="100vw"
      className="object-cover"
     />
    ) : (
     <div className="absolute inset-0 bg-gradient-to-br from-cranberry/80 to-cranberry" />
    )}
    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,38,38,0.9),rgba(38,38,38,0.25))]" />
    <div className="absolute inset-x-0 bottom-0 px-6 pb-9">
     <div className="mx-auto max-w-[1080px] text-white">
      <Link
       href="/events"
       className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 font-montserrat text-[13px] backdrop-blur-sm transition-colors hover:bg-white/25"
      >
       <ArrowLeft className="size-[15px]" /> All events
      </Link>
      <h1 className="m-0 font-raleway text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08]">
       {data.title}
      </h1>
     </div>
    </div>
   </div>

   {/* Body + sidebar */}
   <div className="mx-auto grid max-w-[1080px] gap-12 px-6 pt-10 md:grid-cols-[1fr_350px]">
    <div>
     <h2 className="mb-4 mt-0 font-raleway text-[22px] font-bold text-neutral-900 dark:text-neutral-100">
      About this event
     </h2>
     {hasContent ? (
      <RichText content={data.content} />
     ) : (
      data.description && (
       <p className="font-montserrat text-[16.5px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
        {data.description}
       </p>
      )
     )}
    </div>

    <aside>
     <div className="sticky top-6 rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-neutral-900">
      <div className="mb-[18px] flex items-center gap-3.5">
       <DateBadge iso={data.date} size="lg" />
       <div className="font-montserrat">
        <div className="text-[15px] font-semibold text-neutral-800 dark:text-neutral-100">
         {formatDate(data.date)}
        </div>
        <div className="text-[13px] text-neutral-600 dark:text-neutral-400">
         {time}
        </div>
       </div>
      </div>
      {data.location && (
       <div className="mb-5 flex items-start gap-2.5 font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
        <MapPin className="mt-0.5 size-[18px] shrink-0 text-cranberry" />{" "}
        {data.location}
       </div>
      )}
      {past ? (
       <div className="rounded-[10px] bg-neutral-100 p-3 text-center font-montserrat text-[13.5px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
        This event has ended. Thanks to all who came!
       </div>
      ) : rsvpLink && (rsvpLink.startsWith("http://") || rsvpLink.startsWith("https://")) ? (
       <a
        href={rsvpLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[46px] w-full items-center justify-center rounded-[10px] bg-cranberry font-montserrat text-base font-semibold text-white transition-colors hover:bg-cranberry/90"
       >
        RSVP / Register
       </a>
      ) : rsvpLink ? (
       <div className="rounded-[10px] bg-neutral-50 border border-border p-3 text-center font-montserrat text-[13.5px] text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300 font-medium">
        {rsvpLink}
       </div>
      ) : (
       <Link
        href="/contact"
        className="flex h-[46px] w-full items-center justify-center rounded-[10px] bg-cranberry font-montserrat text-base font-semibold text-white transition-colors hover:bg-cranberry/90"
       >
        Get in touch to attend
       </Link>
      )}
     </div>
    </aside>
   </div>

   <div className="mx-auto max-w-[1080px] px-6">
    <EventGallery photos={galleryPhotos} />
    <ArticleShare title={data.title} />
   </div>
  </article>
 );
}
