import { defaultMarkdownParser } from "prosemirror-markdown"
import { DOMSerializer } from "prosemirror-model"

const MARKDOWN_PATTERN = /(^|\n)\s{0,3}(#{1,6}\s|[-+*]\s|\d+[.)]\s|>\s|```)|\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\)/m

const markdownToHTML = (text: string): string | null => {
  if (!MARKDOWN_PATTERN.test(text)) return null

  const documentNode = defaultMarkdownParser.parse(text)
  if (!documentNode) return null

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
  if (richHtml || !text || !MARKDOWN_PATTERN.test(text)) return false

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
