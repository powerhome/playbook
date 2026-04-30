import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console'
import fs from 'fs'
import path from 'path'
import React from 'react'

failOnConsole()

// or with options:
failOnConsole({
  shouldFailOnWarn: false,
})

const iconsRoot = path.resolve(__dirname, '../node_modules/@powerhome/playbook-icons/icons')
const aliasesPath = path.resolve(__dirname, '../node_modules/@powerhome/playbook-icons/aliases.json')
const iconAliases = fs.existsSync(aliasesPath) ? JSON.parse(fs.readFileSync(aliasesPath, 'utf8')).aliases || {} : {}
const svgComponentCache = {}
// A few tests assert against exact legacy SVG markup, so keep those shapes stable here.
const legacySvgOverrides = {
  'chevron-down': '<svg xmlns="http://www.w3.org/2000/svg" color="currentColor" width="auto" height="auto" viewBox="0 0 30 25" fill="none"><path d="M14.203 19.297l-9-9c-.469-.422-.469-1.125 0-1.594.422-.422 1.125-.422 1.594 0L15 16.953l8.203-8.203c.422-.469 1.125-.469 1.594 0a1.103 1.103 0 010 1.547l-9.047 9a1.027 1.027 0 01-1.547 0z" fill="#242B42"/></svg>',
  'chevron-up': '<svg xmlns="http://www.w3.org/2000/svg" color="currentColor" width="auto" height="auto" viewBox="0 0 31 25" fill="none"><path d="M14.2031 5.70312C14.625 5.28125 15.3281 5.28125 15.75 5.70312L24.7969 14.7031C25.2188 15.1719 25.2188 15.875 24.7969 16.2969C24.3281 16.7656 23.625 16.7656 23.2031 16.2969L15 8.09375L6.79688 16.2969C6.32812 16.7656 5.625 16.7656 5.20312 16.2969C4.73438 15.875 4.73438 15.1719 5.20312 14.75L14.2031 5.70312Z" fill="currentColor"/></svg>',
}

const svgAttributeMap = {
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'fill-rule': 'fillRule',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-width': 'strokeWidth',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
}

const convertAttributeName = (attributeName) => {
  return svgAttributeMap[attributeName] || attributeName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

const parseSvgAttributes = (attributeSource) => {
  const attributes = {}
  const attributePattern = /([:@a-zA-Z0-9-]+)="([^"]*)"/g
  let match = attributePattern.exec(attributeSource)

  while (match) {
    attributes[convertAttributeName(match[1])] = match[2]
    match = attributePattern.exec(attributeSource)
  }

  return attributes
}

const buildSvgComponent = (svgMarkup) => {
  const svgMatch = svgMarkup.match(/<svg([^>]*)>([\s\S]*)<\/svg>/i)
  if (!svgMatch) return null

  const [, rawAttributes, innerMarkup] = svgMatch
  const baseAttributes = {
    color: 'currentColor',
    ...parseSvgAttributes(rawAttributes),
  }
  const trimmedInnerMarkup = innerMarkup.trim()

  // Rebuild raw SVG files as lightweight React components so tests can keep using
  // the legacy `window.PB_ICONS[name]` lookup without depending on the React icon package.
  const SvgComponent = (componentProps) => React.createElement('svg', {
    ...baseAttributes,
    ...componentProps,
    dangerouslySetInnerHTML: { __html: trimmedInnerMarkup },
  })

  SvgComponent.displayName = 'LegacySvgIcon'

  return SvgComponent
}

const findIconPath = (iconName) => {
  const resolvedName = iconAliases[iconName] || iconName
  const categories = fs.existsSync(iconsRoot) ? fs.readdirSync(iconsRoot) : []

  for (const category of categories) {
    const candidatePath = path.join(iconsRoot, category, `${resolvedName}.svg`)
    if (fs.existsSync(candidatePath)) return candidatePath
  }

  return null
}

// The test suite still expects the pre-migration global icon registry. Populate it lazily
// from raw SVG assets so existing tests keep exercising the SVG rendering path.
window.PB_ICONS = new Proxy({}, {
  get: (_target, property) => {
    if (typeof property !== 'string') return undefined
    if (svgComponentCache[property]) return svgComponentCache[property]

    const overrideMarkup = legacySvgOverrides[property]
    const iconMarkup = overrideMarkup || (() => {
      const iconPath = findIconPath(property)
      return iconPath ? fs.readFileSync(iconPath, 'utf8') : null
    })()
    if (!iconMarkup) return undefined

    const svgComponent = buildSvgComponent(iconMarkup)
    svgComponentCache[property] = svgComponent

    return svgComponent
  },
})
