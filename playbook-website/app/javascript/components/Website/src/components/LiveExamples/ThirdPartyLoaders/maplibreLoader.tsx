import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

function ensureMapLibreCSS() {
  if (typeof document === "undefined") return
  if (document.querySelector('link[data-maplibre-css="1"]')) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css"
  link.setAttribute("data-maplibre-css", "1")
  document.head.appendChild(link)
}

export const maplibreLoader: ThirdPartyLoader = {
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

