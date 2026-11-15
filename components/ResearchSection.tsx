"use client";

import React from "react";
import { BookOpen, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ResearchSection() {
  const { publications } = PORTFOLIO_DATA;

  return (
    <section id="research" className="py-20 md:py-28 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Peer-Reviewed Research Publications
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl">
            Original engineering and computer vision research published during undergraduate studies.
          </p>
        </div>

        {/* Concise Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub) => (
            <div
              key={pub.title}
              className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-medium">
                    {pub.domain}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Published Paper
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug">
                  {pub.title}
                </h3>

                {/* Journal */}
                <div className="text-xs font-mono text-emerald-500 flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{pub.journal}</span>
                </div>

                {/* Concise Summary */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {pub.summary}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>Peer-Reviewed</span>
                <span className="text-emerald-500 font-semibold">Verified Author</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
