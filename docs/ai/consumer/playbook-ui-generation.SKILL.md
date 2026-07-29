---
name: playbook-ui-generation
description: >-
  Generate UI code using Playbook design system components with validated props.
  Use when creating React/Rails UI, processing Figma handoffs, screenshots,
  building forms, cards, dialogs, tables, or any user interface. Reads structured
  metadata from playbook-ui package to ensure correct component usage.
---

# Playbook UI Generation

Generate UI using Playbook components with validated props.

## Required: Read These Files First

Before generating ANY Playbook code, you MUST read:

1. **Component index** — `node_modules/playbook-ui/dist/ai/index.json`
2. **Global props** — `node_modules/playbook-ui/dist/ai/global-props.schema.json`
3. **Component schemas** — `node_modules/playbook-ui/dist/ai/kits/<component>.schema.json` for each component you'll use
4. **Playground patterns** — `node_modules/playbook-ui/dist/ai/playgrounds/<component>.json` for each component you'll use (presets, hints, composition)

For **screenshots / visual handoffs**, also read:

5. **Visual index** — `node_modules/playbook-ui/dist/ai/visual-index.json` (looksLike, lookalikes, typography/spacing maps)

For bulk schema lookup, read `node_modules/playbook-ui/dist/ai/all-schemas.json` (schemas only; does **not** include playgrounds or visual-index).

Discover playground coverage via `node_modules/playbook-ui/dist/ai/playgrounds/index.json`.

## AI Metadata Location

```
node_modules/playbook-ui/dist/ai/
├── index.json               # Manifest (schemas, playgrounds, kitMeta, visualIndex)
├── visual-index.json        # Screenshot / visual → kit map
├── global-props.schema.json # Props available on ALL components
├── all-schemas.json         # All component schemas bundled (bulk lookup)
├── kits/                    # Per-component prop schemas (+ menu descriptions)
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

Read `index.json` → `schemas.kits` for schema paths, `playgrounds.kits` for patterns, `kitMeta` for category/description.

### Step 3: Validate Props + Patterns

For each component:

1. Read `kits/<name>.schema.json` — prop names, enums, required, platforms
2. Read `playgrounds/<name>.json` when present:
   - Prefer **presets** over inventing prop combinations
   - Honor **hints** and **conditionals**
   - For nested kits, follow **structureModes** / **template** / **children**
   - Use **customProps** / **propTargets** for subcomponent APIs
   - Use **wrapper** / **statefulProps** / **requiredCodeProps** for stateful kits

For **AdvancedTable**, read `playgrounds/advanced_table.json` and copy shapes from `samples` / `requiredProps` / preset `props` (`columnDefinitions`, `tableData`, nested `children`, first-column `cellAccessors`).

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

## Screenshot / Visual Handoff Workflow

Do **not** guess kit names from the image alone. Use `visual-index.json`.

1. **Decompose top-down** — page regions → sections → rows/clusters → controls → text
2. **Classify each region**
   - Layout: `layoutCues` (Flex vs Card vs Background vs Layout)
   - Type: `typographyByVisual` (Title / Body / Caption / Detail)
   - Controls: match `kits.<name>.looksLike`
3. **Disambiguate** with `not[]` and `gotchas` (Pill vs Badge vs FormPill; Table vs AdvancedTable; etc.)
4. **Map measurements**
   - Spacing px → `spacingPxToToken` (16→`sm`, 24→`md`, …)
   - Button color/style → `variantsFromVisual` when present
5. **Open schema + playground** only for chosen kits; start from nearest preset
6. **Compose** with Flex/Card/Layout — do not invent custom wrappers when Playbook kits fit

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

## Validation Checklist

| Check | How |
|-------|-----|
| Kit chosen correctly | `visual-index.json` looksLike / not / gotchas |
| Component exists | `index.json` / `kitMeta` |
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
✗ Pill children    → use text prop
✗ Table for nested expand rows → AdvancedTable
```

When a prop value is invalid, suggest the closest valid alternative from the schema's enum values.
