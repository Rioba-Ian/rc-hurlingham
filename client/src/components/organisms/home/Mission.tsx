import React from "react";

const Mission = () => {
 const rotaractObjectives = [
  {
   id: 1,
   title: "Professional & Leadership Development",
   description: "To develop professional and leadership skills",
  },
  {
   id: 2,
   title: "Ethical Standards & Respect",
   description:
    "To emphasize respect for all the rights of others, and to promote ethical standards and the dignity of all useful occupations",
  },
  {
   id: 3,
   title: "Community & Global Impact",
   description:
    "To provide opportunities for young people to address the needs and concerns of the community and our world",
  },
  {
   id: 4,
   title: "Rotary Collaboration",
   description:
    "To provide opportunities for working in cooperation with sponsor Rotary clubs",
  },
  {
   id: 5,
   title: "Future Rotary Membership",
   description: "To motivate young people for eventual membership in Rotary.",
  },
 ];

 return (
  <section className="container max-w-screen-lg mx-auto w-[80%]">
   <div className="flex flex-col items-start justify-start space-y-6 md:space-y-12">
    <div className="space-y-4 md:space-y-6">
     <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl font-raleway text-neutral-800 dark:text-neutral-200">
      Our Mission
     </h3>
     <p className="text-left text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
      Our mission is to provide an opportunity for Rotaractors to enhance their
      knowledge and skills that will assist them in personal development, to
      address the physical and social needs of their communities, and to promote
      better relations between all people worldwide through a framework of
      friendship, and service.
     </p>
    </div>

    <div className="w-full space-y-6 md:space-y-8">
     <h4 className="font-semibold text-xl md:text-2xl lg:text-3xl font-raleway text-neutral-800 dark:text-neutral-200">
      What Rotaract Does
     </h4>
     <div className="grid grid-cols-1 md:grid-cols-2 place-content-center-safe place-items-center gap-4 md:gap-6">
      {rotaractObjectives?.map((objective, index) => (
       <div
        key={objective.id}
        className="flex flex-col items-start space-y-3 p-4 md:p-8 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-300 group"
       >
        <div className="flex items-center justify-start space-x-3">
         <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-yellow text-white flex items-center justify-center font-semibold text-sm md:text-base group-hover:scale-110 transition-transform duration-300">
          {index + 1}
         </div>
         <h5 className="font-semibold text-sm md:text-base lg:text-2xl text-left text-neutral-800 dark:text-neutral-200">
          {objective.title}
         </h5>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
         {objective.description}
        </p>
       </div>
      ))}
     </div>
    </div>
   </div>
  </section>
 );
};

export default Mission;
