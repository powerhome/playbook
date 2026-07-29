---
name: playbook-ui-generation
description: >-
  Generate UI code using Playbook design system components with validated props.
  Use when creating React/Rails UI, processing Figma handoffs, building forms,
  cards, dialogs, tables, or any user interface. Reads structured metadata from
  playbook-ui package to ensure correct component usage.
---

# Playbook UI Generation

Generate UI using Playbook components with validated props.

## Required: Read These Files First

Before generating ANY Playbook code, you MUST read:

1. **Component index** — `node_modules/playbook-ui/dist/ai/index.json`
2. **Global props** — `node_modules/playbook-ui/dist/ai/global-props.schema.json`
3. **Component schemas** — `node_modules/playbook-ui/dist/ai/kits/<component>.schema.json` for each component you'll use
4. **Playground patterns** — `node_modules/playbook-ui/dist/ai/playgrounds/<component>.json` for each component you'll use (presets, hints, composition)

For bulk schema lookup, read `node_modules/playbook-ui/dist/ai/all-schemas.json` (schemas only; does **not** include playgrounds).

Discover playground coverage via `node_modules/playbook-ui/dist/ai/playgrounds/index.json`.

## AI Metadata Location

```
node_modules/playbook-ui/dist/ai/
├── index.json               # Manifest (schemas + playground paths)
├── global-props.schema.json # Props available on ALL components
├── all-schemas.json         # All component schemas bundled (bulk lookup)
├── kits/                    # Per-component prop schemas
│   ├── button.schema.json
│   └── ...
└── playgrounds/             # Slim patterns for accurate codegen
    ├── index.json
    ├── button.json
    └── ...
```

## Generation Workflow

### Step 1: Detect Platform

| Extension | Platform | Syntax |
|-----------|----------|--------|
| `.tsx`, `.jsx` | React | `import { Button } from "playbook-ui"` then `<Button />` |
| `.erb` | Rails | `<%= pb_rails("button", props: {...}) %>` |

### Step 2: Discover Components

Read `index.json` → `schemas.kits` for schema paths and `playgrounds.kits` for pattern paths.

### Step 3: Validate Props + Patterns

For each component:

1. Read `kits/<name>.schema.json` — prop names, enums, required, platforms
2. Read `playgrounds/<name>.json` when present:
   - Prefer **presets** over inventing prop combinations
   - Honor **hints** and **conditionals** (props that require other props/values)
   - For nested kits, follow **structureModes** / **template** / **children**
   - Use **customProps** / **propTargets** for subcomponent APIs (e.g. NavItem under Nav)
   - Use **wrapper** / **statefulProps** / **requiredCodeProps** for stateful kits

For **AdvancedTable**, read `playgrounds/advanced_table.json` and copy shapes from `samples` / `requiredProps` / preset `props` (`columnDefinitions`, `tableData`, nested `children`, first-column `cellAccessors`). Do not invent column/row structures; do not expect the full website mock datasets.

### Step 4: Generate Code

**React:**
```tsx
import { Button, Card, Flex } from "playbook-ui"

<Card padding="md">
  <Flex justify="between" align="center">
    <Button variant="primary" text="Save" />
  </Flex>
</Card>
```

**Rails:**
```erb
<%= pb_rails("card", props: { padding: "md" }) do %>
  <%= pb_rails("flex", props: { justify: "between", align: "center" }) do %>
    <%= pb_rails("button", props: { variant: "primary", text: "Save" }) %>
  <% end %>
<% end %>
```

## Global Props

ALL Playbook components accept global props for spacing, layout, and styling.

**You MUST read `global-props.schema.json` for:**
- Valid spacing token values and their pixel equivalents
- Breakpoint definitions for responsive props
- All available global props (margin, padding, flex, position, etc.)
- Which props support responsive syntax

**Responsive syntax** (for props marked `responsive: true`):
```tsx
<Card
  padding={{ default: "sm", md: "lg", xl: "xl" }}
  display={{ default: "block", md: "flex" }}
/>
```

## Platform-Specific Rules

### React-only / Rails-only
Check the schema's `platforms` field.

### Prop name differences
Some props differ by platform (e.g. React `htmlType="submit"` → Rails `type: "submit"`). Check schema for `reactEquivalent` / `railsEquivalent` mappings.

## Figma/Screenshot Workflow

1. Identify visual elements — buttons, cards, layout, typography
2. Map to Playbook kits via `index.json`
3. Extract props from visuals; map pixels → spacing tokens (`md`, not `16px`)
4. Read kit schema **and** playground file; start from the closest preset
5. Generate code in the correct platform syntax

## Validation Checklist

| Check | How |
|-------|-----|
| Component exists | `index.json` |
| Prop name / value valid | `kits/<name>.schema.json` |
| Combo is realistic | `playgrounds/<name>.json` presets |
| Constraints honored | playground `hints` + `conditionals` |
| Composition correct | `structureModes` / `template` / `children` |
| Platform supported | schema `platforms` |

**Common mistakes:**

```
✗ variant="blue"   → use semantic names like "primary", "secondary"
✗ size="large"     → use abbreviated tokens: "lg"
✗ padding="16px"   → use tokens: "md"
✗ onClick in .erb  → Rails uses data attributes, not JS handlers
✗ invent nested NavItem props without reading nav playground
```

When a prop value is invalid, suggest the closest valid alternative from the schema's enum values.
