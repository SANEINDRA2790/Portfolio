import React from "react";
import Link from "next/link";
import { ArrowLeft, Database, Home, Mail, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ededed] flex flex-col items-center justify-center px-4 font-mono">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-400">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>QUERY_STATUS: NOT_FOUND_404</span>
        </div>

        {/* 404 Heading */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight font-sans">
          4<span className="text-emerald-400">0</span>4
        </h1>

        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          The project case study or page you requested could not be located in the current schema. It may have been relocated or renamed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans text-xs">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all"
          >
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Browse All Projects</span>
          </Link>
        </div>

        {/* Return hint */}
        <div className="text-[11px] text-zinc-400 pt-4">
          Looking for a specific dataset or SQL analysis?{" "}
          <Link href="/#contact" className="text-emerald-400 hover:underline">
            Reach out directly
          </Link>
        </div>
      </div>
    </div>
  );
}

