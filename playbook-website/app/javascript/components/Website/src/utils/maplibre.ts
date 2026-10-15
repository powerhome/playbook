import * as maplibregl from "maplibre-gl"
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"

// MapLibre 6 looks up its worker via import.meta.url. Vite does not rewrite that,
// so point it at a worker chunk before any map is created.
maplibregl.setWorkerUrl(maplibreWorkerUrl)

export default maplibregl
