import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Database,
  BarChart2,
  Code2,
  Lightbulb,
  FileText,
  AlertCircle,
  Download,
  Calendar,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { InteractiveChartPreview } from "@/components/InteractiveChartPreview";
import { CodeSnippetViewer } from "@/components/CodeSnippetViewer";

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
    <div className="min-h-screen bg-[#09090b] text-[#ededed]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08] py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            <a
              href={PORTFOLIO_DATA.personal.resumePath}
              download="Indra_Kiran_Sane_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Project Header */}
        <section className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Detailed Case Study &amp; Technical Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-zinc-900/70 border border-white/[0.08] p-4 text-center"
              >
                <div className="text-[11px] text-zinc-400 font-mono uppercase">{m.label}</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Technologies Used */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-zinc-400 mr-2">Technologies Used:</span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Business Objective & Problem Statement */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-zinc-900/50 border border-white/[0.06] p-6 space-y-2.5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span>Business Objective</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.businessObjective}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900/50 border border-white/[0.06] p-6 space-y-2.5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Statement</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
        </section>

        {/* Dataset Information */}
        <section className="rounded-xl bg-zinc-900/40 border border-white/[0.06] p-6 space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Dataset Architecture &amp; Context</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {project.datasetInfo}
          </p>
        </section>

        {/* Interactive Visual Evidence */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>Interactive Visual Evidence &amp; Metric Distribution</span>
            </h2>
            <span className="text-xs font-mono text-zinc-400">Live Component</span>
          </div>

          <InteractiveChartPreview
            type={project.chartType}
            data={project.chartData}
            meta={project.chartMeta}
          />
        </section>

        {/* Analytical Approach */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Analytical &amp; Engineering Approach</span>
          </h2>

          <div className="space-y-2.5">
            {project.analyticalApproach.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-900/50 border border-white/[0.04]"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippet if applicable */}
        {(project.sqlSnippet || project.pythonSnippet) && (
          <section className="space-y-3">
            <CodeSnippetViewer
              title={
                project.sqlSnippet
                  ? "Production Stored Procedure & Query Script"
                  : "Exploratory Analytics & ML Pipeline Script"
              }
              language={project.sqlSnippet ? "SQL" : "Python"}
              code={(project.sqlSnippet || project.pythonSnippet) as string}
            />
          </section>
        )}

        {/* Key Findings & Recommendations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Findings */}
          <div className="rounded-xl bg-zinc-900/60 border border-white/[0.08] p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Empirical Findings</span>
            </h2>
            <div className="space-y-2.5">
              {project.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Recommendations */}
          <div className="rounded-xl bg-zinc-900/60 border border-white/[0.08] p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 text-cyan-400">
              <Lightbulb className="w-4 h-4" />
              <span>Business Recommendations</span>
            </h2>
            <div className="space-y-2.5">
              {project.businessRecommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency Notice */}
        <section className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/20 text-xs font-mono text-zinc-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-semibold">Verification &amp; Integrity Notice: </span>
            This project analysis was designed to demonstrate reproducible analytical rigor. Dataset attributes, query patterns, and evaluation metrics reflect empirical testing and verifiable methodologies.
          </div>
        </section>

        {/* Bottom Navigation */}
        <section className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Next Case Study: {nextProject.title}</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs font-mono text-zinc-400">
        © 2026 Indra Kiran Sane • Case Study: {project.title}
      </footer>
    </div>
  );
}
