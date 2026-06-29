import type { Metadata } from "next";
import { fetchProjects } from "@/lib/cms";
import SectionHeading from "@/components/molecules/SectionHeading";
import ProjectsPageClient from "@/components/organisms/projects/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the community service, environmental, and youth development projects of the Rotaract Club of Hurlingham in Nairobi.",
  openGraph: {
    title: "Projects | Rotaract Club of Hurlingham",
    description:
      "Explore the community service, environmental, and youth development projects of the Rotaract Club of Hurlingham in Nairobi.",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const { data } = await fetchProjects();

  return (
    <section className="pb-24 pt-32">
      <SectionHeading
        kicker="Our Impact"
        title="Featured Projects"
        underline
        sub="Discover how we serve our community through sustainable initiatives in healthcare, education, environment, and economic empowerment."
        className="mb-12"
      />
      <ProjectsPageClient initialProjects={data ?? []} />
    </section>
  );
}
