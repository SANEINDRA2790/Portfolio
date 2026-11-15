"use client";

import React from "react";
import Link from "next/link";
import { Database, Download, Mail, ArrowUp, Phone, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] py-12 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Indra Kiran Sane</div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Data Analyst | Aspiring Data Scientist | Software Engineer
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans">
            <a href="#recruiter-fast-track" className="hover:text-white transition-colors">
              30s Snapshot
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-white transition-colors">
              Education
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#certifications" className="hover:text-white transition-colors">
              Certifications
            </a>
            <a href="#research" className="hover:text-white transition-colors">
              Publications
            </a>
            <Link href="/documents" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              More Documents
            </Link>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Indra Kiran Sane. Leicester, United Kingdom.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-emerald-400 transition-colors"
              title="Send email via mailto link"
            >
              {personal.email}
            </a>
            <span>•</span>
            <a
              href={`tel:${personal.phoneTel}`}
              className="hover:text-cyan-400 transition-colors"
              title="Call phone number via tel link"
            >
              {personal.phone}
            </a>
            <span>•</span>
            <a
              href={personal.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <Link
              href="/documents"
              className="text-cyan-400 hover:underline"
            >
              Documents Library
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
