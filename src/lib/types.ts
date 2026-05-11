export type VaultNodeType =
  | "note"
  | "concept"
  | "formula"
  | "flashcard"
  | "test"
  | "revision";

export type GraphNode = {
  id: string;
  label: string;
  type: VaultNodeType;
  subject?: string;
  chapter?: string;
  tags: string[];
  summary?: string;
  path?: string;
  strength?: number;
  degree?: number;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  label: string;
};

export type VaultNote = {
  id: string;
  title: string;
  slug: string;
  relativePath: string;
  subject: string;
  chapter: string;
  tags: string[];
  links: string[];
  backlinks: string[];
  formulas: string[];
  excerpt: string;
  content: string;
  frontmatter: Record<string, unknown>;
  updatedAt: string;
  wordCount: number;
  questionCount: number;
  imageCount: number;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  subject: string;
  chapter: string;
  sourcePath: string;
  tags: string[];
  intervalDays: number;
  memoryStrength: number;
  due: string;
};

export type TestQuestion = {
  id: string;
  type: "mcq" | "numerical" | "assertion-reason" | "matrix-match" | "integer";
  prompt: string;
  options?: string[];
  answer: string;
  explanation?: string;
  concept: string;
  sourcePath?: string;
  difficulty: "easy" | "medium" | "hard";
};

export type VaultTreeItem = {
  id: string;
  name: string;
  path: string;
  kind: "folder" | "note";
  count: number;
  noteId?: string;
  children: VaultTreeItem[];
};

export type StudyTask = {
  id: string;
  title: string;
  kind: "revision" | "flashcards" | "test" | "reading";
  estimateMinutes: number;
  priority: "low" | "medium" | "high";
};

export type VaultAnalytics = {
  noteCount: number;
  linkCount: number;
  flashcardCount: number;
  testCount: number;
  retention: number;
  streakDays: number;
  weakConcepts: string[];
  dueFlashcards: number;
  subjectProgress: Array<{
    subject: string;
    completion: number;
    weak: number;
    links: number;
  }>;
  heatmap: number[];
  questionCount: number;
  imageCount: number;
};

export type VaultIndex = {
  root: string;
  updatedAt: string;
  subjects: string[];
  tree: VaultTreeItem[];
  notes: VaultNote[];
  graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  flashcards: Flashcard[];
  tests: TestQuestion[];
  tasks: StudyTask[];
  analytics: VaultAnalytics;
};

export type AIProvider =
  | "ollama"
  | "lm-studio"
  | "openrouter"
  | "claude"
  | "gemini"
  | "deepseek"
  | "local";
