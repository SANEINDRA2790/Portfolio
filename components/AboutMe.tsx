"use client";

import React from "react";
import { User, Compass, Terminal, Database, Award, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function AboutMe() {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Professional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Rigor Meets Analytical Depth
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Bridging production software architecture, database optimization, and modern statistical data science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative - 7 cols */}
          <div className="lg:col-span-7 space-y-5 text-zinc-300 text-base leading-relaxed">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="bg-zinc-900/30 p-4 rounded-xl border border-white/[0.04]">
                {p}
              </p>
            ))}

            {/* Practical Pillars */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Core Operating Principles</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {about.philosophies.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/[0.06] hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                    <div className="text-[11px] text-zinc-400 leading-normal">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Academic Milestones - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-zinc-900/70 border border-white/[0.08] p-6 space-y-5">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Professional Trajectory</span>
              </div>

              {/* Milestone 1 */}
              <div className="border-l-2 border-emerald-500 pl-4 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400">2024 – PRESENT (LEICESTER, UK)</div>
                <div className="text-sm font-bold text-white">MSc in Data Science Candidate</div>
                <div className="text-xs text-zinc-400">University of Leicester</div>
                <p className="text-xs text-zinc-300 pt-1">
                  Focusing on statistical modeling, algorithmic machine learning, and advanced empirical analytics in the UK.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="border-l-2 border-cyan-500 pl-4 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400">2023 – 2024 (CAPGEMINI)</div>
                <div className="text-sm font-bold text-white">Senior Analyst (Software Engineer)</div>
                <div className="text-xs text-zinc-400">Enterprise Solutions Unit</div>
                <p className="text-xs text-zinc-300 pt-1">
                  Developed enterprise .NET Core Web APIs and Angular web applications; reduced SQL latency by 20%.
                </p>
              </div>

              {/* Milestone 3 */}
              <div className="border-l-2 border-indigo-500 pl-4 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400">2022 – 2023 (INNOMATICS RESEARCH)</div>
                <div className="text-sm font-bold text-white">Junior Data Analyst Trainee</div>
                <div className="text-xs text-zinc-400">Data Analytics Division</div>
                <p className="text-xs text-zinc-300 pt-1">
                  Built Tableau BI dashboards, executed exploratory Python pipelines, and automated reporting in SQL & Excel.
                </p>
              </div>

              {/* Milestone 4 */}
              <div className="border-l-2 border-zinc-700 pl-4 space-y-1">
                <div className="text-[11px] font-mono text-zinc-400">2018 – 2022 (SREENIDHI)</div>
                <div className="text-sm font-bold text-white">B.Tech in Electronics & Communication</div>
                <div className="text-xs text-zinc-400">Engineering Degree</div>
                <p className="text-xs text-zinc-300 pt-1">
                  Rigorous linear algebra, calculus, and signal analysis; authored 2 published peer-reviewed research papers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

