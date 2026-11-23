import { isSafeChartUrl, lockChartCredits, sanitizeChartOptions } from "./highchartsOptions"

describe("isSafeChartUrl", () => {
  test("allows http(s) and same-origin paths", () => {
    expect(isSafeChartUrl("https://example.com/docs")).toBe(true)
    expect(isSafeChartUrl("http://example.com")).toBe(true)
    expect(isSafeChartUrl("/reports/1")).toBe(true)
    expect(isSafeChartUrl("./local")).toBe(true)
    expect(isSafeChartUrl("#section")).toBe(true)
  })

  test("rejects script, data, and protocol-relative urls", () => {
    expect(isSafeChartUrl("javascript:alert(1)")).toBe(false)
    expect(isSafeChartUrl("JavaScript:alert(1)")).toBe(false)
    expect(isSafeChartUrl("data:text/html,hi")).toBe(false)
    expect(isSafeChartUrl("//evil.example")).toBe(false)
    expect(isSafeChartUrl("")).toBe(false)
    expect(isSafeChartUrl("   ")).toBe(false)
  })

  test.each([
    "java\tscript:alert(1)",
    "java\nscript:alert(1)",
    "java\rscript:alert(1)",
    "\x00javascript:alert(1)",
    "\x1fjavascript:alert(1)",
    " javascript:alert(1)",
    "/\\evil.example",
    "\\\\evil.example",
    "/\t/evil.example",
    "\t//evil.example",
  ])("rejects obfuscated scheme or host %j", (value) => {
    expect(isSafeChartUrl(value)).toBe(false)
    expect(isSafeChartUrl(1)).toBe(false)
  })
})

describe("sanitizeChartOptions", () => {
  const formatter = () => "label"

  const options = {
    title: { text: "Sales" },
    credits: { enabled: true, href: "javascript:alert(1)", style: { fontSize: "40px" } },
    series: [{
      data: [{ y: 1, url: "javascript:alert(1)" }, { y: 2, url: "https://example.com" }],
    }],
    tooltip: { formatter, useHTML: true, pointFormat: "{point.y}" },
    plotOptions: { series: { point: { events: { click: formatter } } } },
    customSink: { onclick: formatter },
  }

  test("drops caller credits and unsafe urls and keeps callbacks", () => {
    const safe = sanitizeChartOptions(options)

    expect(safe.credits).toBeUndefined()
    expect(safe.series[0].data[0].url).toBeUndefined()
    expect(safe.series[0].data[1].url).toBe("https://example.com")
    expect(safe.tooltip.formatter).toBe(formatter)
    expect(safe.tooltip.useHTML).toBe(true)
    expect(safe.plotOptions.series.point.events.click).toBe(formatter)
    expect(safe.customSink).toEqual({ onclick: formatter })
    expect(options.credits.href).toBe("javascript:alert(1)")
  })

  test.each([false, true])("keeps Date values in datetime series (strict: %s)", (strict) => {
    const day = new Date(Date.UTC(2026, 10, 23))
    const safe = sanitizeChartOptions({
      series: [{ data: [[day, 1], { x: day, y: 2 }] }],
      xAxis: { min: day, type: "datetime" },
    }, strict)

    expect(safe.series[0].data[0][0]).toBe(day)
    expect(safe.series[0].data[1].x).toBe(day)
    expect(safe.xAxis.min).toBe(day)
  })

  test.each([false, true])("keeps undefined and sparse gaps in series data (strict: %s)", (strict) => {
    // eslint-disable-next-line no-sparse-arrays
    const sparse = [1, , 3]
    const safe = sanitizeChartOptions({
      series: [{ data: [1, undefined, 3] }, { data: sparse }],
    }, strict)

    expect(safe.series[0].data).toEqual([1, undefined, 3])
    expect(safe.series[0].data).toHaveLength(3)
    expect(safe.series[1].data).toEqual([1, undefined, 3])
  })

  test("clears unsafe urls mapped by series keys", () => {
    const safe = sanitizeChartOptions({
      series: [{
        keys: ["y", "url"],
        data: [[1, "javascript:alert(1)"], [2, "https://example.com"], [3, "java\tscript:alert(1)"]],
      }],
    })

    expect(safe.series[0].data).toEqual([[1, null], [2, "https://example.com"], [3, null]])
  })

  test("clears unsafe urls mapped by plotOptions keys and dotted keys", () => {
    const safe = sanitizeChartOptions({
      plotOptions: { column: { keys: ["name", "y", "custom.href"] } },
      series: [
        { data: [["A", 1, "javascript:alert(1)"], ["B", 2, "/reports/2"]] },
        { keys: ["name", "y"], data: [["C", "javascript:still-a-name"]] },
      ],
      drilldown: { series: [{ id: "a", keys: ["url", "y"], data: [["data:text/html,hi", 4]] }] },
    })

    expect(safe.series[0].data).toEqual([["A", 1, null], ["B", 2, "/reports/2"]])
    expect(safe.series[1].data).toEqual([["C", "javascript:still-a-name"]])
    expect(safe.drilldown.series[0].data).toEqual([[null, 4]])
  })

  test("clears unsafe keys-mapped urls in responsive and exporting chartOptions", () => {
    const safe = sanitizeChartOptions({
      series: [{ keys: ["y", "url"], data: [[1, "https://example.com"]] }],
      responsive: {
        rules: [{
          condition: { maxWidth: 500 },
          chartOptions: {
            series: [{ keys: ["y", "url"], data: [[1, "javascript:alert(1)"], [2, "/ok"]] }],
          },
        }, {
          condition: { maxWidth: 300 },
          chartOptions: { series: [{ data: [[1, "data:text/html,hi"]] }] },
        }],
      },
      exporting: {
        chartOptions: {
          plotOptions: { column: { keys: ["y", "href"] } },
          series: [{ data: [[1, "javascript:alert(1)"]] }],
        },
      },
    })

    expect(safe.series[0].data).toEqual([[1, "https://example.com"]])
    expect(safe.responsive.rules[0].chartOptions.series[0].data).toEqual([[1, null], [2, "/ok"]])
    expect(safe.responsive.rules[1].chartOptions.series[0].data).toEqual([[1, null]])
    expect(safe.exporting.chartOptions.series[0].data).toEqual([[1, null]])
  })

  test("clears unsafe keys-mapped urls when series and rules are single objects", () => {
    const safe = sanitizeChartOptions({
      series: { keys: ["y", "url"], data: [[1, "javascript:alert(1)"], [2, "https://example.com"]] },
      drilldown: { series: { id: "a", keys: ["y", "href"], data: [[1, "data:text/html,hi"]] } },
      responsive: {
        rules: {
          condition: { maxWidth: 500 },
          chartOptions: { series: { keys: ["y", "url"], data: [[1, "javascript:alert(1)"]] } },
        },
      },
    })

    expect(safe.series.data).toEqual([[1, null], [2, "https://example.com"]])
    expect(safe.drilldown.series.data).toEqual([[1, null]])
    expect(safe.responsive.rules.chartOptions.series.data).toEqual([[1, null]])
  })

  test("strict mode keeps series keys and still clears unsafe urls mapped through them", () => {
    const safe = sanitizeChartOptions({
      series: [{
        keys: ["x", "y", "url"],
        data: [[1, 10, "https://example.com"], [2, 20, "javascript:alert(1)"]],
      }],
      responsive: {
        rules: [{
          condition: { maxWidth: 500 },
          chartOptions: { series: [{ keys: ["y", "href"], data: [[1, "data:text/html,hi"], [2, "/ok"]] }] },
        }],
      },
    }, true)

    expect(safe.series[0].keys).toEqual(["x", "y", "url"])
    expect(safe.series[0].data).toEqual([[1, 10, "https://example.com"], [2, 20, null]])
    expect(safe.responsive.rules[0].chartOptions.series[0].data).toEqual([[1, null], [2, "/ok"]])
  })

  test("strict mode renames keys that map behavior options but keeps their positions", () => {
    const safe = sanitizeChartOptions({
      series: [{
        keys: ["y", "events.click", "dataLabels.useHTML", "tooltipFormatter", "name"],
        data: [[1, "a", true, "b", "Point"]],
      }],
    }, true)

    expect(safe.series[0].keys).toEqual(["y", "pbIgnored", "pbIgnored", "pbIgnored", "name"])
    expect(safe.series[0].data).toEqual([[1, "a", true, "b", "Point"]])
  })

  test("default mode leaves behavior series keys as the caller wrote them", () => {
    const keys = ["y", "dataLabels.useHTML"]

    expect(sanitizeChartOptions({ series: [{ keys, data: [[1, true]] }] }).series[0].keys).toEqual(keys)
  })

  test.each([false, true])("renames prototype paths in series keys (strict: %s)", (strict) => {
    const safe = sanitizeChartOptions({
      series: [{
        keys: ["y", "__proto__.polluted", "constructor.prototype.polluted", "custom.prototype", "__proto__", "name"],
        data: [[1, "a", "b", "c", "d", "Point"]],
      }],
    }, strict)

    expect(safe.series[0].keys).toEqual(["y", "pbIgnored", "pbIgnored", "pbIgnored", "pbIgnored", "name"])
    expect(safe.series[0].data).toEqual([[1, "a", "b", "c", "d", "Point"]])
  })

  test("strict mode keeps presentation data and drops behavior keys", () => {
    const safe = sanitizeChartOptions(options, true)

    expect(safe.title).toEqual({ text: "Sales" })
    expect(safe.series[0].data[1]).toEqual({ y: 2, url: "https://example.com" })
    expect(safe.tooltip).toEqual({ pointFormat: "{point.y}" })
    expect(safe.plotOptions.series.point.events).toBeUndefined()
    expect(safe.customSink).toBeUndefined()
    expect(safe.credits).toBeUndefined()
  })
})

describe("lockChartCredits", () => {
  test("forces credits off after options are merged", () => {
    const merged = lockChartCredits({ credits: { enabled: true, href: "https://evil.example" }, title: { text: "Sales" } })

    expect(merged.credits).toEqual({ enabled: false })
    expect(merged.title).toEqual({ text: "Sales" })
  })
})
