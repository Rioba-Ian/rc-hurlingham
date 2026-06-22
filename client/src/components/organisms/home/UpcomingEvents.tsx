import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { fetchEvents, getMediaUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";
import { splitByDate } from "@/lib/events";
import DateBadge from "@/components/molecules/DateBadge";
import type { Event } from "@/types/cms";

const UpcomingEventRow = ({ event }: { event: Event }) => {
 const coverUrl = getMediaUrl(event.cover?.url);
 return (
  <Link
   href={`/events/${event.slug}`}
   className="group flex items-center gap-[18px] rounded-[14px] border border-border bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cranberry/35 hover:shadow-lg dark:bg-neutral-900"
  >
   <DateBadge iso={event.date} tinted className="w-16 py-2.5" />
   {coverUrl && (
    <div className="relative hidden h-16 w-[72px] shrink-0 overflow-hidden rounded-[10px] sm:block">
     <Image src={coverUrl} alt="" fill sizes="72px" className="object-cover" />
    </div>
   )}
   <div className="min-w-0 flex-1">
    <div className="truncate font-raleway text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
     {event.title}
    </div>
    <div className="mt-1.5 flex gap-4 font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
     <span className="inline-flex items-center gap-1.5">
      <Calendar className="size-3.5" /> {formatDate(event.date)}
     </span>
     {event.location && (
      <span className="hidden items-center gap-1.5 truncate sm:inline-flex">
       <MapPin className="size-3.5 shrink-0" /> {event.location}
      </span>
     )}
    </div>
   </div>
   <ArrowRight className="size-[18px] shrink-0 text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:text-cranberry" />
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
      <p className="mt-3 font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
       Join us at our next gathering — service projects, trainings and socials.
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
