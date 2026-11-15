"use client";

import React from "react";
import Link from "next/link";
import { Database, ArrowUp, KeyRound } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useOwner } from "@/context/OwnerContext";

export function Footer() {
  const { personal } = PORTFOLIO_DATA;
  const { isOwner, toggleOwner } = useOwner();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] py-12 text-[var(--text-secondary)] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-emerald-500">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[var(--text-primary)] text-sm">Indra Kiran Sane</div>
              <div className="text-[11px] text-[var(--text-muted)] font-sans">
                Data Analyst | Aspiring Data Scientist | Software Engineer
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[var(--text-secondary)]">
            <a href="/#recruiter-fast-track" className="hover:text-[var(--text-primary)] transition-colors">
              30s Snapshot
            </a>
            <a href="/#about" className="hover:text-[var(--text-primary)] transition-colors">
              About
            </a>
            <a href="/#experience" className="hover:text-[var(--text-primary)] transition-colors">
              Experience
            </a>
            <a href="/#education" className="hover:text-[var(--text-primary)] transition-colors">
              Education
            </a>
            <a href="/#skills" className="hover:text-[var(--text-primary)] transition-colors">
              Skills
            </a>
            <a href="/#projects" className="hover:text-[var(--text-primary)] transition-colors">
              Projects
            </a>
            <a href="/#certifications" className="hover:text-[var(--text-primary)] transition-colors">
              Certifications
            </a>
            <a href="/#research" className="hover:text-[var(--text-primary)] transition-colors">
              Publications
            </a>
            <Link href="/cv-builder" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors">
              CV Builder
            </Link>
            <Link href="/documents" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium transition-colors">
              More Documents
            </Link>
            <a href="/#contact" className="hover:text-[var(--text-primary)] transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-emerald-500/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Indra Kiran Sane. Leicester, United Kingdom.</span>
            {/* Discrete Owner Mode Toggle (Only known to Indra) */}
            <button
              onClick={toggleOwner}
              className={`p-1 rounded transition-opacity ${
                isOwner ? "opacity-100 text-emerald-500" : "opacity-20 hover:opacity-100 text-[var(--text-muted)]"
              }`}
              title={isOwner ? "Owner Mode Active (Click to switch to Public View)" : "Portfolio Owner Login"}
              aria-label="Toggle Owner Mode"
            >
              <KeyRound className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-emerald-500 transition-colors"
              title="Send email via mailto link"
            >
              {personal.email}
            </a>
            <span>•</span>
            <a
              href={`tel:${personal.phoneTel}`}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              title="Call phone number via tel link"
            >
              {personal.phone}
            </a>
            <span>•</span>
            <a
              href={personal.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <Link
              href="/documents"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Documents Library
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
