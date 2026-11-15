"use client";

import React from "react";
import { Cpu, Check } from "lucide-react";

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
  return (
    <section id="skills" className="py-20 md:py-28 bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Categorized Technical Competencies
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl">
              Clean overview of core technologies across analytics, database engineering, software development, and machine learning.
            </p>
          </div>

          <div className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-subtle)] max-w-sm">
            <span className="text-emerald-500 font-semibold">Evidence-Based:</span> Grounded in commercial production work at Capgemini, postgraduate coursework at Leicester, and verified project repos.
          </div>
        </div>

        {/* 6 Clean Categorized Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1">
                  {group.category}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {group.description}
                </p>

                {/* Clean Pill Labels */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium"
                    >
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
