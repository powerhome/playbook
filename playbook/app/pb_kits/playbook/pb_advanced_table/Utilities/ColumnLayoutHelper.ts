import type { CSSProperties } from "react"

import { GenericObject } from "../../types"

/**
 * Converts a Playbook column width value to a CSS length string.
 * Numbers are treated as pixels; strings are passed through (e.g. `"12rem"`, `"200px"`).
 */
export function cssLength(
  value: number | string | undefined | null
): string | undefined {
  if (value === undefined || value === null || value === "") return undefined
  if (typeof value === "number" && Number.isFinite(value)) return `${value}px`
  return String(value)
}

const columnStylingKeys = (column: GenericObject) =>
  (column.columnStyling || column.column_styling || {}) as GenericObject

function readStylingLength(
  styling: GenericObject,
  camel: string,
  snake?: string
): string | number | undefined {
  if (snake) return styling[camel] ?? styling[snake]
  return styling[camel] as string | number | undefined
}

/**
 * TanStack Table v8 `ColumnDef` sizing fields we forward from each `columnDefinitions` entry.
 * See AdvancedTable kit docs for precedence with `columnStyling` width keys.
 */
export const PLAYBOOK_FORWARDED_COLUMN_DEF_SIZING_KEYS = [
  "size",
  "minSize",
  "maxSize",
] as const

export type PlaybookForwardedColumnSizing = Partial<
  Record<(typeof PLAYBOOK_FORWARDED_COLUMN_DEF_SIZING_KEYS)[number], number>
>

export function buildTanStackSizingFromColumn(
  column: GenericObject
): PlaybookForwardedColumnSizing {
  const out: PlaybookForwardedColumnSizing = {}
  PLAYBOOK_FORWARDED_COLUMN_DEF_SIZING_KEYS.forEach((key) => {
    const v = column[key]
    if (typeof v === "number" && Number.isFinite(v)) out[key] = v
  })

  const styling = columnStylingKeys(column)

  if (out.size === undefined && readStylingLength(styling, "width") !== undefined) {
    const w = readStylingLength(styling, "width")
    if (typeof w === "number" && Number.isFinite(w)) out.size = w
  }
  if (out.minSize === undefined && readStylingLength(styling, "minWidth", "min_width") !== undefined) {
    const w = readStylingLength(styling, "minWidth", "min_width")
    if (typeof w === "number" && Number.isFinite(w)) out.minSize = w
  }
  if (out.maxSize === undefined && readStylingLength(styling, "maxWidth", "max_width") !== undefined) {
    const w = readStylingLength(styling, "maxWidth", "max_width")
    if (typeof w === "number" && Number.isFinite(w)) out.maxSize = w
  }

  return out
}

/**
 * Inline width styles for `<th>` / `<td>` so `table-layout: fixed` tables keep stable
 * columns when row content changes (e.g. expand/collapse). Values mirror TanStack sizing
 * and/or `columnStyling` width keys; string values in `columnStyling` win over numeric
 * TanStack fields when both describe the same axis.
 */
export function buildPlaybookColumnLayoutStyles(
  column: GenericObject,
  tanStackSizing: PlaybookForwardedColumnSizing
): CSSProperties {
  const styling = columnStylingKeys(column)
  const styles: CSSProperties = {}

  const widthFromStyling = cssLength(
    readStylingLength(styling, "width") as string | number | undefined
  )
  const minFromStyling = cssLength(
    readStylingLength(styling, "minWidth", "min_width") as string | number | undefined
  )
  const maxFromStyling = cssLength(
    readStylingLength(styling, "maxWidth", "max_width") as string | number | undefined
  )

  const widthFromTanStack =
    tanStackSizing.size !== undefined
      ? cssLength(tanStackSizing.size)
      : undefined
  const minFromTanStack =
    tanStackSizing.minSize !== undefined
      ? cssLength(tanStackSizing.minSize)
      : undefined
  const maxFromTanStack =
    tanStackSizing.maxSize !== undefined
      ? cssLength(tanStackSizing.maxSize)
      : undefined

  if (widthFromStyling !== undefined) styles.width = widthFromStyling
  else if (widthFromTanStack !== undefined) styles.width = widthFromTanStack

  if (minFromStyling !== undefined) styles.minWidth = minFromStyling
  else if (minFromTanStack !== undefined) styles.minWidth = minFromTanStack

  if (maxFromStyling !== undefined) styles.maxWidth = maxFromStyling
  else if (maxFromTanStack !== undefined) styles.maxWidth = maxFromTanStack

  return styles
}

export function playbookColumnLayoutStylesFromMeta(
  columnDef: GenericObject | undefined
): CSSProperties {
  const meta = columnDef?.meta as GenericObject | undefined
  return (meta?.playbookColumnLayoutStyles || {}) as CSSProperties
}
