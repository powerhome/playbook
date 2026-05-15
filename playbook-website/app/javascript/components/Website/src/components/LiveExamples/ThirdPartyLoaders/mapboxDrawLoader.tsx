import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

function ensureMapboxDrawCSS() {
  if (typeof document === "undefined") return
  if (document.querySelector('link[data-mapbox-draw-css="1"]')) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.4.3/mapbox-gl-draw.css"
  link.setAttribute("data-mapbox-draw-css", "1")
  document.head.appendChild(link)
}

export const mapboxDrawLoader: ThirdPartyLoader = {
  id: "mapbox-gl-draw",
  detect: (_raw, _defaults, sources) => sources.includes("@mapbox/mapbox-gl-draw"),
  load: async (_raw, defaults) => {
    const mod: any = await import("@mapbox/mapbox-gl-draw")
    const MapboxDraw = mod.default || mod
    ensureMapboxDrawCSS()

    const alias = defaults.find((d) => d.source === "@mapbox/mapbox-gl-draw")?.local
    const scope: ThirdPartyScope = { MapboxDraw }
    if (alias && alias !== "MapboxDraw") scope[alias] = MapboxDraw
    return scope
  },
}
