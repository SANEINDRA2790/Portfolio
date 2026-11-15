"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  impactMetric: string;
  highlights: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Capgemini",
    role: "Senior Analyst / Software Engineer",
    period: "October 2023 – 2024",
    location: "Enterprise Delivery Center",
    type: "Full-Time Enterprise",
    impactMetric: "20% SQL Response-Time Reduction",
    highlights: [
      "Engineered full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile delivery sprints.",
      "Refactored mission-critical SQL queries and stored procedures, achieving a documented 20% reduction in database response times.",
      "Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines and environment configuration.",
      "Conducted data cleansing and exploratory reporting to support operational decision-making across core enterprise modules.",
    ],
    technologies: [".NET Core Web API", "Angular", "MySQL", "SQL Optimization", "C#", "Microsoft Azure", "REST APIs"],
  },
  {
    company: "Innomatics Research Labs",
    role: "Junior Data Analyst Trainee",
    period: "December 2022 – August 2023",
    location: "Data Science Division",
    type: "Trainee / Internship",
    impactMetric: "Automated BI Reporting Pipelines",
    highlights: [
      "Analyzed large tabular datasets using Python (Pandas, NumPy) to isolate business trends and data anomalies.",
      "Developed interactive business intelligence dashboards in Tableau and Power BI, translating raw logs into actionable KPI monitors.",
      "Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro scripts, eliminating manual overhead.",
      "Implemented supervised machine learning workflows including feature selection, data scaling, and predictive regression models.",
    ],
    technologies: ["Python", "Pandas", "Tableau", "SQL", "Power BI", "Excel / VBA", "Scikit-learn"],
  },
];

export function ExperienceTimeline() {
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

  const toggleRole = (company: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <section id="experience" className="py-16 md:py-24 bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-1.5 font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Commercial Experience &amp; Trainee History
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl">
            Chronological overview of enterprise software engineering at Capgemini and focused analytics training at Innomatics.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 md:before:left-6 before:w-0.5 before:bg-[var(--border-subtle)]">
          {EXPERIENCES.map((item) => {
            const isExpanded = !!expandedRoles[item.company];
            const visibleHighlights = isExpanded ? item.highlights : item.highlights.slice(0, 2);
            const hiddenCount = item.highlights.length - 2;

            return (
              <div
                key={item.company}
                className="relative pl-8 md:pl-14 group"
              >
                {/* Timeline marker node */}
                <div
                  className={`absolute left-1.5 md:left-4.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 ${
                    item.type === "Full-Time Enterprise"
                      ? "bg-emerald-500 border-[var(--bg-page)] shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                      : "bg-cyan-500 border-[var(--bg-page)] shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  }`}
                />

                <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 lg:p-6 hover:border-emerald-500/40 transition-all duration-200">
                  {/* Role Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 border-b border-[var(--border-subtle)] pb-3.5 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-base lg:text-lg font-bold text-[var(--text-primary)]">
                          {item.role}
                        </span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="text-sm font-semibold text-emerald-500">
                          {item.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Impact Metric Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                          item.type === "Full-Time Enterprise"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-semibold"
                            : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-medium"
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        {item.impactMetric}
                      </span>
                    </div>
                  </div>

                  {/* Highlights (Top 2 default, expands downward when clicked) */}
                  <div className="space-y-2 mb-4">
                    {visibleHighlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expand / Collapse Button */}
                  {hiddenCount > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleRole(item.company)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500 hover:underline"
                      >
                        <span>
                          {isExpanded
                            ? "Collapse additional achievements"
                            : `+${hiddenCount} more achievements & impact details`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="border-t border-[var(--border-subtle)] pt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] mr-1.5">Technologies:</span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
