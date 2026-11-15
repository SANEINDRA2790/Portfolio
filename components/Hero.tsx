"use client";

import React from "react";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {personal.location}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">MSc Data Science (Leicester)</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Indra Kiran Sane
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-400/90 tracking-tight">
                {personal.primaryRole}
              </p>
            </div>

            {/* Narrative Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {personal.shortBio}
            </p>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-zinc-400 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                2+ Yrs Enterprise Experience (Capgemini)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                20% SQL Latency Reduction
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Full-Stack (.NET / Angular / SQL)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumePath}
                download="Indra_Kiran_Sane_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-white/15 text-white font-medium text-sm hover:bg-zinc-800 hover:border-white/30 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 font-medium text-sm hover:bg-white/[0.08] hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Verification Links */}
            <div className="flex items-center gap-5 pt-2 text-zinc-400 text-xs">
              <span className="text-zinc-500">Connect & Code:</span>
              <a
                href={personal.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Animated Data & Engineering Systems Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-950/90 border border-white/10 p-6 shadow-2xl shadow-black/80 font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-400 text-[11px] font-mono">
                    pipeline::telemetry.live
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ACTIVE_STREAMS
                </div>
              </div>

              {/* Systems Visualization Canvas / SVG */}
              <div className="relative h-60 w-full rounded-lg bg-[#0c0d10] border border-white/[0.06] p-4 flex flex-col justify-between overflow-hidden">
                {/* Visual Interconnected Nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connecting Paths */}
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="50%" y2="82%" stroke="rgba(16, 185, 129, 0.7)" strokeWidth="2" />
                  <line x1="50%" y1="82%" x2="20%" y2="82%" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                  <line x1="50%" y1="82%" x2="80%" y2="82%" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                </svg>

                {/* Top Nodes */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="bg-zinc-900 border border-emerald-500/30 rounded-lg p-2.5 shadow-lg w-32">
                    <div className="text-[10px] text-zinc-400">DATA INGESTION</div>
                    <div className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>.NET API / SQL</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-cyan-500/30 rounded-lg p-2.5 shadow-lg w-32 text-right">
                    <div className="text-[10px] text-zinc-400">FEATURE STORE</div>
                    <div className="text-cyan-400 font-semibold text-xs flex items-center justify-end gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>Python EDA</span>
                    </div>
                  </div>
                </div>

                {/* Center Core Engine */}
                <div className="self-center bg-zinc-900/90 border border-emerald-400/50 rounded-xl px-4 py-2 text-center shadow-lg shadow-emerald-500/10 relative z-10">
                  <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Engineered Layer</div>
                  <div className="text-white font-bold text-xs flex items-center gap-1.5 justify-center">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Query Tuner & Stored Procedures
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Response Time: -20% Verified</div>
                </div>

                {/* Bottom Delivery Nodes */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-center w-28">
                    <div className="text-[9px] text-zinc-400">EXECUTIVE BI</div>
                    <div className="text-zinc-200 font-medium text-[11px]">Power BI / Tab</div>
                  </div>

                  <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-center w-28">
                    <div className="text-[9px] text-zinc-400">ML INFERENCE</div>
                    <div className="text-zinc-200 font-medium text-[11px]">Scikit-learn Reg</div>
                  </div>

                  <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-center w-28">
                    <div className="text-[9px] text-zinc-400">CLOUD SYNC</div>
                    <div className="text-zinc-200 font-medium text-[11px]">Azure / AWS</div>
                  </div>
                </div>
              </div>

              {/* Live Output Feed Snippet */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 text-[11px] text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-400">$ sql_benchmark --verify:</span>
                  <span className="text-emerald-400 font-bold">OPTIMIZED (20% reduction)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">$ academic_cohort:</span>
                  <span className="text-cyan-300">University of Leicester MSc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">$ uk_placement_status:</span>
                  <span className="text-white">Active & Interviewing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
