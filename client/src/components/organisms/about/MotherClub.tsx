import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import rotaryHurlinghamLogo from "@/assets/Rotary_Hurlingham_Logo.png";
import circleScribble from "@/assets/doodles/circle-scribble.svg";

/* Our Mother Club: Rotary Club of Hurlingham. */
const MotherClub = () => {
 return (
  <section className="px-6 pb-24">
   <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 rounded-[20px] bg-neutral-50 p-12 dark:bg-neutral-800 md:grid-cols-[1fr_1.3fr]">
    <div className="flex items-center justify-center rounded-[14px] border border-border bg-white p-6 dark:bg-neutral-900">
     <Image
      src={rotaryHurlinghamLogo}
      alt="Rotary Club of Hurlingham"
      className="w-full max-w-[320px] object-contain"
     />
    </div>
    <div>
     <div className="mb-3.5 font-montserrat text-[13px] font-semibold uppercase tracking-[0.08em] text-cranberry">
      Our Mother Club
     </div>
     <h2 className="m-0 font-raleway text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight text-neutral-800 dark:text-neutral-100">
      The Rotary Club of Hurlingham
     </h2>
     <p className="mt-[18px] font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
      Chartered in <span className="font-semibold text-cranberry">1989</span>,
      the Rotary Club of Hurlingham is our sponsoring &ldquo;mother&rdquo; club
      — a community of business and professional leaders bonded by the desire of{" "}
      <span className="font-semibold text-cranberry">Service Above Self</span>.
      They mentor our members, guide our projects, and connect us to the wider
      world of Rotary.
     </p>
     <div className="my-7 flex flex-wrap gap-7">
      <div>
       <div className="relative inline-block">
        <div className="font-raleway text-[26px] font-extrabold text-neutral-800 dark:text-neutral-100">
         1989
        </div>
        <Image
         src={circleScribble}
         alt=""
         aria-hidden="true"
         className="pointer-events-none absolute -left-4 -top-2.5 h-[calc(100%+20px)] w-[calc(100%+32px)] max-w-none"
        />
       </div>
       <div className="mt-1.5 font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
        Chartered
       </div>
      </div>
      <div>
       <div className="font-raleway text-[26px] font-extrabold text-neutral-800 dark:text-neutral-100">
        35+
       </div>
       <div className="font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
        Years of service
       </div>
      </div>
      <div>
       <div className="font-raleway text-[26px] font-extrabold text-neutral-800 dark:text-neutral-100">
        Nairobi
       </div>
       <div className="font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
        Kenya
       </div>
      </div>
     </div>
     <a
      href="https://rotaryclubofhurlinghamnairobi.org/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-cranberry px-[22px] font-montserrat text-[15px] font-medium text-white transition-colors hover:bg-cranberry/90"
     >
      Visit our mother club <ArrowUpRight size={18} />
     </a>
    </div>
   </div>
  </section>
 );
};

export default MotherClub;
