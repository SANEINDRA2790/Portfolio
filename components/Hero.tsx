"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Location & Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-medium text-[var(--text-primary)]">{personal.location}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span>MSc Data Science with Industry (2026 – 2028)</span>
        </div>

        {/* Name & Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Indra Kiran Sane
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-500 tracking-tight">
            Data Analyst | Aspiring Data Scientist | Software Engineer
          </p>
        </div>

        {/* Short 2-3 Sentence Introduction */}
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto font-normal">
          I bridge software engineering and data analytics to transform complex data into meaningful business solutions. With 2+ years of enterprise experience at Capgemini optimizing SQL databases and developing full-stack applications, I am pursuing MSc Data Science with Industry at the University of Leicester.
        </p>

        {/* Verified Proof Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs text-[var(--text-secondary)] font-mono">
          <span className="px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            2+ Yrs Enterprise Experience (Capgemini)
          </span>
          <span className="px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            20% Database Response-Time Improvement
          </span>
          <span className="px-3 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Full-Stack (.NET / Angular / SQL)
          </span>
        </div>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={personal.resumePath}
            download="Indra_Kiran_Sane_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--border-hover)] transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Download CV</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Contact Links & Verification */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 text-xs font-mono text-[var(--text-secondary)]">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            title="Send email"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>{personal.email}</span>
          </a>

          <a
            href={`tel:${personal.phoneTel}`}
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            title="Call UK phone number"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-500" />
            <span>{personal.phone}</span>
          </a>

          <a
            href={personal.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
