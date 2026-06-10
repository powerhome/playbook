# Hooks/Utilities Folder

This directory contains shared hooks and route utilities for the website.

- `loaders.ts` contains React Router loaders. These fetch the Rails JSON
  endpoints used by pages such as kit show, kit categories, guides, and icons.
- `useClipboard.ts` and `useFormatter.ts` contain reusable client-side helpers.

Keep data-fetching behavior for routed pages in `loaders.ts` so the route tree in
[`../app.tsx`](../app.tsx) remains the single place that wires pages to their
data.
