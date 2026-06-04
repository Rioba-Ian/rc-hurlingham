import {
 Users,
 Award,
 GraduationCap,
 Briefcase,
 HeartHandshake,
 Brain,
 HandHeart,
 BookOpen,
 LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/molecules/SectionHeading";

const FOCUS: [LucideIcon, string, string][] = [
 [Users, "Community", "Hands-on service projects that strengthen our neighbourhoods."],
 [Award, "Leadership", "Building confident, capable leaders ready to take action."],
 [GraduationCap, "Mentorship", "Pairing members with mentors for guidance and growth."],
 [Briefcase, "Professional Development", "Skills and networks that advance careers."],
 [
  HeartHandshake,
  "Peace & Conflict Resolution",
  "Promoting dialogue, understanding and cooperation.",
 ],
 [Brain, "Mental Health", "Open conversations that break stigma and support wellbeing."],
 [HandHeart, "Service Above Self", "Living our motto through impact beyond ourselves."],
 [BookOpen, "Training", "Year-round workshops that empower our members."],
];

const FocusCard = ({
 icon: Icon,
 title,
 desc,
}: {
 icon: LucideIcon;
 title: string;
 desc: string;
}) => {
 return (
  <div className="group rounded-xl border border-border bg-white p-[26px] shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-neutral-900">
   <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-cranberry/10 transition-transform duration-300 group-hover:scale-110">
    <Icon className="text-cranberry" size={22} strokeWidth={2} />
   </div>
   <h4 className="mb-2 mt-0 font-raleway text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
    {title}
   </h4>
   <p className="m-0 font-montserrat text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
    {desc}
   </p>
  </div>
 );
};

/* Focus Areas: pillars grid. */
const FocusAreas = () => {
 return (
  <section className="px-6 py-24">
   <div className="mx-auto max-w-[1080px]">
    <SectionHeading
     kicker="What We Do"
     title="Our areas of focus"
     underline
     sub="Eight pillars guide the projects we run and the people we grow."
    />
    <div className="mt-[52px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     {FOCUS.map(([icon, title, desc]) => (
      <FocusCard key={title} icon={icon} title={title} desc={desc} />
     ))}
    </div>
   </div>
  </section>
 );
};

export default FocusAreas;
