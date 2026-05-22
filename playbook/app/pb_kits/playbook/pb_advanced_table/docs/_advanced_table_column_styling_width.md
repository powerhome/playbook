AdvancedTable column width is controlled in two equivalent places on each leaf `columnDefinitions` entry. Playbook maps them to inline styles on header and body cells (and forwards numeric values into TanStack Table’s column model).

1) Playbook `columnStyling` and TanStack `ColumnDef` use the same three ideas:

- Preferred / target width: `columnStyling` `width` maps to TanStack `size` on the same column object.
- Minimum width (floor): `columnStyling` `minWidth` maps to TanStack `minSize`.
- Maximum width (ceiling): `columnStyling` `maxWidth` maps to TanStack `maxSize`.

Numbers are pixels. You can also pass CSS length strings on `columnStyling` (e.g. `"12rem"`, `"200px"`). TanStack fields accept numbers only.

If both APIs set the same axis, `columnStyling` wins for that axis when Playbook builds cell styles.

2) Fixed width: set `width` only

If you pass only `width` (or only `size`) and do not set `minWidth` / `maxWidth` (or `minSize` / `maxSize`), Playbook treats that as a fixed column: it sets all three to the same value under the hood so you do not have to repeat yourself.

```jsx
columnStyling: { width: 128 }
// Applied as width, minWidth, and maxWidth: 128px
```

```jsx
size: 200
// Forwarded as size, minSize, and maxSize: 200
```

Use this when the column should stay one width (e.g. a hierarchy column with expand controls).

3) Floor only: `minWidth` / `minSize`

Set only a minimum when the column may grow with the table or content but must not shrink below a baseline (common fix for horizontal “jump” when rows expand):

```jsx
columnStyling: { minWidth: 160 }
```

4) Flexible band: min + preferred + max

Set two or three values when you want a range. CSS uses preferred `width` clamped between `minWidth` and `maxWidth`:

- `minWidth`: won’t shrink below this.
- `width`: preferred size when space allows.
- `maxWidth`: won’t grow above this.

Example from the table below (Attendance): `minWidth: 108`, `width: 124`, `maxWidth: 168` → preferred 124px, allowed between 108 and 168.

You only need all three when you want that band. If min and max are omitted, `width` alone is enough for a fixed column.

5) TanStack band without `columnStyling`

The Meetings column uses only TanStack fields:

```jsx
{ accessor: "scheduledMeetings", size: 200, minSize: 160, maxSize: 240 }
```

Playbook applies the same min / preferred / max idea to cell styles. Setting only `size: 200` would lock all three to 200, same as `width: 200` in `columnStyling`.

6) What the example table shows

- Year (fixed): `columnStyling: { width: 128 }` — locked to 128px.
- Enrollments (floor): `columnStyling: { minWidth: 160 }` — at least 160px; can grow.
- Meetings (TanStack band): `size` / `minSize` / `maxSize` — preferred 200px, between 160–240.
- Attendance (min / pref / max): all three in `columnStyling` — preferred 124px, between 108–168.

Grouped columns: put width options on leaf definitions (columns with an `accessor`), not on parent group headers.
