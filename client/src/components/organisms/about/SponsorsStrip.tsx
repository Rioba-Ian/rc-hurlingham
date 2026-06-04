import Image from "next/image";
import Link from "next/link";
import rotaryHurlinghamLogo from "@/assets/Rotary_Hurlingham_Logo.png";
import rotaryLogo from "@/assets/RotaryMBS.png";

/* Sponsors strip. */
const SponsorsStrip = () => {
 return (
  <section className="px-6 py-20 text-center">
   <h3 className="mb-9 font-raleway text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-neutral-600 dark:text-neutral-300">
    Our Sponsors
   </h3>
   <div className="flex flex-wrap items-center justify-center gap-14">
    <Link
     href="https://rotaryclubofhurlinghamnairobi.org/"
     target="_blank"
     rel="noreferrer"
    >
     <Image
      src={rotaryHurlinghamLogo}
      alt="Rotary Club of Hurlingham"
      className="h-[84px] w-auto object-contain"
     />
    </Link>
    <Link href="https://www.rotary.org/" target="_blank" rel="noreferrer">
     <Image
      src={rotaryLogo}
      alt="Rotary International"
      className="h-[78px] w-auto object-contain"
     />
    </Link>
   </div>
  </section>
 );
};

export default SponsorsStrip;
