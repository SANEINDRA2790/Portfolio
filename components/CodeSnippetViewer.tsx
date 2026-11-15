"use client";

import React, { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

interface CodeSnippetViewerProps {
  title: string;
  language: string;
  code: string;
}

export function CodeSnippetViewer({ title, language, code }: CodeSnippetViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden font-mono text-xs shadow-md">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-500" />
          <span className="text-[var(--text-primary)] font-semibold">{title}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] uppercase font-semibold">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-card)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-[11px] border border-[var(--border-subtle)]"
          title="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-emerald-600 dark:text-emerald-400 leading-relaxed max-h-96 bg-[var(--bg-card)]">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
