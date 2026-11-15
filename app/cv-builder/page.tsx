"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Sparkles,
  FileText,
  CheckCircle2,
  MapPin,
  Globe,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  Eye,
  Check,
  Edit3,
  Briefcase,
  Layers,
  Search,
  BookOpen,
  Info,
  Code2,
  BarChart3,
  BrainCircuit,
  Binary,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ProfessionalRole,
  CountryFormat,
  ROLES_CONFIG,
  COUNTRY_FORMATS,
  RoleConfig,
} from "@/data/rolesData";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { getCvFileName } from "@/lib/cvPdfGenerator";

export default function CvBuilderPage() {
  // Step State
  const [selectedRole, setSelectedRole] = useState<ProfessionalRole>("data-analyst");
  const [selectedCountry, setSelectedCountry] = useState<CountryFormat>("UK");

  // Mobile Tab toggle: "editor" vs "preview"
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("preview");

  // Active Role & Country Config
  const roleConfig: RoleConfig = useMemo(() => {
    return ROLES_CONFIG[selectedRole] || ROLES_CONFIG["data-analyst"];
  }, [selectedRole]);

  const countryConfig = useMemo(() => {
    return COUNTRY_FORMATS.find((c) => c.id === selectedCountry) || COUNTRY_FORMATS[0];
  }, [selectedCountry]);

  // Customizable Fields State
  const [customHeadline, setCustomHeadline] = useState<string>("");
  const [customSummary, setCustomSummary] = useState<string>("");
  const [selectedProjectSlugs, setSelectedProjectSlugs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Record<string, boolean>>({});
  const [includePublications, setIncludePublications] = useState<boolean>(true);

  // Job Description Matching
  const [jobDescription, setJobDescription] = useState<string>("");
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);

  // Zoom level for document preview
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Loading state for PDF generation
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync defaults when role or country changes
  useEffect(() => {
    setCustomHeadline(roleConfig.headline);
    setCustomSummary(roleConfig.roleSummary[selectedCountry]);
    setSelectedProjectSlugs(roleConfig.prioritizedProjects.slice(0, 3));

    // Enable all skills in prioritized categories by default
    const initialSkills: Record<string, boolean> = {};
    roleConfig.prioritizedSkills.forEach((cat) => {
      cat.skills.forEach((s) => {
        initialSkills[s] = true;
      });
    });
    setSelectedSkills(initialSkills);
    setIncludePublications(roleConfig.publicationsRelevant);
  }, [selectedRole, selectedCountry, roleConfig]);

  // Read URL params on initial load (e.g. /cv-builder?role=software-engineer&country=USA)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role") as ProfessionalRole;
      const countryParam = params.get("country") as CountryFormat;
      if (roleParam && ROLES_CONFIG[roleParam]) {
        setSelectedRole(roleParam);
      }
      if (countryParam && ["UK", "USA", "India"].includes(countryParam)) {
        setSelectedCountry(countryParam);
      }
    }
  }, []);

  // Job Description Keyword Analyzer (Strictly verified skills from Indra's actual background)
  const analyzeJobDescription = () => {
    if (!jobDescription.trim()) {
      setMatchedKeywords([]);
      return;
    }

    const jdLower = jobDescription.toLowerCase();
    const verifiedSkillPool = [
      "sql",
      "mysql",
      "stored procedures",
      "query optimization",
      "python",
      "pandas",
      "numpy",
      "tableau",
      "power bi",
      "excel",
      "vba",
      "c#",
      ".net core",
      "angular",
      "rest api",
      "azure",
      "aws",
      "machine learning",
      "scikit-learn",
      "regression",
      "eda",
      "exploratory data analysis",
      "statistics",
    ];

    const matched = verifiedSkillPool.filter((kw) => jdLower.includes(kw));
    setMatchedKeywords(matched);
  };

  // Reset to original role defaults
  const handleResetDefaults = () => {
    setCustomHeadline(roleConfig.headline);
    setCustomSummary(roleConfig.roleSummary[selectedCountry]);
    setSelectedProjectSlugs(roleConfig.prioritizedProjects.slice(0, 3));
    const initialSkills: Record<string, boolean> = {};
    roleConfig.prioritizedSkills.forEach((cat) => {
      cat.skills.forEach((s) => {
        initialSkills[s] = true;
      });
    });
    setSelectedSkills(initialSkills);
    setIncludePublications(roleConfig.publicationsRelevant);
    setJobDescription("");
    setMatchedKeywords([]);
  };

  // Toggle skill inclusion
  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName],
    }));
  };

  // Toggle project selection
  const toggleProject = (slug: string) => {
    setSelectedProjectSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Dynamic Download Handler (API or pre-generated)
  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    const targetFilename = getCvFileName(selectedRole, selectedCountry);

    try {
      // Package active customization
      const activeSkillCategories = roleConfig.prioritizedSkills.map((cat) => ({
        category: cat.category,
        skills: cat.skills.filter((s) => selectedSkills[s]),
      })).filter((cat) => cat.skills.length > 0);

      const payload = {
        role: selectedRole,
        country: selectedCountry,
        headline: customHeadline,
        summary: customSummary,
        selectedSkillCategories: activeSkillCategories,
        selectedProjectSlugs: selectedProjectSlugs,
        includePublications: includePublications,
      };

      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server generation failed, falling back to static asset");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = targetFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.warn("Direct API fallback to pre-generated static PDF:", err);
      // Fallback: download the static pre-generated PDF
      const link = document.createElement("a");
      link.href = `/cv/${targetFilename}`;
      link.download = targetFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsGenerating(false);
    }
  };

  // Static pre-generated direct link
  const staticPdfUrl = `/cv/${getCvFileName(selectedRole, selectedCountry)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Control Bar: Return Link, Active Config Badge & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Portfolio</span>
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span>•</span>
                <span>Role: <strong className="text-emerald-500">{roleConfig.title}</strong></span>
                <span>•</span>
                <span>Format: <strong className="text-cyan-500">{countryConfig.name}</strong></span>
              </div>
            </div>

            {/* Download CTA Bar */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Reset all edits to role defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>

              <a
                href={staticPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
                title="Preview pre-generated PDF in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open PDF</span>
              </a>

              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGenerating ? "Building PDF..." : "Download PDF"}</span>
              </button>
            </div>
          </div>

          {/* Page Title & Intro */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dynamic CV &amp; Resume Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Tailored ATS Document Generator
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              Select your target role and country template below. Review the live machine-readable A4 document preview and optionally customize the summary, skills, or projects for your specific job application.
            </p>
          </div>

          {/* STEP 1: SELECT ROLE (4 Cards) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">
                  1
                </span>
                <span>Select Target Professional Role:</span>
              </label>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                4 Verified Profiles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(
                [
                  {
                    id: "data-analyst",
                    title: "Data Analyst",
                    badge: "Commercial Experience",
                    icon: <BarChart3 className="w-4 h-4" />,
                    desc: "SQL tuning, Tableau Public, Power BI & EDA",
                  },
                  {
                    id: "data-scientist",
                    title: "Data Scientist",
                    badge: "Postgraduate Specialization",
                    icon: <BrainCircuit className="w-4 h-4" />,
                    desc: "Python, Scikit-learn & predictive modeling",
                  },
                  {
                    id: "ai-ml-engineer",
                    title: "AI / ML Engineer",
                    badge: "Certified Foundations",
                    icon: <Binary className="w-4 h-4" />,
                    desc: "Azure AI-102, ML algorithms & computer vision",
                  },
                  {
                    id: "software-engineer",
                    title: "Software Engineer",
                    badge: "Commercial Experience",
                    icon: <Code2 className="w-4 h-4" />,
                    desc: ".NET Core Web API, Angular & MySQL tuning",
                  },
                ] as const
              ).map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[var(--bg-card)] border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30"
                        : "bg-[var(--bg-card)]/60 hover:bg-[var(--bg-card)] border-[var(--border-subtle)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? "bg-emerald-500/15 text-emerald-500"
                              : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {role.icon}
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <h3
                        className={`text-sm font-bold ${
                          isSelected ? "text-emerald-500" : "text-[var(--text-primary)]"
                        }`}
                      >
                        {role.title}
                      </h3>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                        {role.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--border-subtle)]/60 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                            : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                        }`}
                      >
                        {role.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT COUNTRY FORMAT (3 Tabs) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                <span>Select Country-Specific Document Format:</span>
              </label>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                ATS-Optimised Layouts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {COUNTRY_FORMATS.map((country) => {
                const isSelected = selectedCountry === country.id;
                return (
                  <button
                    key={country.id}
                    onClick={() => setSelectedCountry(country.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[var(--bg-card)] border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30"
                        : "bg-[var(--bg-card)]/60 hover:bg-[var(--bg-card)] border-[var(--border-subtle)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30"
                              : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)]"
                          }`}
                        >
                          {country.name} • {country.docTitle}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {country.pageTarget}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold ${
                          isSelected ? "text-cyan-500" : "text-[var(--text-primary)]"
                        }`}
                      >
                        {country.type}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                        {country.description}
                      </p>
                    </div>

                    <ul className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] space-y-1 text-[11px] text-[var(--text-secondary)]">
                      {country.standardNotes.slice(0, 2).map((note, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <Check className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE TOGGLE TABS (Editor vs Preview) */}
          <div className="flex lg:hidden items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setMobileTab("editor")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mobileTab === "editor"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 inline mr-1.5" />
              Edit CV Content
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mobileTab === "preview"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1.5" />
              Document Preview
            </button>
          </div>

          {/* MAIN 2-COLUMN WORKSPACE: LEFT CUSTOMIZER, RIGHT LIVE PREVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: CUSTOMIZER & JOB DESCRIPTION MATCHER (7 cols on lg) */}
            <div
              className={`lg:col-span-5 space-y-5 ${
                mobileTab === "editor" ? "block" : "hidden lg:block"
              }`}
            >
              {/* Card 1: Job Description Matcher (Optional Tailoring Tool) */}
              <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold font-mono text-[var(--text-primary)] uppercase tracking-wider">
                      Target Job Description Matcher
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Optional</span>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Paste a job description or key requirements below. The tool highlights matches against Indra&apos;s verified credentials and projects (*without fabricating skills*).
                </p>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste target job spec requirements here (e.g., 'Looking for a Data Analyst with SQL stored procedures, Power BI, and Python experience')..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={analyzeJobDescription}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                  >
                    Analyze Keywords
                  </button>

                  {matchedKeywords.length > 0 && (
                    <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                      ✓ {matchedKeywords.length} Verified Match{matchedKeywords.length > 1 ? "es" : ""} Found
                    </span>
                  )}
                </div>

                {matchedKeywords.length > 0 && (
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                    {matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 2: Editable Professional Headline & Summary */}
              <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold font-mono text-[var(--text-primary)] uppercase tracking-wider">
                      Editable Professional Summary
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Live Edits</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Professional Headline:
                  </label>
                  <input
                    type="text"
                    value={customHeadline}
                    onChange={(e) => setCustomHeadline(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Role &amp; Country Profile Summary:
                  </label>
                  <textarea
                    value={customSummary}
                    onChange={(e) => setCustomSummary(e.target.value)}
                    rows={6}
                    className="w-full text-xs p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-primary)] leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Card 3: Skills Selection Toggles */}
              <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold font-mono text-[var(--text-primary)] uppercase tracking-wider">
                      Skills Selection &amp; Ordering
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Toggle to Include
                  </span>
                </div>

                <div className="space-y-3">
                  {roleConfig.prioritizedSkills.map((cat) => (
                    <div key={cat.category} className="space-y-1.5">
                      <span className="text-[11px] font-bold text-[var(--text-primary)] block">
                        {cat.category}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => {
                          const isIncluded = !!selectedSkills[skill];
                          return (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                                isIncluded
                                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)] line-through opacity-60"
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" />
                              <span>{skill}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Projects Selection */}
              <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold font-mono text-[var(--text-primary)] uppercase tracking-wider">
                      Projects on CV (Top 3 Recommended)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {selectedProjectSlugs.length} selected
                  </span>
                </div>

                <div className="space-y-2">
                  {PORTFOLIO_DATA.projects.map((proj) => {
                    const isChecked = selectedProjectSlugs.includes(proj.slug);
                    return (
                      <label
                        key={proj.slug}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-[var(--bg-subtle)] border-emerald-500/40 text-[var(--text-primary)]"
                            : "bg-transparent border-[var(--border-subtle)] text-[var(--text-muted)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProject(proj.slug)}
                          className="mt-0.5 accent-emerald-500"
                        />
                        <div className="text-xs">
                          <span className="font-bold block">{proj.title}</span>
                          <span className="text-[11px] text-[var(--text-secondary)]">
                            {proj.technologies.slice(0, 3).join(", ")} • {proj.category}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-FIDELITY LIVE A4 DOCUMENT PREVIEW (7 cols on lg) */}
            <div
              className={`lg:col-span-7 space-y-3 ${
                mobileTab === "preview" ? "block" : "hidden lg:block"
              }`}
            >
              {/* Preview Toolbar */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>A4 Vector Document Preview</span>
                  <span className="text-[var(--text-muted)]">• 100% ATS-Friendly</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
                    className="p-1 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-[var(--text-muted)]">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(125, prev + 10))}
                    className="p-1 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* A4 Paper Canvas Container */}
              <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-zinc-950/80 p-3 sm:p-6 shadow-2xl flex justify-center">
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: "top center",
                    width: "100%",
                    maxWidth: "680px",
                  }}
                  className="bg-white text-zinc-900 rounded-lg shadow-2xl p-8 sm:p-10 font-sans text-xs space-y-4 border border-zinc-200 transition-transform duration-150"
                >
                  {/* Document Header */}
                  <div className="border-b border-zinc-800 pb-3 space-y-1">
                    <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 uppercase">
                      Indra Kiran Sane
                    </h2>
                    <p className="text-xs font-bold text-emerald-700 tracking-wide">
                      {customHeadline || roleConfig.headline}
                    </p>

                    {/* Contact Strip */}
                    <div className="pt-1 text-[10px] text-zinc-600 font-mono space-y-0.5">
                      {selectedCountry === "UK" ? (
                        <>
                          <p>
                            Location: Leicester, United Kingdom | Email: saneindradev2790@gmail.com | Phone: +44 07344738617
                          </p>
                          <p>
                            LinkedIn: linkedin.com/in/indrakiran-sane | GitHub: github.com/SANEINDRA2790 | Status: Open to UK Roles
                          </p>
                        </>
                      ) : selectedCountry === "USA" ? (
                        <>
                          <p>
                            Email: saneindradev2790@gmail.com | Phone: +44 07344738617 | Location: Leicester, UK
                          </p>
                          <p>
                            LinkedIn: linkedin.com/in/indrakiran-sane | GitHub: github.com/SANEINDRA2790 | Portfolio: Live Case Studies
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Email: saneindradev2790@gmail.com | Phone: +44 07344738617 / +91 Contact | Location: Leicester, UK / Hyderabad, IN
                          </p>
                          <p>
                            LinkedIn: linkedin.com/in/indrakiran-sane | GitHub: github.com/SANEINDRA2790 | Portfolio: Verified Case Studies
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                      {selectedCountry === "UK"
                        ? "Professional Profile"
                        : selectedCountry === "USA"
                        ? "Executive Summary"
                        : "Career Objective & Summary"}
                    </h3>
                    <p className="text-[10.5px] text-zinc-800 leading-relaxed pt-0.5">
                      {customSummary || roleConfig.roleSummary[selectedCountry]}
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                      {selectedCountry === "USA"
                        ? "Core Technical Competencies"
                        : "Technical Skills Matrix"}
                    </h3>
                    <div className="space-y-1 pt-0.5 text-[10px]">
                      {roleConfig.prioritizedSkills.map((cat) => {
                        const activeList = cat.skills.filter((s) => selectedSkills[s]);
                        if (activeList.length === 0) return null;
                        return (
                          <div key={cat.category} className="leading-snug">
                            <span className="font-bold text-zinc-900">{cat.category}: </span>
                            <span className="text-zinc-700">{activeList.join(", ")}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                      Professional Experience
                    </h3>

                    {/* Capgemini */}
                    <div className="space-y-0.5 text-[10px]">
                      <div className="flex items-center justify-between font-bold text-zinc-950">
                        <span>Senior Analyst (Software Engineer) | Capgemini</span>
                        <span className="font-normal text-zinc-600">October 2023 – 2024 (Enterprise Unit)</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 leading-snug">
                        <li>
                          Engineered full-stack enterprise web applications using .NET Core Web API, Angular, and MySQL within Agile production sprints.
                        </li>
                        <li>
                          Refactored mission-critical SQL queries and transactional stored procedures, achieving a documented 20% reduction in database execution times.
                        </li>
                        <li>
                          Collaborated with cloud engineering teams on Microsoft Azure deployment pipelines and environment configuration.
                        </li>
                        <li>
                          Conducted data cleansing and exploratory reporting to support operational decision-making across core enterprise modules.
                        </li>
                      </ul>
                    </div>

                    {/* Innomatics */}
                    <div className="space-y-0.5 text-[10px]">
                      <div className="flex items-center justify-between font-bold text-zinc-950">
                        <span>Junior Data Analyst Trainee | Innomatics Research Labs</span>
                        <span className="font-normal text-zinc-600">December 2022 – August 2023 (Data Science)</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 leading-snug">
                        <li>
                          Processed and analyzed large tabular datasets utilizing Python (Pandas, NumPy) to isolate business trends and data anomalies.
                        </li>
                        <li>
                          Designed interactive executive dashboards in Tableau and Power BI, converting raw transactional logs into intuitive KPI monitors.
                        </li>
                        <li>
                          Automated weekly reporting pipelines using SQL queries, Excel formulas, and VBA macro routines, eliminating 14 hours of manual copy-paste overhead per week.
                        </li>
                        <li>
                          Implemented supervised machine learning workflows including feature selection, data normalization, and baseline predictive regression models.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="space-y-1.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                      {selectedCountry === "UK" ? "Academic Qualifications" : "Education & Academic Background"}
                    </h3>

                    <div className="text-[10px] space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-zinc-950">
                        <span>MSc Data Science with Industry | University of Leicester</span>
                        <span className="font-normal text-zinc-600">2026 – 2028 (Leicester, UK)</span>
                      </div>
                      <p className="text-zinc-700 pl-2">
                        - Current Postgraduate Specialization: Advanced statistical modeling, scalable data architectures, machine learning algorithms, and UK industrial placement pathway.
                      </p>
                    </div>

                    <div className="text-[10px] space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-zinc-950">
                        <span>B.Tech in Electronics and Communication | Sreenidhi Inst. of Science &amp; Tech</span>
                        <span className="font-normal text-zinc-600">2018 – 2022 (Hyderabad, India)</span>
                      </div>
                      <p className="text-zinc-700 pl-2">
                        - Coursework in computational mathematics, linear algebra, signal processing; authored 2 published peer-reviewed research papers.
                      </p>
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div className="space-y-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                      Verified Professional Certifications
                    </h3>
                    <ul className="text-[10px] space-y-0.5 text-zinc-700 pl-2">
                      <li>• Microsoft Certified: Azure AI Engineer Associate (AI-102) &amp; Azure AI Fundamentals (AI-900)</li>
                      <li>• Microsoft Certified: Power BI Data Analyst Associate (PL-300)</li>
                      <li>• AWS Certified Cloud Practitioner (CLF-C02) &amp; Google Cloud Associate Cloud Engineer (ACE)</li>
                      <li>• NASSCOM Certification: Python Fundamentals and Programming</li>
                    </ul>
                  </div>

                  {/* Selected Projects */}
                  {selectedProjectSlugs.length > 0 && (
                    <div className="space-y-1.5">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                        {selectedCountry === "USA" ? "Key Technical Projects" : "Empirical Projects & Case Studies"}
                      </h3>
                      {selectedProjectSlugs.slice(0, 3).map((slug) => {
                        const p = PORTFOLIO_DATA.projects.find((item) => item.slug === slug);
                        if (!p) return null;
                        return (
                          <div key={slug} className="text-[10px] space-y-0.5">
                            <div className="flex items-center justify-between font-bold text-zinc-950">
                              <span>{p.title} ({p.technologies.slice(0, 3).join(", ")})</span>
                              <span className="font-normal text-zinc-600">{p.metrics[0]?.value}</span>
                            </div>
                            <p className="text-zinc-700 pl-2 leading-snug">
                              - {p.keyFindings[0] || p.problemStatement}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Publications (if applicable) */}
                  {includePublications && selectedCountry !== "USA" && (
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-zinc-300 pb-0.5">
                        Peer-Reviewed Research Publications
                      </h3>
                      <div className="text-[10px] space-y-1 text-zinc-700 pl-2">
                        <p>
                          • <strong>IoT Based Electricity Energy Meter</strong> | Int. Journal of Computer Science &amp; Mobile Computing (IJCSMC)
                        </p>
                        <p>
                          • <strong>Segmentation of Images using Automatic Fuzzy Clustering</strong> | Int. Journal of Digital Electronics (IJDE)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
