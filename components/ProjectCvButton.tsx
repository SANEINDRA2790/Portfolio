"use client";

import React from "react";
import { Download } from "lucide-react";
import { useCvModal } from "@/context/OwnerContext";

export function ProjectCvButton() {
  const { openCvModal } = useCvModal();

  return (
    <button
      onClick={openCvModal}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer"
      title="Download CV / Resume (Select UK or India format)"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Resume</span>
    </button>
  );
}
