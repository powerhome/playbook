Use the **"with_filter"** variant with an **external filter** (Option B): pass pre-rendered filter markup via the `filter` prop. Same layout as Variant with Filter (card, title, separator, flex); only the filter slot is supplied by you. Use this when you need:

- **Manual filter submission** – Apply / Filter button instead of automatic application
- **Full control** – Over filter props, template, sort menu, and submission
- **Custom or app-specific filter helpers** – Any helper that returns filter markup (e.g. search/filter forms)

#### Required props

- `variant: "with_filter"`
- `filter` – Pre-rendered filter HTML (e.g. from `capture { ... }`)

When `filter` is present, `filter_content` and `filter_props` are ignored.

#### How to do it

1. **Render your filter** (e.g. `pb_rails("filter", ...)` or any helper that returns filter markup).
2. **Capture the output** with `capture do ... end`.
3. **Pass it to the Table** as the `filter` prop.

**Example (generic pattern):**

```erb
<% filter_output = capture do %>
  <%= pb_rails("filter", props: { template: "single", results: 10, background: false }) do %>
    <%= pb_rails("text_input", props: { label: "Name", placeholder: "Search by name" }) %>
    <%= pb_rails("button", props: { text: "Apply" }) %>
  <% end %>
<% end %>

<%= pb_rails("table", props: {
  variant: "with_filter",
  title: "My Table",
  filter: filter_output,
}) do %>
  <%# table_head / table_body ... %>
<% end %>
```

For Nitro apps that use a shared search/filter pattern, reference the example on Alpha for implementation details.
