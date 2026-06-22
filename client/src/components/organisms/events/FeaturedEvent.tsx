import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@/types/cms";
import { getMediaUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";

/** Large featured event banner shown at the top of the Upcoming tab. */
const FeaturedEvent = ({ event }: { event: Event }) => {
 const coverUrl = getMediaUrl(event.cover?.url);
 return (
  <Link
   href={`/events/${event.slug}`}
   className="group relative flex min-h-[420px] items-end overflow-hidden rounded-[18px]"
  >
   {coverUrl ? (
    <Image
     src={coverUrl}
     alt={event.title}
     fill
     sizes="(max-width: 1140px) 100vw, 1080px"
     className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
   ) : (
    <div className="absolute inset-0 bg-gradient-to-br from-cranberry/80 to-cranberry" />
   )}
   <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,38,38,0.88),rgba(38,38,38,0.2)_55%,rgba(210,32,98,0.25))]" />
   <div className="relative max-w-[640px] p-10 text-white">
    <span className="mb-[18px] inline-block rounded-full bg-cranberry px-[13px] py-1.5 font-montserrat text-[11.5px] font-semibold uppercase tracking-[0.08em]">
     Featured Event
    </span>
    <h2 className="m-0 font-raleway text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-tight">
     {event.title}
    </h2>
    <div className="my-[22px] flex flex-wrap gap-[22px] font-montserrat text-[14.5px]">
     <span className="inline-flex items-center gap-[7px]">
      <Calendar className="size-4" /> {formatDate(event.date)}
     </span>
     {event.location && (
      <span className="inline-flex items-center gap-[7px]">
       <MapPin className="size-4" /> {event.location}
      </span>
     )}
    </div>
    <span className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold">
     View details{" "}
     <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </span>
   </div>
  </Link>
 );
};

export default FeaturedEvent;
