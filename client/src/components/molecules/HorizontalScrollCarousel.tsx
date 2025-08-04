"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

interface HorizontalScrollCarouselProps {
 title: string;
 cards: CardType[];
}

const HorizontalScrollCarousel = ({
 title,
 cards,
}: HorizontalScrollCarouselProps) => {
 const targetRef = useRef<HTMLDivElement | null>(null);
 const { scrollYProgress } = useScroll({
  target: targetRef,
 });

 const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

 return (
  <section ref={targetRef} className="relative h-[240vh] bg-neutral-900">
   <div className="sticky top-0 flex h-screen items-center overflow-hidden">
    <motion.div style={{ x }} className="flex gap-4">
     {cards.map((card) => {
      return <Card card={card} key={card.id} />;
     })}
    </motion.div>
   </div>
  </section>
 );
};

const Card = ({ card }: { card: CardType }) => {
 return (
  <div
   key={card.id}
   className="group relative h-[450px] w-[450px] md:h-[600px] md:w-[600px] overflow-hidden bg-neutral-200"
  >
   <div
    style={{
     backgroundImage: `url(${card.url})`,
     backgroundSize: "cover",
     backgroundPosition: "center",
    }}
    className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
   ></div>

   {/* Title at the bottom */}
   <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
    <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-t-lg">
     <h3 className="text-xl font-black uppercase text-white mb-2">
      {card.title}
     </h3>

     {/* Additional content that fades in on hover */}
     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <p className="text-white/90 text-sm leading-relaxed">
       {card.description}
      </p>
      {card.details && (
       <div className="mt-3 space-y-2">
        {card.details.map((detail, index) => (
         <p key={index} className="text-white/70 text-xs">
          {detail}
         </p>
        ))}
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

type CardType = {
 url: string;
 title: string;
 id: number;
 description: string;
 details?: string[];
};

export default HorizontalScrollCarousel;
