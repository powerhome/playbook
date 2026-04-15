### Simple toolbar (`simple: true`)

Pass **`simple: true`** for a compact toolbar: **Bold**, **Italic**, **Undo**, and **Redo** (same history controls as the full toolbar—plain buttons, not popovers).

- No block-style dropdown (no “Paragraph” / headings / lists in the menu).
- No **`pb_popover`** on the toolbar—useful in **native `<dialog>`** modals, turbo-loaded panels, or other tight layouts where the full block menu is awkward to position.

The underlying TipTap document still accepts the same HTML as the default Rails editor; `simple` only changes which **toolbar controls** are shown.
