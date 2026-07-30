---
name: playbook-ui-generation
description: >-
  Generate UI with Playbook design system components and validated props.
  Use for any UI request — prompts, screens, forms, tables, Figma, screenshots —
  unless the user explicitly asks for non-Playbook markup. Reads playbook-ui
  dist/ai metadata for kits, props, playgrounds, and visual mapping.
---

# Playbook UI Generation

Generate UI using Playbook components with validated props.

## Playbook-first (prompts included)

For **any** request that produces or changes UI, default to Playbook kits.

- Do not require the user to say “use Playbook.”
- Prefer `playbook-ui` / `pb_rails` over custom HTML, CSS layout, or other libraries when a kit exists.
- Prefer **global props** (`global-props.schema.json`) for spacing, layout, display, flex, position, and sizing — **do not add SCSS/CSS files** for those concerns.
- Compose app-specific components **from** Playbook kits; do not replace kits with one-off markup or stylesheets.
- Only skip Playbook (or add custom CSS) when the user explicitly requires it, or no kit/global prop can express the need (verify via `dist/ai` first).

## Required: Read These Files First

Before generating ANY UI code, you MUST read:

1. **Component index** — `node_modules/playbook-ui/dist/ai/index.json`
2. **Global props** — `node_modules/playbook-ui/dist/ai/global-props.schema.json`
3. **Component schemas** — `node_modules/playbook-ui/dist/ai/kits/<component>.schema.json` for each component you'll use
4. **Playground patterns** — `node_modules/playbook-ui/dist/ai/playgrounds/<component>.json` for each component you'll use (presets, hints, composition)

For **screenshots / visual handoffs**, also read:

5. **Visual index** — `node_modules/playbook-ui/dist/ai/visual-index.json` (looksLike, lookalikes, typography/spacing maps)

For kits that wrap third-party libraries, also check:

6. **External dependencies** — `node_modules/playbook-ui/dist/ai/external-dependencies.json` and/or `externalDependencies` on the kit schema / `kitMeta`

For bulk schema lookup, read `node_modules/playbook-ui/dist/ai/all-schemas.json` (schemas only; does **not** include playgrounds or visual-index).

Discover playground coverage via `node_modules/playbook-ui/dist/ai/playgrounds/index.json`.

## AI Metadata Location

```
node_modules/playbook-ui/dist/ai/
├── index.json                    # Manifest (schemas, playgrounds, kitMeta, …)
├── visual-index.json             # Screenshot / visual → kit map
├── external-dependencies.json    # Kits needing host-app packages
├── global-props.schema.json
├── all-schemas.json
├── kits/
└── playgrounds/
```

## External / third-party kit dependencies

Some kits are thin wrappers and **do not bundle** their engine. Declarations live on the kit’s playground overrides and ship as `externalDependencies` on the schema / playground / `external-dependencies.json`.

**Agents must NOT install npm packages.**

**Before generating code that uses these kits:**
1. Read `externalDependencies` (`packages`, `note`)
2. Check whether the consuming app already has those packages
3. If missing: **stop and tell the user** which packages the app must already have installed — do not run `yarn`/`npm install`
4. If present: generate using the kit’s wiring notes (e.g. pass `TrixEditor` into `RichTextEditor`; Highcharts `options`)

Packages listed under `bundledWithPlaybookUi` (e.g. `flatpickr`) ship with `playbook-ui` — do not tell users to add those for basic kit use.

## Prompt → UI Workflow

Natural-language UI requests (no screenshot/Figma):

1. **Treat as Playbook work** — map the ask to kits via `kitMeta` / `index.json` (titles, cards, forms, tables, dialogs, etc.).
2. **Search the repo** for similar Playbook usage (`from "playbook-ui"`, `pb_rails`) and match local patterns.
3. **For each kit:** read schema + playground; prefer presets; honor hints/conditionals/structureModes.
4. **Layout with Playbook** — `Flex` / `Card` / `Layout` + **global props** (margin/padding/gap/align/display/…). Do not create or extend `.scss` / `.css` for spacing or flex layout.
5. **Validate** props/enums/platforms before emitting code.

Do not invent a parallel design system. Do not emit raw HTML buttons/inputs/tables when kits exist. Do not add stylesheets for what global props already solve.

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
| Playbook used where a kit exists | `index.json` / `kitMeta` — no parallel HTML/CSS UI |
| Spacing/layout via global props | `global-props.schema.json` — no new SCSS for margin/padding/flex/display |
| Kit chosen correctly (visuals) | `visual-index.json` looksLike / not / gotchas |
| Prop name / value valid | `kits/<name>.schema.json` |
| Combo is realistic | `playgrounds/<name>.json` presets |
| Constraints honored | playground `hints` + `conditionals` |
| Composition correct | `structureModes` / `template` / `children` |
| Platform supported | schema `platforms` |

**Common mistakes:**

```
✗ Custom <button>/<input>/<div> layout when a Playbook kit exists
✗ New .scss for margin/padding/flex/gap when global props exist
✗ variant="blue"   → use semantic names like "primary", "secondary"
✗ size="large"     → use abbreviated tokens: "lg"
✗ padding="16px"   → use tokens: "md"
✗ onClick in .erb  → Rails uses data attributes, not JS handlers
✗ invent nested NavItem props without reading nav playground
✗ Pill children    → use text prop
✗ Table for nested expand rows → AdvancedTable
```

When a prop value is invalid, suggest the closest valid alternative from the schema's enum values.
