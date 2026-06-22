import Image from "next/image";
import underline from "@/assets/underline.svg";
import sparkles from "@/assets/doodles/sparkles.svg";

/* Our Story: text + image, two columns. */
const OurStory = () => {
 return (
  <section className="px-6 py-24">
   <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_1fr]">
    <div>
     <div className="mb-3.5 font-montserrat text-[13px] font-semibold uppercase tracking-[0.08em] text-cranberry">
      Who We Are
     </div>
     <h2 className="relative m-0 inline-block font-raleway text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight text-neutral-800 dark:text-neutral-100">
      Young leaders, taking action together
      <Image
       src={underline}
       alt=""
       aria-hidden="true"
       className="pointer-events-none absolute -bottom-3.5 left-[2%] h-auto w-[62%]"
      />
     </h2>
     <p className="mt-5 font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
      The Rotaract Club of Hurlingham brings together young adults aged{" "}
      <span className="font-semibold text-cranberry">18–30</span> who want to
      develop themselves while making a difference. Sponsored by the Rotary Club
      of Hurlingham, we are part of a global movement of Rotaractors taking
      action in their communities and around the world.
     </p>
     <p className="mt-4 font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
      We meet, we serve, and we grow — running community projects, building
      professional and leadership skills, and forming meaningful connections
      that cross borders. Everything we do is grounded in our motto,{" "}
      <span className="font-semibold text-cranberry">Service Above Self</span>.
     </p>
    </div>
    <div className="relative">
     <Image
      src={sparkles}
      alt=""
      aria-hidden="true"
      className="absolute -right-3.5 -top-[22px] z-[2] hidden h-auto w-[62px] md:block"
     />
     <div className="overflow-hidden rounded-[14px] shadow-md">
      <Image
       src="https://res.cloudinary.com/drxurk7lu/image/upload/v1780561165/rc-hurlingham/DSC02219_jnlutn.jpg"
       alt="Rotaract Hurlingham members"
       width={560}
       height={420}
       sizes="(max-width: 768px) 100vw, 480px"
       className="block h-[420px] w-full object-cover"
      />
     </div>
    </div>
   </div>
  </section>
 );
};

export default OurStory;
