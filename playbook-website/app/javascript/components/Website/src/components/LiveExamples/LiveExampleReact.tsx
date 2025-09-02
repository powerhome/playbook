import React, { useEffect, useMemo, useState } from "react"
import { LoadingInline } from "playbook-ui"
import { LiveProvider, LivePreview, LiveError } from "react-live"

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

// imports helpers

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

// on-demand loader for third party libs (plug in more third party libs here if needed)
type ThirdPartyScope = Record<string, any>
type ThirdPartyLoader = {
  id: string
  detect: (raw: string, defaults: DefaultImport[], sources: string[]) => boolean
  load: (raw: string, defaults: DefaultImport[], sources: string[]) => Promise<ThirdPartyScope>
}

// HIGHCHARTS loader start --------------------------
const highchartsLoader: ThirdPartyLoader = {
  id: "highcharts",
  detect: (_raw, _defaults, sources) =>
    sources.some((s) => s === "highcharts" || s.startsWith("highcharts/")) ||
    sources.includes("highcharts-react-official"),
  load: async (raw, defaults, sources) => {
    const scope: ThirdPartyScope = {}

    // Base
    const hcMod: any = await import("highcharts")
    const Highcharts = hcMod.default || hcMod
    scope.Highcharts = Highcharts

    // Respect alias (e.g., import HC from "highcharts")
    const hcAlias = defaults.find((d) => d.source === "highcharts")?.local
    if (hcAlias && hcAlias !== "Highcharts") scope[hcAlias] = Highcharts

    // Modules actually imported in the snippet
    const moduleSpecs = [
      { pattern: /^highcharts\/highcharts-more$/, loader: () => import("highcharts/highcharts-more") },
      { pattern: /^highcharts\/modules\/solid-gauge$/, loader: () => import("highcharts/modules/solid-gauge") }
    ]

    await Promise.all(
      defaults
        .filter((d) => moduleSpecs.some((ms) => ms.pattern.test(d.source)))
        .map(async (d) => {
          const spec = moduleSpecs.find((ms) => ms.pattern.test(d.source))!
          const m: any = await spec.loader()
          const init = m.default || m
          if (typeof init === "function") {
            try {
              init(Highcharts) 
            } catch {
            }
            // expose the initializer under its local name so lines like `HighchartsMore(Highcharts)` still work
            scope[d.local] = init
          }
        }),
    )

    // React wrapper (alias safe)
    if (sources.includes("highcharts-react-official")) {
      const r: any = await import("highcharts-react-official")
      const HighchartsReact = r.default || r
      scope.HighchartsReact = HighchartsReact
      const alias = defaults.find((d) => d.source === "highcharts-react-official")?.local
      if (alias && alias !== "HighchartsReact") scope[alias] = HighchartsReact
    }

    return scope
  },
}
// HIGHCHARTS loader end --------------------------

// MAPLIBRE loader start --------------------------
function ensureMapLibreCSS() {
  if (typeof document === "undefined") return
  if (document.querySelector('link[data-maplibre-css="1"]')) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css"
  link.setAttribute("data-maplibre-css", "1")
  document.head.appendChild(link)
}

const maplibreLoader: ThirdPartyLoader = {
  id: "maplibre-gl",
  detect: (_raw, _defaults, sources) => sources.includes("maplibre-gl"),
  load: async (_raw, defaults) => {
    const mod: any = await import("maplibre-gl")
    const maplibregl = mod.default || mod
    ensureMapLibreCSS() // remove this if you bundle the CSS elsewhere

    const alias = defaults.find((d) => d.source === "maplibre-gl")?.local
    const scope: ThirdPartyScope = { maplibregl }
    if (alias && alias !== "maplibregl") scope[alias] = maplibregl
    return scope
  },
}

// MAPLIBRE loader end -------------------------

/**
 * NOTE:
 * Add Any loaders needed to docs here. follow pattern from highcharts _ maplibre loaders above
 * Basically, if a doc example has an import for a third party lib, it needs to be loaded here
 * After creating loader, add to the LIB_LOADERS array
 */

// Lib loaders array
const LIB_LOADERS: ThirdPartyLoader[] = [
  highchartsLoader,
  maplibreLoader,
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
      <div style={{ padding: 16 }}>
        <LivePreview />
      </div>
      <div style={{ padding: "0 16px 16px 16px", color: "#b00020", fontSize: 12 }}>
        <LiveError />
      </div>
    </LiveProvider>
  )
}

export default LiveExample
