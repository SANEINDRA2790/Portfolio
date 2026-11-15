"use client";

import React, { useEffect, useState } from "react";
import { X, Download, ExternalLink, ShieldCheck, FileText, Upload, CheckCircle2 } from "lucide-react";
import { CertificateItem } from "@/data/certificates";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [localFileType, setLocalFileType] = useState<"pdf" | "image">("pdf");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Check if user previously uploaded a file for this certificate in browser
      try {
        const savedFile = localStorage.getItem(`cert_file_${certificate.id}`);
        if (savedFile) {
          setLocalFileUrl(savedFile);
          if (savedFile.startsWith("data:image")) {
            setLocalFileType("image");
          } else {
            setLocalFileType("pdf");
          }
        } else {
          setLocalFileUrl(null);
        }
      } catch {
        setLocalFileUrl(null);
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.includes("image");
    setLocalFileType(isImg ? "image" : "pdf");

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setLocalFileUrl(dataUrl);
        try {
          localStorage.setItem(`cert_file_${certificate.id}`, dataUrl);
        } catch {
          // Local storage quota fallback
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const effectiveFileUrl = localFileUrl || (certificate.isUploaded ? certificate.filePath : null);
  const effectiveFileType = localFileUrl ? localFileType : (certificate.fileType || "pdf");

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
          {effectiveFileUrl ? (
            /* Uploaded Certificate Document Viewer */
            <div className="space-y-4">
              <div className="w-full h-80 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] overflow-hidden relative">
                {effectiveFileType === "image" ? (
                  <img
                    src={effectiveFileUrl}
                    alt={certificate.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={effectiveFileUrl}
                    title={certificate.title}
                    className="w-full h-full border-0"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={effectiveFileUrl}
                  download={`${certificate.code}_Certificate.pdf`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </a>

                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Replace File</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            /* Honest Certificate Pending Upload State with In-Modal Upload Option */
            <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 inline-block font-medium">
                  Document Pending Upload
                </span>
                <h4 className="text-base font-bold text-[var(--text-primary)]">
                  Certificate Document Pending Upload
                </h4>
                <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  The candidate holds this verified qualification. You can also upload and preview the certificate file directly below.
                </p>
              </div>

              {/* Upload Certificate File Button */}
              <div className="pt-1">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20">
                  <Upload className="w-4 h-4" />
                  <span>Upload &amp; View Certificate (PDF / Image)</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
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
