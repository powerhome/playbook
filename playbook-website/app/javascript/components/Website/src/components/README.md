# Components Folder

The `components` folder contains shared React components used across website
pages. Examples include `HomepageHero`, `GlobalPropsAndTokens`, `Icons`,
`AvailableProps`, `KitSearch`, `PlatformToggle`, `MobileNav`, and the shared
markdown/live-example renderers.

Use this folder for UI that is reused across multiple pages or represents a
self-contained shared surface. If a component needs supporting files, prefer a
folder with an `index.tsx` and colocated styles/data/helpers.

## MarkdownContent

[`MarkdownContent.tsx`](./MarkdownContent.tsx) is the shared renderer for guide
copy, changelog entries, kit descriptions, and doc-example descriptions. It uses
`react-markdown`, with local normalization for the HTML that appears in Playbook
docs content:

- Raw `<img>` tags are converted to markdown images so changelog images render.
- `<br>`, paragraph tags, basic emphasis tags, and links are normalized.
- Pipe-style markdown tables are rendered as real `<table>` elements.
- Table cells still run through markdown rendering so links, bold text, and line
  breaks work inside cells.

Keep new markdown behavior centralized there so changelog, guide, and kit-doc
copy stay consistent.

## Live Examples

Interactive docs examples live in [`LiveExamples`](./LiveExamples/README.md).
`LiveExampleReact` evaluates React examples with `react-live`, while
`LiveExampleRails` renders pre-rendered Rails examples.
