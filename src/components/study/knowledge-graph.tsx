"use client";

import cytoscape, { type Core } from "cytoscape";
import { motion } from "framer-motion";
import { Maximize2, Orbit, Radar, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { GraphEdge, GraphNode, VaultIndex } from "@/lib/types";

type GraphMode = "local" | "chapter" | "global";

type KnowledgeGraphProps = {
  index: VaultIndex;
  subject: string;
  selectedId?: string;
  onSelect: (id: string) => void;
};

const modes: Array<{ id: GraphMode; label: string; icon: LucideIcon }> = [
  { id: "local", label: "Local", icon: Radar },
  { id: "chapter", label: "Chapter", icon: Orbit },
  { id: "global", label: "Global", icon: Maximize2 },
];

function uniqueEdges(edges: GraphEdge[]) {
  const seen = new Set<string>();
  return edges.filter((edge) => {
    const key = `${edge.source}-${edge.target}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildElements(index: VaultIndex, subject: string, selectedId: string | undefined, mode: GraphMode) {
  const selected = index.graph.nodes.find((node) => node.id === selectedId);
  const visibleBySubject = index.graph.nodes.filter(
    (node) => subject === "All" || node.subject === subject || node.id === selectedId,
  );

  let nodes: GraphNode[] = visibleBySubject;
  let edges = index.graph.edges;

  if (mode === "local" && selectedId) {
    const neighborIds = new Set<string>([selectedId]);
    for (const edge of index.graph.edges) {
      if (edge.source === selectedId) neighborIds.add(edge.target);
      if (edge.target === selectedId) neighborIds.add(edge.source);
    }
    nodes = index.graph.nodes.filter((node) => neighborIds.has(node.id));
    edges = index.graph.edges.filter((edge) => neighborIds.has(edge.source) && neighborIds.has(edge.target));
  }

  if (mode === "chapter" && selected?.chapter) {
    nodes = visibleBySubject.filter(
      (node) => node.chapter === selected.chapter && node.type !== "formula",
    );
    edges = index.graph.edges.filter((edge) => {
      const source = nodes.find((node) => node.id === edge.source);
      const target = nodes.find((node) => node.id === edge.target);
      return Boolean(source && target);
    });
  }

  if (mode === "global") {
    nodes = visibleBySubject
      .filter((node) => node.type !== "formula" || (node.degree ?? 0) > 2)
      .sort((a, b) => (b.degree ?? 0) - (a.degree ?? 0))
      .slice(0, 180);
    const nodeIds = new Set(nodes.map((node) => node.id));
    edges = index.graph.edges.filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)).slice(0, 260);
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  return {
    nodes,
    edges: uniqueEdges(edges.filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))),
  };
}

export function KnowledgeGraph({ index, subject, selectedId, onSelect }: KnowledgeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [mode, setMode] = useState<GraphMode>("local");
  const graph = useMemo(() => buildElements(index, subject, selectedId, mode), [index, mode, selectedId, subject]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...graph.nodes.map((node) => ({
          data: {
            id: node.id,
            label: node.label,
            type: node.type,
            degree: node.degree ?? 0,
            selected: node.id === selectedId ? "yes" : "no",
          },
        })),
        ...graph.edges.map((edge) => ({
          data: {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            label: edge.label,
          },
        })),
      ],
      style: [
        {
          selector: "node",
          style: {
            width: "mapData(degree, 0, 30, 12, 34)",
            height: "mapData(degree, 0, 30, 12, 34)",
            "background-color": "#8fe8ff",
            "border-color": "#ffffff",
            "border-width": 1,
            "font-family": "Inter, Arial, sans-serif",
            "font-size": 10,
            color: "#f2eee8",
            label: "data(label)",
            "text-background-color": "#060711",
            "text-background-opacity": 0.82,
            "text-background-padding": "3px",
            "text-margin-y": 9,
            "text-valign": "bottom",
            "text-halign": "center",
            "overlay-opacity": 0,
          },
        },
        {
          selector: 'node[type = "concept"]',
          style: {
            width: 26,
            height: 26,
            "background-color": "#ff8a4c",
            "border-color": "#ffffff",
          },
        },
        {
          selector: 'node[type = "formula"]',
          style: {
            width: 9,
            height: 9,
            "background-color": "#2df5d0",
            label: "",
          },
        },
        {
          selector: 'node[selected = "yes"]',
          style: {
            width: 42,
            height: 42,
            "background-color": "#ffffff",
            "border-color": "#ffffff",
            "border-width": 2,
            color: "#ffffff",
            "font-size": 12,
          },
        },
        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "rgba(143,232,255,0.24)",
            "target-arrow-color": "rgba(45,245,208,0.58)",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            opacity: 0.78,
          },
        },
      ],
      layout:
        mode === "local"
          ? { name: "concentric", animate: true, animationDuration: 450, fit: true, padding: 70, minNodeSpacing: 34 }
          : { name: "cose", animate: true, animationDuration: 650, fit: true, padding: 62, nodeRepulsion: 22000, idealEdgeLength: 105 },
      wheelSensitivity: 0.12,
      minZoom: 0.22,
      maxZoom: 2.4,
    });

    cy.on("tap", "node", (event) => {
      onSelect(event.target.id());
    });

    cy.on("mouseover", "node", (event) => {
      event.target.connectedEdges().animate({ style: { opacity: 1, width: 2 } }, { duration: 120 });
    });

    cy.on("mouseout", "node", (event) => {
      event.target.connectedEdges().animate({ style: { opacity: 0.78, width: 1 } }, { duration: 120 });
    });

    cyRef.current = cy;
    return () => cy.destroy();
  }, [graph, mode, onSelect, selectedId]);

  return (
    <div className="relative h-full min-h-[560px] w-full overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_28%_18%,rgba(45,245,208,0.12),transparent_26%),radial-gradient(circle_at_78%_82%,rgba(249,115,22,0.1),transparent_28%),#070812]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-50" />
      <div className="absolute left-4 top-4 z-10 flex rounded-[18px] border border-white/10 bg-black/45 p-1 backdrop-blur-xl">
        {modes.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={cn(
                "relative flex h-9 items-center gap-2 rounded-[6px] px-3 text-xs transition",
                mode === item.id ? "text-white" : "text-slate-400 hover:text-white",
              )}
              onClick={() => setMode(item.id)}
              type="button"
            >
              {mode === item.id && (
                <motion.span
                  layoutId="graph-mode"
                  className="absolute inset-0 rounded-[14px] bg-white/10"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <Icon className="relative size-3.5" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 z-10 rounded-[18px] border border-white/10 bg-black/45 px-3 py-2 text-xs text-slate-300 backdrop-blur-xl">
        {graph.nodes.length} nodes / {graph.edges.length} links / click a node to open
      </div>
      <div ref={containerRef} className="h-full min-h-[560px] w-full" />
    </div>
  );
}
