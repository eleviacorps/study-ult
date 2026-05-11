import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  Flashcard,
  GraphEdge,
  GraphNode,
  StudyTask,
  TestQuestion,
  VaultIndex,
  VaultNote,
  VaultTreeItem,
} from "@/lib/types";

const VAULT_ROOT = path.join(process.cwd(), "MasterVault");

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeTitle(value: string) {
  return value
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function walkMarkdown(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkMarkdown(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function firstHeading(content: string) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]+?\$\$/g, " formula ")
    .replace(/\$[^$\n]+\$/g, " formula ")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/[#*_>`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function extractWikiLinks(content: string) {
  return unique(
    Array.from(content.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)).map((match) =>
      match[1].trim(),
    ),
  );
}

function extractTags(content: string, frontmatterTags: unknown) {
  const inline = Array.from(content.matchAll(/(^|\s)#([A-Za-z][\w/-]*)/g)).map(
    (match) => match[2],
  );
  const fm = Array.isArray(frontmatterTags)
    ? frontmatterTags.map(String)
    : typeof frontmatterTags === "string"
      ? frontmatterTags.split(",").map((tag) => tag.trim())
      : [];

  return unique([...inline, ...fm]).sort();
}

function extractFormulas(content: string) {
  return unique(
    Array.from(content.matchAll(/(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g)).map((match) =>
      match[1].replace(/\s+/g, " ").trim(),
    ),
  );
}

function extractQuestionCount(content: string) {
  const numbered = content.match(/\*\*Q\d+[:.]\*\*/g)?.length ?? 0;
  const compact = content.match(/(?:^-|\n-)\s*(?:Q|MCQ)::/g)?.length ?? 0;
  return numbered + compact;
}

function extractImageCount(content: string) {
  return content.match(/!\[[^\]]*\]\([^)]+\)/g)?.length ?? 0;
}

function cleanAnswer(value: string) {
  return value
    .replace(/^>\s?/gm, "")
    .replace(/\[!ANSWER\]/g, "")
    .replace(/^Answer:\s*/i, "")
    .trim();
}

function sectionForQuestion(content: string, offset: number) {
  const before = content.slice(0, offset);
  const headings = Array.from(before.matchAll(/^##+\s+(.+)$/gm));
  return headings.at(-1)?.[1]?.replace(/[#*_`]/g, "").trim();
}

function parseFlashcards(note: VaultNote): Flashcard[] {
  const compactCards = Array.from(
    note.content.matchAll(/(?:^-|\n-)\s*Q::\s*(.+?)\s*A::\s*(.+?)(?=\n-|$)/gs),
  ).map((match, index): Flashcard => ({
    id: `${note.id}-card-${index + 1}`,
    question: match[1].trim(),
    answer: match[2].trim(),
    subject: note.subject,
    chapter: note.chapter,
    sourcePath: note.relativePath,
    tags: note.tags,
    intervalDays: 1 + index * 2,
    memoryStrength: Math.max(42, 86 - index * 9),
    due: new Date(Date.now() + (index % 3) * 86_400_000).toISOString(),
  }));

  const blockCards = Array.from(
    note.content.matchAll(/\*\*Q(\d+)[:.]\*\*\s*([\s\S]*?)\n\*\*A:\*\*\s*([\s\S]*?)(?=\n---|\n\*\*Q\d+[:.]\*\*|$)/g),
  ).map((match, index): Flashcard => ({
    id: `${note.id}-card-${match[1]}`,
    question: match[2].trim(),
    answer: cleanAnswer(match[3]),
    subject: note.subject,
    chapter: note.chapter,
    sourcePath: note.relativePath,
    tags: note.tags,
    intervalDays: 1 + (index % 8),
    memoryStrength: Math.max(35, 92 - (index % 12) * 5),
    due: new Date(Date.now() + (index % 5) * 86_400_000).toISOString(),
  }));

  return [...compactCards, ...blockCards];
}

function parseTests(note: VaultNote): TestQuestion[] {
  const compact = Array.from(
    note.content.matchAll(
      /(?:^-|\n-)\s*MCQ::\s*(.+?)\s*Options::\s*(.+?)\s*Answer::\s*(.+?)(?=\n-|$)/gs,
    ),
  ).map((match, index): TestQuestion => ({
    id: `${note.id}-test-${index + 1}`,
    type: "mcq",
    prompt: match[1].trim(),
    options: match[2].split("|").map((option) => option.trim()),
    answer: match[3].trim(),
    concept: note.title,
    sourcePath: note.relativePath,
    difficulty: index % 3 === 0 ? "hard" : index % 2 === 0 ? "medium" : "easy",
  }));

  const numbered = Array.from(
    note.content.matchAll(/\*\*Q(\d+)[:.]\*\*\s*([\s\S]*?)(?=\n---|\n\*\*Q\d+[:.]\*\*|\n## Answer|$)/g),
  )
    .map((match, index): TestQuestion | null => {
      const block = match[2].trim();
      const optionMatches = Array.from(block.matchAll(/^\s*-\s*\(([a-d])\)\s*(.+)$/gim));
      const options = optionMatches.map((option) => `(${option[1].toLowerCase()}) ${option[2].trim()}`);
      const answerMatch =
        block.match(/\[!ANSWER\]\s*\(([a-d])\)\s*([^\n]*)\n?([\s\S]*)/i) ??
        block.match(/(?:→|->)\s*\*\*(?:Answer:\s*)?\(?([a-d])\)?\*\*([\s\S]*)/i);
      const answerKey = answerMatch?.[1]?.toLowerCase();
      const explanation = answerMatch ? cleanAnswer(`${answerMatch[2] ?? ""}\n${answerMatch[3] ?? ""}`) : "";
      const prompt = block
        .replace(/^\s*-\s*\([a-d]\)\s*.+$/gim, "")
        .replace(/^>\s?\[!ANSWER\][\s\S]*$/im, "")
        .replace(/(?:→|->)\s*\*\*[\s\S]*$/m, "")
        .trim();

      if (!prompt) return null;
      const answer = answerKey
        ? options.find((option) => option.toLowerCase().startsWith(`(${answerKey})`)) ?? `(${answerKey})`
        : cleanAnswer(block.match(/\(Ans:\s*([^)]+)\)/i)?.[1] ?? "");

      return {
        id: `${note.id}-q-${match[1]}`,
        type: options.length ? "mcq" : prompt.toLowerCase().includes("assertion") ? "assertion-reason" : "numerical",
        prompt,
        options: options.length ? options : undefined,
        answer,
        explanation,
        concept: sectionForQuestion(note.content, match.index ?? 0) ?? note.title,
        sourcePath: note.relativePath,
        difficulty: index < 30 ? "easy" : index < 70 ? "medium" : "hard",
      };
    })
    .filter((question): question is TestQuestion => Boolean(question));

  return [...compact, ...numbered];
}

async function readNote(filePath: string): Promise<VaultNote> {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const relativePath = path.relative(VAULT_ROOT, filePath).replace(/\\/g, "/");
  const parts = relativePath.split("/");
  const subject = parts[0] ?? "General";
  const chapter = parts.length > 2 ? parts[1] : subject;
  const title = String(parsed.data.title ?? firstHeading(parsed.content) ?? path.basename(filePath, ".md"));
  const stat = await fs.stat(filePath);
  const plain = stripMarkdown(parsed.content);

  return {
    id: slugify(relativePath.replace(/\.md$/, "")),
    title,
    slug: slugify(title),
    relativePath,
    subject,
    chapter,
    tags: extractTags(parsed.content, parsed.data.tags),
    links: extractWikiLinks(parsed.content),
    backlinks: [],
    formulas: extractFormulas(parsed.content),
    excerpt: plain.slice(0, 220),
    content: parsed.content.trim(),
    frontmatter: parsed.data,
    updatedAt: stat.mtime.toISOString(),
    wordCount: plain.split(/\s+/).filter(Boolean).length,
    questionCount: extractQuestionCount(parsed.content),
    imageCount: extractImageCount(parsed.content),
  };
}

function buildGraph(notes: VaultNote[]) {
  const byTitle = new Map(notes.map((note) => [note.title.toLowerCase(), note]));
  const backlinks = new Map(notes.map((note) => [note.title, [] as string[]]));
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const folderIds = new Set<string>();

  for (const note of notes) {
    const chapterId = `folder-${slugify(`${note.subject}/${note.chapter}`)}`;
    if (!folderIds.has(chapterId)) {
      folderIds.add(chapterId);
      nodes.set(chapterId, {
        id: chapterId,
        label: note.chapter,
        type: "concept",
        subject: note.subject,
        chapter: note.chapter,
        tags: ["chapter"],
        summary: `${note.subject}/${note.chapter}`,
        path: `${note.subject}/${note.chapter}`,
        strength: 92,
      });
    }

    nodes.set(note.id, {
      id: note.id,
      label: note.title,
      type: "note",
      subject: note.subject,
      chapter: note.chapter,
      tags: note.tags,
      summary: note.excerpt,
      path: note.relativePath,
      strength: Math.min(86, 42 + note.links.length * 5 + Math.min(20, note.questionCount / 8)),
    });

    edges.push({
      id: `${chapterId}-${note.id}`,
      source: chapterId,
      target: note.id,
      label: "contains",
    });

    for (const [index, formula] of note.formulas.slice(0, note.title.toLowerCase().includes("formula") ? 18 : 3).entries()) {
      const formulaId = `${note.id}-formula-${index + 1}`;
      nodes.set(formulaId, {
        id: formulaId,
        label: formula.replace(/\$/g, "").slice(0, 36),
        type: "formula",
        subject: note.subject,
        chapter: note.chapter,
        tags: ["formula", ...note.tags],
        summary: `Formula from ${note.title}`,
        path: note.relativePath,
        strength: 72,
      });
      edges.push({
        id: `${note.id}-${formulaId}`,
        source: note.id,
        target: formulaId,
        label: "uses formula",
      });
    }
  }

  for (const note of notes) {
    for (const link of note.links) {
      const target = byTitle.get(link.toLowerCase());
      const targetId = target?.id ?? `concept-${slugify(link)}`;

      if (!target) {
        nodes.set(targetId, {
          id: targetId,
          label: link,
          type: "concept",
          subject: note.subject,
          chapter: note.chapter,
          tags: ["unresolved", ...note.tags],
          summary: `Concept referenced from ${note.title}`,
          strength: 38,
        });
      } else {
        backlinks.get(target.title)?.push(note.title);
      }

      edges.push({
        id: `${note.id}-${targetId}`,
        source: note.id,
        target: targetId,
        label: "wikilink",
      });
    }
  }

  for (const note of notes) {
    note.backlinks = unique(backlinks.get(note.title) ?? []);
  }

  const degree = new Map<string, number>();
  for (const edge of edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }

  return {
    nodes: Array.from(nodes.values()).map((node) => ({ ...node, degree: degree.get(node.id) ?? 0 })),
    edges,
  };
}

function buildAnalytics(notes: VaultNote[], edges: GraphEdge[], flashcards: Flashcard[], tests: TestQuestion[]) {
  const subjects = unique(notes.map((note) => note.subject));
  const weakConcepts = notes
    .filter((note) => note.tags.includes("weak") || note.tags.includes("revision"))
    .map((note) => note.title)
    .slice(0, 5);

  return {
    noteCount: notes.length,
    linkCount: edges.length,
    flashcardCount: flashcards.length,
    testCount: tests.length,
    retention: 84,
    streakDays: 17,
    weakConcepts: weakConcepts.length ? weakConcepts : ["Gauss Law", "Ionic Equilibrium", "Definite Integration"],
    dueFlashcards: flashcards.filter((card) => new Date(card.due).getTime() <= Date.now() + 86_400_000).length,
    subjectProgress: subjects.map((subject, index) => {
      const subjectNotes = notes.filter((note) => note.subject === subject);
      return {
        subject,
        completion: Math.min(96, 58 + subjectNotes.length * 8 + index * 5),
        weak: subjectNotes.filter((note) => note.tags.includes("weak")).length + index,
        links: edges.filter((edge) => edge.source.startsWith(slugify(subject))).length,
      };
    }),
    heatmap: Array.from({ length: 28 }, (_, index) => 25 + ((index * 17) % 72)),
    questionCount: notes.reduce((sum, note) => sum + note.questionCount, 0),
    imageCount: notes.reduce((sum, note) => sum + note.imageCount, 0),
  };
}

function buildTasks(analytics: ReturnType<typeof buildAnalytics>): StudyTask[] {
  return [
    {
      id: "task-flashcards",
      title: `Review ${analytics.dueFlashcards || 6} due flashcards`,
      kind: "flashcards",
      estimateMinutes: 18,
      priority: "high",
    },
    {
      id: "task-weak",
      title: `Patch weak area: ${analytics.weakConcepts[0]}`,
      kind: "revision",
      estimateMinutes: 35,
      priority: "high",
    },
    {
      id: "task-test",
      title: "Run a 20-minute mixed JEE drill",
      kind: "test",
      estimateMinutes: 20,
      priority: "medium",
    },
    {
      id: "task-formula",
      title: "Formula sweep across Physics and Maths",
      kind: "reading",
      estimateMinutes: 12,
      priority: "medium",
    },
  ];
}

function buildTree(notes: VaultNote[]): VaultTreeItem[] {
  const root: VaultTreeItem[] = [];
  const folders = new Map<string, VaultTreeItem>();

  function ensureFolder(parts: string[]) {
    let current = root;
    let currentPath = "";
    let folder: VaultTreeItem | undefined;

    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      folder = folders.get(currentPath);
      if (!folder) {
        folder = {
          id: `folder-${slugify(currentPath)}`,
          name: normalizeTitle(part),
          path: currentPath,
          kind: "folder",
          count: 0,
          children: [],
        };
        folders.set(currentPath, folder);
        current.push(folder);
      }
      folder.count += 1;
      current = folder.children;
    }

    return folder;
  }

  for (const note of notes) {
    const parts = note.relativePath.split("/");
    const file = parts.pop() ?? note.title;
    const folder = ensureFolder(parts);
    const item: VaultTreeItem = {
      id: note.id,
      name: normalizeTitle(file),
      path: note.relativePath,
      kind: "note",
      count: note.questionCount,
      noteId: note.id,
      children: [],
    };

    if (folder) {
      folder.children.push(item);
    } else {
      root.push(item);
    }
  }

  const sortTree = (items: VaultTreeItem[]) => {
    items.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    items.forEach((item) => sortTree(item.children));
  };

  sortTree(root);
  return root;
}

export async function getVaultIndex(): Promise<VaultIndex> {
  await fs.mkdir(VAULT_ROOT, { recursive: true });
  const files = await walkMarkdown(VAULT_ROOT);
  const notes = await Promise.all(files.map(readNote));
  const graph = buildGraph(notes);
  const flashcards = notes.flatMap(parseFlashcards);
  const tests = notes.flatMap(parseTests);
  const analytics = buildAnalytics(notes, graph.edges, flashcards, tests);
  const sortedNotes = notes.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  return {
    root: VAULT_ROOT,
    updatedAt: new Date().toISOString(),
    subjects: unique(notes.map((note) => note.subject)).sort(),
    tree: buildTree(sortedNotes),
    notes: sortedNotes,
    graph,
    flashcards,
    tests,
    tasks: buildTasks(analytics),
    analytics,
  };
}
