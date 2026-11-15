import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Database,
  Code2,
  Lightbulb,
  AlertCircle,
  Download,
  Check,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CodeSnippetViewer } from "@/components/CodeSnippetViewer";
import { TableauEmbed } from "@/components/TableauEmbed";
import { ProjectCvButton } from "@/components/ProjectCvButton";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project for footer navigation
  const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  const nextProject =
    PORTFOLIO_DATA.projects[(currentIndex + 1) % PORTFOLIO_DATA.projects.length];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-page)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveDashboardUrl && (
              <a
                href={project.liveDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Dashboard</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            <ProjectCvButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Project Header */}
        <section className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Verified Technical Case Study
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 text-center"
              >
                <div className="text-[11px] text-[var(--text-muted)] font-mono uppercase">{m.label}</div>
                <div className="text-xl font-extrabold text-emerald-500 font-mono mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: PROBLEM */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>1. Problem</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Context &amp; Business Objective
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 space-y-2.5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>Commercial Objective</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.businessObjective}
              </p>
            </div>

            <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 space-y-2.5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-cyan-500" />
                <span>Problem Statement</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-5 text-xs text-[var(--text-secondary)] space-y-1.5">
            <div className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span>Dataset Context:</span>
            </div>
            <p className="leading-relaxed">{project.datasetInfo}</p>
          </div>
        </section>

        {/* SECTION 2: APPROACH */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
            <Code2 className="w-4 h-4" />
            <span>2. Approach</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Analytical &amp; Technical Methodology
          </h2>

          <div className="space-y-2.5 pt-2">
            {project.analyticalApproach.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Code Snippet if applicable */}
          {(project.sqlSnippet || project.pythonSnippet) && (
            <div className="pt-4">
              <CodeSnippetViewer
                title={
                  project.sqlSnippet
                    ? "Production Stored Procedure & Optimization"
                    : "Analytics & Predictive Modeling Pipeline"
                }
                language={project.sqlSnippet ? "SQL" : "Python"}
                code={(project.sqlSnippet || project.pythonSnippet) as string}
              />
            </div>
          )}
        </section>

        {/* SECTION 3: TECHNOLOGIES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
            <span>3. Technologies</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Tools &amp; Stack Utilized
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 4: RESULTS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>4. Results</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Empirical Findings &amp; Outcomes
          </h2>

          {/* Live Embedded Dashboard (Tableau) */}
          {project.embedUrl && project.liveDashboardUrl && (
            <div className="pt-2">
              <TableauEmbed
                embedUrl={project.embedUrl}
                directUrl={project.liveDashboardUrl}
                title={project.title}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Key Findings */}
            <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Findings</span>
              </h3>
              <div className="space-y-2.5">
                {project.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Recommendations */}
            <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono flex items-center gap-2 text-cyan-500">
                <Lightbulb className="w-4 h-4" />
                <span>Business Recommendations</span>
              </h3>
              <div className="space-y-2.5">
                {project.businessRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-cyan-500 font-bold">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: REPOSITORY & ARTIFACTS */}
        <section className="space-y-4 border-t border-[var(--border-subtle)] pt-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
            <span>5. Repository &amp; Artifacts</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Verified Project Links
          </h2>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveDashboardUrl && (
              <a
                href={project.liveDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Dashboard on {project.verifiedPlatform || "Tableau"}</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Inspect GitHub Repository</span>
              </a>
            )}
          </div>
        </section>

        {/* Bottom Navigation */}
        <section className="pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <span>Next Case Study: {nextProject.title}</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs font-mono text-[var(--text-muted)]">
        © 2026 Indra Kiran Sane • Case Study: {project.title}
      </footer>
    </div>
  );
}
