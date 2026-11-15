"use client";

import React, { useState } from "react";
import { FolderGit2, Filter } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Data Analytics",
    "BI & Dashboards",
    "Database & SQL",
    "Machine Learning",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Evidence of Capability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Featured Case Studies &amp; Analytics
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl">
              Practical analytical, database, and machine learning projects demonstrating how data turns into measurable commercial outcomes.
            </p>
          </div>

          {/* Transparent Note Badge */}
          <div className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-subtle)] max-w-sm">
            <span className="text-emerald-500 font-semibold">100% Verifiable:</span> Every project includes documented problem statements, analytical approaches, and reproducible artifacts.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono mr-2">
            <Filter className="w-3 h-3 text-emerald-500" />
            <span>Filter Domain:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-zinc-950 font-semibold shadow-md shadow-emerald-500/20"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
