import type { Metadata } from "next";
import { fetchEvents } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import EventsList from "@/components/organisms/events/EventsList";

export const metadata: Metadata = {
 title: "Events | Rotaract Club of Hurlingham",
 description:
  "Service projects, trainings and socials from the Rotaract Club of Hurlingham. Join us — there's always a seat at the table.",
 openGraph: {
  title: "Events | Rotaract Club of Hurlingham",
  description:
   "Service projects, trainings and socials from the Rotaract Club of Hurlingham. Join us — there's always a seat at the table.",
  type: "website",
 },
};

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
