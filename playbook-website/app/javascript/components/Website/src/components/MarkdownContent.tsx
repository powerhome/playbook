import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  children: string;
};

/**
 * react-markdown does not interpret raw HTML in the source string.
 * Kit/docs copy often mixes markdown with a few HTML tags, normalize those
 * to markdown so they render without extra plugins.
 */
function normalizeHtmlInMarkdown(source: string): string {
  return (
    source
      .replace(/<br\s*\/?>/gi, "  \n")
      .replace(/<\/p>\s*<p>/gi, "\n\n")
      .replace(/<p\b[^>]*>/gi, "")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
      .replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
      .replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
      .replace(/<i\b[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
      .replace(
        /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        "[$2]($1)",
      )
  );
}

/**
 * Markdown with common embedded HTML normalized to real markdown.
 * Content is expected to be authored/trusted (kit copy, internal docs).
 */
export function MarkdownContent({ children }: MarkdownContentProps) {
  const normalized = useMemo(() => normalizeHtmlInMarkdown(children), [children]);
  return <ReactMarkdown>{normalized}</ReactMarkdown>;
}
