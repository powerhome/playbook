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
