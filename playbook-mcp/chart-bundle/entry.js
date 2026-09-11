// Self-contained IIFE entry for MCP-UI chart iframes.
// Bundled by bin/vendor_chart_peers → vendor/chart-peers/playbook-charts.js
// No importmap, no bare specifiers, no jsDelivr /npm/… transitive URLs.
// iframe resize is handled by /assets/playbook-mcp-resize.js on every document.

import ComponentRegistry from "../../playbook/app/utils/componentRegistry"

import PbBarGraph from "../../playbook/app/pb_kits/playbook/pb_pb_bar_graph/_pb_bar_graph"
import PbCircleChart from "../../playbook/app/pb_kits/playbook/pb_pb_circle_chart/_pb_circle_chart"
import PbLineGraph from "../../playbook/app/pb_kits/playbook/pb_pb_line_graph/_pb_line_graph"
import PbGaugeChart from "../../playbook/app/pb_kits/playbook/pb_pb_gauge_chart/_pb_gauge_chart"

ComponentRegistry.registerComponents({
  PbBarGraph,
  PbCircleChart,
  PbLineGraph,
  PbGaugeChart,
})

function mountPlaybookCharts(root = document) {
  ComponentRegistry.mountComponents(root)
}

function boot() {
  mountPlaybookCharts(document)

  let mountTimeout = null
  const debouncedMount = () => {
    if (mountTimeout) clearTimeout(mountTimeout)
    mountTimeout = setTimeout(() => {
      mountPlaybookCharts(document)
      mountTimeout = null
    }, 50)
  }

  const observer = new MutationObserver((mutations) => {
    const hasNew = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) => {
        if (node.nodeType !== 1) return false
        return (
          node.hasAttribute?.("data-pb-react-component") ||
          node.querySelector?.("[data-pb-react-component]")
        )
      })
    )
    if (hasNew) debouncedMount()
  })

  observer.observe(document.documentElement, { childList: true, subtree: true })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot)
} else {
  boot()
}
