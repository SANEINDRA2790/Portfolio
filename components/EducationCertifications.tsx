"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CertificateItem } from "@/data/certificates";
import { CertificateModal } from "./CertificateModal";
import { AddCertificateModal } from "./AddCertificateModal";
import { useOwner } from "@/context/OwnerContext";

export function EducationCertifications() {
  const { isOwner } = useOwner();
  const { education, certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<Record<string, boolean>>({});
  const [allCerts, setAllCerts] = useState<CertificateItem[]>(certifications);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load custom certificates from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_custom_certificates");
      if (stored) {
        const customCerts: CertificateItem[] = JSON.parse(stored);
        if (Array.isArray(customCerts) && customCerts.length > 0) {
          setAllCerts((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const newOnes = customCerts.filter((c) => !existingIds.has(c.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const handleAddCertificate = (newCert: CertificateItem) => {
    setAllCerts((prev) => [newCert, ...prev]);
  };

  const toggleEdu = (id: string) => {
    setExpandedEdu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="education" className="py-16 md:py-24 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-1.5 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor &amp; Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Education &amp; Industry Certifications
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl">
            Postgraduate specialization at the University of Leicester combined with verified multi-cloud and artificial intelligence credentials.
          </p>
        </div>

        {/* Academic Qualifications Subsection - Sized like Certifications */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Academic Qualifications</span>
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Chronological Academic Record
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu) => {
              const eduKey = edu.id || edu.degree;
              const isExpanded = !!expandedEdu[eduKey];

              return (
                <div
                  key={eduKey}
                  className={`group rounded-xl bg-[var(--bg-card)] border transition-all duration-200 flex flex-col justify-between p-4 sm:p-5 hover:shadow-lg ${
                    edu.isCurrent
                      ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                      : "border-[var(--border-subtle)] hover:border-emerald-500/30"
                  }`}
                >
                  <div>
                    {/* Top Header: Qualification badge & Dates */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full inline-block ${
                            edu.isCurrent ? "bg-emerald-500 animate-pulse" : "bg-cyan-500"
                          }`}
                        />
                        {edu.qualification || "Degree"}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-500" />
                        {edu.period}
                      </span>
                    </div>

                    {/* Degree Title */}
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-snug group-hover:text-emerald-500 transition-colors">
                      {edu.degree}
                    </h4>

                    {/* Institution & Location */}
                    <div className="text-xs text-emerald-500 font-medium mb-2">
                      {edu.institution}
                    </div>

                    {/* Concise Focus Summary */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
                      {edu.focus}
                    </p>

                    {/* Expanded Section (Expands downward on click) */}
                    {isExpanded && (
                      <div className="space-y-2.5 pt-3 mb-3 border-t border-[var(--border-subtle)] animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Core Highlights &amp; Modules:
                        </div>
                        <div className="space-y-1.5">
                          {edu.highlights.map((h, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expand Button / Footer */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                    <button
                      onClick={() => toggleEdu(eduKey)}
                      className="text-emerald-500 flex items-center gap-1 font-semibold hover:underline"
                    >
                      <span>{isExpanded ? "Collapse highlights" : "Expand highlights"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-[var(--text-muted)]">
                      {edu.isCurrent ? "In Progress" : "Completed"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Subsection */}
        <div id="certifications" className="scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Certificate Verification Gallery</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Click any certification card to open its verification preview, document viewer, or pending upload state.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Only visible to Portfolio Holder (isOwner) */}
              {isOwner && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate</span>
                </button>
              )}
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                {allCerts.length} Verified Credentials
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCerts.map((cert) => (
              <div
                key={cert.code + cert.title}
                onClick={() => setSelectedCert(cert as CertificateItem)}
                className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: cert.badgeColor || "#10b981" }}
                      />
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-emerald-500 border border-[var(--border-subtle)] flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {cert.code}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-snug group-hover:text-emerald-500 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">
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

      {/* Add Certificate Modal (Only accessible if isOwner) */}
      {isOwner && (
        <AddCertificateModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddDocument={() => {}}
          onAddCertificate={handleAddCertificate}
        />
      )}
    </section>
  );
}
