import type { AIProvider, VaultIndex } from "@/lib/types";

export type AIRequest = {
  provider?: AIProvider;
  prompt: string;
  vault: Pick<VaultIndex, "notes" | "analytics" | "graph">;
};

export async function answerWithStudyContext(request: AIRequest) {
  const weak = request.vault.analytics.weakConcepts.slice(0, 3).join(", ");
  const linkedNotes = request.vault.notes
    .filter((note) =>
      request.prompt
        .toLowerCase()
        .split(/\W+/)
        .some((token) => token.length > 3 && note.title.toLowerCase().includes(token)),
    )
    .slice(0, 3);

  const localEndpoint = process.env.LOCAL_AI_ENDPOINT;
  if (localEndpoint) {
    try {
      const response = await fetch(localEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: request.provider ?? "local",
          prompt: request.prompt,
          context: linkedNotes.map((note) => ({
            title: note.title,
            path: note.relativePath,
            excerpt: note.excerpt,
            links: note.links,
          })),
        }),
      });

      if (response.ok) {
        return response.json();
      }
    } catch {
      // Fall through to the deterministic local assistant.
    }
  }

  return {
    provider: request.provider ?? "local",
    answer:
      linkedNotes.length > 0
        ? `I found ${linkedNotes.map((note) => note.title).join(", ")} in your vault. Start by revising the definitions, then trace the wikilinks into formulas and PYQ drills. Current weak-concept queue: ${weak}.`
        : `I can work from the local vault even without an external model. Your current weak-concept queue is ${weak}; ask about a chapter, formula, or test pattern and I will bind the response to the graph context.`,
    sources: linkedNotes.map((note) => ({
      title: note.title,
      path: note.relativePath,
    })),
  };
}
