"use client";

import React, { useEffect } from "react";
import { X, Download, ExternalLink, ShieldCheck, FileText } from "lucide-react";
import { CertificateItem } from "@/data/certificates";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: certificate.badgeColor }}
            />
            <div>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">
                {certificate.issuer} • {certificate.code}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                {certificate.title}
              </h3>
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {certificate.isUploaded && certificate.filePath ? (
            /* Uploaded Certificate Document Viewer */
            <div className="space-y-4">
              <div className="w-full h-80 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] overflow-hidden relative">
                {certificate.fileType === "image" ? (
                  <img
                    src={certificate.filePath}
                    alt={certificate.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={certificate.filePath}
                    title={certificate.title}
                    className="w-full h-full border-0"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={certificate.filePath}
                  download={`${certificate.code}_Certificate.pdf`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </a>

                <a
                  href={certificate.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-xs hover:border-emerald-500/40 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Size</span>
                </a>
              </div>
            </div>
          ) : (
            /* Honest Certificate Pending Upload State */
            <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 inline-block font-medium">
                  Document Pending Upload
                </span>
                <h4 className="text-base font-bold text-[var(--text-primary)]">
                  Official Certificate Document Pending Upload
                </h4>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  The candidate has confirmed passing and holding this certification. The official PDF / image document is awaiting file upload to the public assets directory.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-left text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Status: Verified Examination Competency</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Target Asset Path: <code className="text-emerald-500">{certificate.filePath || `/certificates/${certificate.id}.pdf`}</code>
                </div>
              </div>

              {certificate.verificationUrl && (
                <div className="pt-2">
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-emerald-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Credential on Issuer Site</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Description & Competencies */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div>
              <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                Certification Scope &amp; Description
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {certificate.description}
              </p>
            </div>

            {certificate.skillsCovered && certificate.skillsCovered.length > 0 && (
              <div>
                <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1.5">
                  Verified Technical Competencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
