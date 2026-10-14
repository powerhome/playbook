import { applyStickyColumns } from "./stickyColumns"

const stubWidth = (element: HTMLElement, width: number) => {
  Object.defineProperty(element, "offsetWidth", {
    configurable: true,
    get: () => Math.floor(width),
  })
  element.getBoundingClientRect = () =>
    ({
      width,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: width,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)
}

const buildStickyTable = () => {
  document.body.innerHTML = `
    <table class="pb_table">
      <thead>
        <tr>
          <th data-sticky-id="1">Col 1</th>
          <th data-sticky-id="2">Col 2</th>
          <th data-sticky-id="3">Col 3</th>
          <th>Col 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-sticky-id="1">A</td>
          <td data-sticky-id="2">B</td>
          <td data-sticky-id="3">C</td>
          <td>D</td>
        </tr>
      </tbody>
    </table>
  `

  return document.querySelector("table") as HTMLTableElement
}

describe("applyStickyColumns", () => {
  afterEach(() => {
    document.body.innerHTML = ""
  })

  test("scopes sticky left offsets to the given table", () => {
    document.body.innerHTML = `
      <table id="other">
        <thead><tr><th data-sticky-id="1">Other</th></tr></thead>
      </table>
      <table id="target" class="pb_table">
        <thead>
          <tr>
            <th data-sticky-id="1">Col 1</th>
            <th data-sticky-id="2">Col 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-sticky-id="1">A</td>
            <td data-sticky-id="2">B</td>
          </tr>
        </tbody>
      </table>
    `

    const target = document.getElementById("target") as HTMLTableElement
    const otherHeader = document.querySelector(
      "#other th[data-sticky-id='1']"
    ) as HTMLElement
    const targetHeader1 = target.querySelector(
      "th[data-sticky-id='1']"
    ) as HTMLElement
    const targetHeader2 = target.querySelector(
      "th[data-sticky-id='2']"
    ) as HTMLElement

    stubWidth(targetHeader1, 100)
    stubWidth(targetHeader2, 80)
    stubWidth(otherHeader, 250)

    applyStickyColumns(target, ["1", "2"], "left")

    expect(otherHeader.classList.contains("sticky")).toBe(false)
    expect(otherHeader.style.left).toBe("")
    expect(targetHeader1.style.left).toBe("0px")
    expect(targetHeader2.style.left).toBe("100px")
  })

  test("uses fractional widths so sticky left columns stay flush", () => {
    const table = buildStickyTable()
    const header1 = table.querySelector(
      "th[data-sticky-id='1']"
    ) as HTMLElement
    const header2 = table.querySelector(
      "th[data-sticky-id='2']"
    ) as HTMLElement
    const header3 = table.querySelector(
      "th[data-sticky-id='3']"
    ) as HTMLElement
    const cell2 = table.querySelector(
      "td[data-sticky-id='2']"
    ) as HTMLElement

    stubWidth(header1, 100.4)
    stubWidth(header2, 80.2)
    stubWidth(header3, 60)

    applyStickyColumns(table, ["1", "2", "3"], "left")

    expect(header1.style.left).toBe("0px")
    expect(header1.classList.contains("with-border-right")).toBe(true)
    // Must not use integer offsetWidth (100) or a gap appears at some zooms
    expect(header2.style.left).toBe("100.4px")
    expect(header2.classList.contains("with-border-right")).toBe(true)
    expect(cell2.style.left).toBe(header2.style.left)
    expect(header3.style.left).toBe("180.6px")
    expect(header3.classList.contains("sticky-left-shadow")).toBe(true)
    expect(header3.classList.contains("with-border-right")).toBe(false)
  })

  test("applies sticky right offsets from the trailing edge", () => {
    const table = buildStickyTable()
    const header1 = table.querySelector(
      "th[data-sticky-id='1']"
    ) as HTMLElement
    const header2 = table.querySelector(
      "th[data-sticky-id='2']"
    ) as HTMLElement
    const header3 = table.querySelector(
      "th[data-sticky-id='3']"
    ) as HTMLElement

    stubWidth(header1, 60)
    stubWidth(header2, 80)
    stubWidth(header3, 100)

    applyStickyColumns(table, ["1", "2", "3"], "right")

    // Right sticky walks ids in reverse: 3 at right:0, then 2, then 1 with shadow
    expect(header3.style.right).toBe("0px")
    expect(header3.classList.contains("with-border-left")).toBe(true)
    expect(header2.style.right).toBe("100px")
    expect(header1.style.right).toBe("180px")
    expect(header1.classList.contains("sticky-right-shadow")).toBe(true)
  })

  test("does not mutate the column id array when applying right sticky", () => {
    const table = buildStickyTable()
    const ids = ["1", "2", "3"]
    const header1 = table.querySelector(
      "th[data-sticky-id='1']"
    ) as HTMLElement
    const header2 = table.querySelector(
      "th[data-sticky-id='2']"
    ) as HTMLElement
    const header3 = table.querySelector(
      "th[data-sticky-id='3']"
    ) as HTMLElement

    stubWidth(header1, 60)
    stubWidth(header2, 80)
    stubWidth(header3, 100)

    applyStickyColumns(table, ids, "right")

    expect(ids).toEqual(["1", "2", "3"])
  })
})
