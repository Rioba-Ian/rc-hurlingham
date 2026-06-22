import Image from "next/image";
import { UsersRound, RotateCw, Globe, LucideIcon } from "lucide-react";
import underline from "@/assets/underline.svg";
import thinkingPerson from "@/assets/face_thinking_person.svg";
import { cn } from "@/lib/utils";

interface FamilyMember {
 icon: LucideIcon;
 title: string;
 age: string;
 body: string;
}

const FAMILY: FamilyMember[] = [
 {
  icon: UsersRound,
  title: "Interact",
  age: "Ages 12–18",
  body: "Service clubs for secondary-school students, sponsored by a Rotary club.",
 },
 {
  icon: RotateCw,
  title: "Rotaract",
  age: "Ages 18–30",
  body: "Where we belong — young adults taking action, building skills and leading projects.",
 },
 {
  icon: Globe,
  title: "Rotary",
  age: "Professionals",
  body: "The global network of 1.2M members of action that sponsors and mentors us.",
 },
];

const FamilyCard = ({
 member,
 highlight,
}: {
 member: FamilyMember;
 highlight?: boolean;
}) => {
 const Icon = member.icon;
 return (
  <div
   className={cn(
    "flex-1 basis-60 rounded-[14px] p-7",
    highlight
     ? "border-none bg-cranberry text-white shadow-[0_10px_30px_-8px_rgba(210,32,98,0.45)]"
     : "border border-border bg-white text-neutral-800 shadow-sm dark:bg-neutral-900 dark:text-neutral-100",
   )}
  >
   <div
    className={cn(
     "mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-[11px]",
     highlight ? "bg-white/20" : "bg-cranberry/10",
    )}
   >
    <Icon
     className={highlight ? "text-white" : "text-cranberry"}
     size={24}
     strokeWidth={2}
    />
   </div>
   <div className="mb-2.5 flex items-baseline gap-2.5">
    <h4 className="m-0 font-raleway text-xl font-bold">{member.title}</h4>
    <span
     className={cn(
      "font-montserrat text-[12.5px] font-semibold",
      highlight ? "text-white/85" : "text-cranberry",
     )}
    >
     {member.age}
    </span>
   </div>
   <p
    className={cn(
     "m-0 font-montserrat text-sm leading-relaxed",
     highlight ? "text-white/90" : "text-neutral-600 dark:text-neutral-300",
    )}
   >
    {member.body}
   </p>
  </div>
 );
};

/* The Rotaract Movement: deeper info + Rotary family ladder. */
const AboutRotaract = () => {
 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="relative mx-auto max-w-[1080px]">
    <Image
     src={thinkingPerson}
     alt=""
     aria-hidden="true"
     className="pointer-events-none absolute -top-7 right-2 hidden h-auto w-[92px] rotate-[8deg] opacity-95 md:block"
    />
    <div className="max-w-[720px]">
     <div className="mb-3.5 font-montserrat text-[13px] font-semibold uppercase tracking-[0.08em] text-cranberry">
      The Movement
     </div>
     <h2 className="relative m-0 inline-block font-raleway text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight text-neutral-800 dark:text-neutral-100">
      What Rotaract is all about
      <Image
       src={underline}
       alt=""
       aria-hidden="true"
       className="pointer-events-none absolute -bottom-3.5 left-[4%] h-auto w-[70%]"
      />
     </h2>
     <p className="mt-5 font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
      Rotaract was launched by Rotary International in{" "}
      <span className="font-semibold text-cranberry">1968</span> to give young
      adults a place of their own within the Rotary family. Today, thousands of
      Rotaract clubs in nearly every country bring together members aged{" "}
      <span className="font-semibold text-cranberry">18–30</span> to exchange
      ideas with leaders in their community, develop leadership and professional
      skills, and have fun through service.
     </p>
     <p className="mt-4 font-montserrat text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
      Rotaractors run their own clubs and projects, sponsored and mentored by a
      Rotary club — for us, the Rotary Club of Hurlingham. We organise community
      service, raise funds for causes we care about, partner across borders, and
      grow into the responsible citizens and future Rotarians of tomorrow. It
      is, quite simply,{" "}
      <span className="font-semibold text-cranberry">Rotary in Action</span>.
     </p>
    </div>
    <div className="mt-12 flex flex-wrap gap-6">
     {FAMILY.map((member, i) => (
      <FamilyCard key={member.title} member={member} highlight={i === 1} />
     ))}
    </div>
    <p className="mt-[22px] font-montserrat text-[13px] italic text-neutral-600 dark:text-neutral-400">
     The Rotary family — from Interact to Rotaract to Rotary — offers a path of
     service for every stage of life.
    </p>
   </div>
  </section>
 );
};

export default AboutRotaract;
