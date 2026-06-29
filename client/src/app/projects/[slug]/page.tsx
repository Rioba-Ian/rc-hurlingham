import type { Metadata } from "next";
import { fetchProjectBySlug, fetchProjects, coverUrl } from "@/lib/cms";
import ProjectDetailClient from "@/components/organisms/projects/ProjectDetailClient";
import type { Project } from "@/types/cms";

// Re-declare mock projects locally for page-level routing fallback
const MOCK_PROJECTS: Project[] = [
  {
    id: -1,
    documentId: "mock-1",
    title: "Maternal Health Outreach",
    slug: "maternal-health-outreach",
    description: "Providing essential prenatal care, education, and medical supplies to expectant mothers in underserved communities in Nairobi.",
    date: "2026-05-12",
    Location: "Kibera, Nairobi",
    projectStatus: "Ongoing",
    categories: [{ id: 1, documentId: "cat-1", name: "Maternal & Child Health" }],
    content: [],
    createdAt: "",
    updatedAt: "",
    publishedAt: ""
  },
  {
    id: -2,
    documentId: "mock-2",
    title: "Adopt-a-Forest Campaign",
    slug: "adopt-a-forest-campaign",
    description: "A reforestation initiative aiming to plant and nurture 5,000 indigenous trees to restore degraded forest ecosystems in Ngong Hills.",
    date: "2026-04-05",
    Location: "Ngong Hills, Kajiado",
    projectStatus: "Completed",
    categories: [{ id: 2, documentId: "cat-2", name: "Environment" }],
    content: [],
    createdAt: "",
    updatedAt: "",
    publishedAt: ""
  },
  {
    id: -3,
    documentId: "mock-3",
    title: "Hurlingham Literacy Program",
    slug: "hurlingham-literacy-program",
    description: "Setting up community library corners and conducting weekly reading, tutoring, and mentorship sessions for primary school children.",
    date: "2026-07-20",
    Location: "Mathare, Nairobi",
    projectStatus: "Upcoming",
    categories: [{ id: 3, documentId: "cat-3", name: "Basic Education & Literacy" }],
    content: [],
    createdAt: "",
    updatedAt: "",
    publishedAt: ""
  },
  {
    id: -4,
    documentId: "mock-4",
    title: "Clean Water for Schools",
    slug: "clean-water-for-schools",
    description: "Installing modern water purification systems and handwashing stations in local public schools to promote health and sanitation.",
    date: "2026-02-18",
    Location: "Kawangware, Nairobi",
    projectStatus: "Completed",
    categories: [{ id: 4, documentId: "cat-4", name: "Water & Sanitation" }],
    content: [],
    createdAt: "",
    updatedAt: "",
    publishedAt: ""
  }
];

const MOCK_DETAIL_IMAGE = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80";

async function getProject(slug: string): Promise<Project | null> {
  // First, check if it is a mock project
  const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (mock) return mock;

  // Otherwise, fetch from CMS
  const { data } = await fetchProjectBySlug(slug);
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  const title = project ? `${project.title} | Projects` : "Project";
  const description = project?.description ?? undefined;
  const imageUrl = project 
    ? (project.id < 0 ? MOCK_DETAIL_IMAGE : coverUrl(project.coverImage, "large")) 
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-40 text-center font-montserrat text-neutral-600 dark:text-neutral-400">
        Project not found.
      </div>
    );
  }

  return <ProjectDetailClient project={project} />;
}
