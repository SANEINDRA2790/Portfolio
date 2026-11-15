"use client";

import React, { useState, useMemo } from "react";
import { Cpu, Check, ChevronDown, ChevronUp, Layers, Sparkles } from "lucide-react";
import { useRole } from "@/context/RoleContext";

interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Data Analytics",
    description: "Exploratory analysis, statistical inference, and data preparation.",
    skills: [
      "Python (Pandas, NumPy)",
      "Exploratory Data Analysis (EDA)",
      "Statistical Analysis",
      "Data Cleaning & Wrangling",
      "Outlier Detection & Imputation",
      "Hypothesis Testing",
    ],
  },
  {
    category: "Programming",
    description: "Core languages used across analytics, APIs, and automation.",
    skills: [
      "Python",
      "SQL",
      "C#",
      "TypeScript / JavaScript",
      "VBA",
    ],
  },
  {
    category: "Databases",
    description: "Relational architecture, stored procedures, and query performance.",
    skills: [
      "MySQL",
      "SQL Query Optimization",
      "Stored Procedures",
      "Relational Schema Design (3NF)",
      "B-Tree Indexing",
      "Execution Plan Analysis (EXPLAIN)",
    ],
  },
  {
    category: "Data Visualization",
    description: "Executive business intelligence, interactive dashboards, and storytelling.",
    skills: [
      "Power BI",
      "Tableau (Tableau Public)",
      "Excel (Power Pivot & Slicers)",
      "Seaborn & Matplotlib",
      "Automated Reporting",
      "CSAT & Operational KPI Trackers",
    ],
  },
  {
    category: "Machine Learning",
    description: "Predictive regression, classification, and empirical validation.",
    skills: [
      "Scikit-learn",
      "Predictive Regression Modeling",
      "Model Evaluation (R², RMSE, CV)",
      "Feature Engineering",
      "Supervised Algorithms",
      "Data Normalization & Scaling",
    ],
  },
  {
    category: "Cloud & Software Engineering",
    description: "Full-stack enterprise application engineering and cloud fundamentals.",
    skills: [
      ".NET Core Web API",
      "Angular",
      "RESTful API Design",
      "Microsoft Azure",
      "AWS Cloud Fundamentals",
      "Git & Version Control",
    ],
  },
];

export function SkillsMatrix() {
  const { activeRole, roleConfig } = useRole();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // When a role is active, prioritize relevant skill categories to the top
  const sortedSkillGroups = useMemo(() => {
    if (!roleConfig) return SKILL_GROUPS;

    const priorityCategories = roleConfig.prioritizedSkills.map((p) => p.category.toLowerCase());

    return [...SKILL_GROUPS].sort((a, b) => {
      const aIndex = priorityCategories.findIndex((c) =>
        c.includes(a.category.toLowerCase()) || a.category.toLowerCase().includes(c.split(" ")[0])
      );
      const bIndex = priorityCategories.findIndex((c) =>
        c.includes(b.category.toLowerCase()) || b.category.toLowerCase().includes(c.split(" ")[0])
      );

      const aScore = aIndex === -1 ? 99 : aIndex;
      const bScore = bIndex === -1 ? 99 : bIndex;
      return aScore - bScore;
    });
  }, [roleConfig]);

  const toggleCard = (category: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const allExpanded = sortedSkillGroups.every((g) => expandedCards[g.category]);

  const toggleAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    sortedSkillGroups.forEach((g) => {
      updated[g.category] = nextState;
    });
    setExpandedCards(updated);
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Technical Skills</span>
              </div>
              {roleConfig && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" />
                  Prioritized for {roleConfig.shortTitle}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Categorized Technical Competencies
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl">
              {roleConfig
                ? `Core technologies aligned with ${roleConfig.title} requirements, ordered by relevance to production responsibilities.`
                : "Compact overview of core technologies across analytics, databases, software development, and machine learning."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
            </button>
          </div>
        </div>

        {/* 6 Compact Categorized Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSkillGroups.map((group, groupIdx) => {
            const isPriorityGroup = roleConfig && groupIdx < 2;
            const isExpanded = !!expandedCards[group.category];
            const visibleSkills = isExpanded ? group.skills : group.skills.slice(0, 3);
            const hiddenCount = group.skills.length - 3;

            return (
              <div
                key={group.category}
                className={`rounded-xl bg-[var(--bg-card)] border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 ${
                  isPriorityGroup
                    ? "border-emerald-500/40 shadow-sm shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "border-[var(--border-subtle)] hover:border-emerald-500/40"
                }`}
              >
                <div>
                  {/* Top Bar: Title & Count Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      {group.category}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-medium">
                      {group.skills.length} skills
                    </span>
                  </div>

                  {/* Concise 1-line Description */}
                  <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed line-clamp-1">
                    {group.description}
                  </p>

                  {/* Skill Pills (Top 3 default, all when expanded) */}
                  <div className="flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand / Collapse Downward Toggle Button */}
                {hiddenCount > 0 && (
                  <div className="pt-3 mt-3 border-t border-[var(--border-subtle)]">
                    <button
                      onClick={() => toggleCard(group.category)}
                      className="w-full flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] hover:text-emerald-500 transition-colors py-0.5 group"
                    >
                      <span className="flex items-center gap-1">
                        <span>{isExpanded ? "Show less" : `+${hiddenCount} more skills`}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-emerald-500 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-500 transition-transform" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
