This button is used many times for mobile or other things like cards and sidebars.

### Responsive `display` and `full_width`

`full_width` applies block styling that includes `display: flex` on the **same element** as the button. The **`display` global prop** also sets `display` (via utility classes, often with `!important`).

Putting **both** on one button means **two systems control `display` on one node**, which can cause wrong visibility (e.g. both a header and a full-width mobile button showing) or confusing cascade behavior.

**Recommended:** Put responsive `display` on a **parent** (e.g. `Flex`, `Card`, or a plain wrapper) and keep `full_width` only on the `Button` inside. The wrapper handles show/hide by breakpoint; the button only handles full-width layout.

```erb
<%= pb_rails("flex", props: {
  display: { xs: "flex", default: "none" },
  orientation: "column",
  width: "100%",
}) do %>
  <%= pb_rails("button", props: { full_width: true, text: "Add" }) %>
<% end %>
```
