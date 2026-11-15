"use client";

import React from "react";
import { GraduationCap, Award, CheckCircle2, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function EducationCertifications() {
  const { education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-20 md:py-28 relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Industry Certifications
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Postgraduate academic specialization at the University of Leicester combined with verified multi-cloud and artificial intelligence credentials.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="rounded-2xl bg-zinc-900/60 border border-white/[0.08] p-6 lg:p-7 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {edu.degree}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{edu.institution}</h3>
                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1 mb-4">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{edu.location}</span>
                </div>

                <div className="text-xs font-semibold text-zinc-300 mb-3 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  Focus: {edu.focus}
                </div>

                <div className="space-y-2 mb-4">
                  {edu.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Subsection */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Verified Industry Certifications</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              6 Verified Professional Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="rounded-xl bg-zinc-900/40 border border-white/[0.06] p-5 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-zinc-400">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-white/10 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {cert.code}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>Status: Verified</span>
                  <span className="text-zinc-400">Official Exam</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

