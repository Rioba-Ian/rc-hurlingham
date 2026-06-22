import Image from "next/image";
import underline from "@/assets/underline.svg";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
 kicker?: string;
 title: string;
 sub?: string;
 underline?: boolean;
 className?: string;
}

/**
 * Centered section heading: small uppercase kicker, title (optionally with the
 * hand-drawn underline doodle), and an optional supporting paragraph.
 * Used across the About page sections (Focus Areas, Leadership, Heritage).
 */
const SectionHeading = ({
 kicker,
 title,
 sub,
 underline: showUnderline = false,
 className,
}: SectionHeadingProps) => {
 return (
  <div className={cn("text-center", className)}>
   {kicker && (
    <div className="font-montserrat text-xs font-semibold uppercase tracking-[0.08em] text-cranberry">
     {kicker}
    </div>
   )}
   <h2 className="relative mx-auto mt-3.5 inline-block font-raleway text-2xl font-bold leading-tight tracking-tight text-neutral-800 dark:text-neutral-100 md:text-4xl lg:text-[2.75rem]">
    {title}
    {showUnderline && (
     <Image
      src={underline}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3.5 left-[8%] h-auto w-[70%]"
     />
    )}
   </h2>
   {sub && (
    <p className="mx-auto mt-4 max-w-xl font-montserrat text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
     {sub}
    </p>
   )}
  </div>
 );
};

export default SectionHeading;
