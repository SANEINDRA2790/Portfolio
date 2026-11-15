"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, Shield, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function SkillsMatrix() {
  const { skills } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skills.map((s) => s.title)];

  const displayedSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.title === selectedCategory);

  const getProficiencyStyle = (prof: string) => {
    switch (prof) {
      case "Enterprise Production":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Advanced Applied":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "Foundational / Certified":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      default:
        return "bg-white/[0.05] text-zinc-300 border-white/10";
    }
  };




  return (
    <section id="skills" className="py-20 bg-zinc-950/70 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Honest Competency & Skill Architecture
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Categorized by domain with transparent proficiency levels reflecting commercial enterprise experience, applied data analytics, and foundational certifications.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono bg-zinc-900/80 p-3 rounded-lg border border-white/[0.06]">
            <span className="text-zinc-400">Proficiency Levels:</span>
            <span className="px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              Enterprise Production
            </span>
            <span className="px-2 py-0.5 rounded border bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
              Advanced Applied
            </span>
            <span className="px-2 py-0.5 rounded border bg-amber-500/10 text-amber-300 border-amber-500/30">
              Foundational / Certified
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/[0.06] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat
                ? "bg-white text-zinc-950 shadow-sm"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSkills.map((category) => (
            <div
              key={category.title}
              className="rounded-xl bg-zinc-900/50 border border-white/[0.08] p-5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-base">{category.title}</h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {category.skills.length} skills
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-white/[0.04]"
                    >
                      <span className="text-xs font-medium text-zinc-200">{skill.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getProficiencyStyle(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>
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

