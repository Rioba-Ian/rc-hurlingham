import Image from "next/image";

/* Page hero: photo band with a cranberry gradient overlay. */
const AboutHero = () => {
 return (
  <section className="relative flex min-h-[480px] items-center justify-center overflow-hidden">
   <Image
    src="https://res.cloudinary.com/drxurk7lu/image/upload/v1754301832/rc-hurlingham/524594164_18101375320601621_8044475636033552825_n_oqbs7q.jpg"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover"
   />
   <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/55 to-cranberry/[0.78]" />
   <div className="relative z-[2] max-w-[760px] px-6 pb-[72px] pt-[120px] text-center">
    <div className="mb-4 font-montserrat text-[13px] font-semibold uppercase tracking-[0.12em] text-white/85">
     Service Above Self
    </div>
    <h1 className="m-0 font-raleway text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
     About Our Club
    </h1>
    <p className="mx-auto mt-5 max-w-[580px] font-montserrat text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/90">
     We are a community of young professionals in Nairobi turning the idea of{" "}
     <em>Rotary in Action</em> into real change — through service, leadership,
     and lasting friendship.
    </p>
   </div>
  </section>
 );
};

export default AboutHero;
