const COMPONENT_KITS: Record<string, string> = {
  Caption: "caption",
  Body: "body",
  Button: "button",
  Title: "title",
  Badge: "badge",
  Icon: "icon",
  FlexItem: "flex/flex_item",
};

const CAPTION_FALLBACK_CLASS = "pb_caption_kit_md";

type JsxSegment =
  | { type: "self_closing"; name: string; attrs: string }
  | { type: "block"; name: string; attrs: string; content: string }
  | { type: "text"; content: string };

function formatRailsPropName(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/-/g, "_")
    .toLowerCase();
}

function coerceJsxValue(value: string): string | number | boolean {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^['"](.*)['"]$/);
  if (quoted) return quoted[1];
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed === "true" || trimmed === "false") return trimmed === "true";
  return trimmed;
}

function parseJsxAttrs(attrString: string): Record<string, unknown> {
  const props: Record<string, unknown> = {};

  attrString.replace(/([\w]+)="([^"]*)"/g, (_, name, value) => {
    props[formatRailsPropName(name)] = value;
    return "";
  });

  attrString.replace(/([\w]+)=\{([^}]*)\}/g, (_, name, value) => {
    props[formatRailsPropName(name)] = coerceJsxValue(value);
    return "";
  });

  ["dark", "grow", "shrink", "displayFlex"].forEach((name) => {
    const snake = formatRailsPropName(name);
    if (!attrString.includes(`${name}=`) && new RegExp(`\\b${name}\\b`).test(attrString)) {
      props[snake] = true;
    }
  });

  return props;
}

function formatRubyProps(props: Record<string, unknown>): string {
  const entries = Object.entries(props).filter(([, value]) => value !== undefined && value !== "");
  if (entries.length === 0) return "";

  const inner = entries
    .map(([key, value]) => {
      if (typeof value === "boolean") return `${key}: ${value}`;
      if (typeof value === "number") return `${key}: ${value}`;
      return `${key}: ${JSON.stringify(String(value))}`;
    })
    .join(", ");

  return `props: { ${inner} }`;
}

export function extractJsxText(content: string): string {
  const text = content.trim();
  const jsxQuoted = text.match(/^\{'([^']*)'\}$/);
  if (jsxQuoted) return jsxQuoted[1];
  const jsxDoubleQuoted = text.match(/^\{"([^"]*)"\}$/);
  if (jsxDoubleQuoted) return jsxDoubleQuoted[1];
  return text;
}

function parseSegments(children: string): JsxSegment[] {
  const segments: JsxSegment[] = [];
  let remaining = children.trim();

  while (remaining.length > 0) {
    remaining = remaining.replace(/^\s+/, "");

    const selfClosing = remaining.match(/^<([A-Z][A-Za-z]*)(\s[^>]*)?\s*\/>/);
    if (selfClosing) {
      segments.push({
        type: "self_closing",
        name: selfClosing[1],
        attrs: selfClosing[2] ?? "",
      });
      remaining = remaining.slice(selfClosing[0].length);
      continue;
    }

    const block = remaining.match(/^<([A-Z][A-Za-z]*)(\s[^>]*)?>([\s\S]*?)<\/\1>/);
    if (block) {
      segments.push({
        type: "block",
        name: block[1],
        attrs: block[2] ?? "",
        content: block[3],
      });
      remaining = remaining.slice(block[0].length);
      continue;
    }

    const jsxText = remaining.match(/^\{'([^']*)'\}/);
    if (jsxText) {
      segments.push({ type: "text", content: jsxText[1] });
      remaining = remaining.slice(jsxText[0].length);
      continue;
    }

    const plain = remaining.match(/^([^\n<]+)/);
    if (plain?.[1]?.trim()) {
      segments.push({ type: "text", content: plain[1].trim() });
      remaining = remaining.slice(plain[0].length);
      continue;
    }

    break;
  }

  return segments;
}

function renderComponentLines(
  name: string,
  props: Record<string, unknown>,
  innerLines: string[] | null,
  indent: string
): string[] {
  const kit = COMPONENT_KITS[name];
  const propsBlock = formatRubyProps(props);

  if (kit) {
    if (innerLines && innerLines.length > 0) {
      const opener = propsBlock
        ? `${indent}<%= pb_rails("${kit}", ${propsBlock}) do %>`
        : `${indent}<%= pb_rails("${kit}") do %>`;
      return [opener, ...innerLines, `${indent}<% end %>`];
    }

    if (propsBlock) {
      return [`${indent}<%= pb_rails("${kit}", ${propsBlock}) %>`];
    }

    return [`${indent}<%= pb_rails("${kit}") %>`];
  }

  if (name === "Caption") {
    const text = String(props.text ?? innerLines?.[0]?.trim() ?? "");
    if (text) {
      return [`${indent}<div class="${CAPTION_FALLBACK_CLASS}">${text}</div>`];
    }
  }

  return [];
}

function renderSegmentLines(segment: JsxSegment, indent: string): string[] {
  if (segment.type === "text") {
    return [`${indent}${segment.content}`];
  }

  const props = parseJsxAttrs(segment.attrs);

  if (segment.type === "self_closing") {
    return renderComponentLines(segment.name, props, null, indent);
  }

  const innerContent = segment.content.trim();
  let innerLines: string[] | null = null;

  if (looksLikeJsxChildren(innerContent)) {
    innerLines = translateJsxChildrenToRails(innerContent, indent);
  } else if (innerContent) {
    innerLines = [`${indent}${extractJsxText(innerContent)}`];
  }

  return renderComponentLines(segment.name, props, innerLines, indent);
}

export function wrapFlexDocExample(code: string): string {
  return `<div class="flex-doc-example">\n${code}\n</div>`;
}

export function wrapFlexOutput(kitName: string, code: string): string {
  return kitName === "flex" ? wrapFlexDocExample(code) : code;
}

export function looksLikeRailsChildren(children?: string | null): boolean {
  return Boolean(children?.includes("pb_rails("));
}

export function parseJsxBodyChildren(
  children?: string
): { text?: string; dark: boolean } | null {
  if (!children?.trim()) return null;

  const match = children.trim().match(/^<Body(\s+([^>]*))?\s*\/?>$/i);
  if (!match) return null;

  const attrs = match[2] ?? "";
  const textMatch = attrs.match(/text="([^"]*)"/);

  return {
    text: textMatch?.[1],
    dark: /\bdark\b/.test(attrs),
  };
}

export function formatBodyProps(body: { text?: string; dark: boolean }): string {
  const props: string[] = [];
  if (body.text) props.push(`text: ${JSON.stringify(body.text)}`);
  if (body.dark) props.push("dark: true");
  return props.length > 0 ? `{ ${props.join(", ")} }` : "{}";
}

function formatBodyJsxAsRails(children: string): string | null {
  const body = parseJsxBodyChildren(children);
  if (!body) return null;

  const propsBlock = formatBodyProps(body);
  return propsBlock === "{}"
    ? `<%= pb_rails("body") %>`
    : `<%= pb_rails("body", props: ${propsBlock}) %>`;
}

export function childrenToBlockLines(children: string, indent = "  "): string[] {
  const trimmed = children.trim();
  if (looksLikeRailsChildren(trimmed)) return railsChildrenToBlockLines(trimmed, indent);
  if (looksLikeJsxChildren(trimmed)) return translateJsxChildrenToRails(trimmed, indent);
  return [`${indent}${extractJsxText(trimmed)}`];
}

export function stripRailsChildrenIndent(children: string): string {
  return children
    .split("\n")
    .map((line) => line.replace(/^\s+/, ""))
    .join("\n");
}

export function formatChildrenForRailsEditor(children: string): string {
  const trimmed = children.trim();
  if (!trimmed) return children;
  if (looksLikeRailsChildren(trimmed)) return stripRailsChildrenIndent(children);

  const bodyLine = formatBodyJsxAsRails(trimmed);
  if (bodyLine) return bodyLine;

  const jsxText = trimmed.match(/^\{'([^']*)'\}$/);
  if (jsxText) return jsxText[1];

  if (looksLikeJsxChildren(trimmed)) {
    return translateJsxChildrenToRails(trimmed, "").join("\n");
  }

  return children;
}

export function railsChildrenToBlockLines(children: string, indent = "  "): string[] {
  return children
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (indent && !line.startsWith(indent) ? `${indent}${line}` : line));
}

export function looksLikeJsxChildren(children?: string | null): boolean {
  return Boolean(children?.trim().match(/<[A-Z][A-Za-z]*/));
}

export function translateJsxChildrenToRails(children: string, indent = "  "): string[] {
  return parseSegments(children).flatMap((segment) => renderSegmentLines(segment, indent));
}

export function formatFlexItemPropsFromPanel(
  propValues: Record<string, { enabled?: boolean; value?: unknown }>
): string[] {
  const mapping: Record<string, string> = {
    flexItemFixedSize: "fixed_size",
    flexItemGrow: "grow",
    flexItemShrink: "shrink",
    flexItemFlex: "flex",
    flexItemOrder: "order",
    flexItemAlignSelf: "align_self",
    flexItemDisplayFlex: "display_flex",
  };

  const lines: string[] = [];
  Object.entries(mapping).forEach(([panelName, railsName]) => {
    const prop = propValues[panelName];
    if (!prop?.enabled || prop.value === undefined || prop.value === "") return;

    if (typeof prop.value === "boolean") {
      lines.push(`    ${railsName}: ${prop.value}`);
    } else if (typeof prop.value === "number") {
      lines.push(`    ${railsName}: ${prop.value}`);
    } else {
      lines.push(`    ${railsName}: ${JSON.stringify(String(prop.value))}`);
    }
  });

  return lines;
}
