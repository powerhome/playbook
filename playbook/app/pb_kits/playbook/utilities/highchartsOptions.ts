/**
 * Caller options for the chart kits reach Highcharts in two steps.
 * Every chart drops unsafe `href` / `url` values and cannot enable credits.
 * `strict` is the opt-in `sanitizeOptions` prop: presentation and data keys only.
 */

import Highcharts from "highcharts"

const URL_KEYS = new Set(["href", "url"])

const BLOCKED_KEYS = new Set(["credits", "events", "useHTML"])

const ALLOWED_KEYS = new Set([
  "accessibility",
  "align",
  "alignTicks",
  "allowDecimals",
  "allowOverlap",
  "allowPointSelect",
  "alternateGridColor",
  "animation",
  "area",
  "arearange",
  "areaspline",
  "background",
  "backgroundColor",
  "bar",
  "borderColor",
  "borderRadius",
  "borderWidth",
  "brightness",
  "caption",
  "categories",
  "center",
  "centerInCategory",
  "chart",
  "chartOptions",
  "className",
  "clip",
  "color",
  "colorAxis",
  "colorByPoint",
  "colors",
  "column",
  "condition",
  "connectNulls",
  "crop",
  "cropThreshold",
  "crosshair",
  "cursor",
  "cx",
  "cy",
  "dashStyle",
  "data",
  "dataLabels",
  "dateTimeLabelFormats",
  "defer",
  "description",
  "distance",
  "duration",
  "easing",
  "enabled",
  "enableMouseTracking",
  "endAngle",
  "endOnTick",
  "fill",
  "fillColor",
  "fillOpacity",
  "filter",
  "floating",
  "followPointer",
  "followTouchMove",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "footerFormat",
  "format",
  "from",
  "gapSize",
  "gauge",
  "gridLineColor",
  "gridLineDashStyle",
  "gridLineWidth",
  "groupPadding",
  "grouping",
  "halo",
  "headerFormat",
  "height",
  "hover",
  "href",
  "id",
  "inactive",
  "innerRadius",
  "innerSize",
  "inside",
  "inverted",
  "itemDistance",
  "itemHiddenStyle",
  "itemHoverStyle",
  "itemMarginBottom",
  "itemMarginTop",
  "itemStyle",
  "itemWidth",
  "label",
  "labels",
  "layout",
  "legend",
  "letterSpacing",
  "line",
  "linecap",
  "lineColor",
  "lineWidth",
  "linearGradient",
  "linkedTo",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marker",
  "max",
  "maxHeight",
  "maxPadding",
  "maxPointWidth",
  "maxWidth",
  "min",
  "minPadding",
  "minPointLength",
  "minRange",
  "minWidth",
  "minorGridLineColor",
  "minorGridLineWidth",
  "minorTickInterval",
  "mouseWheel",
  "name",
  "negativeColor",
  "nullFormat",
  "offset",
  "opacity",
  "operator",
  "opposite",
  "outerRadius",
  "outside",
  "overflow",
  "overshoot",
  "padding",
  "panKey",
  "pane",
  "panning",
  "pie",
  "pinchType",
  "plotBands",
  "plotLines",
  "plotOptions",
  "point",
  "pointFormat",
  "pointInterval",
  "pointIntervalUnit",
  "pointPadding",
  "pointPlacement",
  "pointStart",
  "pointWidth",
  "polar",
  "property",
  "r",
  "radialGradient",
  "radius",
  "reflow",
  "responsive",
  "reversed",
  "reversedStacks",
  "rotation",
  "rounded",
  "rules",
  "scatter",
  "select",
  "selected",
  "series",
  "shadow",
  "shape",
  "shared",
  "showInLegend",
  "singleTouch",
  "size",
  "sliced",
  "slicedOffset",
  "softMax",
  "softMin",
  "solidgauge",
  "spacing",
  "spacingBottom",
  "spacingLeft",
  "spacingRight",
  "spacingTop",
  "spline",
  "split",
  "squareSymbol",
  "stack",
  "stacking",
  "stackLabels",
  "startAngle",
  "startOnTick",
  "states",
  "step",
  "stickyTracking",
  "stops",
  "style",
  "subtitle",
  "symbol",
  "symbolHeight",
  "symbolPadding",
  "symbolRadius",
  "symbolWidth",
  "text",
  "textAlign",
  "textOutline",
  "textOverflow",
  "textTransform",
  "threshold",
  "tickColor",
  "tickInterval",
  "tickLength",
  "tickmarkPlacement",
  "tickPositions",
  "tickWidth",
  "title",
  "to",
  "tooltip",
  "turboThreshold",
  "type",
  "uniqueNames",
  "url",
  "value",
  "valueDecimals",
  "valuePrefix",
  "valueSuffix",
  "verticalAlign",
  "visible",
  "width",
  "x",
  "x1",
  "x2",
  "xAxis",
  "y",
  "y1",
  "y2",
  "yAxis",
  "z",
  "zAxis",
  "zIndex",
  "zoomType",
  "zooming",
])

const URL_SCHEME = /^[a-zA-Z][a-zA-Z+\-.]*:/

const isFormatterKey = (key: string) =>
  key === "formatter" || key.toLowerCase().endsWith("formatter")

const isAllowedKey = (key: string, value: unknown) =>
  typeof value !== "function" &&
  !BLOCKED_KEYS.has(key) &&
  !isFormatterKey(key) &&
  ALLOWED_KEYS.has(key)

export const isSafeChartUrl = (value: unknown): boolean => {
  if (typeof value !== "string") return false
  const url = value.trim()
  if (url === "" || url.startsWith("//") || url.startsWith("\\")) return false
  if (!URL_SCHEME.test(url)) return true

  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

const walk = (value: unknown, strict: boolean): unknown => {
  if (typeof value === "function") return strict ? undefined : value
  if (Array.isArray(value)) {
    return value
      .map((item) => walk(item, strict))
      .filter((item) => item !== undefined)
  }
  if (!isPlainObject(value)) return value

  const result: Record<string, unknown> = {}
  Object.entries(value).forEach(([key, child]) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") return
    if (URL_KEYS.has(key)) {
      if (isSafeChartUrl(child) && typeof child === "string") result[key] = child.trim()
      return
    }
    if (key === "credits") return
    if (strict && !isAllowedKey(key, child)) return

    const next = walk(child, strict)
    if (next !== undefined) result[key] = next
  })
  return result
}

export const sanitizeChartOptions = (
  options: Record<string, unknown>,
  strict = false
): Record<string, unknown> => walk(options, strict) as Record<string, unknown>

export const lockChartCredits = (options: Record<string, unknown>) => {
  options.credits = { enabled: false }
  return options
}

export const mergeChartOptions = (
  theme: object,
  options: Record<string, unknown>,
  strict = false
) => {
  const merged = Highcharts.merge({}, theme, sanitizeChartOptions(options, strict))
  return lockChartCredits(merged as Record<string, unknown>)
}
