import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

export const highchartsLoader: ThirdPartyLoader = {
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