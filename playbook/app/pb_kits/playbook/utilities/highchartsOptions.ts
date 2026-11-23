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
  "keys",
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

const URL_SCHEME = /^[a-z][a-z\d+.-]*:/i

const isFormatterKey = (key: string) =>
  key === "formatter" || key.toLowerCase().endsWith("formatter")

const isAllowedKey = (key: string, value: unknown) =>
  typeof value !== "function" &&
  !BLOCKED_KEYS.has(key) &&
  !isFormatterKey(key) &&
  ALLOWED_KEYS.has(key)

// Browsers ignore whitespace and control characters inside URLs and treat backslashes as slashes,
// so classify the normalized form. Otherwise `java\tscript:` or `/\evil.example` would pass.
export const isSafeChartUrl = (value: unknown): value is string => {
  if (typeof value !== "string") return false
  // eslint-disable-next-line no-control-regex -- browsers strip these characters, so we must match them
  const normalized = value.replace(/[\x00-\x20\x7f]/g, "").replace(/\\/g, "/")
  if (normalized === "" || normalized.startsWith("//")) return false
  if (!URL_SCHEME.test(normalized)) return true

  try {
    const { protocol } = new URL(normalized)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

const IGNORED_KEY = "pbIgnored"

const PROTOTYPE_KEYS = new Set(["__proto__", "constructor", "prototype"])

const isUnsafeKeyPart = (part: string, strict: boolean) =>
  PROTOTYPE_KEYS.has(part) || (strict && (BLOCKED_KEYS.has(part) || isFormatterKey(part)))

// Highcharts assigns each dotted `keys` path segment by segment, so tuple data can reach
// `__proto__.*` in any mode, and `events.click` or `dataLabels.useHTML` when strict.
// Unsafe entries are renamed in place so the remaining tuple positions stay aligned.
const neutralizeUnsafeKeys = (keys: unknown, strict: boolean) =>
  Array.isArray(keys)
    ? keys.map((key) =>
      typeof key === "string" && key.split(".").some((part) => isUnsafeKeyPart(part, strict))
        ? IGNORED_KEY
        : key
    )
    : keys

const walk = (value: unknown, strict: boolean): unknown => {
  if (typeof value === "function") return strict ? undefined : value
  if (Array.isArray(value)) {
    return Array.from(value, (item) =>
      strict && typeof item === "function" ? null : walk(item, strict)
    )
  }
  if (!isPlainObject(value)) return value

  const result: Record<string, unknown> = {}
  Object.entries(value).forEach(([key, child]) => {
    if (PROTOTYPE_KEYS.has(key)) return
    if (URL_KEYS.has(key)) {
      if (isSafeChartUrl(child)) result[key] = child
      return
    }
    if (key === "credits") return
    if (strict && !isAllowedKey(key, child)) return

    const next = walk(child, strict)
    if (next === undefined) return
    result[key] = key === "keys" ? neutralizeUnsafeKeys(next, strict) : next
  })
  return result
}

const getUrlKeyIndexes = (keys: unknown): number[] => {
  if (!Array.isArray(keys)) return []
  return keys.flatMap((key, index) =>
    typeof key === "string" && URL_KEYS.has(key.split(".").pop() ?? "") ? [index] : []
  )
}

// Highcharts accepts a single object wherever it expects a list of series or rules.
const toList = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value
  return value == null ? [] : [value]
}

const getNestedChartOptions = (options: Record<string, unknown>) => {
  const rules = isPlainObject(options.responsive) ? toList(options.responsive.rules) : []
  const nested = [
    ...rules.map((rule) => (isPlainObject(rule) ? rule.chartOptions : undefined)),
    isPlainObject(options.exporting) ? options.exporting.chartOptions : undefined,
  ]
  return nested.filter(isPlainObject)
}

// `keys` maps array point values onto point options by position, so `url` can arrive without its key name.
// Series `keys` override plotOptions `keys`. The series type can come from the kit theme, so without
// series `keys`, positions from every plotOptions entry are checked. Only string values are cleared.
// Responsive and exporting `chartOptions` are merged onto the chart, so they are checked too and
// also inherit the positions found in the options they extend.
const sanitizePositionalUrls = (options: Record<string, unknown>, inheritedIndexes: number[] = []) => {
  const plotOptions = isPlainObject(options.plotOptions) ? Object.values(options.plotOptions) : []
  const defaultUrlIndexes = [
    ...inheritedIndexes,
    ...plotOptions.flatMap((typeOptions) =>
      isPlainObject(typeOptions) ? getUrlKeyIndexes(typeOptions.keys) : []
    ),
  ]
  const drilldownSeries = isPlainObject(options.drilldown) ? options.drilldown.series : undefined
  const seriesLists = [options.series, drilldownSeries]
  const nestedInheritedIndexes = [...defaultUrlIndexes]

  seriesLists.forEach((seriesList) => {
    toList(seriesList).forEach((series) => {
      if (!isPlainObject(series)) return
      const seriesIndexes = "keys" in series ? getUrlKeyIndexes(series.keys) : undefined
      nestedInheritedIndexes.push(...(seriesIndexes ?? []))
      const urlIndexes = seriesIndexes ?? defaultUrlIndexes
      if (!Array.isArray(series.data) || urlIndexes.length === 0) return

      series.data = series.data.map((point) => {
        if (!Array.isArray(point)) return point
        return point.map((value, index) =>
          urlIndexes.includes(index) && typeof value === "string" && !isSafeChartUrl(value) ? null : value
        )
      })
    })
  })

  getNestedChartOptions(options).forEach((chartOptions) =>
    sanitizePositionalUrls(chartOptions, nestedInheritedIndexes)
  )
  return options
}

export const sanitizeChartOptions = (
  options: Record<string, unknown>,
  strict = false
): Record<string, unknown> => sanitizePositionalUrls(walk(options, strict) as Record<string, unknown>)

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
