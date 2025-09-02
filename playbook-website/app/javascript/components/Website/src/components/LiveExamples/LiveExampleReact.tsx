import React, { useEffect, useMemo, useState } from "react"
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

// imports helper
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
function parseDefaultImports(raw: string) {
  const matches = [...raw.matchAll(/^\s*import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm)]
  return matches.map((m) => ({ local: m[1], source: m[2] })) as Array<{
    local: string
    source: string
  }>
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

// on-demand loader for third party libs
type ThirdPartyScope = Record<string, any>

async function loadHighchartsForSnippet(raw: string): Promise<ThirdPartyScope> {
  const defaults = parseDefaultImports(raw)
  const sources = defaults.map((d) => d.source)

  const needsHighcharts =
    sources.some((s) => s === "highcharts" || s.startsWith("highcharts/")) ||
    sources.includes("highcharts-react-official") ||
    /HighchartsReact/.test(raw)

  if (!needsHighcharts) return {}

  // Base lib
  const hcMod: any = await import("highcharts")
  const Highcharts = hcMod.default || hcMod

  // Respect alias if snippet imported as something else
  const hcAlias = defaults.find((d) => d.source === "highcharts")?.local
  const scope: ThirdPartyScope =
    hcAlias && hcAlias !== "Highcharts"
      ? { Highcharts, [hcAlias]: Highcharts }
      : { Highcharts }

  // Only load/init the modules the snippet actually imported
  const moduleSpecs = [
    { pattern: /^highcharts\/highcharts-more$/, loader: () => import("highcharts/highcharts-more") },
    { pattern: /^highcharts\/modules\/solid-gauge$/, loader: () => import("highcharts/modules/solid-gauge") },
    { pattern: /^highcharts\/modules\/exporting$/, loader: () => import("highcharts/modules/exporting") },
    { pattern: /^highcharts\/modules\/export-data$/, loader: () => import("highcharts/modules/export-data") },
    { pattern: /^highcharts\/modules\/accessibility$/, loader: () => import("highcharts/modules/accessibility") },
    { pattern: /^highcharts\/modules\/drilldown$/, loader: () => import("highcharts/modules/drilldown") },
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
            init(Highcharts) // initialize immediately
          } catch {
            /* safe on double init */
          }
          // expose initializer under the local name so calls like HighchartsMore(Highcharts) still work
          scope[d.local] = init
        }
      }),
  )

  // React wrapper (support alias if used)
  if (
    sources.includes("highcharts-react-official") ||
    /from\s+['"]highcharts-react-official['"]/.test(raw) ||
    /HighchartsReact/.test(raw)
  ) {
    const r: any = await import("highcharts-react-official")
    const HighchartsReact = r.default || r
    scope.HighchartsReact = HighchartsReact

    const hcrAlias = defaults.find((d) => d.source === "highcharts-react-official")?.local
    if (hcrAlias && hcrAlias !== "HighchartsReact") scope[hcrAlias] = HighchartsReact
  }

  return scope
}

// main component

const LiveExample: React.FC<LiveExampleProps> = ({ code, exampleProps = {} }) => {
  const prepared = useMemo(() => prepareCode(code), [code])

  // prevent Date kit from shadowing the global Date constructor. Do FormattedDate like we do in the docs
  const { Date: FormattedDate, ...PBrest } = PB as any

  // Figure out if this snippet needs Highcharts and gate rendering until ready
  const needsHighcharts = useMemo(() => {
    const { sources } = extractImportSources(code)
    return (
      sources.some((s) => s === "highcharts" || s.startsWith("highcharts/")) ||
      sources.includes("highcharts-react-official") ||
      /HighchartsReact/.test(code)
    )
  }, [code])

  const [thirdParty, setThirdParty] = useState<ThirdPartyScope>({})
  const [libsKey, setLibsKey] = useState("")
  const [libsReady, setLibsReady] = useState(!needsHighcharts)

  useEffect(() => {
    let cancelled = false
    if (!needsHighcharts) {
      setThirdParty({})
      setLibsKey("")
      setLibsReady(true)
      return
    }
    setLibsReady(false)
    ;(async () => {
      const hcScope = await loadHighchartsForSnippet(code)
      if (!cancelled) {
        setThirdParty(hcScope)
        setLibsKey(Object.keys(hcScope).sort().join("|"))
        setLibsReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [code, needsHighcharts])

  const scope = useMemo(
    () => ({
      // React & hooks so snippets keep working after we strip imports
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
      // Third-party libs (Highcharts, HighchartsReact, and any module initializers)
      ...thirdParty,
      // Passthrough props for examples that spread {...props}
      exampleProps,
    }),
    [thirdParty, exampleProps, PBrest, FormattedDate],
  )

  // don't run the code snippet until third party libs are ready, so it won't crash on first render
  if (!libsReady) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Loading chart example…</div>
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