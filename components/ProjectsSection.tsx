"use client";

import React, { useState } from "react";
import { FolderGit2, Sparkles, Filter } from "lucide-react";
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
    <section id="projects" className="py-20 md:py-28 relative bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Evidence of Capability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Case Studies & Analytics
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Real-world analytical, database, and machine learning projects demonstrating how data transforms into measurable commercial decisions.
            </p>
          </div>

          {/* Transparent Note Badge */}
          <div className="text-xs font-mono text-zinc-400 bg-zinc-900/80 p-3 rounded-lg border border-white/[0.06] max-w-sm">
            <span className="text-emerald-400 font-semibold">100% Verifiable:</span> Every project includes full dataset documentation, analytical methodology, and reproducible code samples.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mr-2">
            <Filter className="w-3 h-3 text-emerald-400" />
            <span>Filter by Domain:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-zinc-950 font-semibold shadow-md shadow-emerald-500/20"
                  : "bg-zinc-900/70 text-zinc-400 hover:text-white hover:bg-zinc-800"
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

