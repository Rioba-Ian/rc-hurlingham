import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import SectionHeading from "@/components/molecules/SectionHeading";
import punctuation from "@/assets/punctuation.svg";
import starburst from "@/assets/doodles/starburst.svg";
import { cn } from "@/lib/utils";

const MILESTONES: [string, string, string][] = [
 [
  "1905",
  "Rotary begins",
  "Paul Harris founds the first Rotary club in Chicago — now a global network of 1.2M members of action.",
 ],
 [
  "1968",
  "Rotaract is born",
  "Rotary International launches Rotaract worldwide, creating a home for young adults aged 18–30.",
 ],
 [
  "1989",
  "Our mother club",
  "The Rotary Club of Hurlingham is chartered in Nairobi under the motto Service Above Self.",
 ],
 [
  "2019",
  "Our club is chartered",
  "The Rotaract Club of Hurlingham is founded — now over 7 years of service, leadership and friendship.",
 ],
];

/* Our Heritage: milestone timeline. */
const Heritage = () => {
 const last = MILESTONES.length - 1;
 return (
  <section className="relative overflow-hidden px-6 py-24">
   <Image
    src={punctuation}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -left-2.5 top-10 hidden h-[220px] w-auto -rotate-12 opacity-[0.12] md:block"
   />
   <div className="relative mx-auto max-w-[1080px]">
    <SectionHeading
     kicker="Our Roots"
     title="A heritage of service"
     underline
     sub="Our story is part of a much bigger one — more than a century of people uniting to take action."
    />
    <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
     {MILESTONES.map((m, i) => (
      <div key={m[0]} className="relative px-[18px]">
       {/* connecting line (desktop only, spans between nodes) */}
       <div
        className={cn(
         "absolute top-[19px] hidden h-0.5 bg-border lg:block",
         i === 0 ? "left-1/2" : "left-0",
         i === last ? "right-1/2" : "right-0",
        )}
       />
       {i === last && (
        <Image
         src={starburst}
         alt=""
         aria-hidden="true"
         className="pointer-events-none absolute -top-3.5 left-[57%] z-[2] hidden h-auto w-12 lg:block"
        />
       )}
       <div className="relative z-[1] mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-cranberry text-white">
        <CircleCheckBig size={20} strokeWidth={2.5} />
       </div>
       <div className="text-center">
        <div className="font-raleway text-[30px] font-extrabold leading-none text-cranberry">
         {m[0]}
        </div>
        <div className="my-2 font-raleway text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
         {m[1]}
        </div>
        <p className="m-0 font-montserrat text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
         {m[2]}
        </p>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default Heritage;
