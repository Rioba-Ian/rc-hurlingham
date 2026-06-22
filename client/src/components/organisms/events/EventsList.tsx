"use client";

import { useMemo, useState } from "react";
import type { Event } from "@/types/cms";
import { splitByDate } from "@/lib/events";
import EventCard from "@/components/molecules/EventCard";
import FeaturedEvent from "./FeaturedEvent";
import { cn } from "@/lib/utils";

type Tab = "upcoming" | "past";

const EventsList = ({ events }: { events: Event[] }) => {
 const [tab, setTab] = useState<Tab>("upcoming");
 const { upcoming, past } = useMemo(() => splitByDate(events), [events]);
 const counts = { upcoming: upcoming.length, past: past.length };

 const list = tab === "upcoming" ? upcoming : past;
 const [featured, ...rest] = list;
 const grid = tab === "upcoming" ? rest : list;

 return (
  <div>
   {/* Upcoming / Past toggle */}
   <div className="mt-9 flex justify-center">
    <div className="inline-flex rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
     {(["upcoming", "past"] as Tab[]).map((id) => {
      const on = tab === id;
      return (
       <button
        key={id}
        type="button"
        onClick={() => setTab(id)}
        className={cn(
         "rounded-full px-[22px] py-[9px] font-montserrat text-sm font-medium capitalize transition-colors",
         on
          ? "bg-white text-cranberry shadow-sm dark:bg-neutral-900"
          : "text-neutral-500 dark:text-neutral-400",
        )}
       >
        {id} <span className="opacity-60">({counts[id]})</span>
       </button>
      );
     })}
    </div>
   </div>

   <div className="mx-auto max-w-[1140px] px-6 pt-9">
    {list.length === 0 ? (
     <p className="py-16 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
      No {tab} events right now — check back soon.
     </p>
    ) : (
     <>
      {tab === "upcoming" && featured && (
       <div className="mb-8">
        <FeaturedEvent event={featured} />
       </div>
      )}
      {grid.length > 0 && (
       <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((e) => (
         <EventCard key={e.id} event={e} past={tab === "past"} />
        ))}
       </div>
      )}
     </>
    )}
   </div>
  </div>
 );
};

export default EventsList;
