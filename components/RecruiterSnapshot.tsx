"use client";

import React from "react";
import { Clock, Download, ArrowRight, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function RecruiterSnapshot() {
  const { recruiterHighlights, personal } = PORTFOLIO_DATA;

  return (
    <section id="recruiter-fast-track" className="py-12 bg-zinc-950/60 border-y border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Recruiter Fast-Track (30-Second Summary)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Executive Candidate Profile at a Glance
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personal.resumePath}
              download="Indra_Kiran_Sane_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 font-medium text-xs hover:text-white hover:border-white/20 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Directly</span>
            </a>
          </div>
        </div>

        {/* 4 Quantified Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {recruiterHighlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-zinc-900/60 border border-white/[0.08] p-5 hover:border-emerald-500/30 hover:bg-zinc-900/90 transition-all duration-200"
            >
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400 mb-1">
                {item.metric}
              </div>
              <div className="text-sm font-semibold text-zinc-200 mb-1.5">{item.label}</div>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Target UK Role Alignment Matrix */}
        <div className="rounded-xl bg-zinc-900/40 border border-white/[0.06] p-5 lg:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Target Opportunity Alignment & Proven Core Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Data & BI Analyst */}
            <div className="space-y-2.5 border-l-2 border-emerald-500/50 pl-4">
              <div className="font-semibold text-sm text-white">Data Analyst & BI Specialist</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Transforming raw transactional records into executive reporting dashboards in Power BI and Tableau.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["SQL Query Optimization", "Power BI / DAX", "Tableau", "Excel VBA", "EDA"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Software / Database Engineer */}
            <div className="space-y-2.5 border-l-2 border-cyan-500/50 pl-4">
              <div className="font-semibold text-sm text-white">Software & Database Engineer</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                2+ years of enterprise experience at Capgemini architecting full-stack web applications and tuning databases.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[".NET Core Web API", "Angular", "MySQL Stored Procs", "C#", "REST APIs", "Azure"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: Data Science & ML */}
            <div className="space-y-2.5 border-l-2 border-indigo-500/50 pl-4">
              <div className="font-semibold text-sm text-white">Junior Data Scientist / Placement</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                MSc Data Science student at the University of Leicester applying regression, classification, and validation.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Python / Pandas", "Scikit-learn", "Model Evaluation", "Statistical Inference"].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300">
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

