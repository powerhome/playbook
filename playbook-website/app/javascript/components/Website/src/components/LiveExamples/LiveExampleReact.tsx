import React, { useEffect, useMemo, useState } from "react"
import { LoadingInline, Card, colors } from "playbook-ui"
import { LiveProvider, LivePreview, LiveError } from "react-live"
// All third party loaders should live in separate files and get imported here
import { highchartsLoader, maplibreLoader, tiptapLoader, ThirdPartyLoader, ThirdPartyScope } from "./ThirdPartyLoaders"
// Pull in all Playbook React exports so we don't have to specify individual imports
import * as PB from "playbook-ui" 


/**
 * NOTE:
 * This component renders a live code example using react-live.
 * We pull in all Playbook React exports so we don't have to specify individual imports.
 * We have to do the Date kit as FormattedDate as the only one that requires special handling.
 * We also need to add in third party imports if used in examples. For Example: Highcharts, etc. 
 */
type LiveExampleProps = {
  code: string
  exampleProps?: Record<string, unknown>
}

// imports helper
type DefaultImport = { local: string; source: string }

function extractImportSources(raw: string) {
  const lines = raw.split("\n")
  const importLines = lines.filter((l) => /^\s*import\s+/.test(l))
  const sources = importLines
    .map((l) => {
      const m = l.match(/from\s+['"]([^'"]+)['"]/)
      return m?.[1] || null
    })
    .filter(Boolean) as string[]
  return { importLines, sources }
}

// This is needed for preserving default imports (e.g. HighchartsMore, SolidGauge)
function parseDefaultImports(raw: string): DefaultImport[] {
  const matches = [...raw.matchAll(/^\s*import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm)]
  return matches.map((m) => ({ local: m[1], source: m[2] }))
}

// prepare the snippet for react-live
function prepareCode(raw: string) {
  let code = raw
    .split("\n")
    .filter((l) => !l.trim().startsWith("import "))
    .join("\n")

  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/

  if (defaultExportRegex.test(code)) {
    code = code.replace(defaultExportRegex, "const __Exported = $1")
    code += `
render(<__Exported {...(typeof exampleProps !== 'undefined' ? exampleProps : {})} />)
`
  } else {
    code += `
if (typeof render === 'function') { render(<React.Fragment />) }
`
  }
  return code
}

/**
 * NOTE:
 * Add any loaders needed to docs in the ThirdPartyLoaders folder and import them up top
 * Basically, if a doc example has an import for a third party lib, it needs to be loaded here
 * After creating loader file and importing above, add to the LIB_LOADERS array below
 */

// Lib loaders array
const LIB_LOADERS: ThirdPartyLoader[] = [
  highchartsLoader,
  maplibreLoader,
  tiptapLoader,
]

async function loadThirdPartyLibs(raw: string): Promise<ThirdPartyScope> {
  const defaults = parseDefaultImports(raw)
  const { sources } = extractImportSources(raw)
  const active = LIB_LOADERS.filter((l) => l.detect(raw, defaults, sources))
  if (active.length === 0) return {}
  const scopes = await Promise.all(active.map((l) => l.load(raw, defaults, sources)))
  return Object.assign({}, ...scopes)
}

// Main Component
const LiveExample: React.FC<LiveExampleProps> = ({ code, exampleProps = {} }) => {
  const prepared = useMemo(() => prepareCode(code), [code])

  // prevent Date kit from shadowing the global Date constructor. Do FormattedDate like we do in the docs
  const { Date: FormattedDate, ...PBrest } = PB as any

  // Determine if any third-party lib is needed
  const needsThirdParty = useMemo(() => {
    const defaults = parseDefaultImports(code)
    const { sources } = extractImportSources(code)
    return LIB_LOADERS.some((l) => l.detect(code, defaults, sources))
  }, [code])

  const [thirdParty, setThirdParty] = useState<ThirdPartyScope>({})
  const [libsKey, setLibsKey] = useState("")
  const [libsReady, setLibsReady] = useState(!needsThirdParty)

  useEffect(() => {
    let cancelled = false
    if (!needsThirdParty) {
      setThirdParty({})
      setLibsKey("")
      setLibsReady(true)
      return
    }
    setLibsReady(false)
    ;(async () => {
      const scope = await loadThirdPartyLibs(code)
      if (!cancelled) {
        setThirdParty(scope)
        setLibsKey(Object.keys(scope).sort().join("|"))
        setLibsReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [code, needsThirdParty])

  const scope = useMemo(
    () => ({
      // React + hooks (so stripped imports still work)
      React,
      useState: React.useState,
      useEffect: React.useEffect,
      useRef: React.useRef,
      useMemo: React.useMemo,
      useCallback: React.useCallback,
      useLayoutEffect: React.useLayoutEffect,
      Fragment: React.Fragment,
      // All Playbook components (except Date which is below this as FormattedDate)
      ...PBrest,
      FormattedDate,
      // Third-party libs injected here (Highcharts*, maplibregl, etc.)
      ...thirdParty,
      exampleProps,
    }),
    [thirdParty, exampleProps, PBrest, FormattedDate],
  )

  if (!libsReady) {
    return (
      <div style={{ padding: 16 }}>
        <LoadingInline text="Loading example…" />
      </div>
    )
  }

  return (
    <LiveProvider key={libsKey} code={prepared} scope={scope} noInline>
      <Card borderNone padding="md">
        <LivePreview />
      </Card>
      <Card borderNone padding="md" htmlOptions={{ style:{color: colors.error }}}>
        <LiveError />
      </Card>
    </LiveProvider>
  )
}

export default LiveExample
