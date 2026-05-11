"use client";

import { motion } from "framer-motion";

export function LineChart({ data }: { data: Array<{ label: string; minutes: number }> }) {
  const max = Math.max(30, ...data.map((item) => item.minutes));
  const points = data.map((item, index) => {
    const x = 28 + index * (344 / Math.max(1, data.length - 1));
    const y = 150 - (item.minutes / max) * 108;
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="relative h-56 overflow-hidden rounded-[8px] border border-white/8 bg-black/20 p-3">
      <svg viewBox="0 0 400 190" className="h-full w-full">
        <defs>
          <linearGradient id="lineGlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#28d6bd" />
          </linearGradient>
          <linearGradient id="areaGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#28d6bd" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#28d6bd" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line key={line} x1="20" x2="382" y1={42 + line * 36} y2={42 + line * 36} stroke="rgba(255,255,255,.08)" />
        ))}
        <motion.path
          d={`${path} L ${points.at(-1)?.x ?? 372} 170 L ${points[0]?.x ?? 28} 170 Z`}
          fill="url(#areaGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGlow)"
          strokeLinecap="round"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {points.map((point, index) => (
          <g key={point.label}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#111316"
              stroke={index === points.length - 1 ? "#28d6bd" : "#f8c9a8"}
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.07 }}
            />
            <text x={point.x} y="184" textAnchor="middle" fill="rgba(226,232,240,.55)" fontSize="10">
              {point.label}
            </text>
            <text x={point.x} y={Math.max(18, point.y - 12)} textAnchor="middle" fill="rgba(255,255,255,.78)" fontSize="10">
              {Math.round(point.minutes)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function DonutChart({ data }: { data: Array<{ label: string; value: number }> }) {
  const total = Math.max(1, data.reduce((sum, item) => sum + item.value, 0));
  const colors = ["#f97316", "#28d6bd", "#a78bfa", "#f5d26a"];
  const segments = data.map((item) => {
    const previous = data
      .slice(0, data.indexOf(item))
      .reduce((sum, current) => sum + (current.value / total) * 264, 0);
    const length = (item.value / total) * 264;
    return { ...item, length, offset: previous };
  });

  return (
    <div className="mt-5 grid grid-cols-1 items-center gap-4 sm:grid-cols-[130px_minmax(0,1fr)]">
      <svg viewBox="0 0 120 120" className="size-32 -rotate-90">
        <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="14" />
        {segments.map((item, index) => {
          const dash = `${item.length} ${264 - item.length}`;
          return (
            <motion.circle
              key={item.label}
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke={colors[index % colors.length]}
              strokeDasharray={dash}
              strokeDashoffset={-item.offset}
              strokeLinecap="round"
              strokeWidth="14"
              initial={{ strokeDasharray: `0 264` }}
              animate={{ strokeDasharray: dash }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            />
          );
        })}
      </svg>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-[8px] bg-black/20 px-3 py-2">
            <span className="flex items-center gap-2 text-sm capitalize text-slate-300">
              <span className="size-2 rounded-full" style={{ background: colors[index % colors.length] }} />
              {item.label}
            </span>
            <span className="text-sm text-white">{Math.round(item.value)}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ data }: { data: Array<{ label: string; value: number }> }) {
  const max = Math.max(1, ...data.map((item) => item.value));

  return (
    <div className="mt-5 flex h-56 items-end gap-3 rounded-[8px] border border-white/8 bg-black/20 p-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
          <motion.div
            className="rounded-t-[8px] border border-white/10"
            style={{
              background: index % 2 ? "linear-gradient(180deg,#28d6bd,#143f3a)" : "linear-gradient(180deg,#f97316,#4a2111)",
            }}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(8, (item.value / max) * 100)}%` }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
          />
          <div className="text-center">
            <p className="truncate text-xs text-slate-400">{item.label}</p>
            <p className="text-sm font-medium text-white">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
