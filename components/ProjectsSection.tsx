"use client";

import React, { useState, useMemo } from "react";
import { FolderGit2, Filter, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { useRole } from "@/context/RoleContext";

export function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const { roleConfig } = useRole();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Data Analytics",
    "BI & Dashboards",
    "Database & SQL",
    "Machine Learning",
  ];

  const sortedProjects = useMemo(() => {
    let list = [...projects];

    // If roleConfig exists and category is All, prioritize role's projects
    if (roleConfig && selectedCategory === "All") {
      const prioritySlugs = roleConfig.prioritizedProjects;
      list.sort((a, b) => {
        const aIndex = prioritySlugs.indexOf(a.slug);
        const bIndex = prioritySlugs.indexOf(b.slug);
        const aScore = aIndex === -1 ? 99 : aIndex;
        const bScore = bIndex === -1 ? 99 : bIndex;
        return aScore - bScore;
      });
    }

    if (selectedCategory !== "All") {
      return list.filter((p) => p.category === selectedCategory);
    }
    return list;
  }, [projects, roleConfig, selectedCategory]);

  return (
    <section id="projects" className="py-16 md:py-24 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest font-semibold">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Evidence of Capability</span>
              </div>
              {roleConfig && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" />
                  Prioritized for {roleConfig.shortTitle}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Featured Case Studies &amp; Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl">
              {roleConfig
                ? `Key case studies providing direct empirical proof of capability for ${roleConfig.title} hiring requirements.`
                : "Compact case studies demonstrating real-world data analytics, database engineering, and machine learning. Click any card to expand findings and evidence."}
            </p>
          </div>

          {/* Transparent Note Badge */}
          <div className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-card)] p-2.5 rounded-lg border border-[var(--border-subtle)] max-w-sm self-start md:self-auto">
            <span className="text-emerald-500 font-semibold">100% Verifiable:</span> Problem statements, analytical methodologies, and live dashboards.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono mr-2">
            <Filter className="w-3 h-3 text-emerald-500" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-zinc-950 font-semibold shadow-md shadow-emerald-500/20"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (Compact gap) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
