"use client";

import React, { useState } from "react";

interface ChartPreviewProps {
  type: "bar" | "line" | "scatter" | "gauge";
  data: { label: string; value: number; secondary?: number }[];
  meta: {
    xLabel: string;
    yLabel: string;
    legendPrimary: string;
    legendSecondary?: string;
  };
}

export function InteractiveChartPreview({ type, data, meta }: ChartPreviewProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const maxSecondary = data.some((d) => d.secondary !== undefined)
    ? Math.max(...data.map((d) => d.secondary || 0))
    : 100;

  return (
    <div className="w-full rounded-xl bg-zinc-950/80 border border-white/[0.08] p-4 text-xs font-mono">
      {/* Chart Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4">
        <span className="text-zinc-400 font-sans font-medium text-xs flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Interactive Visual Evidence
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
            <span className="text-zinc-300">{meta.legendPrimary}</span>
          </div>
          {meta.legendSecondary && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
              <span className="text-zinc-300">{meta.legendSecondary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Chart Graphic */}
      <div className="h-44 w-full flex items-end justify-between gap-2 pt-2 pb-1 relative">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
          <div className="border-b border-white border-dashed w-full" />
          <div className="border-b border-white border-dashed w-full" />
          <div className="border-b border-white border-dashed w-full" />
        </div>

        {data.map((item, idx) => {
          const heightPercent = Math.max(12, Math.round((item.value / (maxValue * 1.1)) * 100));
          const secondaryHeightPercent = item.secondary
            ? Math.max(10, Math.round((item.secondary / (maxSecondary * 1.1)) * 100))
            : 0;
          const isHovered = activeIdx === idx;

          return (
            <div
              key={item.label}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer transition-all duration-200"
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-zinc-900 border border-emerald-500/40 shadow-xl shadow-black/60 rounded-md px-2.5 py-1 text-center whitespace-nowrap pointer-events-none">
                  <div className="text-[10px] text-zinc-400">{item.label}</div>
                  <div className="text-xs font-semibold text-emerald-400">
                    {meta.legendPrimary}: {item.value.toLocaleString()}
                  </div>
                  {item.secondary !== undefined && (
                    <div className="text-[10px] text-cyan-300">
                      {meta.legendSecondary}: {item.secondary.toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              {/* Bars or Plot Elements */}
              <div className="w-full max-w-[42px] flex items-end justify-center gap-1 h-full">
                {/* Primary Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t transition-all duration-300 ${
                    isHovered
                      ? "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      : "bg-emerald-500/80 group-hover:bg-emerald-400"
                  }`}
                />

                {/* Secondary Bar if present */}
                {item.secondary !== undefined && (
                  <div
                    style={{ height: `${secondaryHeightPercent}%` }}
                    className={`w-full rounded-t transition-all duration-300 ${
                      isHovered
                        ? "bg-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                        : "bg-cyan-500/70 group-hover:bg-cyan-400"
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-[10px] text-zinc-400 truncate w-full text-center group-hover:text-zinc-200 transition-colors">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis Information Footer */}
      <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-white/[0.04]">
        <span>Axis: {meta.xLabel}</span>
        <span>Metric: {meta.yLabel}</span>
      </div>
    </div>
  );
}

