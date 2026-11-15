"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Download,
  ExternalLink,
  ShieldCheck,
  FileText,
  MapPin,
  Globe,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface DownloadCvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadCvModal({ isOpen, onClose }: DownloadCvModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                Select CV / Resume Format
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Choose the ATS-optimised format best tailored for your target hiring market (UK, USA, or India).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Format Options */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* CV Builder Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Looking for a Specific Role or US Resume?</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Customize your CV for <strong>Data Analyst</strong>, <strong>Data Scientist</strong>, <strong>AI/ML</strong>, or <strong>Software Engineer</strong> across UK, US, and India templates.
              </p>
            </div>
            <Link
              href="/cv-builder"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shrink-0 transition-all shadow-sm"
            >
              <span>Open CV Builder</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* OPTION 1: UK Standard CV */}
            <div className="rounded-xl bg-[var(--bg-page)] border-2 border-emerald-500/40 hover:border-emerald-500 p-5 flex flex-col justify-between transition-all duration-200 shadow-sm relative group">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                    <MapPin className="w-3 h-3" />
                    UK Standard Format
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    2 Pages • ATS-Passed
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
                    UK Curriculum Vitae
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                    Optimised for UK employers, recruiters, and UK ATS systems (Workday, Taleo, Greenhouse).
                  </p>
                </div>

                {/* Key Inclusions */}
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-1">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>MSc Data Science (Univ. of Leicester) featured</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Leicester, UK location &amp; +44 contact details</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>20% SQL reduction &amp; Capgemini engineering</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>UK Equality Act 2010 compliant (no photo/DOB)</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-2">
                <a
                  href="/Indra_Kiran_Sane_CV_UK.pdf"
                  download="Indra_Kiran_Sane_CV_UK.pdf"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download UK CV (PDF)</span>
                </a>
                <a
                  href="/Indra_Kiran_Sane_CV_UK.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Preview in Browser</span>
                </a>
              </div>
            </div>

            {/* OPTION 2: USA Professional Resume */}
            <div className="rounded-xl bg-[var(--bg-page)] border-2 border-blue-500/40 hover:border-blue-500 p-5 flex flex-col justify-between transition-all duration-200 shadow-sm relative group">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30">
                    <Building2 className="w-3 h-3" />
                    USA Standard Format
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    2 Pages • ATS-Passed
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    USA Professional Resume
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                    Optimised for US corporate recruiters, American tech teams, and US ATS screeners.
                  </p>
                </div>

                {/* Key Inclusions */}
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-1">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Action-verb achievements with quantifiable ROI</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Core technical competencies positioned upfront</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>20% SQL reduction &amp; Capgemini engineering</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>US standard conventions (no photo or DOB)</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-2">
                <a
                  href="/Indra_Kiran_Sane_Resume_USA.pdf"
                  download="Indra_Kiran_Sane_Resume_USA.pdf"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download USA Resume (PDF)</span>
                </a>
                <a
                  href="/Indra_Kiran_Sane_Resume_USA.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Preview in Browser</span>
                </a>
              </div>
            </div>

            {/* OPTION 3: India / International Resume */}
            <div className="rounded-xl bg-[var(--bg-page)] border-2 border-cyan-500/40 hover:border-cyan-500 p-5 flex flex-col justify-between transition-all duration-200 shadow-sm relative group">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30">
                    <Globe className="w-3 h-3" />
                    India &amp; Global Format
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    2 Pages • ATS-Passed
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    India / Global Tech Resume
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                    Structured for Indian IT enterprises, global software teams, and corporate technical roles.
                  </p>
                </div>

                {/* Key Inclusions */}
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-1">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>Technical Skill Matrix (Languages, Frameworks, DBs)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>Full-stack software engineering at Capgemini</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>B.Tech Engineering &amp; Narayana academic record</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>Research publications &amp; multi-cloud certifications</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-2">
                <a
                  href="/Indra_Kiran_Sane_Resume_India.pdf"
                  download="Indra_Kiran_Sane_Resume_India.pdf"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download India Resume (PDF)</span>
                </a>
                <a
                  href="/Indra_Kiran_Sane_Resume_India.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Preview in Browser</span>
                </a>
              </div>
            </div>
          </div>

          {/* ATS Compliance Banner */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Machine-Readable Vector Text</span>
            </span>
            <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
              Workday, Taleo, Lever &amp; Greenhouse Ready
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

