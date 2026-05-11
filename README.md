# StudyUlt AI Study OS

A localhost-first, markdown-native AI study operating system for JEE, NCERT, boards, active recall, and graph-based learning.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## What Is Built

- Next.js, React, TypeScript, TailwindCSS
- Framer Motion animated dashboard and transitions
- Three.js particle backdrop through React Three Fiber
- Cytoscape.js Obsidian-style concept graph
- Markdown vault parser with frontmatter, tags, wikilinks, backlinks, formulas, flashcards, and tests
- MiniSearch instant fuzzy search
- LaTeX rendering with remark/rehype
- Local AI route with pluggable provider fallback for Ollama, LM Studio, OpenRouter, Claude, Gemini, and DeepSeek style endpoints
- Project MCP setup for 21st.dev Magic, Magic UI, Shadcn, Aceternity registry, and React Bits registry

## Vault Structure

Markdown lives in `MasterVault`.

```text
MasterVault/
  Physics/
  Chemistry/
  Mathematics/
  Flashcards/
  Tests/
  Analytics/
```

Any `.md` file is indexed on API refresh. Use:

```markdown
---
title: Gauss Law
tags: [JEE, Physics, weak]
---

Link to [[Electric Field]] and formulas like $E = kq/r^2$.

- Q:: Question text A:: Answer text
- MCQ:: Prompt Options:: A | B | C | D Answer:: A
```

## MCP And Registries

Project-local MCP config is in `.mcp.json` and `.vscode/mcp.json`.

Shadcn registry aliases are in `components.json`:

- `@aceternity`
- `@react-bits`

Codex MCP server entries were also added to `C:/Users/Rehan/.codex/config.toml` for this trusted workspace.

## AI Providers

For local inference, set `LOCAL_AI_ENDPOINT` in `.env.local`. The API route posts:

```json
{
  "provider": "local",
  "prompt": "Explain Gauss Law",
  "context": []
}
```

Without an endpoint, the app uses a deterministic local tutor fallback connected to the vault analytics.
