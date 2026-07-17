AdvancedTable column width is controlled through `column_styling` on each leaf `column_definitions` entry. Playbook maps these values to inline styles on header and body cells.

Use these keys:

- Preferred / target width: `width`
- Minimum width (floor): `min_width`
- Maximum width (ceiling): `max_width`

Numbers are pixels. You can also pass CSS length strings (e.g. `"12rem"`, `"200px"`).

**Fixed width:** set `width` only

If you pass only `width` and do not set `min_width` / `max_width`, Playbook treats that as a fixed column: it sets all three to the same value under the hood.

```ruby
column_styling: { width: 128 }
# Applied as width, min-width, and max-width: 128px
```

**Floor only:** `min_width`

Set only a minimum when the column may grow with the table or content but must not shrink below a baseline:

```ruby
column_styling: { min_width: 160 }
```

**Flexible band:** min + preferred + max

Set two or three values when you want a range:

```ruby
column_styling: { min_width: 108, width: 124, max_width: 168 }
```

What the example table shows:

- Year (fixed): `column_styling: { width: 128 }` — locked to 128px.
- Enrollments (floor): `column_styling: { min_width: 160 }` — at least 160px; can grow.
- Meetings (band): preferred 200px, between 160–240.
- Attendance (min / pref / max): preferred 124px, between 108–168.

Grouped columns: put width options on leaf definitions (columns with an `accessor`), not on parent group headers.
