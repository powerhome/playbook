# Playbook AI Metadata

Machine-readable metadata for Playbook components, designed for AI assistants and code generation tools.

## Overview

This system generates JSON schema files that describe every Playbook component's props, types, allowed values, and usage patterns. AI tools can use this metadata to:

- Generate correct Playbook code
- Understand component APIs without parsing TypeScript
- Know which props are available on which platforms (React, Rails)
- Access usage examples

## Quick Start

```bash
# From repo root: regenerate kit schemas, global props, and playgrounds
yarn generate:docs-metadata

cd playbook

# Build dist/ai folder
yarn build:ai

# Or regenerate AI schemas + build dist/ai
yarn build:ai:full
```

## Output Structure

After running `yarn build:ai`, you'll find:

```
dist/ai/
├── index.json                  # Manifest: schemas, playgrounds, kitMeta, visualIndex
├── visual-index.json           # Screenshot / visual → kit map (looksLike, lookalikes, tokens)
├── external-dependencies.json  # Kits that need host-app packages (Highcharts, TipTap, …)
├── forms.json                 # Rails builder setup, methods, actions, common FAQs
├── global-props.schema.json    # Props available on ALL components
├── all-schemas.json            # All kit schemas in one file (schemas only)
├── kits/                       # Individual component schemas
│   ├── button.schema.json
│   ├── card.schema.json
│   └── ...
└── playgrounds/                # Slim patterns for agent codegen (not full website configs)
    ├── index.json              # Kit → path + preset/hint counts
    ├── button.json
    ├── card.json
    └── ...
```

### File Descriptions

| File | Size | Use Case |
|------|------|----------|
| `index.json` | ~8KB+ | Discover schemas, playgrounds, kitMeta |
| `visual-index.json` | small | Map screenshots/visuals → kits before guessing |
| `external-dependencies.json` | small | Kits whose engines are peer/optional host deps |
| `global-props.schema.json` | ~24KB | Spacing, layout, display props |
| `all-schemas.json` | ~280KB | Bulk schema lookup (no playgrounds) |
| `kits/*.schema.json` | ~2–4KB each | Props + menu descriptions + usage from presets |
| `playgrounds/*.json` | slim | Presets, hints, conditionals, composition patterns |
| `playgrounds/index.json` | small | Discover which kits have playground patterns |

Playgrounds are **opt-in for agents**: keep loading schemas by default, then read `playgrounds/<kit>.json` for kits you are generating. Large website mock datasets are stripped so `dist/ai` stays lean.

**AdvancedTable exception:** `playgrounds/advanced_table.json` includes tiny synthetic `samples` / `requiredProps` / hydrated presets (`columnDefinitions` + `tableData` with nested `children` and `cellAccessors`) so agents can generate correct table code without the full docs mocks.

## Schema Format

### Kit Schema (e.g., `button.schema.json`)

```json
{
  "$schema": "https://playbook.powerapp.cloud/schemas/kit-schema.json",
  "name": "Button",
  "description": "Interactive element for triggering actions...",
  "platforms": ["react", "rails"],
  "props": {
    "variant": {
      "type": "enum",
      "values": ["primary", "secondary", "link", "danger"],
      "platforms": ["react", "rails"],
      "default": "primary"
    },
    "disabled": {
      "type": "boolean",
      "platforms": ["react", "rails"],
      "default": false
    },
    "onClick": {
      "type": "function",
      "platforms": ["react"]
    }
  },
  "globalProps": true,
  "usage": {
    "react": {
      "import": "import { Button } from 'playbook-ui'",
      "example": "<Button variant=\"primary\">Click me</Button>"
    },
    "rails": {
      "import": null,
      "example": "<%= pb_rails(\"button\", props: { variant: \"primary\", text: \"Click me\" }) %>"
    }
  }
}
```

When React and Rails types (or defaults) differ, the field is split instead of preferring React:

```json
"value": {
  "type": { "react": "string | number", "rails": "number" },
  "platforms": ["react", "rails"]
}
```

### Global Props Schema

```json
{
  "name": "GlobalProps",
  "description": "Props available on all Playbook components...",
  "breakpoints": {
    "xs": "0-575px",
    "sm": "576-767px",
    "md": "768-991px",
    "lg": "992-1199px",
    "xl": "1200px+"
  },
  "spacing": {
    "values": ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl", "auto"],
    "tokens": { "xxs": "4px", "xs": "8px", "sm": "16px", "md": "24px", "lg": "32px", "xl": "40px" }
  },
  "props": {
    "margin": {
      "type": "enum | responsive",
      "values": ["none", "xxs", "xs", "sm", "md", "lg", "xl"],
      "responsive": true,
      "description": "Margin on all sides.",
      "example": "margin=\"md\" or margin={{ default: 'sm', md: 'lg' }}"
    }
  }
}
```

## NPM Scripts

| Script | Description |
|--------|-------------|
| `yarn generate:docs-metadata` (repo root) | **Preferred.** Kit schemas + global props + playgrounds + `dist/ai` |
| `yarn generate:ai-metadata` | Generate kit.schema.json for all components |
| `yarn generate:global-props-metadata` | Generate global-props.schema.json |
| `yarn generate:all-ai-metadata` | Generate both kit and global props schemas |
| `yarn generate:playground-configs` | Generate per-kit `_playground.json` from schema + overrides |
| `yarn build:ai` | Clean and build `dist/ai/` (schemas + slim playgrounds) |
| `yarn build:ai --no-clean` | Incremental build without cleaning |
| `yarn build:ai:full` | Regenerate schemas + playgrounds, then build `dist/ai` |
| `yarn generate:ai-metadata --verbose` | Verbose flag to show more info for debugging|
| `yarn release` | Full release build (includes AI metadata) |

## How It Works

### Kit Schema Generation (`generate-ai-metadata.mjs`)

1. Scans `app/pb_kits/playbook/pb_*/` directories
2. Parses TypeScript (`.tsx`) files for React prop types
3. Parses Ruby (`.rb`) files for Rails prop definitions
4. Merges props from both platforms. Shared `type` and `default` become `{ react, rails }` when they differ; otherwise a single value is stored.
5. Generates descriptions from component names
6. Outputs `kit.schema.json` in each component folder

**Known Limitations:**

The TypeScript parsing uses regex patterns rather than a full AST parser:

- Only `type XProps = { ... }` patterns are parsed (not `interface`)
- Props defined via type composition (`extends`, `&`) may be missed
- Imported prop types from other files are not followed
- Complex patterns like `typeof X[number]` aren't resolved

The Ruby parsing has similar limitations:

- Uses regex to extract `prop` definitions
- May miss dynamically defined props

**Coverage:** ~95% of props are captured correctly. Global props use a shared parser module that handles intersection types (`&`) and resolves type references across files.

### Global Props Generation (`generate-global-props-metadata.mjs`)

**Fully dynamic** - parses everything from source, no hardcoded values:

1. Parses `utilities/globalProps.ts` and `types/*.ts` for prop definitions
2. Detects responsive props by scanning test files for `testGlobalPropResponsiveWithDefault`
3. Parses `tokens/_spacing.scss` for spacing token values
4. Parses `tokens/_screen_sizes.scss` for breakpoint values
5. Auto-generates descriptions from prop names
6. Outputs `utilities/global-props.schema.json`

When Playbook changes, the schema updates automatically - no manual edits needed.

### Build Distribution (`build-ai-dist.mjs`)

1. Loads kit catalog from `playbook-website/config/menu.yml` (descriptions, categories)
2. Copies all `kit.schema.json` files to `dist/ai/kits/`, enriching thin descriptions from menu.yml and `usage` from the first playground preset
3. Copies `global-props.schema.json` to `dist/ai/`
4. Creates `all-schemas.json` with schemas only (playgrounds stay separate to avoid bloat)
5. Creates slim `dist/ai/playgrounds/<kit>.json` from each `_playground.json`
6. Builds `visual-index.json` (menu catalog + curated lookalike/visual cues)
7. Reads `externalDependencies` from playground configs (authored in `_playground.overrides.json`), stamps them onto dist kit schemas / `kitMeta`, and aggregates `external-dependencies.json`
8. Creates `index.json` (includes `kitMeta` + `visualIndex` + `externalDependencies`) and `playgrounds/index.json`

Slim playground export keeps: `presets`, `hints`, `conditionals`, `structureModes`, `template`, `children`, `customProps`, `wrapper`, `statefulProps`, `requiredCodeProps`, `propTargets`, `propAliases`, `codegenDefaultProps`, imports. It strips website UI chrome (`groups`, `hiddenProps`, …) and large mock table datasets.

### Helpers

| File | Role |
|------|------|
| `lib/slim-playground.mjs` | Slim playground transform (+ AdvancedTable samples) |
| `lib/load-menu-catalog.mjs` | Parse `menu.yml` → kit descriptions/categories |
| `lib/visual-cues.mjs` | **Manual.** Curated looksLike / not / gotchas for ambiguous kits |
| `lib/build-visual-index.mjs` | Merge menu + cues → `visual-index.json` (rebuild only; cues are manual) |
### External / third-party dependencies

Some kits wrap libraries that are optional peers / host-app packages (Highcharts, TipTap, MapLibre, …). Declare them on the kit:

```json
// docs/_playground.overrides.json
{
  "externalDependencies": {
    "packages": ["highcharts", "highcharts-react-official"],
    "optional": true,
    "note": "Host app must already have these installed. Agents must not install packages — tell the user if missing."
  }
}
```

After `yarn generate:playground-configs` / `yarn generate:docs-metadata` / `yarn build:ai`, that field ships as:

- `dist/ai/playgrounds/<kit>.json` → `externalDependencies`
- `dist/ai/kits/<kit>.schema.json` → `externalDependencies`
- `dist/ai/index.json` → `kitMeta.<kit>.externalDependencies`
- `dist/ai/external-dependencies.json` (aggregate index)

**Agents must not install packages** — they should inform the user if deps are missing.

**When to update:** peer/install notes change for a wrapper kit → edit that kit’s `_playground.overrides.json` → regenerate docs metadata / build AI dist.

### Updating the visual index

`dist/ai/visual-index.json` is rebuilt on every `yarn build:ai`. What goes into it is a mix of automatic and manual sources:

| Source | Automated? | When it updates |
|--------|------------|-----------------|
| Kit list from `dist/ai` / kit folders | Yes | Every `build:ai` |
| Descriptions, categories, status from `menu.yml` | Yes | Every `build:ai` (edit menu.yml, then rebuild) |
| `looksLike`, `not`, `gotchas`, `variantsFromVisual`, typography/layout/spacing maps | **No — manual** | Edit `playbook/scripts/lib/visual-cues.mjs`, then rebuild |

**When to edit `visual-cues.mjs`:**
- Agents (or Nitro) confuse two kits from a screenshot (e.g. Pill vs Badge, Table vs AdvancedTable)
- A new kit is easy to mis-identify visually
- You need a clearer `variantsFromVisual` map (e.g. button colors → `primary` / `secondary` / `danger`)
- Spacing or typography heuristics drift from design practice

**How to update:**
1. Edit `playbook/scripts/lib/visual-cues.mjs` — usually `KIT_VISUAL_CUES.<kit_name>` (`looksLike`, `not`, `gotchas`, `cues`)
2. From `playbook/`: `yarn build:ai`  
   Or from repo root: `yarn generate:docs-metadata`
3. Confirm `playbook/dist/ai/visual-index.json` includes your cues under `kits.<name>`
4. Commit the `visual-cues.mjs` change (and any docs). `dist/` is built at release / local generate; it is not the hand-authored source

Do **not** hand-edit `dist/ai/visual-index.json` — it is overwritten on the next build.

## Integration

### Setup and run

Docs metadata is generated by `./setup.sh` and `./run.sh` via:

```bash
yarn generate:docs-metadata
```

That regenerates kit schemas, global props schema/values, playground configs, and rebuilds `playbook/dist/ai` (including slim playgrounds) for Nitro and other consumers.

### Release

AI metadata is built as part of the release process:

```json
"release": "rm -rf dist; npx vite build && yarn build:ai:full"
```

## Keeping Schemas in Sync

### Husky Pre-commit Hook (Automatic)

The Husky pre-commit hook keeps generated docs metadata in sync. When you commit matching source files, it:

1. Captures checksums of generated schema, playground, and global props values files
2. Runs `yarn generate:docs-metadata`
3. Compares before/after
4. **Fails if any generated files changed** (stage them and commit again)

**Triggered by changes to:**
- `playbook/app/pb_kits/playbook/pb_*/**/*.{tsx,ts,rb}` - Kit sources
- `playbook/app/pb_kits/playbook/utilities/globalProps.ts` - Global props
- `playbook/app/pb_kits/playbook/types/*.ts` - Type definitions
- `playbook/app/pb_kits/playbook/tokens/_spacing.scss` - Spacing tokens
- `playbook/app/pb_kits/playbook/tokens/_screen_sizes.scss` - Breakpoints
- `playbook/app/pb_kits/playbook/pb_*/kit.schema.json` - Kit schemas
- `playbook/app/pb_kits/playbook/pb_*/docs/_playground.overrides.json` - Playground overrides

**If the hook fails:**
```bash
❌ Docs metadata is out of sync with source files!

Generated files were updated. Please stage them and commit again:

  git add playbook/app/pb_kits/playbook/*/kit.schema.json
  git add playbook/app/pb_kits/playbook/*/docs/_playground.json
  git add playbook/app/pb_kits/playbook/utilities/global-props.schema.json
  git add playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalPropsValues.ts
```

**Hook files:**
- `.husky/pre-commit` - Runs lint-staged + docs metadata verification
- `.git-hooks/pre_commit/verify_docs_metadata.sh` - Verification script
- `scripts/generate-docs-metadata.sh` - Shared generator used by setup, run, and the pre-commit hook

### Manual Updates

Prefer the shared command from the repo root:

```bash
yarn generate:docs-metadata
```

Lower-level commands (still available under `playbook/`):

1. **New component / modified props**: `yarn generate:ai-metadata` (optional `--kit=component_name`)
2. **Global props schema only**: `yarn generate:global-props-metadata`
3. **Update dist**: `yarn build:ai`

### Dry Run

Preview what would be generated without writing files:

```bash
yarn generate:ai-metadata --dry-run --verbose
```

## For AI Tool Developers

### Loading Schemas + Playgrounds

In consuming apps (e.g. Nitro), metadata lives under `node_modules/playbook-ui/dist/ai/`.

```javascript
// Schemas (always)
const schemas = await fetch('.../dist/ai/all-schemas.json').then(r => r.json());
const buttonProps = schemas.kits.button.props;
const globalProps = schemas.globalProps.props;

// Per-kit schema
const buttonSchema = await fetch('.../dist/ai/kits/button.schema.json').then(r => r.json());

// Slim playground patterns (opt-in per kit you generate)
const buttonPlayground = await fetch('.../dist/ai/playgrounds/button.json').then(r => r.json());
// Prefer presets / honor hints + conditionals / follow structureModes for composition
```

Optional consumer rule/skill drafts (not applied anywhere): `docs/ai/consumer/`.

### Key Fields

- `props[name].type` - The prop type (`string`, `boolean`, `enum`, `function`, `ReactNode`, etc.). When React and Rails types differ, this is `{ "react": "...", "rails": "..." }` instead of a single string. Use the entry for the platform you are generating.
- `props[name].values` - Allowed values for enum types
- `props[name].platforms` - Which platforms support this prop (`react`, `rails`)
- `props[name].default` - Default value if any. Same `{ react, rails }` split when defaults differ.
- `globalProps: true` - Indicates component accepts all global props
- `usage.react.example` - Example React JSX (seeded from first playground preset in dist)
- `usage.rails.example` - Example Rails ERB
- `playgrounds/<kit>.json` - Presets, hints, conditionals, templates, structure modes

### Responsive Props

Props marked with `responsive: true` accept either a single value or a breakpoint object:

```jsx
// Single value
<Flex padding="md" />

// Responsive object
<Flex padding={{ default: "sm", md: "lg", xl: "xl" }} />
```

## Files

| File | Description |
|------|-------------|
| `scripts/generate-docs-metadata.sh` (repo root) | Shared generator for schemas, values, playgrounds |
| `playbook/scripts/generate-ai-metadata.mjs` | Generates kit schemas from TS/Ruby source |
| `playbook/scripts/generate-global-props-metadata.mjs` | Generates global props schema |
| `playbook/scripts/build-ai-dist.mjs` | Builds dist/ai folder (schemas + playgrounds + visual-index) |
| `playbook/scripts/lib/slim-playground.mjs` | Slim playground transform for AI export |
| `playbook/scripts/lib/load-menu-catalog.mjs` | menu.yml → kit descriptions/categories |
| `playbook/scripts/lib/visual-cues.mjs` | Curated visual → kit cues |
| `playbook/scripts/lib/build-visual-index.mjs` | Builds visual-index.json |
| `playbook/scripts/lib/global-props-parser.mjs` | Shared module for parsing global props |
| `playbook/app/pb_kits/playbook/pb_*/kit.schema.json` | Individual kit schemas (generated) |
| `playbook/app/pb_kits/playbook/pb_*/docs/_playground.json` | Generated playground configs (website + AI source) |
| `playbook/app/pb_kits/playbook/utilities/global-props.schema.json` | Global props schema (generated) |
| `playbook/dist/ai/*` | Distribution folder (built; published with playbook-ui) |
| `docs/ai/consumer/*` | Rule + skill templates for Nitro / consuming apps |
| `.husky/pre-commit` | Runs lint-staged + docs metadata verification |
| `.git-hooks/pre_commit/verify_docs_metadata.sh` | Pre-commit verification script |

## Rails form-builder contracts and usage FAQs

These additions document existing behavior; they do not change kit APIs.

Author shared and method-specific facts in `playbook/scripts/lib/form-contracts.mjs`.
Author common and kit-specific FAQ questions, answers, aliases and examples in
`playbook/scripts/lib/usage-faqs.mjs`, similarly to `visual-cues.mjs`. These are
independent of playground presets. Source paths in contracts are package-relative.

`build-ai-dist.mjs` resolves this content into:

- `forms.json`: package version, metadata format version, builder setup, all
  registered field methods, action-area methods and common FAQs.
- `kits/<kit>.schema.json`: `form.rails.builder` with shared setup and that kit's
  methods, plus resolved `faqs`. `all-schemas.json` contains the same additions.
- `index.json`: `metadataVersion: 1` and `forms: "forms.json"`.

The build uses Ruby’s standard-library Ripper parser (no Rails boot or added gem)
to extract method names, exact signatures, kit mappings and source paths from
builder registrations and implementations. Curated contracts supply behavior
and examples, keyed by method name; they cannot override structural fields.

Each method records its exact signature, kit, binding, submission, HTML option
routing, validation, block behavior, example and source paths. Separate methods
may map to one kit. The builder contract is Rails-only; kit prop platform lists
and standalone `usage` remain unchanged. Method examples are the authority for
builder questions, while `usage.rails` describes standalone kit usage.

In particular, the generic Rails field wrapper passes HTML options to a Rails
helper and supplies the result as kit content. Direct wrappers such as
`dropdown_field` do not automatically gain model-scoped names or model values.
Do not infer a common behavior merely because two methods share a kit prop name.
A missing field is unknown, not unsupported. Explicit false/supported:false is a
negative fact; conditional submission includes a `when` field.

FAQ entries have stable `id`, `platforms`, `questions`, `answer`, optional
`aliases`/`example`/`props`, and `contractPaths` pointing to resolved kit fields.
`props` tags use canonical metadata prop names and may mention a missing prop
when the FAQ explains the distinction between kit and builder APIs. Answers
must agree with the referenced contract; the build checks reference existence,
not natural-language equivalence.

The build rejects missing, stale or duplicate method contracts, unknown kit
mappings and unresolved FAQ references. Extraction follows the current explicit
FormFieldBuilder registrations and required Ruby modules. Unsupported dynamic
kit mappings or new registration conventions fail with an error instead of
inventing a mapping; update the extractor when introducing a new convention.

### Keeping form descriptions current

`playbook/scripts/lib/form-contract-reviews.json` records reviewed SHA-256 source
fingerprints per kit, plus a shared `builder` scope. Before cleaning or writing
`dist/ai`, the build checks those fingerprints. Existing method behavior changes
therefore fail generation even when the signatures and prop schemas are unchanged.

Sources include each builder implementation, relevant kit Ruby/ERB/JS/TS/React
files, form helper and validation/registry code. Cross-kit dependencies such as
Typeahead's TextInput are listed explicitly in `form-source-reviews.mjs`; changes
to those files flag each affected kit. Add dependency entries when new cross-kit
behavior is introduced. New and deleted runtime files are detected. Docs, tests,
SCSS and generated metadata are excluded. File contents are hashed conservatively
(including comments); CRLF/LF differences are normalized.

After a source change:

1. Run `yarn generate:docs-metadata` from the repo root, or run
   `node scripts/review-form-metadata.mjs` from `playbook/` for the review check alone.
2. Read the listed changed source files. Update behavior in `form-contracts.mjs`
   and related answers in `usage-faqs.mjs` as needed. If behavior is unchanged,
   the review acknowledgment alone is sufficient.
3. Acknowledge **only the scopes you reviewed**, for example from `playbook/`:

   ```sh
   node scripts/review-form-metadata.mjs --accept dropdown
   ```

4. Regenerate metadata and commit the review file with any contract/FAQ edits.

The normal generator and pre-commit hooks never update fingerprints. The explicit
review command also requires valid structural coverage and FAQ references before
accepting a scope. Other pending scopes remain pending. This records an intentional
review; it cannot prove that a human or agent actually reviewed the prose or that
all semantic claims are correct.

Both Husky and Overcommit trigger the metadata check for builder/helper changes,
kit ERB/JS/TS/Ruby changes, and form-metadata source/review changes. Normal kit schema
generation is unchanged. Consumers need only the generated JSON, not Ruby.

Run from `playbook/`:

```sh
yarn build:ai
node --test scripts/lib/form-metadata.test.mjs scripts/lib/form-source-reviews.test.mjs
```

The gem file list includes `dist/ai/**/*`; npm already includes `dist/*`. Build
metadata as part of the release before packaging either artifact. Do not edit
`dist/ai` or source `kit.schema.json` by hand.

The lookup reference and external skill adoption instructions live in
`docs/ai/consumer/ask-playbook/`. It returns these fields from the installed
package only, including on older packages that lack the new form contract.
