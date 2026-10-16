// Declarative MCP-UI click actions for chart iframes (no user-supplied JS).
// Templates: {{category}} {{series}} {{value}} {{name}} {{x}} {{y}}

const TOKEN = /\{\{\s*(category|series|value|name|x|y)\s*\}\}/g
const ALLOWED_TYPES = { prompt: true, tool: true, intent: true }

function asString(value) {
  if (value == null) return ""
  return String(value)
}

export function pointContext(point) {
  const series = point && point.series ? point.series.name : ""
  return {
    category: asString(
      point && (point.category != null ? point.category : point.name != null ? point.name : point.x)
    ),
    series: asString(series),
    value: asString(point && (point.y != null ? point.y : point.value)),
    name: asString(point && point.name),
    x: asString(point && point.x),
    y: asString(point && point.y),
  }
}

export function interpolate(template, vars) {
  return String(template).replace(TOKEN, (_, key) => (vars[key] != null ? vars[key] : ""))
}

export function interpolateDeep(value, vars) {
  if (typeof value === "string") return interpolate(value, vars)
  if (Array.isArray(value)) return value.map((child) => interpolateDeep(child, vars))
  if (value && typeof value === "object") {
    const out = {}
    Object.keys(value).forEach((key) => {
      out[key] = interpolateDeep(value[key], vars)
    })
    return out
  }
  return value
}

export function parseAction(raw) {
  if (!raw) return null
  try {
    const action = typeof raw === "string" ? JSON.parse(raw) : raw
    if (!action || !ALLOWED_TYPES[action.type]) return null
    return action
  } catch (err) {
    return null
  }
}

export function readAction(node) {
  if (node && typeof node.getAttribute === "function") {
    const own = node.getAttribute("data-pb-mcp-ui-action")
    if (own) return parseAction(own)
  }
  if (node && typeof node.closest === "function") {
    const host = node.closest("[data-pb-mcp-ui-action]")
    if (host) return parseAction(host.getAttribute("data-pb-mcp-ui-action"))
  }
  if (typeof document !== "undefined" && document.body) {
    const fallback = document.body.getAttribute("data-pb-mcp-ui-action")
    if (fallback) return parseAction(fallback)
  }
  return null
}

export function buildUiMessage(action, point) {
  const parsed = parseAction(action)
  if (!parsed) return null

  const vars = pointContext(point)
  if (parsed.type === "prompt") {
    const prompt = interpolate(parsed.prompt || "", vars)
    if (!prompt) return null
    return { type: "prompt", payload: { prompt } }
  }
  if (parsed.type === "tool") {
    const toolName = asString(parsed.toolName || parsed.tool_name)
    if (!toolName) return null
    const params = Object.assign({}, vars, interpolateDeep(parsed.params || {}, vars))
    return { type: "tool", payload: { toolName, params } }
  }
  if (parsed.type === "intent") {
    const intent = interpolate(parsed.intent || "", vars)
    if (!intent) return null
    const params = Object.assign({}, vars, interpolateDeep(parsed.params || {}, vars))
    return { type: "intent", payload: { intent, params } }
  }
  return null
}

export function emitUiAction(action, point) {
  const message = buildUiMessage(action, point)
  if (!message || typeof window === "undefined" || !window.parent || window.parent === window) return
  window.parent.postMessage(message, "*")
}

export function bindChartUiActions(Highcharts) {
  if (!Highcharts || typeof Highcharts.addEvent !== "function" || bindChartUiActions.bound) return
  bindChartUiActions.bound = true

  Highcharts.addEvent(Highcharts.Point, "click", function onPointClick() {
    const chart = this.series && this.series.chart
    const renderTo = chart && chart.renderTo
    emitUiAction(readAction(renderTo), this)
  })

  Highcharts.addEvent(Highcharts.Chart, "load", function onChartLoad() {
    if (!readAction(this.renderTo) || !this.container) return
    this.container.style.cursor = "pointer"
  })
}
