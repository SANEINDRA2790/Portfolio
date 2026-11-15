"use client";

import React from "react";
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, TrendingUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Commercial Experience & Trainee History
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Demonstrating production engineering impact at scale alongside focused data analytics and BI training.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-6 before:w-0.5 before:bg-white/[0.08]">
          {experience.map((item, idx) => (
            <div
              key={item.company}
              className="relative pl-8 md:pl-14 group"
            >
              {/* Timeline marker node */}
              <div
                className={`absolute left-1.5 md:left-4.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 ${
                  item.type === "Full-Time Enterprise"
                    ? "bg-emerald-500 border-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    : "bg-cyan-500 border-zinc-950 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                }`}
              />

              <div className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] p-6 lg:p-8 hover:border-white/20 transition-all duration-200">
                {/* Role Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/[0.06] pb-5 mb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-lg lg:text-xl font-bold text-white">
                        {item.role}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-base font-semibold text-emerald-400">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-mono px-3 py-1 rounded-full border ${
                        item.type === "Full-Time Enterprise"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold"
                          : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-white/10">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      {item.impactMetric}
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities & Quantified Achievements */}
                <div className="space-y-3 mb-6">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="border-t border-white/[0.04] pt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 mr-2">Technologies Used:</span>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950 border border-white/[0.06] text-zinc-300"
                    >
                      {tech}
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

