"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, BarChart3, Database, Layers } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/portfolioData";
import { InteractiveChartPreview } from "./InteractiveChartPreview";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            Verified Case Study
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed font-normal">
          {project.tagline}
        </p>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 mb-5 rounded-xl bg-zinc-950/80 border border-white/[0.04]">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-[10px] text-zinc-400 uppercase font-mono">{m.label}</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Chart Preview */}
        <div className="mb-5">
          <InteractiveChartPreview
            type={project.chartType}
            data={project.chartData}
            meta={project.chartMeta}
          />
        </div>

        {/* Problem Statement snippet */}
        <div className="text-xs text-zinc-400 mb-5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
          <span className="text-zinc-300 font-semibold">Business Problem: </span>
          {project.problemStatement}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-950 border border-white/[0.06] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5 duration-200"
        >
          <span>View Deep-Dive Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            title="Repository link placeholder"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repo</span>
          </a>
        )}
      </div>
    </div>
  );
}
