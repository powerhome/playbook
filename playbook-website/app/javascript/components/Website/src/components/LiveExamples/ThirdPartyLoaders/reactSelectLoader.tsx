import { ThirdPartyLoader, ThirdPartyScope, parseNamedImportsFor } from "./utilities"

const REACT_SELECT_SOURCES = [
  "react-select",
  "react-select/async",
  "react-select/creatable",
  "react-select/async-creatable",
]

export const reactSelectLoader: ThirdPartyLoader = {
  id: "react-select",
  detect: (_raw, _defaults, sources) =>
    sources.some((source) =>
      REACT_SELECT_SOURCES.some(
        (mod) => source === mod || source.startsWith(`${mod}/`),
      ),
    ),

  load: async (raw) => {
    const scope: ThirdPartyScope = {}

    const mod: any = await import("react-select")

    // Common named export used by Typeahead docs (e.g. components.Option)
    if (mod.components) scope.components = mod.components
    if (mod.default) scope.Select = mod.default
    if (mod.mergeStyles) scope.mergeStyles = mod.mergeStyles

    // Map any named imports from the source (supports aliases)
    const namedImports = parseNamedImportsFor(raw, "react-select")
    namedImports.forEach(({ exported, local }) => {
      if (mod[exported]) {
        scope[local] = mod[exported]
      }
    })

    // Subpath default imports (async / creatable)
    const subpathLoaders: Array<[string, () => Promise<any>]> = [
      ["react-select/async", () => import("react-select/async")],
      ["react-select/creatable", () => import("react-select/creatable")],
      ["react-select/async-creatable", () => import("react-select/async-creatable")],
    ]

    for (const [source, loadMod] of subpathLoaders) {
      const named = parseNamedImportsFor(raw, source)
      const defaultAlias = [...raw.matchAll(
        new RegExp(
          String.raw`^\s*import\s+([A-Za-z0-9_$]+)\s+from\s+['"]${source.replace('/', '\\/')}['"]\s*;?\s*$`,
          "gm",
        ),
      )].map((m) => m[1])

      if (named.length === 0 && defaultAlias.length === 0) continue

      const subMod: any = await loadMod()
      named.forEach(({ exported, local }) => {
        if (subMod[exported]) scope[local] = subMod[exported]
      })
      defaultAlias.forEach((local) => {
        scope[local] = subMod.default || subMod
      })
    }

    return scope
  },
}
