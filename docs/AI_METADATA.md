# Playbook AI Metadata

Machine-readable metadata for Playbook components, designed for AI assistants and code generation tools.

## Overview

This system generates JSON schema files that describe every Playbook component's props, types, allowed values, and usage patterns. AI tools can use this metadata to:

- Generate correct Playbook code
- Understand component APIs without parsing TypeScript
- Know which props are available on which platforms (React, Rails, Swift)
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
├── index.json                  # Manifest with version & paths
├── global-props.schema.json    # Props available on ALL components
├── all-schemas.json            # Everything in one file (254KB)
└── kits/                       # Individual component schemas
    ├── button.schema.json
    ├── card.schema.json
    ├── dialog.schema.json
    └── ... (103 components)
```

### File Descriptions

| File | Size | Use Case |
|------|------|----------|
| `index.json` | 5KB | Discover available schemas, get version info |
| `global-props.schema.json` | 14KB | Reference for spacing, layout, display props |
| `all-schemas.json` | 254KB | Load everything at once for full AI context |
| `kits/*.schema.json` | ~2KB each | Look up individual component details |

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
| `yarn generate:docs-metadata` (repo root) | **Preferred.** Kit schemas + global props schema/values + playgrounds |
| `yarn generate:ai-metadata` | Generate kit.schema.json for all components |
| `yarn generate:global-props-metadata` | Generate global-props.schema.json |
| `yarn generate:all-ai-metadata` | Generate both kit and global props schemas |
| `yarn build:ai` | Clean and copy schemas to dist/ai/ (default clean) |
| `yarn build:ai --no-clean` | Incremental build without cleaning |
| `yarn build:ai:full` | Generate + build (full rebuild) |
| `yarn generate:ai-metadata --verbose` | Verbose flag to show more info for debugging|
| `yarn release` | Full release build (includes AI metadata) |

## How It Works

### Kit Schema Generation (`generate-ai-metadata.mjs`)

1. Scans `app/pb_kits/playbook/pb_*/` directories
2. Parses TypeScript (`.tsx`) files for React prop types
3. Parses Ruby (`.rb`) files for Rails prop definitions
4. Merges props from both platforms
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

1. Copies all `kit.schema.json` files to `dist/ai/kits/`
2. Copies `global-props.schema.json` to `dist/ai/`
3. Creates `all-schemas.json` with everything combined
4. Creates `index.json` manifest

## Integration

### Setup and run

Docs metadata is generated by `./setup.sh` and `./run.sh` via:

```bash
yarn generate:docs-metadata
```

That regenerates kit schemas, global props schema/values, and playground configs in one pass.

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
- `scripts/generate-docs-metadata.sh` - Shared generator used by setup, run, hook, and CI

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

### Loading Schemas

```javascript
// Load everything at once
const schemas = await fetch('/dist/ai/all-schemas.json').then(r => r.json());
const buttonProps = schemas.kits.button.props;
const globalProps = schemas.globalProps.props;

// Or load individual schemas
const buttonSchema = await fetch('/dist/ai/kits/button.schema.json').then(r => r.json());
```

### Key Fields

- `props[name].type` - The prop type (`string`, `boolean`, `enum`, `function`, `ReactNode`, etc.)
- `props[name].values` - Allowed values for enum types
- `props[name].platforms` - Which platforms support this prop (`react`, `rails`, `swift`)
- `props[name].default` - Default value if any
- `globalProps: true` - Indicates component accepts all global props
- `usage.react.example` - Example React JSX
- `usage.rails.example` - Example Rails ERB

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
| `playbook/scripts/build-ai-dist.mjs` | Builds dist/ai folder |
| `playbook/scripts/lib/global-props-parser.mjs` | Shared module for parsing global props |
| `playbook/app/pb_kits/playbook/pb_*/kit.schema.json` | Individual kit schemas (generated) |
| `playbook/app/pb_kits/playbook/utilities/global-props.schema.json` | Global props schema (generated) |
| `playbook/dist/ai/*` | Distribution folder (built) |
| `.husky/pre-commit` | Runs lint-staged + docs metadata verification |
| `.git-hooks/pre_commit/verify_docs_metadata.sh` | Pre-commit verification script |
| `.github/workflows/docs-metadata.yml` | CI drift check for generated docs metadata |
