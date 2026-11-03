import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

export const maplibreLoader: ThirdPartyLoader = {
  id: "maplibre-gl",
  detect: (_raw, _defaults, sources) => sources.includes("maplibre-gl"),
  load: async (_raw, defaults) => {
    const { default: maplibregl } = await import("../../../utils/maplibre")

    const alias = defaults.find((d) => d.source === "maplibre-gl")?.local
    const scope: ThirdPartyScope = { maplibregl }
    if (alias && alias !== "maplibregl") scope[alias] = maplibregl
    return scope
  },
}

