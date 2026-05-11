"use client";

import { Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const panel =
  "premium-panel rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.045)_42%,rgba(255,255,255,0.025))] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_34px_110px_rgba(0,0,0,0.52)] backdrop-blur-2xl";

export const spring = { type: "spring", stiffness: 320, damping: 30 } as const;

export function StatPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-slate-300">
      <Icon className="size-3.5 text-cyan-100" />
      {label}
    </span>
  );
}

export function SmallMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[8px] bg-black/25 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

export function ContextRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[8px] bg-black/25 px-3 py-2">
      <Icon className="size-4 text-cyan-100" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="line-clamp-1 text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className={cn(panel, "flex min-h-[420px] flex-col items-center justify-center p-8 text-center")}>
      <Sparkles className="size-8 text-cyan-100" />
      <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{body}</p>
    </div>
  );
}
