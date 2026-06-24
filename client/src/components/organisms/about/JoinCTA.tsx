import Image from "next/image";
import Link from "next/link";
import arrowCurved from "@/assets/doodles/rotated-right-arrow-with-broken-line-svgrepo-com.svg";

/* Join CTA: cranberry band. */
const JoinCTA = () => {
 return (
  <section className="px-6 pb-24 pt-6">
   <div className="relative mx-auto max-w-[1080px] overflow-hidden rounded-[20px] bg-cranberry px-8 py-16 text-center text-white">
    <h2 className="m-0 font-raleway text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">
     Ready to make a difference?
    </h2>
    <p className="mx-auto mb-8 mt-4 max-w-[520px] font-montserrat text-[17px] leading-relaxed text-white/90">
     Join a community of young leaders serving Nairobi and beyond. Subscribe to
     hear about our next meeting and projects.
    </p>
    <div className="relative inline-block">
     <Link
      href="/subscribe"
      className="inline-flex h-12 items-center rounded-[10px] bg-white px-[30px] font-montserrat text-base font-semibold text-cranberry transition-colors hover:bg-white/90"
     >
      Get involved →
     </Link>
     <Image
      src={arrowCurved}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-[110%] ml-2 hidden h-auto w-[56px] -translate-y-[75%] -scale-x-150 -rotate-25 opacity-90 brightness-0 invert md:block"
     />
    </div>
   </div>
  </section>
 );
};

export default JoinCTA;
