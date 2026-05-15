import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

const CHART_SOURCES = [
  "_pb_bar_graph",
  "_pb_circle_chart", 
  "_pb_gauge_chart",
  "_pb_line_graph",
]

export const playbookChartsLoader: ThirdPartyLoader = {
  id: "playbook-charts",
  detect: (_raw, defaults) => 
    defaults.some((d) => 
      CHART_SOURCES.some((src) => d.source.includes(src))
    ),
  load: async (_raw, defaults) => {
    const scope: ThirdPartyScope = {}

    try {
      // @ts-ignore - playbook-ui/charts is resolved via Vite alias
      const chartsMod: any = await import("playbook-ui/charts")
      
      // Expose all chart components
      if (chartsMod.PbBarGraph) {
        scope.PbBarGraph = chartsMod.PbBarGraph
      }
      if (chartsMod.PbCircleChart) {
        scope.PbCircleChart = chartsMod.PbCircleChart
      }
      if (chartsMod.PbGaugeChart) {
        scope.PbGaugeChart = chartsMod.PbGaugeChart
      }
      if (chartsMod.PbLineGraph) {
        scope.PbLineGraph = chartsMod.PbLineGraph
      }

      // Support aliases used in imports
      for (const d of defaults) {
        if (d.source.includes("_pb_bar_graph") && d.local !== "PbBarGraph") {
          scope[d.local] = chartsMod.PbBarGraph
        }
        if (d.source.includes("_pb_circle_chart") && d.local !== "PbCircleChart") {
          scope[d.local] = chartsMod.PbCircleChart
        }
        if (d.source.includes("_pb_gauge_chart") && d.local !== "PbGaugeChart") {
          scope[d.local] = chartsMod.PbGaugeChart
        }
        if (d.source.includes("_pb_line_graph") && d.local !== "PbLineGraph") {
          scope[d.local] = chartsMod.PbLineGraph
        }
      }
    } catch (e) {
      console.warn("Failed to load playbook-ui/charts:", e)
    }

    return scope
  },
}
