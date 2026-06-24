import SectionHeading from "@/components/molecules/SectionHeading";
import Avatar from "@/components/molecules/Avatar";
import { fetchDirectors, coverUrl } from "@/lib/cms";
import type { Director } from "@/types/cms";

// Leadership hierarchy by role (most specific patterns first so the plain
// "President" match doesn't catch "President-Elect"/"Immediate Past President").
const ROLE_RANK: [RegExp, number][] = [
 [/immediate past president/i, 3],
 [/president[-\s]?elect/i, 1],
 [/president[-\s]?nominee/i, 2],
 [/president/i, 0],
 [/secretary|administrator/i, 4],
 [/treasurer/i, 5],
];

const roleRank = (role: string): number => {
 for (const [re, rank] of ROLE_RANK) if (re.test(role)) return rank;
 return 6; // all other directors — kept in creation (id) order below
};

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

 // Order by leadership hierarchy (role), then by id for same-rank peers.
 const directors = [...data].sort(
  (a, b) => roleRank(a.role) - roleRank(b.role) || a.id - b.id,
 );

 return (
  <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-800">
   <div className="mx-auto max-w-[1080px]">
    <SectionHeading
     kicker="Our Board"
     title="Club leadership"
     sub="Meet the directors guiding our service, leadership and growth this year."
    />
    <div className="mx-auto mt-[52px] grid max-w-[880px] grid-cols-2 gap-8 md:grid-cols-4">
     {directors.map((director) => (
      <BoardCard key={director.id} director={director} />
     ))}
    </div>
   </div>
  </section>
 );
};

export default Leadership;
