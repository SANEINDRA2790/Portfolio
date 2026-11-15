"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Database, Cpu, BarChart3, LineChart, CheckCircle2, Table } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Render project-specific authentic preview
  const renderEvidencePreview = () => {
    if (project.liveDashboardUrl || project.category === "BI & Dashboards") {
      if (project.slug === "food-delivery-performance-bi") {
        return (
          <div className="rounded-xl p-4 bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                  Tableau Public Dashboard
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-medium">
                45,000+ Orders
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Interactive operational dashboard visualizing courier lead times, kitchen prep bottlenecks (58% of delays), and CSAT drop-offs.
            </p>
            {project.liveDashboardUrl && (
              <a
                href={project.liveDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-semibold text-xs transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Dashboard on Tableau Public</span>
              </a>
            )}
          </div>
        );
      }

      // Sales Order Analysis (Excel/VBA)
      return (
        <div className="rounded-xl p-4 bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                Relational Model &amp; VBA Pipeline
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
              10,000+ Records
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Standardized Power Pivot relational model linking Orders, Products, and Territories with automated VBA ingestion saving 14 hrs/week.
          </p>
        </div>
      );
    }

    if (project.category === "Database & SQL" || project.sqlSnippet) {
      return (
        <div className="rounded-xl p-3.5 bg-[var(--bg-page)] border border-[var(--border-subtle)] font-mono text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-[11px]">MySQL Stored Procedure &amp; Query Tuning</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              93% Faster (120ms)
            </span>
          </div>
          <pre className="text-[11px] text-[var(--text-secondary)] overflow-x-auto leading-relaxed pt-1">
            <code>
{`-- Composite index & transaction checkout
CREATE PROCEDURE ProcessOrderCheckout(IN p_customer_id INT)
BEGIN
  START TRANSACTION;
  INSERT INTO orders (...) VALUES (...);
  COMMIT;
END;`}
            </code>
          </pre>
        </div>
      );
    }

    if (project.category === "Machine Learning") {
      return (
        <div className="rounded-xl p-4 bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                Evaluation Metric: Random Forest
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded">
              R² = 0.87 (Test Split)
            </span>
          </div>
          <div className="text-xs text-[var(--text-muted)] space-y-1">
            <p><span className="font-semibold text-[var(--text-secondary)]">Predictor:</span> Evaluated 1,338 policyholders across demographic &amp; clinical attributes.</p>
            <p><span className="font-semibold text-[var(--text-secondary)]">Key Insight:</span> Strongest interaction isolated between smoking status and high BMI (&gt;30).</p>
          </div>
        </div>
      );
    }

    // Default / Automobile EDA (Python)
    return (
      <div className="rounded-xl p-4 bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
              Statistical EDA &amp; Feature Correlation
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
            Corr = +0.87
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Analyzed 205 vehicle models with 26 technical attributes; Pearson matrix isolated engine displacement and curb weight as primary price drivers.
        </p>
      </div>
    );
  };

  return (
    <article className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 group">
      <div className="space-y-4">
        {/* Top Header: Category & Verifiable status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            Empirical Case Study
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* 1-Sentence Problem Statement */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <span className="font-semibold text-[var(--text-primary)]">Problem: </span>
          {project.problemStatement}
        </p>

        {/* Tools & Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 2-3 Key Findings / Outcomes supported by actual evidence */}
        <div className="space-y-1.5 pt-2">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Key Outcomes &amp; Findings:
          </div>
          <ul className="space-y-1.5">
            {project.keyFindings.slice(0, 3).map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Authentic Project Evidence Preview */}
        <div className="pt-2">
          {renderEvidencePreview()}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {project.liveDashboardUrl && (
            <a
              href={project.liveDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-xs font-semibold transition-all"
              title="Open verified dashboard on Tableau Public"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Dashboard</span>
            </a>
          )}
        </div>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            title="View code repository on GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </article>
  );
}
