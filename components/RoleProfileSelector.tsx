"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  BrainCircuit,
  Binary,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Compass,
  Layers,
  Info,
} from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { ProfessionalRole, ROLES_CONFIG } from "@/data/rolesData";

export function RoleProfileSelector() {
  const { activeRole, setActiveRole, roleConfig, resetRole } = useRole();

  const roleOptions: {
    id: ProfessionalRole | "all";
    title: string;
    badge: string;
    icon: React.ReactNode;
    subtitle: string;
  }[] = [
    {
      id: "all",
      title: "Full Overview",
      badge: "All Evidence",
      icon: <Layers className="w-4 h-4" />,
      subtitle: "Complete cross-disciplinary portfolio view",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      badge: "Commercial Experience",
      icon: <BarChart3 className="w-4 h-4" />,
      subtitle: "SQL optimization, Tableau, Power BI & EDA",
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      badge: "Postgraduate Specialization",
      icon: <BrainCircuit className="w-4 h-4" />,
      subtitle: "Python, statistical modeling & Scikit-learn",
    },
    {
      id: "ai-ml-engineer",
      title: "AI / ML Engineer",
      badge: "Certified & Research",
      icon: <Binary className="w-4 h-4" />,
      subtitle: "Azure AI-102, ML algorithms & computer vision",
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      badge: "Commercial Experience",
      icon: <Code2 className="w-4 h-4" />,
      subtitle: ".NET Core Web API, Angular & MySQL tuning",
    },
  ];

  return (
    <section
      id="role-profiles"
      className="py-12 bg-[var(--bg-subtle)] border-y border-[var(--border-subtle)] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Tailored Recruiter Exploration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Explore My Professional Profiles
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
              Select a target role to dynamically reorder the portfolio&apos;s competencies, case studies, and evidence to match your hiring criteria.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <Link
              href="/cv-builder"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dynamic CV Builder</span>
            </Link>
          </div>
        </div>

        {/* 5 Profile Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {roleOptions.map((opt) => {
            const isSelected = activeRole === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveRole(opt.id)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-card)] border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30"
                    : "bg-[var(--bg-card)]/60 hover:bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <h3
                    className={`text-sm font-bold tracking-tight mb-1 ${
                      isSelected ? "text-emerald-500" : "text-[var(--text-primary)]"
                    }`}
                  >
                    {opt.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-snug line-clamp-2">
                    {opt.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[var(--border-subtle)]/60">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    {opt.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Detail & Transparent Positioning Card */}
        {roleConfig && (
          <div className="rounded-2xl bg-[var(--bg-card)] border border-emerald-500/30 p-5 sm:p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                    Active Profile Focus
                  </span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      roleConfig.positioningType === "established"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3 inline mr-1" />
                    {roleConfig.positioningLabel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                  {roleConfig.headline}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-3xl leading-relaxed">
                  {roleConfig.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href={`/cv-builder?role=${roleConfig.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Customize {roleConfig.shortTitle} CV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={resetRole}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                  title="Reset to full cross-disciplinary view"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Show All Roles</span>
                </button>
              </div>
            </div>

            {/* Suitability & Transparent Evidence Rationale */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Verified Qualifications &amp; Commercial Rationale:</span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed pl-5">
                  {roleConfig.suitabilityRationale}
                </p>

                {roleConfig.missingEvidenceNotes && (
                  <div className="mt-2 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[var(--text-secondary)]">Transparent Scope Note:</strong>{" "}
                      {roleConfig.missingEvidenceNotes}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantified Metric Highlight */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex flex-col justify-center">
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                  Key Metric Highlight
                </span>
                <span className="text-2xl font-extrabold text-emerald-500 mt-0.5">
                  {roleConfig.highlightedMetric.value}
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {roleConfig.highlightedMetric.label}
                </span>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                  {roleConfig.highlightedMetric.description}
                </p>
              </div>
            </div>

            {/* Key Focus Pillars */}
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/60 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">Priority Pillars:</span>
              {roleConfig.keyPillars.map((pillar, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

