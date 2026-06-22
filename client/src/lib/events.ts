import type { Event } from "@/types/cms";

/** Day + short uppercase month for date badges, e.g. { day: "28", month: "JUN" }. */
export function dateParts(iso?: string | null): { day: string; month: string } {
 if (!iso) return { day: "", month: "" };
 const d = new Date(iso);
 if (Number.isNaN(d.getTime())) return { day: "", month: "" };
 return {
  day: String(d.getDate()),
  month: d
   .toLocaleString("en-GB", { month: "short" })
   .toUpperCase(),
 };
}

/** Is the event date in the past? */
export function isPast(iso?: string | null): boolean {
 if (!iso) return false;
 const t = new Date(iso).getTime();
 return !Number.isNaN(t) && t < Date.now();
}

/** Split events into upcoming (ascending) and past (descending). */
export function splitByDate(events: Event[]): {
 upcoming: Event[];
 past: Event[];
} {
 const now = Date.now();
 const time = (e: Event) => new Date(e.date).getTime();
 const upcoming = events
  .filter((e) => time(e) >= now)
  .sort((a, b) => time(a) - time(b));
 const past = events
  .filter((e) => time(e) < now)
  .sort((a, b) => time(b) - time(a));
 return { upcoming, past };
}
