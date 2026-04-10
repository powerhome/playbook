# Playground Config Generator

Generates `_playground.json` files for kits using a two-layer approach:

1. **Base config**: Derived from `kit.schema.json` (structural, safe to infer)
2. **Overrides**: Per-kit customization via `docs/_playground.overrides.json`

## Usage

```bash
# Generate for all kits (skips existing)
yarn generate:playground-configs.js

# Regenerate all (overwrite ALL existing)
yarn generate:playground-configs.js --overwrite

# Generate for a specific kit (overwrite existing for ONLY listed kit)
yarn generate:playground-configs.js --kit=button --overwrite

# Generate base only (skip override loading, useful for debugging)
yarn generate:playground-configs.js --kit=button --overwrite --base-only
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

### Initial Setup
Running `./setup.sh` automatically generates all AI metadata and playground configs. No separate steps needed.

If you need to regenerate all playground configs manually:
```bash
cd playbook
yarn generate:playground-configs --overwrite
```

### When Customizing a Kit's Playground
1. Edit or create `docs/_playground.overrides.json` with groups, presets, conditionals, hints
2. Stage and commit — the pre-commit hook will regenerate `_playground.json` automatically
3. If the hook reports changes, stage the updated `_playground.json` and commit again

### When Changing a Kit's Props (adding/removing/renaming)
1. Update the component source (`.tsx` / `.rb`)
2. Stage and commit — pre-commit hooks will:
   - Regenerate `kit.schema.json` (VerifyAIMetadata hook)
   - Regenerate `_playground.json` (VerifyPlaygroundConfigs hook)
3. If hooks report changes, stage the updated files and commit again
4. Update `_playground.overrides.json` if the override references changed props

### Manual Regeneration (if needed)
```bash
# Single kit
yarn generate:playground-configs --kit=<kitname> --overwrite

# All kits
yarn generate:playground-configs --overwrite
```

## Pre-commit Hooks

The `VerifyPlaygroundConfigs` hook automatically regenerates playground configs when:
- `kit.schema.json` changes (props added/removed/modified)
- `_playground.overrides.json` changes (customizations updated)

This ensures playground configs stay in sync without manual steps.
