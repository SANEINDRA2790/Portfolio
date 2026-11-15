"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, Database, Sun, Moon } from "lucide-react";
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
    { name: "30s Snapshot", href: "#recruiter-fast-track" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Research", href: "#research" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Indra Kiran Sane
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-zinc-300 bg-zinc-900/80 px-1.5 py-0.5 rounded border border-white/[0.06]">
              UK Data & Software
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Status pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Open to UK Roles</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* CV Download button */}
          <a
            href={PORTFOLIO_DATA.personal.resumePath}
            download="Indra_Kiran_Sane_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-md bg-zinc-900 text-zinc-300 border border-white/10"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          <a
            href={PORTFOLIO_DATA.personal.resumePath}
            download
            className="p-1.5 rounded-md bg-white text-zinc-950 text-xs"
            title="Download CV"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          <div className="mb-3 px-2 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {PORTFOLIO_DATA.personal.ukWorkStatus}
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
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
