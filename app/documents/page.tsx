"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  Clock,
  ArrowLeft,
  ShieldCheck,
  FolderOpen,
  Eye,
  X,
  Cloud,
  FileCode,
  GraduationCap,
  Award,
  BookOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  DOCUMENTS_DATA,
  DOCUMENT_CATEGORIES,
  DocumentItem,
  DocumentCategory,
} from "@/data/documents";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { AddCertificateModal } from "@/components/AddCertificateModal";
import { useOwner } from "@/context/OwnerContext";

export default function DocumentsPage() {
  const { isOwner, openCvModal } = useOwner();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [allDocs, setAllDocs] = useState<DocumentItem[]>(DOCUMENTS_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load custom user-added documents from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_custom_documents");
      if (stored) {
        const customDocs: DocumentItem[] = JSON.parse(stored);
        if (Array.isArray(customDocs) && customDocs.length > 0) {
          // Merge unique docs
          setAllDocs((prev) => {
            const existingIds = new Set(prev.map((d) => d.id));
            const newOnes = customDocs.filter((d) => !existingIds.has(d.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const handleAddDocument = (newDoc: DocumentItem) => {
    setAllDocs((prev) => [newDoc, ...prev]);
  };

  const handleDeleteCustomDoc = (id: string) => {
    setAllDocs((prev) => prev.filter((d) => d.id !== id));
    try {
      const stored = localStorage.getItem("portfolio_custom_documents");
      if (stored) {
        const customDocs: DocumentItem[] = JSON.parse(stored);
        const filtered = customDocs.filter((d) => d.id !== id);
        localStorage.setItem("portfolio_custom_documents", JSON.stringify(filtered));
      }
    } catch {
      // Ignore localStorage errors
    }
  };

  const categories = ["All", ...DOCUMENT_CATEGORIES];

  const filteredDocuments = useMemo(() => {
    return allDocs.filter((doc) => {
      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allDocs, selectedCategory, searchQuery]);

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case "Academic Documents":
        return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case "Professional Certifications":
        return <Award className="w-4 h-4 text-amber-500" />;
      case "Research & Publications":
        return <BookOpen className="w-4 h-4 text-cyan-500" />;
      case "Project Documentation":
        return <FileCode className="w-4 h-4 text-indigo-500" />;
      case "Additional Professional Documents":
        return <FolderOpen className="w-4 h-4 text-rose-500" />;
      default:
        return <FileText className="w-4 h-4 text-[var(--text-muted)]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Universal Navigation */}
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-32 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* Top Control Bar: Return Link, Add Certificate CTA & Resume Download */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Add Certificate / Document Button - ONLY VISIBLE TO PORTFOLIO HOLDER (isOwner) */}
            {isOwner && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-semibold text-xs transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certificate / Document</span>
              </button>
            )}

            <button
              onClick={openCvModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors cursor-pointer"
              title="Download official CV (UK or India format)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Official CV</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-semibold">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Document Repository &amp; Verification Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Professional Documents &amp; Credentials
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Verified academic qualifications, professional cloud and AI certifications, peer-reviewed research publications, and project technical specifications.
          </p>
        </div>

        {/* Security & Cloud Sync Notice */}
        <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 shadow-sm space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Cloud className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">
                Secure Cloud Document Synchronization
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              Zero Credential Leakage
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            This repository reflects verified certificates and explicitly authorized documents. Documents listed below reflect authenticated academic records and certified examinations.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name, type, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-cyan-500 transition-colors font-mono shadow-sm"
              />
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)] self-center sm:self-auto">
              Showing {filteredDocuments.length} of {allDocs.length} documents
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-[var(--border-subtle)] pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-zinc-950 font-semibold shadow-sm"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const isCustom = doc.id.startsWith("custom-");

              return (
                <div
                  key={doc.id}
                  className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-cyan-500/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group relative"
                >
                  <div>
                    {/* Category & Type header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        {getCategoryIcon(doc.category)}
                        <span className="truncate max-w-[170px]">{doc.category}</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-cyan-600 dark:text-cyan-300 border border-[var(--border-subtle)] font-medium">
                          {doc.type}
                        </span>
                        {/* Only owner can delete custom items */}
                        {isOwner && isCustom && (
                          <button
                            onClick={() => handleDeleteCustomDoc(doc.id)}
                            className="p-1 rounded text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Remove custom document"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Document Name */}
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1.5 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {doc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {doc.description}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    {doc.externalUrl ? (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Verified Link</span>
                      </a>
                    ) : doc.isAvailable && doc.filePath ? (
                      <div className="w-full flex items-center gap-2">
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                        <a
                          href={doc.filePath}
                          download={doc.name}
                          className="p-2 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors"
                          title="Download file"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Pending Upload</span>
                        </span>
                        {/* Only owner sees upload link */}
                        {isOwner ? (
                          <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline font-mono font-semibold"
                          >
                            Upload File
                          </button>
                        ) : (
                          <span className="text-[10px] text-[var(--text-muted)] font-mono">
                            On Record
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] py-14 text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)] mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">No Matching Documents Found</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              No documents matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] hover:border-cyan-500/40"
              >
                Reset Filters
              </button>
              {isOwner && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400"
                >
                  + Add Certificate
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl p-5 sm:p-6 flex flex-col max-h-[90vh] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{previewDoc.category}</span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{previewDoc.name}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 w-full h-96 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)] overflow-hidden">
              {previewDoc.filePath && (
                previewDoc.filePath.startsWith("data:image") ? (
                  <img
                    src={previewDoc.filePath}
                    alt={previewDoc.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={previewDoc.filePath}
                    title={previewDoc.name}
                    className="w-full h-full border-0"
                  />
                )
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-[var(--text-muted)] font-mono">Format: {previewDoc.type}</span>
              {previewDoc.filePath && (
                <a
                  href={previewDoc.filePath}
                  download={previewDoc.name}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white dark:bg-cyan-500 dark:text-zinc-950 font-semibold text-xs hover:opacity-90"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate / Document Modal (Only accessible if isOwner) */}
      {isOwner && (
        <AddCertificateModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddDocument={handleAddDocument}
        />
      )}

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
