import { ThirdPartyLoader, ThirdPartyScope, parseNamedImportsFor } from "./utilities"

function ensureTrixCSS() {
  if (typeof document === "undefined") return
  if (document.querySelector('link[data-trix-css="1"]')) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/trix@2.1.16/dist/trix.css"
  link.setAttribute("data-trix-css", "1")
  document.head.appendChild(link)
}

export const trixLoader: ThirdPartyLoader = {
  id: "trix",
  detect: (_raw, _defaults, sources) =>
    sources.includes("trix") || sources.includes("react-trix"),

  load: async (raw, defaults) => {
    const scope: ThirdPartyScope = {}

    ensureTrixCSS()

    // Load trix (default import)
    if (defaults.some((d) => d.source === "trix")) {
      const trixMod: any = await import("trix")
      const Trix = trixMod.default ?? trixMod
      scope.Trix = Trix
      const alias = defaults.find((d) => d.source === "trix")?.local
      if (alias && alias !== "Trix") scope[alias] = Trix
    }

    // Load react-trix (named import: TrixEditor)
    const reactTrixNamed = parseNamedImportsFor(raw, "react-trix")
    if (reactTrixNamed.length > 0) {
      const reactTrixMod: any = await import("react-trix")
      reactTrixNamed.forEach(({ exported, local }) => {
        if (exported === "TrixEditor" && reactTrixMod.TrixEditor) {
          scope[local] = reactTrixMod.TrixEditor
        }
      })
      // Also add TrixEditor to scope by default if react-trix is imported
      if (reactTrixMod.TrixEditor) {
        scope.TrixEditor = reactTrixMod.TrixEditor
      }
    }

    return scope
  },
}
