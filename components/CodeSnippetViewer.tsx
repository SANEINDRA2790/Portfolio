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
    <div className="rounded-xl bg-zinc-950 border border-white/10 overflow-hidden font-mono text-xs shadow-xl">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-200 font-semibold">{title}</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[11px]"
          title="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
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
      <div className="p-4 overflow-x-auto text-emerald-300/90 leading-relaxed max-h-96">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

