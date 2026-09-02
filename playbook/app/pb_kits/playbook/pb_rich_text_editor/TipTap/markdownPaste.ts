const NEUTRAL_CLIPBOARD_TAGS = new Set(["html", "head", "body", "meta", "div", "span", "p"])
const MARKDOWN_SOURCE_TAGS = new Set([...NEUTRAL_CLIPBOARD_TAGS, "pre", "code"])

type MarkdownJSONNode = {
  content?: MarkdownJSONNode[],
  marks?: unknown[],
  type: string,
}

type MarkdownDocumentNode = {
  content: unknown,
  toJSON: () => MarkdownJSONNode,
  type: { schema: unknown },
}

type MarkdownParser = {
  parse: (text: string) => MarkdownDocumentNode | null,
}

type MarkdownDOMSerializer = {
  fromSchema: (schema: unknown) => {
    serializeFragment: (content: unknown) => DocumentFragment,
  },
}

type MarkdownDependencies = {
  parser: MarkdownParser,
  serializer: MarkdownDOMSerializer,
}

const hasRichTextFormatting = (html: string, text: string): boolean => {
  if (!html) return false

  const clipboardDocument = new DOMParser().parseFromString(html, "text/html")
  const elements = [...clipboardDocument.querySelectorAll("*")]
  const hasStyledElement = elements.some((element) => element.hasAttribute("style"))
  if (hasStyledElement) return true

  const hasOnlyNeutralTags = elements.every((element) =>
    NEUTRAL_CLIPBOARD_TAGS.has(element.tagName.toLowerCase())
  )
  if (hasOnlyNeutralTags) return false

  const hasOnlyMarkdownSourceTags = elements.every((element) =>
    MARKDOWN_SOURCE_TAGS.has(element.tagName.toLowerCase())
  )
  const sourceTextMatches = clipboardDocument.body.textContent?.trim() === text.trim()
  return !(hasOnlyMarkdownSourceTags && sourceTextMatches)
}

const hasMarkdownFormatting = (node: MarkdownJSONNode): boolean => {
  const isFormattedNode = !["doc", "paragraph", "text"].includes(node.type)
  if (isFormattedNode || node.marks?.length) return true

  return node.content?.some(hasMarkdownFormatting) || false
}

const createMarkdownToHTML = (
  markdownParser: MarkdownParser,
  domSerializer: MarkdownDOMSerializer
) => (text: string): string | null => {
  const documentNode = markdownParser.parse(text)
  if (!documentNode || !hasMarkdownFormatting(documentNode.toJSON())) return null

  const container = document.createElement("div")
  const serializer = domSerializer.fromSchema(documentNode.type.schema)
  container.appendChild(serializer.serializeFragment(documentNode.content))
  container.querySelectorAll("[data-tight]").forEach((node) => node.removeAttribute("data-tight"))

  return container.innerHTML
}

const handleMarkdownPaste = (
  event: ClipboardEvent,
  insertHTML: (html: string) => void,
  markdownToHTML: (text: string) => string | null
): boolean => {
  const text = event.clipboardData?.getData("text/plain")
  const richHtml = event.clipboardData?.getData("text/html")
  if (!text || hasRichTextFormatting(richHtml, text)) return false

  let html
  try {
    html = markdownToHTML(text)
  } catch (_error) {
    return false
  }
  if (!html) return false

  event.preventDefault()
  event.stopImmediatePropagation()
  insertHTML(html)
  return true
}

export {
  createMarkdownToHTML,
  handleMarkdownPaste,
}
export type { MarkdownDependencies }
