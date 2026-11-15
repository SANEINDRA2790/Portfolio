"use client";

import React from "react";
import { BookOpen, FileText, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ResearchSection() {
  const { publications } = PORTFOLIO_DATA;

  return (
    <section id="research" className="py-20 md:py-28 relative bg-zinc-950/60 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Contributions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Peer-Reviewed Research & Publications
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Original research conducted in telemetry systems, Internet of Things (IoT), and unsupervised computer vision clustering frameworks.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {publications.map((pub, idx) => (
            <div
              key={pub.title}
              className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] p-6 lg:p-8 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                    {pub.domain}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Peer-Reviewed Journal
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {pub.title}
                </h3>

                {/* Journal */}
                <div className="text-xs font-mono text-emerald-400 mb-5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Published in: {pub.journal}</span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.04]">
                  {pub.summary}
                </p>

                {/* Methodology & Impact */}
                <div className="space-y-3 mb-4 text-xs">
                  <div>
                    <span className="font-semibold text-zinc-200 block mb-1">
                      Algorithmic & Technical Methodology:
                    </span>
                    <p className="text-zinc-400 leading-relaxed">{pub.methodology}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-zinc-200 block mb-1">
                      Practical & Empirical Impact:
                    </span>
                    <p className="text-zinc-400 leading-relaxed">{pub.impact}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Status: Published</span>
                <span className="text-emerald-400">Academic Citation Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

