AdvancedTable column width is controlled on each leaf `column_definitions` entry via `column_styling`. Playbook maps these keys to inline styles on header and body cells.

**1)** `column_styling` width keys:

- Preferred / target width: `width`
- Minimum width (floor): `min_width`
- Maximum width (ceiling): `max_width`

Numbers are pixels. You can also pass CSS length strings (e.g. `"12rem"`, `"200px"`).

**2)** Fixed width: set `width` only

If you pass only `width` and do not set `min_width` / `max_width`, Playbook treats that as a fixed column: it sets all three to the same value under the hood so you do not have to repeat yourself.

```ruby
column_styling: { width: 128 }
# Applied as width, min-width, and max-width: 128px
```

Use this when the column should stay one width (e.g. a hierarchy column with expand controls).

**3)** Floor only: `min_width`

Set only a minimum when the column may grow with the table or content but must not shrink below a baseline (common fix for horizontal “jump” when rows expand):

```ruby
column_styling: { min_width: 160 }
```

**4)** Flexible band: min + preferred + max

Set two or three values when you want a range. CSS uses preferred `width` clamped between `min_width` and `max_width`:

- `min_width`: won’t shrink below this.
- `width`: preferred size when space allows.
- `max_width`: won’t grow above this.

Example from the table below (Attendance): `min_width: 108`, `width: 124`, `max_width: 168` → preferred 124px, allowed between 108 and 168.

You only need all three when you want that band. If min and max are omitted, `width` alone is enough for a fixed column.

**5)** What the example table shows

- Year (fixed): `column_styling: { width: 128 }` — locked to 128px.
- Enrollments (floor): `column_styling: { min_width: 160 }` — at least 160px; can grow.
- Meetings (preferred): `width` / `min_width` / `max_width` — preferred 200px, between 160–240.
- Attendance (min / pref / max): all three — preferred 124px, between 108–168.

Grouped columns: put width options on leaf definitions (columns with an `accessor`), not on parent group headers.
