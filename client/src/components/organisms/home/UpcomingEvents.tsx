import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { fetchEvents, coverUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";
import { splitByDate } from "@/lib/events";
import DateBadge from "@/components/molecules/DateBadge";
import type { Event } from "@/types/cms";

const UpcomingEventRow = ({ event }: { event: Event }) => {
 const src = coverUrl(event.cover, "thumbnail");
 return (
  <Link
   href={`/events/${event.slug}`}
   className="group flex w-full min-w-0 items-center gap-3.5 rounded-2xl border border-border bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cranberry/35 hover:shadow-lg sm:gap-5 sm:p-5 dark:bg-neutral-900"
  >
   {src ? (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48">
     <Image src={src} alt="" fill sizes="112px" className="object-cover" />
    </div>
   ) : (
    <DateBadge
     iso={event.date}
     size="lg"
     tinted
     className="w-20 py-4 sm:w-28 sm:py-6"
    />
   )}
   <div className="min-w-0 flex-1">
    <div className="line-clamp-2 font-raleway text-lg font-semibold leading-snug text-neutral-800 sm:truncate sm:text-xl dark:text-neutral-100">
     {event.title}
    </div>
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-montserrat text-sm text-neutral-600 dark:text-neutral-400">
     <span className="inline-flex items-center gap-1.5">
      <Calendar className="size-4 shrink-0" /> {formatDate(event.date)}
     </span>
     {event.location && (
      <span className="inline-flex min-w-0 items-center gap-1.5">
       <MapPin className="size-4 shrink-0" />{" "}
       <span className="truncate">{event.location}</span>
      </span>
     )}
    </div>
   </div>
   <ArrowRight className="size-5 shrink-0 text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:text-cranberry" />
  </Link>
 );
};

export default async function UpcomingEvents() {
 const { data } = await fetchEvents();
 if (!data || data.length === 0) return null;

 const { upcoming } = splitByDate(data);
 const rows = (upcoming.length ? upcoming : data).slice(0, 3);

 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="mx-auto max-w-[1080px]">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
     <div className="max-w-[560px]">
      <div className="mb-3 font-montserrat text-[13px] font-semibold uppercase tracking-[0.08em] text-cranberry">
       What&apos;s On
      </div>
      <h2 className="m-0 font-raleway text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight text-neutral-800 dark:text-neutral-100">
       Upcoming Events
      </h2>
      <p className="mt-3 font-montserrat text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
       Join us at our next gathering — service projects, trainings and socials.
       Or even experiences our members will attend in the community.
       There&apos;s always a seat at the table.
      </p>
     </div>
     <Link
      href="/events"
      className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-border bg-white px-5 font-montserrat text-sm font-medium text-neutral-800 transition-colors hover:border-cranberry hover:text-cranberry dark:bg-neutral-900 dark:text-neutral-100"
     >
      View all events <ArrowRight className="size-4" />
     </Link>
    </div>
    <div className="grid gap-3.5">
     {rows.map((e) => (
      <UpcomingEventRow key={e.id} event={e} />
     ))}
    </div>
   </div>
  </section>
 );
}
