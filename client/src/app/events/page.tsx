import { fetchEvents } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import EventsList from "@/components/organisms/events/EventsList";

export default async function EventsPage() {
 const { data } = await fetchEvents();

 return (
  <section className="pb-24 pt-32">
   <SectionHeading
    kicker="What's On"
    title="Events"
    underline
    sub="Service projects, trainings and socials. Join us — there's always a seat at the table."
    className="mb-2"
   />
   <EventsList events={data ?? []} />
  </section>
 );
}
