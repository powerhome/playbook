import React, { useMemo } from 'react'
import classnames from 'classnames'

type RichTextMention = {
  id: string,
  label: string,
}

type RichTextContentProps = {
  className?: string,
  html?: string,
  id?: string,
  renderMention?: (mention: RichTextMention) => React.ReactNode,
}

const ALLOWED_TAGS = new Set([
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'li',
  'mark',
  'ol',
  'p',
  'pre',
  's',
  'span',
  'strike',
  'strong',
  'sub',
  'sup',
  'u',
  'ul',
])

const DROPPED_TAGS = new Set(['embed', 'iframe', 'link', 'meta', 'object', 'script', 'style'])
const VOID_TAGS = new Set(['br', 'hr', 'img'])

const ALLOWED_ATTRIBUTES: { [tag: string]: string[] } = {
  a: ['href', 'rel', 'target'],
  div: ['class'],
  img: ['alt', 'src', 'title'],
  span: ['class', 'data-id', 'data-label', 'data-type'],
}

const TEXT_ALIGN = /(?:^|;)\s*text-align\s*:\s*(center|justify|left|right)\s*(?:;|$)/i
const BACKGROUND_COLOR = /(?:^|;)\s*background-color\s*:\s*([^;]+)/i
const SAFE_COLOR = /^(?:#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})|[a-z]+|(?:rgb|hsl)a?\([\d.%\s,/]+\))$/i
const UNSAFE_COLOR_NAME = /^(?:expression|javascript|url|vbscript)$/i

const textAlignFor = (element: Element): string | null => {
  const style = element.getAttribute('style')
  if (!style) return null
  const match = style.match(TEXT_ALIGN)
  return match ? match[1].toLowerCase() : null
}

const safeColor = (value: string | null): string | null => {
  if (!value) return null
  const color = value.trim()
  if (!SAFE_COLOR.test(color) || UNSAFE_COLOR_NAME.test(color)) return null
  return color
}

const highlightColorFor = (element: Element): string | null => {
  const fromData = safeColor(element.getAttribute('data-color'))
  if (fromData) return fromData

  const style = element.getAttribute('style')
  if (!style) return null
  const match = style.match(BACKGROUND_COLOR)
  return match ? safeColor(match[1]) : null
}

const isSafeUrl = (value: string, allowDataImage: boolean): boolean => {
  const normalized = Array.from(value.trim()).filter((character) => {
    const code = character.charCodeAt(0)
    return code > 31 && code !== 127 && !/\s/.test(character)
  }).join('')
  if (/^(javascript|vbscript):/i.test(normalized)) return false
  if (/^data:/i.test(normalized)) return allowDataImage && /^data:image\//i.test(normalized)
  return true
}

const mentionFrom = (element: Element): RichTextMention | null => {
  if (element.tagName.toLowerCase() !== 'span') return null
  if (element.getAttribute('data-type') !== 'mention') return null
  if (!element.hasAttribute('data-id')) return null

  const label = element.getAttribute('data-label') || element.textContent?.replace(/^@/, '') || ''
  return {
    id: element.getAttribute('data-id') || '',
    label,
  }
}

const attributesFor = (element: Element): { [name: string]: string } => {
  const tag = element.tagName.toLowerCase()
  const allowed = ALLOWED_ATTRIBUTES[tag] || []
  const attributes: { [name: string]: string } = {}

  allowed.forEach((name) => {
    const value = element.getAttribute(name)
    if (value == null) return
    if ((name === 'href' || name === 'src') && !isSafeUrl(value, tag === 'img')) return
    attributes[name] = value
  })

  if (tag === 'a' && attributes.target?.toLowerCase() === '_blank') {
    attributes.target = '_blank'
    const rel = new Set(
      (attributes.rel || '')
        .toLowerCase()
        .split(/\s+/)
        .filter((token) => token && token !== 'opener')
    )
    rel.add('noopener')
    rel.add('noreferrer')
    attributes.rel = Array.from(rel).join(' ')
  }

  return attributes
}

const nodesToReact = (
  nodes: NodeListOf<ChildNode>,
  keyPrefix: string,
  renderMention?: RichTextContentProps['renderMention']
): React.ReactNode[] => {
  const nodeToReact = (
    node: ChildNode,
    key: string
  ): React.ReactNode | React.ReactNode[] | null => {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue

    if (node.nodeType !== Node.ELEMENT_NODE) return null

    const element = node as Element
    const tag = element.tagName.toLowerCase()
    if (DROPPED_TAGS.has(tag)) return null

    const mention = mentionFrom(element)
    if (mention && renderMention) {
      const rendered = renderMention(mention)
      return React.isValidElement(rendered)
        ? React.cloneElement(rendered, { key })
        : <React.Fragment key={key}>{rendered}</React.Fragment>
    }

    const children = nodesToReact(element.childNodes, key, renderMention)

    if (!ALLOWED_TAGS.has(tag)) return children

    const attributes = attributesFor(element)
    if (tag === 'img' && !attributes.src) return null

    const textAlign = textAlignFor(element)
    const highlightColor = tag === 'mark' ? highlightColorFor(element) : null
    const props: { [name: string]: unknown } = { key }
    Object.entries(attributes).forEach(([name, value]) => {
      props[name === 'class' ? 'className' : name] = value
    })
    if (highlightColor || textAlign) {
      const style: { backgroundColor?: string, textAlign?: string } = {}
      if (highlightColor) style.backgroundColor = highlightColor
      if (textAlign) style.textAlign = textAlign
      props.style = style
    }
    if (VOID_TAGS.has(tag)) return React.createElement(tag, props)

    return React.createElement(tag, props, ...children)
  }

  return Array.from(nodes).flatMap((node, index) => {
    const rendered = nodeToReact(node, `${keyPrefix}-${index}`)
    if (Array.isArray(rendered)) return rendered
    return rendered == null ? [] : [rendered]
  })
}

const RichTextContent = ({
  className,
  html = '',
  id,
  renderMention,
}: RichTextContentProps): React.ReactElement => {
  const content = useMemo(() => (
    html
      ? nodesToReact(new DOMParser().parseFromString(html, 'text/html').body.childNodes, 'rte', renderMention)
      : null
  ), [html, renderMention])

  return (
    <div
        className={classnames('tiptap-content', className)}
        id={id}
    >
      {content}
    </div>
  )
}

export default RichTextContent
export type { RichTextMention }
