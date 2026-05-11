"use client";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { VaultNote } from "@/lib/types";

type MarkdownNoteProps = {
  note: VaultNote;
  onWikiLink: (title: string) => void;
};

function hydrateWikiLinks(content: string) {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    return `[${label || target}](vault://${encodeURIComponent(target)})`;
  });
}

export function MarkdownNote({ note, onWikiLink }: MarkdownNoteProps) {
  const noteDir = note.relativePath.split("/").slice(0, -1).join("/");

  return (
    <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:no-underline prose-a:text-cyan-100 prose-strong:text-white prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("vault://")) {
              return (
                <button
                  className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-sm text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                  onClick={() => onWikiLink(decodeURIComponent(href.replace("vault://", "")))}
                  type="button"
                >
                  {children}
                </button>
              );
            }

            return (
              <a className="rounded text-cyan-100 transition hover:text-white" href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            const rawSrc = String(src ?? "");
            const resolvedPath = rawSrc.startsWith("http")
              ? rawSrc
              : `/api/vault/asset?path=${encodeURIComponent(`${noteDir}/${rawSrc}`)}`;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolvedPath}
                alt={alt ?? ""}
                className="my-5 max-h-[520px] w-auto rounded border border-white/10 bg-white/5 shadow-2xl shadow-black/40"
                loading="lazy"
              />
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="rounded border-l-2 border-cyan-300/60 bg-cyan-300/10 px-4 py-2 text-cyan-50">
              {children}
            </blockquote>
          ),
        }}
      >
        {hydrateWikiLinks(note.content)}
      </ReactMarkdown>
    </article>
  );
}
