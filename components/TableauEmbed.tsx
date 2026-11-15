"use client";

import React, { useState } from "react";
import { ExternalLink, BarChart3, ShieldCheck } from "lucide-react";

interface TableauEmbedProps {
  embedUrl: string;
  directUrl: string;
  title: string;
}

export function TableauEmbed({ embedUrl, directUrl, title }: TableauEmbedProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden shadow-xl my-8">
      {/* Control & Verification Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                Verified Tableau Public
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)]">
              Interactive Live Visualizations &amp; Filterable Metrics
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Fullscreen on Tableau Public</span>
        </a>
      </div>

      {/* Embedded Tableau Viewer */}
      <div className="relative w-full h-[600px] md:h-[750px] bg-[var(--bg-page)] flex items-center justify-center">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[var(--bg-card)] z-10">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
            <div className="text-xs font-mono text-[var(--text-secondary)]">
              Initializing Tableau Public Interactive Frame...
            </div>
            <div className="text-[11px] text-[var(--text-muted)] max-w-sm">
              If third-party cookies or embeds are blocked in your browser, launch the dashboard directly using the button above.
            </div>
          </div>
        )}

        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0 relative z-20"
          onLoad={() => setIframeLoaded(true)}
          allowFullScreen
        />
      </div>

      {/* Footer Info Strip */}
      <div className="p-3 bg-[var(--bg-subtle)] border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Author: Indra Kiran Sane</span>
        </span>
        <span className="text-[var(--text-muted)]">
          Tableau Public Server-Rendered Analytics
        </span>
      </div>
    </div>
  );
}
