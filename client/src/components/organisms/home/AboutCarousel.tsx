import HorizontalScrollCarousel from "@/components/molecules/HorizontalScrollCarousel";

const AboutCarousel = () => {
 return (
  <div className="bg-cranberry-foreground dark:bg-neutral-800">
   <div className="flex h-48 items-center justify-center">
    <h2 className="font-semibold font-raleway uppercase text-neutral-500 text-2xl md:text-4xl">
     Community, Leadership and Impact
    </h2>
   </div>
   <HorizontalScrollCarousel />
   <div className="flex h-48 items-center justify-center">
    <h3 className="font-semibold uppercase text-neutral-500 text-2xl md:text-4xl">
     Amazing Stories
    </h3>
   </div>
  </div>
 );
};

export default AboutCarousel;
