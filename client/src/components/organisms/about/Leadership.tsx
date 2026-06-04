import { UserRound } from "lucide-react";
import SectionHeading from "@/components/molecules/SectionHeading";

const BOARD = ["President", "Vice President", "Secretary", "Treasurer"];

const BoardCard = ({ role }: { role: string }) => {
 return (
  <div className="text-center">
   <div className="mx-auto mb-4 flex h-[132px] w-[132px] items-center justify-center rounded-full border border-border bg-cranberry/[0.08]">
    <UserRound className="text-cranberry" size={52} strokeWidth={1.5} />
   </div>
   <div className="font-raleway text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
    {role}
   </div>
   <div className="mt-[3px] font-montserrat text-[13px] text-neutral-600 dark:text-neutral-400">
    Add member name
   </div>
  </div>
 );
};

/* Leadership: board roles with avatar placeholders. */
const Leadership = () => {
 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="mx-auto max-w-[1080px]">
    <SectionHeading
     kicker="Our Board"
     title="Club leadership"
     sub="The 2025 board guiding our service and growth. Add headshots and names to personalise."
    />
    <div className="mx-auto mt-[52px] grid max-w-[880px] grid-cols-2 gap-8 md:grid-cols-4">
     {BOARD.map((role) => (
      <BoardCard key={role} role={role} />
     ))}
    </div>
   </div>
  </section>
 );
};

export default Leadership;
