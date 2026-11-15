"use client";

import React from "react";
import { Clock, Download, ShieldCheck, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function RecruiterSnapshot() {
  const { recruiterHighlights, personal } = PORTFOLIO_DATA;

  return (
    <section id="recruiter-fast-track" className="py-12 bg-[var(--bg-subtle)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-1 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Recruiter Fast-Track (30-Second Summary)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Executive Candidate Profile at a Glance
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personal.resumePath}
              download="Indra_Kiran_Sane_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-xs hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>Contact Directly</span>
            </a>
          </div>
        </div>

        {/* 4 Quantified Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {recruiterHighlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 hover:border-emerald-500/40 transition-all duration-200"
            >
              <div className="text-3xl font-extrabold font-mono tracking-tight text-emerald-500 mb-1">
                {item.metric}
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{item.label}</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Target UK Role Alignment Matrix */}
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 lg:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Target Opportunity Alignment &amp; Core Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Data & BI Analyst */}
            <div className="space-y-2.5 border-l-2 border-emerald-500/50 pl-4">
              <div className="font-semibold text-sm text-[var(--text-primary)]">Data Analyst &amp; BI Specialist</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Transforming raw transactional records into executive reporting dashboards in Power BI and Tableau.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["SQL Query Optimization", "Power BI / DAX", "Tableau", "Excel VBA", "EDA"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Software / Database Engineer */}
            <div className="space-y-2.5 border-l-2 border-cyan-500/50 pl-4">
              <div className="font-semibold text-sm text-[var(--text-primary)]">Software &amp; Database Engineer</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                2+ years of enterprise experience at Capgemini architecting full-stack web applications and tuning databases.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[".NET Core Web API", "Angular", "MySQL Stored Procs", "C#", "REST APIs", "Azure"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: Data Science & ML */}
            <div className="space-y-2.5 border-l-2 border-indigo-500/50 pl-4">
              <div className="font-semibold text-sm text-[var(--text-primary)]">Junior Data Scientist / Placement</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                MSc Data Science student at the University of Leicester applying regression, classification, and validation.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Python / Pandas", "Scikit-learn", "Model Evaluation", "Statistical Inference"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
