import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

export const mapboxDrawLoader: ThirdPartyLoader = {
  id: "mapbox-gl-draw",
  detect: (_raw, _defaults, sources) => sources.includes("@mapbox/mapbox-gl-draw"),
  load: async (_raw, defaults) => {
    const mod: any = await import("@mapbox/mapbox-gl-draw")
    const MapboxDraw = mod.default || mod

    const alias = defaults.find((d) => d.source === "@mapbox/mapbox-gl-draw")?.local
    const scope: ThirdPartyScope = { MapboxDraw }
    if (alias && alias !== "MapboxDraw") scope[alias] = MapboxDraw
    return scope
  },
}
