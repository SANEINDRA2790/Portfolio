"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Award,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Tag,
} from "lucide-react";
import { DocumentItem, DocumentCategory, DOCUMENT_CATEGORIES } from "@/data/documents";
import { CertificateItem } from "@/data/certificates";

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
  onAddCertificate?: (cert: CertificateItem) => void;
  defaultCategory?: DocumentCategory;
}

export function AddCertificateModal({
  isOpen,
  onClose,
  onAddDocument,
  onAddCertificate,
  defaultCategory = "Professional Certifications",
}: AddCertificateModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<DocumentCategory>(defaultCategory);
  const [issuer, setIssuer] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [fileType, setFileType] = useState<"pdf" | "image">("pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    if (file.type.includes("image")) {
      setFileType("image");
    } else {
      setFileType("pdf");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFileDataUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const uniqueId = `custom-doc-${Date.now()}`;
    const newDoc: DocumentItem = {
      id: uniqueId,
      name: name.trim(),
      category: category,
      type: fileDataUrl ? (fileType === "pdf" ? "PDF" : "Certificate") : externalUrl ? "External Link" : "Certificate",
      description: description.trim() || `${category} credential issued by ${issuer || "Verified Organization"}.`,
      filePath: fileDataUrl || undefined,
      externalUrl: externalUrl.trim() || undefined,
      isAvailable: !!fileDataUrl || !!externalUrl,
      fileSize: fileSize || (fileDataUrl ? "Verified Asset" : "Pending Upload"),
      lastUpdated: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    };

    // Save to localStorage for persistence across reloads
    try {
      const existing = localStorage.getItem("portfolio_custom_documents");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newDoc);
      localStorage.setItem("portfolio_custom_documents", JSON.stringify(list));
    } catch {
      // Local storage fallback
    }

    onAddDocument(newDoc);

    // If it's a certification, also pass to certificates list if applicable
    if (onAddCertificate) {
      const newCert: CertificateItem = {
        id: uniqueId,
        title: name.trim(),
        code: code.trim() || "CUSTOM",
        issuer: issuer.trim() || "Verified Credential",
        badgeColor: "#10b981",
        description: description.trim() || `${name.trim()} certification issued by ${issuer || "Accredited Body"}.`,
        status: "Certified",
        filePath: fileDataUrl || undefined,
        verificationUrl: externalUrl.trim() || undefined,
        isUploaded: !!fileDataUrl,
        fileType: fileType,
        skillsCovered: [name.trim()],
      };

      try {
        const existingCerts = localStorage.getItem("portfolio_custom_certificates");
        const certList = existingCerts ? JSON.parse(existingCerts) : [];
        certList.push(newCert);
        localStorage.setItem("portfolio_custom_certificates", JSON.stringify(certList));
      } catch {
        // Local storage fallback
      }

      onAddCertificate(newCert);
    }

    setSuccess(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                Add Certificate or Document
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Add a new verified credential, degree certificate, or technical file.
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">
                Certificate Added Successfully!
              </h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                Your credential has been stored and is now immediately accessible in the repository.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Document / Certificate Title */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                  Certificate / Document Title <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tableau Certified Data Analyst / AWS Solutions Architect"
                  className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Category & Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                    Document Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {DOCUMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                    Exam / Credential Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. PL-300, SAA-C03"
                    className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Issuer & Verification URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                    Issuer / Institution
                  </label>
                  <input
                    type="text"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Microsoft, Tableau, AWS"
                    className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                    Verification URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://www.credly.com/badges/..."
                    className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                  Scope &amp; Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of validated skills, domain topics, and methodology..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* File Attachment / Upload Area */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--text-muted)] mb-1">
                  Upload Certificate File (PDF / PNG / JPG)
                </label>
                <div className="relative border-2 border-dashed border-[var(--border-subtle)] hover:border-emerald-500/50 rounded-xl p-4 text-center transition-colors bg-[var(--bg-subtle)]">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {fileName ? (
                    <div className="flex items-center justify-center gap-2 text-xs text-emerald-500 font-semibold font-mono">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="truncate max-w-xs">{fileName}</span>
                      <span className="text-[var(--text-muted)] font-normal">({fileSize})</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-5 h-5 text-[var(--text-muted)] mx-auto" />
                      <div className="text-xs font-medium text-[var(--text-primary)]">
                        Click or drag file to attach certificate
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)]">
                        Supports PDF documents or high-resolution images
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add to Repository"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

