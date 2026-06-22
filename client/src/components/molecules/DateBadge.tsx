import { dateParts } from "@/lib/events";
import { cn } from "@/lib/utils";

interface DateBadgeProps {
 iso?: string | null;
 size?: "sm" | "lg";
 /** Soft tinted variant (light cranberry bg) instead of solid cranberry. */
 tinted?: boolean;
 className?: string;
}

/** Square date badge showing the day + short month. */
const DateBadge = ({ iso, size = "sm", tinted = false, className }: DateBadgeProps) => {
 const { day, month } = dateParts(iso);
 const lg = size === "lg";
 return (
  <div
   className={cn(
    "flex shrink-0 flex-col items-center justify-center rounded-xl text-center leading-none",
    lg ? "w-[76px] py-3" : "w-[60px] py-[9px]",
    tinted ? "bg-cranberry/10 text-cranberry" : "bg-cranberry text-white",
    className,
   )}
  >
   <span
    className={cn("font-raleway font-extrabold", lg ? "text-[32px]" : "text-2xl")}
   >
    {day}
   </span>
   <span
    className={cn(
     "mt-1 font-montserrat font-semibold tracking-[0.06em]",
     lg ? "text-[13px]" : "text-[11px]",
    )}
   >
    {month}
   </span>
  </div>
 );
};

export default DateBadge;
