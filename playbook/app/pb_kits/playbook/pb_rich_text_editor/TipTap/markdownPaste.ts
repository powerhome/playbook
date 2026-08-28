import { defaultMarkdownParser } from "prosemirror-markdown"
import { DOMSerializer } from "prosemirror-model"

const NEUTRAL_CLIPBOARD_TAGS = new Set(["html", "head", "body", "meta", "div", "span", "p"])

type MarkdownJSONNode = {
  content?: MarkdownJSONNode[],
  marks?: unknown[],
  type: string,
}

const hasRichTextFormatting = (html: string): boolean => {
  if (!html) return false

  const clipboardDocument = new DOMParser().parseFromString(html, "text/html")
  return [...clipboardDocument.querySelectorAll("*")].some(
    (element) =>
      !NEUTRAL_CLIPBOARD_TAGS.has(element.tagName.toLowerCase()) ||
      element.hasAttribute("style")
  )
}

const hasMarkdownFormatting = (node: MarkdownJSONNode): boolean => {
  const isFormattedNode = !["doc", "paragraph", "text"].includes(node.type)
  if (isFormattedNode || node.marks?.length) return true

  return node.content?.some(hasMarkdownFormatting) || false
}

const markdownToHTML = (text: string): string | null => {
  const documentNode = defaultMarkdownParser.parse(text)
  if (!documentNode || !hasMarkdownFormatting(documentNode.toJSON())) return null

  const container = document.createElement("div")
  const serializer = DOMSerializer.fromSchema(documentNode.type.schema)
  container.appendChild(serializer.serializeFragment(documentNode.content))
  container.querySelectorAll("[data-tight]").forEach((node) => node.removeAttribute("data-tight"))

  return container.innerHTML
}

const handleMarkdownPaste = (
  event: ClipboardEvent,
  insertHTML: (html: string) => void
): boolean => {
  const text = event.clipboardData?.getData("text/plain")
  const richHtml = event.clipboardData?.getData("text/html")
  if (hasRichTextFormatting(richHtml) || !text) return false

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

export { handleMarkdownPaste, markdownToHTML }
