import { useMemo, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownContentProps = {
  children: string;
};

function htmlAttributeValue(attributes: string, name: string): string {
  const match = attributes.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match?.[1] || "";
}

function escapeMarkdownImageText(value: string): string {
  return value.replace(/[[\]\\]/g, "\\$&");
}

function normalizeImageTags(source: string): string {
  return source.replace(/<img\b([^>]*)\/?>/gi, (_match, attributes) => {
    const src = htmlAttributeValue(attributes, "src");
    if (!src) return "";

    const alt = htmlAttributeValue(attributes, "alt");
    const title = htmlAttributeValue(attributes, "title");
    const escapedAlt = escapeMarkdownImageText(alt);
    const escapedTitle = title.replace(/"/g, '\\"');
    const titleMarkdown = escapedTitle ? ` "${escapedTitle}"` : "";

    return `![${escapedAlt}](${src}${titleMarkdown})`;
  });
}

/**
 * react-markdown does not interpret raw HTML in the source string.
 * Kit/docs copy often mixes markdown with a few HTML tags, normalize those
 * to markdown so they render without extra plugins.
 */
function normalizeHtmlInMarkdown(source: string): string {
  return (
    normalizeImageTags(source)
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

function splitMarkdownTableRow(row: string): string[] {
  const trimmedRow = row.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let cell = "";
  let escaped = false;

  Array.from(trimmedRow).forEach((character) => {
    if (character === "|" && !escaped) {
      cells.push(cell.trim());
      cell = "";
      return;
    }

    cell += character;
    escaped = character === "\\" && !escaped;
  });

  cells.push(cell.trim());
  return cells;
}

function isMarkdownTableSeparator(row: string): boolean {
  const cells = splitMarkdownTableRow(row);

  return (
    cells.length > 1 &&
    cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
  );
}

function isMarkdownTableStart(lines: string[], index: number): boolean {
  const nextLine = lines[index + 1];
  if (!nextLine) return false;

  return lines[index].includes("|") && isMarkdownTableSeparator(nextLine);
}

function isMarkdownTableRow(row: string): boolean {
  return row.trim().length > 0 && row.includes("|");
}

function renderMarkdown(content: string, key: string): ReactNode {
  return (
    <ReactMarkdown key={key}>{normalizeHtmlInMarkdown(content)}</ReactMarkdown>
  );
}

function renderMarkdownTable(rows: string[], key: string): ReactNode {
  const headerCells = splitMarkdownTableRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitMarkdownTableRow);

  return (
    <table key={key}>
      <thead>
        <tr>
          {headerCells.map((cell, index) => (
            <th key={`${key}-head-${index}`}>
              {renderMarkdown(cell, `${key}-head-cell-${index}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, rowIndex) => (
          <tr key={`${key}-row-${rowIndex}`}>
            {headerCells.map((_headerCell, cellIndex) => (
              <td key={`${key}-row-${rowIndex}-cell-${cellIndex}`}>
                {renderMarkdown(
                  row[cellIndex] || "",
                  `${key}-row-${rowIndex}-markdown-${cellIndex}`,
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderMarkdownBlocks(source: string): ReactNode[] {
  const normalizedSource = normalizeImageTags(source);
  const lines = normalizedSource.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  const textBuffer: string[] = [];
  let insideFence = false;
  let index = 0;

  const flushText = () => {
    if (textBuffer.length === 0) return;

    blocks.push(
      renderMarkdown(textBuffer.join("\n"), `markdown-${blocks.length}`),
    );
    textBuffer.length = 0;
  };

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim().startsWith("```")) {
      insideFence = !insideFence;
      textBuffer.push(line);
      index += 1;
      continue;
    }

    if (!insideFence && isMarkdownTableStart(lines, index)) {
      flushText();

      const tableRows = [lines[index], lines[index + 1]];
      index += 2;

      while (index < lines.length && isMarkdownTableRow(lines[index])) {
        tableRows.push(lines[index]);
        index += 1;
      }

      blocks.push(renderMarkdownTable(tableRows, `table-${blocks.length}`));
      continue;
    }

    textBuffer.push(line);
    index += 1;
  }

  flushText();
  return blocks;
}

/**
 * Markdown with common embedded HTML normalized to real markdown.
 * Content is expected to be authored/trusted (kit copy, internal docs).
 */
export function MarkdownContent({ children }: MarkdownContentProps) {
  const blocks = useMemo(() => renderMarkdownBlocks(children), [children]);
  return <>{blocks}</>;
}
