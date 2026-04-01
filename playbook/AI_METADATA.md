# Playbook AI Metadata

Machine-readable metadata for Playbook components, designed for AI assistants and code generation tools.

## Overview

This system generates JSON schema files that describe every Playbook component's props, types, allowed values, and usage patterns. AI tools can use this metadata to:

- Generate correct Playbook code
- Understand component APIs without parsing TypeScript
- Know which props are available on which platforms (React, Rails, Swift)
- Access usage examples and related component suggestions

## Quick Start

```bash
cd playbook

# Generate all schemas (kit schemas + global props)
yarn generate:all-ai-metadata

# Build dist/ai folder
yarn build:ai

# Or do both at once
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
  },
  "relatedComponents": ["circle_icon_button", "button_toolbar"]
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
    "values": ["none", "xxs", "xs", "sm", "md", "lg", "xl"],
    "tokens": { "sm": "12px", "md": "16px", "lg": "24px" }
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
| `yarn generate:ai-metadata` | Generate kit.schema.json for all components |
| `yarn generate:global-props-metadata` | Generate global-props.schema.json |
| `yarn generate:all-ai-metadata` | Generate both kit and global props schemas |
| `yarn build:ai` | Copy schemas to dist/ai/ |
| `yarn build:ai:full` | Generate + build (full rebuild) |
| `yarn release` | Full release build (includes AI metadata) |

## How It Works

### Kit Schema Generation (`generate-ai-metadata.mjs`)

1. Scans `app/pb_kits/playbook/pb_*/` directories
2. Parses TypeScript (`.tsx`) files for React prop types
3. Parses Ruby (`.rb`) files for Rails prop definitions
4. Merges props from both platforms
5. Pulls descriptions from `menu.yml`
6. Outputs `kit.schema.json` in each component folder

### Global Props Generation (`generate-global-props-metadata.mjs`)

1. Parses `utilities/globalProps.ts` and `types/*.ts`
2. Extracts all type definitions and enum values
3. Adds descriptions and responsive flags
4. Outputs `utilities/global-props.schema.json`

### Build Distribution (`build-ai-dist.mjs`)

1. Copies all `kit.schema.json` files to `dist/ai/kits/`
2. Copies `global-props.schema.json` to `dist/ai/`
3. Creates `all-schemas.json` with everything combined
4. Creates `index.json` manifest

## Integration

### Setup (Procfile)

AI metadata is generated during setup when you run `./run.sh`:

```
setup: cd playbook && yarn generate:all-ai-metadata && cd ../playbook-website && node scripts/global-props.mjs
```

### Release

AI metadata is built as part of the release process:

```json
"release": "rm -rf dist; npx vite build && yarn build:ai:full"
```

## Updating Schemas

When you add or modify components:

1. **New component**: Run `yarn generate:ai-metadata` - it will pick up the new kit
2. **Modified props**: Run `yarn generate:ai-metadata --kit=component_name`
3. **New global prop**: Run `yarn generate:global-props-metadata`
4. **Update dist**: Run `yarn build:ai`

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
| `scripts/generate-ai-metadata.mjs` | Generates kit schemas from TS/Ruby source |
| `scripts/generate-global-props-metadata.mjs` | Generates global props schema |
| `scripts/build-ai-dist.mjs` | Builds dist/ai folder |
| `app/pb_kits/playbook/pb_*/kit.schema.json` | Individual kit schemas (source) |
| `app/pb_kits/playbook/utilities/global-props.schema.json` | Global props schema (source) |
| `dist/ai/*` | Distribution folder (built) |
