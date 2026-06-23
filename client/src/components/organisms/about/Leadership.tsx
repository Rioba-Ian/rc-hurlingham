import SectionHeading from "@/components/molecules/SectionHeading";
import Avatar from "@/components/molecules/Avatar";
import { fetchDirectors, coverUrl } from "@/lib/cms";
import type { Director } from "@/types/cms";

const BoardCard = ({ director }: { director: Director }) => {
 return (
  <div className="text-center">
   <Avatar
    name={director.name}
    src={coverUrl(director.photo, "small")}
    size={132}
    className="mx-auto mb-4 border border-border"
   />
   <div className="font-raleway text-[17px] font-semibold text-neutral-800 dark:text-neutral-100">
    {director.name}
   </div>
   <div className="mt-[3px] font-montserrat text-[13px] text-cranberry">
    {director.role}
   </div>
  </div>
 );
};

/* Leadership: current directors pulled from the CMS. */
const Leadership = async () => {
 const { data } = await fetchDirectors();
 if (!data || data.length === 0) return null;

 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="mx-auto max-w-[1080px]">
    <SectionHeading
     kicker="Our Board"
     title="Club leadership"
     sub="Meet the directors guiding our service, leadership and growth this year."
    />
    <div className="mx-auto mt-[52px] grid max-w-[880px] grid-cols-2 gap-8 md:grid-cols-4">
     {data.map((director) => (
      <BoardCard key={director.id} director={director} />
     ))}
    </div>
   </div>
  </section>
 );
};

export default Leadership;
