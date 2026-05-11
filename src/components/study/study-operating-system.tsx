"use client";

import MiniSearch from "minisearch";
import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  FileText,
  FlaskConical,
  Folder,
  FolderOpen,
  Images,
  Layers,
  ListChecks,
  Network,
  RefreshCw,
  Search,
  Send,
  Sigma,
  Square,
  Target,
  Timer,
  Trophy,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatedBackdrop } from "@/components/study/animated-backdrop";
import { KnowledgeGraph } from "@/components/study/knowledge-graph";
import { MarkdownNote } from "@/components/study/markdown-note";
import { BarChart, DonutChart, LineChart } from "@/components/study/study-charts";
import { useStudyTelemetry, type StudyTelemetry } from "@/components/study/study-telemetry";
import { ContextRow, EmptyState, SmallMetric, StatPill, panel, spring } from "@/components/study/study-ui";
import { cn } from "@/lib/utils";
import type { Flashcard, TestQuestion, VaultIndex, VaultNote, VaultTreeItem } from "@/lib/types";

type ViewKey = "dashboard" | "graph" | "notes" | "flashcards" | "tests";

const viewItems: Array<{ id: ViewKey; label: string; icon: LucideIcon }> = [
  { id: "dashboard", label: "Command", icon: BarChart3 },
  { id: "notes", label: "Reader", icon: BookOpen },
  { id: "graph", label: "Graph", icon: Network },
  { id: "flashcards", label: "Recall", icon: Layers },
  { id: "tests", label: "Drills", icon: Timer },
];

export function StudyOperatingSystem() {
  const [index, setIndex] = useState<VaultIndex | null>(null);
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [activePath, setActivePath] = useState("All");
  const [selectedId, setSelectedId] = useState<string>();
  const [query, setQuery] = useState("");
  const [aiPrompt, setAiPrompt] = useState("Analyze my current weak areas and suggest the next study move.");
  const [aiAnswer, setAiAnswer] = useState("Ask the tutor after selecting a note, folder, flashcard, or drill.");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [vaultError, setVaultError] = useState<string | null>(null);
  const telemetry = useStudyTelemetry(activePath);

  const loadVault = useCallback(async () => {
    setVaultError(null);
    try {
      const response = await fetch("/api/vault", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Vault API returned ${response.status}`);
      }
      const data = (await response.json()) as VaultIndex;
      setIndex(data);
      setSelectedId((current) => current ?? data.notes.find((note) => note.relativePath.includes("/ph1/"))?.id ?? data.notes[0]?.id);
    } catch (error) {
      setVaultError(error instanceof Error ? error.message : "Unable to load the vault index.");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadVault();
  }, [loadVault]);

  const selectedNote = useMemo(() => {
    if (!index) return undefined;
    const graphNode = index.graph.nodes.find((node) => node.id === selectedId);
    return (
      index.notes.find((note) => note.id === selectedId) ??
      index.notes.find((note) => note.relativePath === graphNode?.path) ??
      index.notes[0]
    );
  }, [index, selectedId]);

  const activeSubject = activePath === "All" ? "All" : activePath.split("/")[0] ?? "All";

  const visibleNotes = useMemo(() => {
    if (!index) return [];
    if (activePath === "All") return index.notes;
    return index.notes.filter((note) => note.relativePath === activePath || note.relativePath.startsWith(`${activePath}/`));
  }, [activePath, index]);

  const scopedCards = useMemo(() => {
    if (!index) return [];
    if (activePath === "All") return index.flashcards;
    return index.flashcards.filter((card) => card.sourcePath.startsWith(activePath));
  }, [activePath, index]);

  const scopedTests = useMemo(() => {
    if (!index) return [];
    if (activePath === "All") return index.tests;
    return index.tests.filter((question) => question.sourcePath?.startsWith(activePath));
  }, [activePath, index]);

  const searchIndex = useMemo(() => {
    if (!index) return null;
    const mini = new MiniSearch<VaultNote>({
      fields: ["title", "excerpt", "content", "tags", "subject", "chapter", "relativePath"],
      storeFields: ["id", "title", "excerpt", "subject", "chapter", "tags", "relativePath"],
      searchOptions: { boost: { title: 4, tags: 2, chapter: 2 }, fuzzy: 0.16, prefix: true },
    });
    mini.addAll(index.notes);
    return mini;
  }, [index]);

  const searchResults = useMemo(() => {
    if (!query.trim() || !searchIndex) return [];
    return searchIndex.search(query).slice(0, 9);
  }, [query, searchIndex]);

  const selectFolder = (path: string) => {
    if (!index) return;
    setActivePath(path);
    const first = path === "All" ? index.notes[0] : index.notes.find((note) => note.relativePath.startsWith(`${path}/`) || note.relativePath === path);
    if (first) setSelectedId(first.id);
    setActiveView("notes");
  };

  const selectNote = (id: string) => {
    setSelectedId(id);
    setActiveView("notes");
  };

  const openWikiLink = useCallback(
    (title: string) => {
      const note = index?.notes.find((item) => item.title.toLowerCase() === title.toLowerCase());
      if (note) {
        selectNote(note.id);
      } else {
        setQuery(title);
      }
    },
    [index],
  );

  const askAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, provider: "local" }),
      });
      if (!response.ok) {
        throw new Error(`Tutor API returned ${response.status}`);
      }
      const data = await response.json();
      setAiAnswer(data.answer ?? "The tutor returned an empty response. Try a more specific prompt.");
    } catch (error) {
      setAiAnswer(error instanceof Error ? error.message : "The tutor is unavailable right now. Check your local AI provider and retry.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!index) {
    return (
      <main className="premium-shell min-h-screen overflow-hidden text-white">
        <AnimatedBackdrop />
        <div className="flex min-h-screen items-center justify-center p-6">
          <motion.div
            animate={vaultError ? { opacity: 1, scale: 1 } : { opacity: [0.35, 1, 0.35], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 2.1, repeat: vaultError ? 0 : Infinity }}
            className={cn(panel, "max-w-md px-6 py-5 text-center text-sm text-cyan-100")}
          >
            <p className="text-lg font-semibold text-white">{vaultError ? "Vault could not load" : "Indexing MasterVault..."}</p>
            {vaultError && <p className="mt-2 text-slate-300">{vaultError}</p>}
            {vaultError && (
              <button className="mt-4 rounded-full bg-white/12 px-4 py-2 text-white transition hover:bg-white/18" onClick={loadVault} type="button">
                Retry index
              </button>
            )}
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="premium-shell min-h-screen overflow-x-hidden text-slate-100">
      <AnimatedBackdrop />
      <div className="grid min-h-screen grid-cols-1 gap-4 p-3 lg:h-screen lg:grid-cols-[280px_minmax(0,1fr)_300px] xl:grid-cols-[300px_minmax(0,1fr)_320px] lg:p-4 xl:gap-5 xl:p-5">
        <VaultSidebar
          index={index}
          activePath={activePath}
          activeView={activeView}
          selectedId={selectedId}
          onPath={selectFolder}
          onView={setActiveView}
          onSelect={selectNote}
        />

        <section className="premium-workspace flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black/[0.18] shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-sm lg:h-[calc(100vh-2rem)]">
          <TopBar
            activePath={activePath}
            query={query}
            setQuery={setQuery}
            searchResults={searchResults}
            onSelect={(id) => {
              setSelectedId(id);
              setActiveView("notes");
              setQuery("");
            }}
            onReload={loadVault}
          />
          <MobileNav activeView={activeView} onView={setActiveView} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, scale: 0.99, filter: "blur(8px)" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7"
            >
              {activeView === "dashboard" && (
                <Dashboard index={index} cards={scopedCards} tests={scopedTests} notes={visibleNotes} telemetry={telemetry} onView={setActiveView} />
              )}
              {activeView === "notes" && selectedNote && (
                <NoteWorkspace note={selectedNote} notes={visibleNotes} onSelect={selectNote} onWikiLink={openWikiLink} />
              )}
              {activeView === "graph" && (
                <GraphWorkspace index={index} activeSubject={activeSubject} selectedId={selectedId} onSelect={selectNote} />
              )}
              {activeView === "flashcards" && <FlashcardWorkspace cards={scopedCards.length ? scopedCards : index.flashcards} telemetry={telemetry} />}
              {activeView === "tests" && <TestWorkspace questions={scopedTests.length ? scopedTests : index.tests} telemetry={telemetry} />}
            </motion.div>
          </AnimatePresence>
        </section>

        <AIPanel
          index={index}
          activePath={activePath}
          selectedNote={selectedNote}
          prompt={aiPrompt}
          answer={aiAnswer}
          loading={isAiLoading}
          onPrompt={setAiPrompt}
          onAsk={askAI}
        />
      </div>
    </main>
  );
}

function MobileNav({ activeView, onView }: { activeView: ViewKey; onView: (view: ViewKey) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-black/50 px-4 py-3 lg:hidden">
      {viewItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={cn("flex h-10 shrink-0 items-center gap-2 rounded-[8px] px-3 text-sm transition", activeView === item.id ? "bg-white/12 text-white" : "bg-white/6 text-slate-400")}
            onClick={() => onView(item.id)}
            type="button"
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function VaultSidebar(props: {
  index: VaultIndex;
  activePath: string;
  activeView: ViewKey;
  selectedId?: string;
  onPath: (path: string) => void;
  onView: (view: ViewKey) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="premium-rail hidden h-[calc(100vh-2rem)] min-h-0 overflow-y-auto rounded-[32px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:block">
      <div className="mb-6 flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 3, -3, 0], y: [0, -3, 0] }}
          transition={{ duration: 4.8, repeat: Infinity }}
          className="grid size-11 place-items-center rounded-[8px] border border-white/10 bg-white/8 text-cyan-100"
        >
          <Brain className="size-5" />
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/75">StudyUlt</p>
          <h1 className="text-xl font-semibold text-white">MasterVault</h1>
        </div>
      </div>

      <nav className="mb-6 grid grid-cols-2 gap-2">
        {viewItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={cn(
                "relative flex h-11 items-center gap-2 overflow-hidden rounded-[8px] border border-white/8 px-3 text-left text-sm transition",
                props.activeView === item.id ? "bg-white/12 text-white" : "bg-white/[0.035] text-slate-400 hover:bg-white/8 hover:text-white",
              )}
              onClick={() => props.onView(item.id)}
              type="button"
            >
              {props.activeView === item.id && <motion.span layoutId="side-view" className="absolute inset-0 bg-cyan-200/8" />}
              <Icon className="relative size-4 text-cyan-100" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
          <Folder className="size-3.5" />
          MasterVault
        </div>
        <button
          className={cn(
            "mb-1 flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-sm transition",
            props.activePath === "All" ? "bg-white/12 text-white" : "text-slate-400 hover:bg-white/8 hover:text-white",
          )}
          onClick={() => props.onPath("All")}
          type="button"
        >
          <span>All</span>
          <span className="text-xs text-slate-500">{props.index.notes.length}</span>
        </button>
        <div className="space-y-1">
          {props.index.tree.map((item) => (
            <TreeRow
              key={item.id}
              item={item}
              level={0}
              activePath={props.activePath}
              selectedId={props.selectedId}
              onPath={props.onPath}
              onSelect={props.onSelect}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
          <FileText className="size-3.5" />
          Recent Notes
        </div>
        <div className="space-y-1">
          {props.index.notes.slice(0, 8).map((note) => (
            <button
              key={note.id}
              className={cn(
                "w-full rounded-[8px] px-3 py-2 text-left text-sm transition",
                props.selectedId === note.id ? "bg-white/12 text-white" : "text-slate-400 hover:bg-white/8 hover:text-white",
              )}
              onClick={() => props.onSelect(note.id)}
              type="button"
            >
              <span className="line-clamp-1">{note.title}</span>
              <span className="line-clamp-1 text-xs text-slate-500">{note.relativePath}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function TreeRow(props: {
  item: VaultTreeItem;
  level: number;
  activePath: string;
  selectedId?: string;
  onPath: (path: string) => void;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(props.level < 2 || props.activePath.startsWith(props.item.path));
  const isFolder = props.item.kind === "folder";
  const isActive = props.activePath === props.item.path || props.selectedId === props.item.noteId;
  const Icon = isFolder ? (open ? FolderOpen : Folder) : FileText;

  return (
    <div>
      <button
        className={cn(
          "group flex h-9 w-full items-center gap-2 rounded-[8px] pr-2 text-sm transition",
          isActive ? "bg-cyan-100/10 text-white" : "text-slate-400 hover:bg-white/8 hover:text-white",
        )}
        style={{ paddingLeft: 10 + props.level * 14 }}
        onClick={() => {
          if (isFolder) {
            setOpen((value) => !value);
            props.onPath(props.item.path);
          } else if (props.item.noteId) {
            props.onSelect(props.item.noteId);
          }
        }}
        type="button"
      >
        {isFolder ? (
          <ChevronDown className={cn("size-3.5 transition", !open && "-rotate-90")} />
        ) : (
          <span className="w-3.5" />
        )}
        <Icon className="size-3.5 text-cyan-100/80" />
        <span className="min-w-0 flex-1 truncate text-left">{props.item.name}</span>
        <span className="text-xs text-slate-500">{props.item.count}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && isFolder && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {props.item.children.map((child) => (
              <TreeRow key={child.id} {...props} item={child} level={props.level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TopBar(props: {
  activePath: string;
  query: string;
  setQuery: (query: string) => void;
  searchResults: Array<{ id: string; title?: string; excerpt?: string; subject?: string; relativePath?: string }>;
  onSelect: (id: string) => void;
  onReload: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-white/10 bg-[#050608]/70 px-4 py-5 backdrop-blur-2xl sm:px-7">
      <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-100/75">
            <WandSparkles className="size-3.5" />
            Local AI / Graph Native / Markdown OS
          </p>
          <h2 className="text-2xl font-semibold text-white">{props.activePath === "All" ? "JEE Command Center" : props.activePath}</h2>
        </div>
        <div className="relative ml-auto w-full xl:max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            value={props.query}
            onChange={(event) => props.setQuery(event.target.value)}
            placeholder="Search notes, formulas, MCQs, flashcards..."
            className="h-12 w-full rounded-[8px] border border-white/10 bg-white/[0.075] pl-10 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-100/40 focus:bg-white/12"
          />
          <button className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-[6px] text-slate-400 transition hover:bg-white/10 hover:text-white" onClick={props.onReload} type="button">
            <RefreshCw className="size-4" />
          </button>
          {props.query && props.searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-14 z-30 overflow-hidden rounded-[8px] border border-white/10 bg-[#08090c]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl">
              {props.searchResults.map((result) => (
                <button key={result.id} className="block w-full border-b border-white/6 px-4 py-3 text-left transition last:border-0 hover:bg-white/8" onClick={() => props.onSelect(result.id)} type="button">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-white">{result.title}</span>
                    <span className="text-xs text-cyan-100">{result.subject}</span>
                  </div>
                  <p className="line-clamp-1 text-xs text-slate-500">{result.relativePath}</p>
                  <p className="line-clamp-1 text-sm text-slate-400">{result.excerpt}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Dashboard({
  index,
  notes,
  cards,
  tests,
  telemetry,
  onView,
}: {
  index: VaultIndex;
  notes: VaultNote[];
  cards: Flashcard[];
  tests: TestQuestion[];
  telemetry: StudyTelemetry;
  onView: (view: ViewKey) => void;
}) {
  const metrics = [
    { label: "Today", value: `${Math.round(telemetry.todayMinutes)}m`, icon: Clock3, view: "dashboard" as ViewKey },
    { label: "Questions", value: tests.length || index.analytics.questionCount, icon: ListChecks, view: "tests" as ViewKey },
    { label: "Flashcards", value: cards.length || index.analytics.flashcardCount, icon: Layers, view: "flashcards" as ViewKey },
    { label: "Accuracy", value: telemetry.averageScore ? `${telemetry.averageScore}%` : "--", icon: Trophy, view: "tests" as ViewKey },
  ];
  const nextNotes = notes
    .filter((note) => note.questionCount || note.tags.includes("weak") || note.tags.includes("revision"))
    .slice(0, 4);

  return (
    <div className="space-y-5 xl:space-y-6">
      <section className="grid gap-4 2xl:grid-cols-[1.25fr_.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className={cn(panel, "relative overflow-hidden p-7 xl:p-8")}
        >
          <div className="absolute -right-12 -top-16 h-72 w-72 rounded-full bg-[#f97316]/20 blur-3xl" />
          <div className="absolute -bottom-16 right-28 h-72 w-72 rounded-full bg-[#28d6bd]/16 blur-3xl" />
          <div className="relative flex flex-col gap-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#f7a36c]">Study cockpit</p>
              <h2 className="luxury-gradient-text mt-3 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] xl:text-6xl">Welcome back, Rehan</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Track today&apos;s focus, pick the next study object, and keep the vault moving instead of just storing notes.
              </p>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-slate-400">Current focus</p>
              <p className="mt-2 text-4xl font-semibold text-white">
                {Math.floor(telemetry.elapsedSeconds / 60).toString().padStart(2, "0")}:
                {(telemetry.elapsedSeconds % 60).toString().padStart(2, "0")}
              </p>
              <button
                className={cn(
                  "mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[8px] px-4 text-sm text-white transition",
                  telemetry.running ? "bg-[#f97316]/80 hover:bg-[#f97316]" : "bg-[#28d6bd]/70 hover:bg-[#28d6bd]/90",
                )}
                onClick={telemetry.running ? telemetry.stopFocus : telemetry.startFocus}
                type="button"
              >
                {telemetry.running ? <Square className="size-3.5" /> : <Timer className="size-4" />}
                {telemetry.running ? "End Session" : "Start Focus"}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.05 }} className={cn(panel, "p-5")}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Study Balance</h3>
              <p className="text-sm text-slate-400">Where your minutes are going.</p>
            </div>
            <CalendarDays className="size-5 text-[#28d6bd]" />
          </div>
          <DonutChart data={telemetry.studyMix} />
        </motion.div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric, itemIndex) => {
          const Icon = metric.icon;
          return (
            <motion.button
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: itemIndex * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={cn(panel, "group relative overflow-hidden p-5 text-left")}
              onClick={() => onView(metric.view)}
              type="button"
            >
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#f97316]/10 blur-2xl transition group-hover:bg-[#28d6bd]/10" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{metric.label}</span>
                <Icon className="size-4 text-[#28d6bd] transition group-hover:scale-110" />
              </div>
              <p className="mt-4 text-4xl font-semibold text-white">{metric.value}</p>
            </motion.button>
          );
        })}
      </section>

      <section className="grid gap-4 2xl:grid-cols-[1fr_1fr]">
        <div className={cn(panel, "p-5")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
              <p className="text-sm text-slate-400">Focus minutes, including the live session.</p>
            </div>
            <span className="rounded-[8px] bg-white/8 px-3 py-1.5 text-xs text-slate-300">{Math.round(telemetry.todayMinutes)} min today</span>
          </div>
          <LineChart data={telemetry.last7Days} />
        </div>

        <div className={cn(panel, "p-5")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Next Study Moves</h3>
              <p className="text-sm text-slate-400">Generated from weak tags, question density, and active scope.</p>
            </div>
            <button className="rounded-[8px] bg-[#f97316]/80 px-4 py-2 text-sm text-white transition hover:bg-[#f97316]" onClick={() => onView("flashcards")} type="button">
              Start
            </button>
          </div>
          <div className="grid gap-3">
            {[...index.tasks.slice(0, 2), ...nextNotes.map((note) => ({
              id: note.id,
              title: `Revise ${note.title}`,
              estimateMinutes: Math.max(12, Math.min(45, Math.round(note.wordCount / 95))),
              kind: "reading" as const,
              priority: note.tags.includes("weak") ? "high" as const : "medium" as const,
            }))].slice(0, 5).map((task, itemIndex) => (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIndex * 0.06 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 rounded-[8px] border border-white/8 bg-black/25 p-3 text-left transition hover:border-[#f97316]/30 hover:bg-white/8"
                onClick={() => onView(task.kind === "test" ? "tests" : task.kind === "flashcards" ? "flashcards" : "notes")}
                type="button"
              >
                <span className="grid size-10 place-items-center rounded-[8px] bg-[#f97316]/12 text-[#f7a36c]">
                  <Zap className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm font-medium text-white">{task.title}</span>
                  <span className="text-xs text-slate-500">{task.estimateMinutes} min / {task.kind}</span>
                </span>
                <span className="rounded-[6px] bg-white/8 px-2 py-1 text-xs text-slate-300">{task.priority}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[.85fr_1.15fr]">
        <div className={cn(panel, "p-5")}>
          <h3 className="text-xl font-semibold text-white">Scope Overview</h3>
          <p className="text-sm text-slate-400">Notes, questions, flashcards, and media in this slice.</p>
          <BarChart
            data={[
              { label: "Notes", value: notes.length },
              { label: "Questions", value: tests.length || index.analytics.questionCount },
              { label: "Cards", value: cards.length || index.analytics.flashcardCount },
              { label: "Images", value: notes.reduce((sum, note) => sum + note.imageCount, 0) },
            ]}
          />
        </div>
        <div className={cn(panel, "p-5")}>
          <h3 className="text-xl font-semibold text-white">Retention Field</h3>
          <p className="text-sm text-slate-400">A compact motion map of recent study intensity.</p>
          <div className="mt-5 grid grid-cols-7 gap-2 sm:[grid-template-columns:repeat(14,minmax(0,1fr))]">
            {index.analytics.heatmap.map((value, itemIndex) => (
              <motion.div
                key={`${value}-${itemIndex}`}
                initial={{ opacity: 0, scale: 0.45, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: itemIndex * 0.014 }}
                whileHover={{ scale: 1.18, y: -2 }}
                className="aspect-square rounded-[6px] border border-white/8"
                style={{ background: `linear-gradient(160deg, rgba(249,115,22,${0.05 + value / 280}), rgba(40,214,189,${0.05 + value / 190}))` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-3">
        {index.analytics.subjectProgress.map((subject) => (
          <motion.div key={subject.subject} whileHover={{ y: -4 }} className={cn(panel, "p-5")}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{subject.subject}</h3>
              <span className="text-sm text-cyan-100">{subject.completion}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div initial={{ width: 0 }} animate={{ width: `${subject.completion}%` }} transition={{ duration: 0.9, ease: "easeOut" }} className="animated-premium-gradient h-full rounded-full bg-gradient-to-r from-[#f97316] via-[#a78bfa] to-[#28d6bd]" />
            </div>
            <p className="mt-3 text-sm text-slate-400">{subject.weak} weak flags / {subject.links} relational links</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

function GraphWorkspace(props: { index: VaultIndex; activeSubject: string; selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid h-full min-h-[640px] gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className={cn(panel, "overflow-hidden p-2")}>
        <KnowledgeGraph index={props.index} subject={props.activeSubject} selectedId={props.selectedId} onSelect={props.onSelect} />
      </div>
      <div className={cn(panel, "p-5")}>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Network className="size-5 text-cyan-100" />
          Clean Graph
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          The graph now opens in local mode, then expands to chapter or capped global mode. This keeps your large vault readable and fast.
        </p>
        <div className="mt-5 space-y-3">
          {props.index.analytics.weakConcepts.map((concept) => (
            <div key={concept} className="rounded-[8px] border border-white/8 bg-black/25 p-3">
              <p className="text-sm font-medium text-white">{concept}</p>
              <p className="text-xs text-slate-500">Weak-area resurfacing</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoteWorkspace(props: { note: VaultNote; notes: VaultNote[]; onSelect: (id: string) => void; onWikiLink: (title: string) => void }) {
  return (
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
      <section className={cn(panel, "p-5")}>
        <div className="mb-5 border-b border-white/10 pb-4">
          <p className="text-sm text-cyan-100">{props.note.relativePath}</p>
          <h2 className="mt-2 text-4xl font-semibold leading-tight text-white">{props.note.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatPill icon={Sigma} label={`${props.note.wordCount} words`} />
            <StatPill icon={ListChecks} label={`${props.note.questionCount} questions`} />
            <StatPill icon={Images} label={`${props.note.imageCount} images`} />
          </div>
        </div>
        <MarkdownNote note={props.note} onWikiLink={props.onWikiLink} />
      </section>
      <aside className="space-y-4">
        <div className={cn(panel, "p-4")}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Folder Notes</h3>
          <div className="mt-3 max-h-[46vh] space-y-2 overflow-y-auto pr-1">
            {props.notes.map((note) => (
              <button key={note.id} className={cn("block w-full rounded-[8px] px-3 py-2 text-left text-sm transition", props.note.id === note.id ? "bg-white/12 text-white" : "bg-black/25 text-slate-400 hover:bg-white/8 hover:text-white")} onClick={() => props.onSelect(note.id)} type="button">
                <span className="line-clamp-1">{note.title}</span>
                <span className="text-xs text-slate-500">{note.questionCount} questions</span>
              </button>
            ))}
          </div>
        </div>
        <div className={cn(panel, "p-4")}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Backlinks</h3>
          <div className="mt-3 space-y-2">
            {(props.note.backlinks.length ? props.note.backlinks : ["No backlinks yet"]).map((link) => (
              <button key={link} className="block w-full rounded-[8px] bg-black/25 px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/8 hover:text-white" onClick={() => props.onWikiLink(link)} type="button">
                {link}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function FlashcardWorkspace({ cards, telemetry }: { cards: Flashcard[]; telemetry: StudyTelemetry }) {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState("");
  const [reviewed, setReviewed] = useState(0);
  const filtered = useMemo(() => cards.filter((card) => `${card.question} ${card.answer} ${card.sourcePath}`.toLowerCase().includes(filter.toLowerCase())).slice(0, 300), [cards, filter]);
  const card = filtered[active] ?? filtered[0];

  if (!card) {
    return <EmptyState title="No flashcards found" body="This folder has no parsed flashcards yet. Open another vault folder or add Q/A markdown." />;
  }

  return (
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className={cn(panel, "relative flex min-h-[610px] items-center justify-center overflow-hidden p-6")}>
        <div className="absolute left-6 top-6 right-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Deck progress</span>
            <span>{Math.min(reviewed, filtered.length)} / {filtered.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="animated-premium-gradient h-full rounded-full bg-gradient-to-r from-[#f97316] via-[#a78bfa] to-[#28d6bd]"
              animate={{ width: `${filtered.length ? Math.min(100, (reviewed / filtered.length) * 100) : 0}%` }}
            />
          </div>
        </div>
        <motion.button
          className="glass-sheen relative h-[390px] w-full max-w-3xl rounded-[8px] border border-white/12 bg-[#0b0d10]/82 p-8 text-left shadow-[0_34px_120px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0, y: [0, -8, 0] }}
          transition={{ rotateY: { duration: 0.5 }, y: { duration: 4.8, repeat: Infinity } }}
          whileHover={{ scale: 1.015, rotateX: 2 }}
          onClick={() => setFlipped((value) => !value)}
          type="button"
        >
          <div className={cn("absolute inset-0 p-8 [backface-visibility:hidden]", flipped && "opacity-0")}>
            <p className="text-sm text-cyan-100">{card.sourcePath}</p>
            <h2 className="mt-8 text-3xl font-semibold leading-tight text-white">{card.question}</h2>
            <p className="absolute bottom-8 left-8 text-sm text-slate-500">Click to reveal answer</p>
          </div>
          <div className="absolute inset-0 rotate-y-180 p-8 [backface-visibility:hidden]">
            <p className="text-sm text-cyan-100">Answer</p>
            <h2 className="mt-8 text-2xl font-semibold leading-tight text-white">{card.answer}</h2>
          </div>
        </motion.button>
      </section>
      <aside className={cn(panel, "p-5")}>
        <h3 className="text-lg font-semibold text-white">Recall Deck</h3>
        <p className="mt-1 text-sm text-slate-400">{filtered.length} cards loaded</p>
        <input
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setActive(0);
            setFlipped(false);
          }}
          placeholder="Filter cards..."
          className="mt-4 h-10 w-full rounded-[8px] border border-white/10 bg-black/25 px-3 text-sm text-white outline-none focus:border-cyan-100/40"
        />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["Forgot", "Hard", "Good", "Easy"].map((label, itemIndex) => (
            <button
              key={label}
              className="rounded-[8px] border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-200 transition hover:border-[#28d6bd]/40 hover:bg-white/12"
              onClick={() => {
                telemetry.logEvent({ kind: "flashcards", label: `${label}: ${card.sourcePath}`, minutes: 1 });
                setReviewed((value) => value + 1);
                setFlipped(false);
                setActive((value) => (value + 1) % Math.max(filtered.length, 1));
              }}
              type="button"
            >
              {label}
              <span className="ml-2 text-xs text-slate-500">+{itemIndex + 1}d</span>
            </button>
          ))}
        </div>
        <div className="mt-5 max-h-[42vh] space-y-2 overflow-y-auto pr-1">
          {filtered.slice(0, 80).map((item, index) => (
            <button key={item.id} className={cn("block w-full rounded-[8px] px-3 py-2 text-left text-sm transition", active === index ? "bg-white/12 text-white" : "bg-black/25 text-slate-400 hover:bg-white/8 hover:text-white")} onClick={() => { setActive(index); setFlipped(false); }} type="button">
              <span className="line-clamp-2">{item.question}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <SmallMetric label="Reviewed" value={reviewed} />
          <SmallMetric label="Due" value={filtered.length} />
        </div>
      </aside>
    </div>
  );
}

function TestWorkspace({ questions, telemetry }: { questions: TestQuestion[]; telemetry: StudyTelemetry }) {
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => questions.filter((question) => `${question.prompt} ${question.concept} ${question.sourcePath}`.toLowerCase().includes(filter.toLowerCase())).slice(0, 500), [filter, questions]);
  const question = filtered[active] ?? filtered[0];
  const selected = question ? answers[question.id] : "";
  const answered = Object.keys(answers).length;
  const score = questions.filter((item) => answers[item.id] && answers[item.id] === item.answer).length;
  const progress = filtered.length ? ((active + 1) / filtered.length) * 100 : 0;

  if (!question) {
    return <EmptyState title="No questions found" body="This folder has no parsed tests. Your ph1 MCQs and quizzes are supported, so try selecting Physics/ph1." />;
  }

  return (
    <div className="grid gap-4 2xl:grid-cols-[320px_minmax(0,1fr)_280px]">
      <aside className={cn(panel, "p-4")}>
        <h3 className="text-lg font-semibold text-white">Question Bank</h3>
        <p className="text-sm text-slate-400">{filtered.length} parsed questions</p>
        <input
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setActive(0);
          }}
          placeholder="Filter questions..."
          className="mt-4 h-10 w-full rounded-[8px] border border-white/10 bg-black/25 px-3 text-sm text-white outline-none focus:border-cyan-100/40"
        />
        <div className="mt-4 max-h-[66vh] space-y-2 overflow-y-auto pr-1">
          {filtered.slice(0, 160).map((item, index) => (
            <button key={item.id} className={cn("flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-sm transition", active === index ? "bg-white/12 text-white" : "bg-black/25 text-slate-400 hover:bg-white/8 hover:text-white")} onClick={() => setActive(index)} type="button">
              {answers[item.id] ? <Check className="size-3.5 text-cyan-100" /> : <CircleDot className="size-3.5 text-slate-600" />}
              <span className="line-clamp-2">{item.prompt}</span>
            </button>
          ))}
        </div>
      </aside>
      <section className={cn(panel, "relative overflow-hidden p-6")}>
        <div className="absolute inset-x-0 top-0 h-1 bg-white/8">
          <motion.div className="animated-premium-gradient h-full bg-gradient-to-r from-[#f97316] via-[#a78bfa] to-[#28d6bd]" animate={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-cyan-100">Question {active + 1} / {filtered.length} / {question.type}</p>
          <span className="rounded-[6px] bg-white/8 px-2 py-1 text-xs text-slate-300">{question.difficulty}</span>
        </div>
        <h2 className="mt-5 text-2xl font-semibold leading-snug text-white">{question.prompt}</h2>
        <div className="mt-6 grid gap-3">
          {question.options?.length ? (
            question.options.map((option) => (
              <button
                key={option}
                className={cn("rounded-[8px] border border-white/10 bg-black/25 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-[#f97316]/30 hover:bg-white/8", selected === option && "border-[#28d6bd]/60 bg-white/12 text-white")}
                onClick={() => {
                  if (!answers[question.id]) {
                    telemetry.logEvent({
                      kind: "test",
                      label: question.concept,
                      minutes: 1,
                      score: option === question.answer ? 1 : 0,
                      total: 1,
                    });
                  }
                  setAnswers((value) => ({ ...value, [question.id]: option }));
                }}
                type="button"
              >
                {option}
              </button>
            ))
          ) : (
            <input
              value={selected}
              onChange={(event) => setAnswers((value) => ({ ...value, [question.id]: event.target.value }))}
              onBlur={() => {
                if (selected) {
                  telemetry.logEvent({ kind: "test", label: question.concept, minutes: 1 });
                }
              }}
              placeholder="Type your answer..."
              className="h-12 rounded-[8px] border border-white/10 bg-black/25 px-4 text-sm text-white outline-none focus:border-[#28d6bd]/40"
            />
          )}
        </div>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-[8px] border border-white/10 bg-white/6 p-4">
            <p className="text-sm text-slate-400">Correct answer</p>
            <p className="mt-1 font-medium text-white">{question.answer || "Review manually"}</p>
            {question.explanation && <p className="mt-3 text-sm leading-6 text-slate-300">{question.explanation}</p>}
          </motion.div>
        )}
        <div className="mt-6 flex justify-between">
          <button className="rounded-[8px] bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12" onClick={() => setActive((value) => Math.max(0, value - 1))} type="button">
            Previous
          </button>
          <button className="rounded-[8px] bg-white/12 px-4 py-2 text-sm text-white transition hover:bg-white/18" onClick={() => setActive((value) => Math.min(filtered.length - 1, value + 1))} type="button">
            Next
          </button>
        </div>
      </section>
      <aside className={cn(panel, "h-fit p-5")}>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Timer className="size-5 text-cyan-100" />
          Drill Analytics
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <SmallMetric label="Answered" value={answered} />
          <SmallMetric label="Score" value={`${score}/${questions.length}`} />
        </div>
        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-500">Question Types</p>
          <BarChart
            data={[
              { label: "MCQ", value: questions.filter((item) => item.type === "mcq").length },
              { label: "Num", value: questions.filter((item) => item.type === "numerical").length },
              { label: "AR", value: questions.filter((item) => item.type === "assertion-reason").length },
            ]}
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">{question.sourcePath}</p>
      </aside>
    </div>
  );
}

function AIPanel(props: {
  index: VaultIndex;
  activePath: string;
  selectedNote?: VaultNote;
  prompt: string;
  answer: string;
  loading: boolean;
  onPrompt: (prompt: string) => void;
  onAsk: () => void;
}) {
  return (
    <aside className="premium-rail hidden h-[calc(100vh-2rem)] min-h-0 overflow-y-auto rounded-[32px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:block">
      <div className={cn(panel, "p-4")}>
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[8px] bg-white/10 text-cyan-100">
            <Bot className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold text-white">AI Tutor</h2>
            <p className="text-xs text-slate-500">Ollama / OpenRouter / LM Studio ready</p>
          </div>
        </div>
        <textarea value={props.prompt} onChange={(event) => props.onPrompt(event.target.value)} className="mt-4 min-h-28 w-full resize-none rounded-[8px] border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-100/40" placeholder="Ask about formulas, weak concepts, PYQs..." />
        <button className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-white/12 text-sm text-white transition hover:bg-white/18" onClick={props.onAsk} type="button">
          {props.loading ? <RefreshCw className="size-4 animate-spin" /> : <Send className="size-4" />}
          Ask Tutor
        </button>
      </div>
      <motion.div layout className={cn(panel, "mt-4 p-4")}>
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Tutor Response</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{props.answer}</p>
      </motion.div>
      <div className={cn(panel, "mt-4 p-4")}>
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Active Context</h3>
        <div className="mt-3 space-y-3">
          <ContextRow icon={Folder} label="Scope" value={props.activePath} />
          <ContextRow icon={BookOpen} label="Note" value={props.selectedNote?.title ?? "No note"} />
          <ContextRow icon={FlaskConical} label="Formulas" value={String(props.selectedNote?.formulas.length ?? 0)} />
          <ContextRow icon={Layers} label="Flashcards" value={String(props.index.flashcards.length)} />
          <ContextRow icon={Target} label="Weak Areas" value={String(props.index.analytics.weakConcepts.length)} />
        </div>
      </div>
    </aside>
  );
}
