"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
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

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const categories = ["All", ...DOCUMENT_CATEGORIES];

  const filteredDocuments = useMemo(() => {
    return DOCUMENTS_DATA.filter((doc) => {
      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case "Academic Documents":
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case "Professional Certifications":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "Research & Publications":
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case "Project Documentation":
        return <FileCode className="w-4 h-4 text-indigo-400" />;
      case "Additional Professional Documents":
        return <FolderOpen className="w-4 h-4 text-rose-400" />;
      default:
        return <FileText className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Universal Navigation */}
      <Navbar />

      <main className="flex-1 pt-32 pb-20 md:pt-36 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Breadcrumb & Return Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <a
            href={PORTFOLIO_DATA.personal.resumePath}
            download="Indra_Kiran_Sane_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Resume (PDF)</span>
          </a>
        </div>

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Document Repository &amp; Verification Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Professional Documents &amp; Credentials
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Access verified academic transcripts, professional certifications, research publications, and project technical reports. Sourced securely with explicit sharing controls.
          </p>
        </div>

        {/* Google Drive Architecture & Security Notice */}
        <div className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cloud className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white">
                Secure Cloud Document Synchronization Architecture
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Credential Leakage
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            This repository is designed to connect to a specifically designated Google Drive folder or server-side service account. Your personal credentials, passwords, and private drive contents are never exposed to the frontend. Documents listed below reflect explicitly authorized files and verified links.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name, type, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
              />
            </div>

            <div className="text-xs font-mono text-zinc-400 self-center sm:self-auto">
              Showing {filteredDocuments.length} of {DOCUMENTS_DATA.length} documents
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-b border-white/[0.06] pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-zinc-950 font-semibold shadow-md shadow-cyan-500/20"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl bg-zinc-900/50 border border-white/[0.08] hover:border-cyan-500/30 p-5 flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  {/* Category & Type header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                      {getCategoryIcon(doc.category)}
                      <span>{doc.category}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-cyan-300 border border-white/[0.06]">
                      {doc.type}
                    </span>
                  </div>

                  {/* Document Name */}
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {doc.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  {doc.externalUrl ? (
                    <a
                      href={doc.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-semibold transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Verified Resource</span>
                    </a>
                  ) : doc.isAvailable && doc.filePath ? (
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                      <a
                        href={doc.filePath}
                        download
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400/90 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pending Upload</span>
                      </span>
                      <span className="text-[10px] text-zinc-400">PDF Asset</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="rounded-2xl bg-zinc-900/30 border border-white/[0.06] py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">No Matching Documents Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              No documents matched your search query &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-200 hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl p-6 flex flex-col max-h-[90vh] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{previewDoc.category}</span>
                <h3 className="text-base font-bold text-white">{previewDoc.name}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 w-full h-96 rounded-xl bg-zinc-900 overflow-hidden">
              {previewDoc.filePath && (
                <iframe
                  src={previewDoc.filePath}
                  title={previewDoc.name}
                  className="w-full h-full border-0"
                />
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-zinc-400 font-mono">Format: {previewDoc.type}</span>
              {previewDoc.filePath && (
                <a
                  href={previewDoc.filePath}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-semibold text-xs hover:bg-cyan-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

