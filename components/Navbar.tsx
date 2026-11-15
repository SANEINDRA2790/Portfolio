"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, Database, Sun, Moon, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applyTheme = (newTheme: "dark" | "light") => {
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  };

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Publications", href: "/#research" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-page)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-md py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-emerald-500 group-hover:border-emerald-500/50 transition-all">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
              Indra Kiran Sane
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
              UK Data &amp; Software
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-medium text-[var(--text-secondary)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-2.5 py-1.5 rounded-md hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Dedicated "More Documents" Button */}
          <Link
            href="/documents"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all text-xs font-medium"
            title="Browse full document repository"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>More Documents</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-all"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* CV Download button */}
          <a
            href={PORTFOLIO_DATA.personal.resumePath}
            download="Indra_Kiran_Sane_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold text-xs hover:opacity-90 transition-all shadow-sm"
            title="Download official CV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <Link
            href="/documents"
            className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs"
            title="More Documents"
          >
            <FileText className="w-4 h-4" />
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-md bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          <a
            href={PORTFOLIO_DATA.personal.resumePath}
            download
            className="p-1.5 rounded-md bg-[var(--text-primary)] text-[var(--bg-page)] text-xs"
            title="Download CV"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[var(--bg-page)]/98 backdrop-blur-xl border-b border-[var(--border-subtle)] px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-center justify-between font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {PORTFOLIO_DATA.personal.ukWorkStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
            <Link
              href="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-600 dark:text-cyan-300 font-semibold text-sm hover:bg-cyan-500/25 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>More Documents Repository</span>
            </Link>

            <a
              href={PORTFOLIO_DATA.personal.resumePath}
              download="Indra_Kiran_Sane_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Full CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
