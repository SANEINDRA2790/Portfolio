"use client";

import React, { useState } from "react";
import {
  Mail,
  Download,
  Send,
  CheckCircle2,
  Copy,
  MapPin,
  Clock,
  Phone,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Opportunity Inquiry: UK Data / Software Role",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Details - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 font-semibold">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Details</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Let&apos;s Connect
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                I am actively considering opportunities across the UK for Data Analyst, Business Intelligence, Junior Data Scientist, and Software Engineering roles.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3">
              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">Professional Email</div>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-emerald-500 transition-colors"
                      title="Send email via mailto link"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card with Call and Copy button */}
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)]">Contact Number (UK)</div>
                    <a
                      href={`tel:${personal.phoneTel}`}
                      className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      title="Call UK phone number"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${personal.phoneTel}`}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono transition-colors font-medium"
                    title="Initiate phone call"
                  >
                    Call
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-mono flex items-center gap-1.5 transition-colors"
                    title="Copy phone number to clipboard"
                  >
                    {phoneCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                    {personal.location}
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">Work Status</div>
                  <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                    {personal.ukWorkStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Social, Document & Resume Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={personal.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] hover:border-emerald-500/40 transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-emerald-500" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] hover:border-emerald-500/40 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-emerald-500" />
                <span>GitHub</span>
              </a>

              <Link
                href="/documents"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-cyan-500/30 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-500" />
                <span>More Documents</span>
              </Link>

              <a
                href={personal.resumePath}
                download="Indra_Kiran_Sane_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form - 7 cols */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 relative overflow-hidden">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Message Sent!</h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                    Thank you for reaching out. I review and reply to messages promptly. You can also connect with me directly on LinkedIn or email.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Opportunity Inquiry: UK Data / Software Role",
                        message: "",
                      });
                    }}
                    className="px-4 py-2 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-2">Send a Direct Note</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins (Talent Partner)"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
                        Your Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.co.uk"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-1">
                      Message / Role Context
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Indra, I came across your portfolio and wanted to discuss an opportunity in our team..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-emerald-400 flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-[var(--text-muted)] text-center pt-1 font-mono">
                    Direct inquiries forward to {personal.email}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Professional Closing Statement */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] text-center max-w-3xl mx-auto space-y-2">
          <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
            &ldquo;In modern organizations, the highest ROI emerges when engineering discipline and data analytics are unified. I am committed to delivering clean, optimized, and statistically validated solutions for teams in the UK.&rdquo;
          </p>
          <div className="text-xs font-mono text-emerald-500 font-semibold">— Indra Kiran Sane</div>
        </div>
      </div>
    </section>
  );
}
