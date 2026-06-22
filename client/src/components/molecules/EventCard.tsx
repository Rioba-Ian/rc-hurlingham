import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Event } from "@/types/cms";
import { coverUrl } from "@/lib/cms";
import DateBadge from "./DateBadge";

/** Strip emoji/pictographs the way the design does for clean card excerpts. */
const clean = (text?: string | null) =>
 (text ?? "")
  .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
  .trim();

interface EventCardProps {
 event: Event;
 past?: boolean;
}

/** Grid card for an event, used on /events. Links to the detail page. */
const EventCard = ({ event, past = false }: EventCardProps) => {
 const src = coverUrl(event.cover, "small");
 return (
  <Link
   href={`/events/${event.slug}`}
   className="group block overflow-hidden rounded-[14px] border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-neutral-900"
  >
   <div className="relative aspect-[16/10] overflow-hidden">
    {src ? (
     <Image
      src={src}
      alt={event.title}
      fill
      sizes="(max-width: 768px) 100vw, 360px"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
     />
    ) : (
     <div className="absolute inset-0 bg-gradient-to-br from-cranberry/80 to-cranberry" />
    )}
    <div className="absolute left-3.5 top-3.5">
     <DateBadge iso={event.date} />
    </div>
    {past && (
     <span className="absolute right-3.5 top-4 rounded-full bg-neutral-800/80 px-[11px] py-[5px] font-montserrat text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
      Past
     </span>
    )}
   </div>
   <div className="p-[22px]">
    <h3 className="m-0 font-raleway text-[19px] font-bold leading-snug text-neutral-800 group-hover:underline dark:text-neutral-100">
     {event.title}
    </h3>
    {event.location && (
     <div className="mt-2.5 flex items-center gap-1.5 font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
      <MapPin className="size-3.5 shrink-0" /> {event.location}
     </div>
    )}
    {event.description && (
     <p className="mt-3 line-clamp-2 font-montserrat text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
      {clean(event.description)}
     </p>
    )}
   </div>
  </Link>
 );
};

export default EventCard;
