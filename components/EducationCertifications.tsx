"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CertificateItem } from "@/data/certificates";
import { CertificateModal } from "./CertificateModal";

export function EducationCertifications() {
  const { education, certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="education" className="py-20 md:py-28 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Education &amp; Industry Certifications
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl">
            Postgraduate specialization at the University of Leicester combined with verified multi-cloud and artificial intelligence credentials.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              <span>Academic Qualifications</span>
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Chronological Academic Record
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id || edu.degree}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  edu.isCurrent
                    ? "bg-[var(--bg-card)] border-2 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/30"
                    : "bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-emerald-500/30"
                }`}
              >
                {/* Visual Accent for Current MSc */}
                {edu.isCurrent && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-zinc-950 text-[11px] font-bold font-mono shadow-md shadow-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping" />
                      CURRENT POSTGRADUATE QUALIFICATION
                    </span>
                  </div>
                )}

                <div className={edu.isCurrent ? "pt-2" : ""}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded ${
                        edu.isCurrent
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold"
                          : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      }`}
                    >
                      {edu.qualification || "Degree"}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1.5 leading-snug">
                    {edu.degree}
                  </h4>

                  <div className="text-xs font-semibold text-emerald-500 mb-2">
                    {edu.institution}
                  </div>

                  <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>

                  <div className="text-xs text-[var(--text-secondary)] mb-4 bg-[var(--bg-subtle)] p-3 rounded-lg border border-[var(--border-subtle)] leading-relaxed">
                    <span className="font-semibold text-[var(--text-primary)]">Focus: </span>
                    {edu.focus}
                  </div>

                  <div className="space-y-2 mb-4">
                    {edu.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Status:</span>
                  <span className={edu.isCurrent ? "text-emerald-500 font-semibold" : "text-[var(--text-secondary)]"}>
                    {edu.isCurrent ? "In Progress (2026 – 2028)" : "Conferred / Completed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Subsection */}
        <div id="certifications" className="scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <span>Certificate Verification Gallery</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Click any certification card to open its verification preview, document viewer, or pending upload state.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto font-semibold">
              6 Verified Industry Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.code}
                onClick={() => setSelectedCert(cert as CertificateItem)}
                className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: cert.badgeColor }}
                      />
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-emerald-500 border border-[var(--border-subtle)] flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {cert.code}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-emerald-500 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-500 flex items-center gap-1 font-semibold group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to View / Verify</span>
                  </span>
                  <span className="text-[var(--text-muted)]">Official Exam</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Certificate Preview Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
