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

export { markdownToHTML }
