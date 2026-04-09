# Playground Config Generator

Generates `_playground.json` files for kits using a two-layer approach:

1. **Base config**: Derived from `kit.schema.json` (structural, safe to infer)
2. **Overrides**: Per-kit customization via `docs/_playground.overrides.json`

## Usage

```bash
# Generate for all kits (skips existing)
node scripts/generate-playground-configs.js

# Regenerate all (overwrite existing)
node scripts/generate-playground-configs.js --overwrite

# Generate for a specific kit
node scripts/generate-playground-configs.js --kit=button --overwrite

# Generate base only (skip override loading, useful for debugging)
node scripts/generate-playground-configs.js --kit=button --overwrite --base-only
```

## Base Config (auto-generated)

The generator reads `kit.schema.json` and produces:

| Field | Source |
|-------|--------|
| `template` | Component name, whether it has children |
| `defaults` | Schema default values |
| `children.editable` | Whether component typically uses children |
| `children.hideWhenPropSet` | `["text"]` if text prop exists |
| `groups` | Single "Props" group with all React props |
| `presets` | Single "Default" preset |
| `conditionals` | Empty object |
| `hints` | Empty object |

## Override File

Create `docs/_playground.overrides.json` to customize any field.

### Example: Button Override

```json
{
  "children": {
    "default": "Click Me"
  },
  "groups": [
    { "name": "Appearance", "props": ["variant", "size", "fullWidth", "disabled", "loading"] },
    { "name": "Content", "props": ["text", "icon", "iconRight"] },
    { "name": "Link Mode", "props": ["link", "target", "newWindow"] }
  ],
  "presets": [
    { "name": "Primary", "props": { "variant": "primary" }, "children": "Submit" },
    { "name": "Secondary", "props": { "variant": "secondary" }, "children": "Cancel" },
    { "name": "With Icon", "props": { "icon": "plus" }, "children": "Add Item" }
  ],
  "conditionals": {
    "iconRight": { "requires": "icon" },
    "target": { "requires": "link" }
  },
  "hints": {
    "link_mode": {
      "when": { "link": true },
      "message": "Button renders as <a> tag when link is set.",
      "type": "info"
    }
  }
}
```

### Override Fields

| Field | Type | Description |
|-------|------|-------------|
| `template` | string | JSX template with `{{props}}` and `{{children}}` markers |
| `children.default` | string | Default children content |
| `children.editable` | boolean | Whether children can be edited |
| `children.hideWhenPropSet` | string[] | Props that hide children input when set |
| `groups` | array | Organize props into named groups |
| `presets` | array | Quick-apply prop combinations |
| `conditionals` | object | Props that depend on other props |
| `hints` | object | Contextual messages based on prop values |

### Conditionals Format

```json
{
  "conditionals": {
    "propName": {
      "requires": "otherProp"
    },
    "propName2": {
      "requires": { "variant": "specific-value" }
    }
  }
}
```

### Hints Format

```json
{
  "hints": {
    "hint_id": {
      "when": { "propName": "value" },
      "message": "Displayed when condition is met",
      "type": "info" | "warning" | "error"
    }
  }
}
```

## Mental Model

- `kit.schema.json` defines **what a kit can do** (props, types, defaults)
- `_playground.json` defines **how to present and demo that kit**
- Override files let each kit **own its playground experience**

## Workflow

1. Run generator to create base configs for all kits
2. For kits needing customization, create `docs/_playground.overrides.json`
3. Re-run generator to merge overrides
4. Commit both `_playground.json` and `_playground.overrides.json`
