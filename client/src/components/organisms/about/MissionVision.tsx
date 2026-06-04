import { Target, Eye, LucideIcon } from "lucide-react";

const MVCard = ({
 icon: Icon,
 kicker,
 title,
 body,
}: {
 icon: LucideIcon;
 kicker: string;
 title: string;
 body: string;
}) => {
 return (
  <div className="flex-1 basis-80 rounded-[14px] border border-border bg-white p-9 shadow-sm dark:bg-neutral-900">
   <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-cranberry/10">
    <Icon className="text-cranberry" size={26} strokeWidth={2} />
   </div>
   <div className="mb-2 font-montserrat text-xs font-semibold uppercase tracking-[0.08em] text-cranberry">
    {kicker}
   </div>
   <h3 className="mb-3.5 mt-0 font-raleway text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
    {title}
   </h3>
   <p className="m-0 font-montserrat text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
    {body}
   </p>
  </div>
 );
};

/* Mission & Vision: two cards. */
const MissionVision = () => {
 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="mx-auto max-w-[1080px]">
    <div className="flex flex-wrap gap-7">
     <MVCard
      icon={Target}
      kicker="Our Mission"
      title="Enhance, serve, connect"
      body="To provide an opportunity for Rotaractors to enhance their knowledge and skills that assist them in personal development, to address the physical and social needs of their communities, and to promote better relations between all people worldwide through a framework of friendship and service."
     />
     <MVCard
      icon={Eye}
      kicker="Our Vision"
      title="Lasting change, together"
      body="A community of empowered young leaders who unite and take action to create lasting change — in our community, in our nation, and around the world — while growing into the responsible citizens and future Rotarians of tomorrow."
     />
    </div>
   </div>
  </section>
 );
};

export default MissionVision;
