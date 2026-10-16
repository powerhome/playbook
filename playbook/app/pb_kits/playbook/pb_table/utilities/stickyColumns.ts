type StickySide = "left" | "right"

/**
 * Prefer the more precise layout width. Fractional values avoid integer
 * offsetWidth rounding that leaves gaps between sticky columns at some
 * zoom/viewport sizes.
 */
const measureStickyWidth = (element: HTMLElement): number => {
  const rectWidth = element.getBoundingClientRect().width
  return rectWidth > 0 ? rectWidth : element.offsetWidth
}

const formatStickyOffset = (offset: number): string =>
  `${parseFloat(offset.toFixed(3))}px`

const applyStickySideClasses = (
  element: HTMLElement,
  isLastColumn: boolean,
  borderClass: string,
  shadowClass: string
): void => {
  if (!isLastColumn) {
    element.classList.add(borderClass)
    element.classList.remove(shadowClass)
  } else {
    element.classList.remove(borderClass)
    element.classList.add(shadowClass)
  }
}

const stickyHeaderSelector = (colId: string): string =>
  `th[data-sticky-id="${colId}"], .pb_table_th[data-sticky-id="${colId}"]`

const stickyCellSelector = (colId: string): string =>
  `td[data-sticky-id="${colId}"], .pb_table_td[data-sticky-id="${colId}"]`

export const applyStickyColumns = (
  table: Element,
  columnIds: string[],
  side: StickySide
): void => {
  if (!columnIds.length) return

  const orderedIds = side === "right" ? [...columnIds].reverse() : columnIds
  const borderClass = side === "left" ? "with-border-right" : "with-border-left"
  const shadowClass = side === "left" ? "sticky-left-shadow" : "sticky-right-shadow"

  let accumulatedWidth = 0

  orderedIds.forEach((colId, index) => {
    const isLastColumn = index === orderedIds.length - 1
    // Multi-row theads can repeat the same data-sticky-id on each header row —
    // pin every matching th, not only the first.
    const headers = table.querySelectorAll(stickyHeaderSelector(colId))
    const cells = table.querySelectorAll(stickyCellSelector(colId))

    if (!headers.length) return

    const offset = accumulatedWidth
    const offsetValue = formatStickyOffset(offset)
    let columnWidth = 0

    headers.forEach((header) => {
      const headerElement = header as HTMLElement
      headerElement.classList.add("sticky")
      headerElement.style[side] = offsetValue
      applyStickySideClasses(headerElement, isLastColumn, borderClass, shadowClass)
      columnWidth = Math.max(columnWidth, measureStickyWidth(headerElement))
    })

    accumulatedWidth = offset + columnWidth

    cells.forEach((cell) => {
      const cellElement = cell as HTMLElement
      cellElement.classList.add("sticky")
      cellElement.style[side] = offsetValue
      applyStickySideClasses(cellElement, isLastColumn, borderClass, shadowClass)
    })
  })
}

/** Double rAF + fonts.ready so offsets are measured after layout settles. */
export const scheduleStickyColumns = (apply: () => void): (() => void) => {
  let cancelled = false
  let frameId = 0

  const run = () => {
    if (!cancelled) apply()
  }

  frameId = requestAnimationFrame(() => {
    run()
    frameId = requestAnimationFrame(run)
  })

  const fonts = (
    document as Document & { fonts?: { ready?: Promise<unknown> } }
  ).fonts
  if (fonts?.ready) {
    fonts.ready.then(run).catch((): undefined => undefined)
  }

  return () => {
    cancelled = true
    cancelAnimationFrame(frameId)
  }
}
