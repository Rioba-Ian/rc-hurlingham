"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import type { Project } from "@/types/cms";
import { getMediaUrl } from "@/lib/cms";
import { formatDate } from "@/lib/blog";

interface ProjectsPageClientProps {
  initialProjects: Project[];
}

// High-quality mock projects to display as fallback if CMS has no published projects
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

// Fallback high-quality Unsplash images for mock projects
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", // Maternal
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80", // Reforestation
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80", // Education
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80"  // Water
];

const statusStyles = {
  Ongoing: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
  Completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",
  Upcoming: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50"
};

export default function ProjectsPageClient({ initialProjects }: ProjectsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Ongoing" | "Completed" | "Upcoming">("All");

  // Determine if we should use mock data or CMS data
  const isCmsEmpty = !initialProjects || initialProjects.length === 0;
  const projects = isCmsEmpty ? MOCK_PROJECTS : initialProjects;

  // Filter projects based on search query and active status tab
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = activeTab === "All" || project.projectStatus === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [projects, searchQuery, activeTab]);

  return (
    <div className="container mx-auto px-6 max-w-[1140px]">
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        {isCmsEmpty && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Preview Mode — Showing Example Projects
          </div>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-card border border-border p-4 rounded-2xl shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-cranberry/50 transition-all"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Ongoing", "Completed", "Upcoming"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? "bg-cranberry text-white shadow-md shadow-cranberry/20"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            // Get cover image URL
            const coverUrl = project.id < 0 
              ? MOCK_IMAGES[idx % MOCK_IMAGES.length] 
              : getMediaUrl(project.coverImage?.url);

            return (
              <motion.div
                key={project.documentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  {coverUrl && (
                    <Image
                      src={coverUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  {/* Status Badge */}
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[project.projectStatus]}`}>
                    {project.projectStatus}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Category */}
                  {project.categories && project.categories.length > 0 && (
                    <span className="mb-2.5 inline-block text-[11px] font-bold font-montserrat uppercase tracking-wider text-cranberry">
                      {project.categories[0].name}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h3 className="font-raleway text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2.5 leading-snug group-hover:underline">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="font-montserrat text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Footer Meta */}
                  <div className="mt-auto pt-4 border-t border-border flex flex-wrap justify-between items-center text-xs text-muted-foreground font-montserrat gap-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                      <span>{formatDate(project.date)}</span>
                    </div>
                    {project.Location && (
                      <div className="flex items-center gap-1.5 max-w-[50%]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        <span className="truncate">{project.Location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-card border border-border rounded-2xl max-w-md mx-auto">
          <p className="font-montserrat text-muted-foreground mb-4">No projects match your search criteria.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
            className="text-sm font-semibold text-cranberry hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
