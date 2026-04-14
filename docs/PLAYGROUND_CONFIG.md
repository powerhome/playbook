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
| `structureModes` | object | Toggle between different component structures (e.g., simple vs subcomponents) |
| `dataPresets` | object | Named `columnDefinitions` + `tableData` bundles; shown as “Sample data” pills (Advanced Table, etc.) |
| `propSyncOnEnable` | object | When a prop is turned on, optionally set `dataPreset` and/or `structureMode` (co-selects sample data / structure). Matching props show a hint under the control in the Props panel. |
| `defaults` | object | Optional per-kit defaults merged with `kit.schema.json` defaults. Used to seed implicit prop state (`value` set, `enabled: false`) so toggles and enums match runtime defaults until the author explicitly changes a prop. Supports nested objects/arrays for JSON-backed controls (e.g. `GenericObject` props). |
| `hiddenProps` | string[] | Optional list of kit prop names to hide from the playground props panel. Props remain in `kit.schema.json`; only the controls are omitted. |

### Defaults and implicit props (playground UI)

The website playground merges `defaults` from the override (and generated `_playground.json`) with each prop’s schema `default` into the props state as `{ value, enabled: false }` when a prop is not already set by required data, presets, or structure mode. That keeps boolean and enum controls aligned with component defaults (including booleans that default to `true`) without treating those props as “user modified” until `enabled` becomes true. Conditionals and hints resolve comparisons using the same effective values.

**Prefilling object / array JSON editors:** Add a JSON object or array under `defaults` for that prop name. Optional props use a checkbox; when the author turns the prop on, the textarea is seeded from that value (not an empty `{}` / `[]`). Example for Advanced Table:

```json
"defaults": {
  "columnVisibilityControl": { "default": true }
}
```

After editing overrides, run `yarn generate:playground-configs --kit=<kit> --overwrite` so `_playground.json` includes the same `defaults`.

In the website, object props are edited as **JavaScript-style literals** (unquoted keys when they are valid identifiers, e.g. `{ default: true }`). Strict JSON with quoted keys (`"default"`) still pastes and parses correctly.

### Hiding props from the panel

Set `hiddenProps` to an array of camelCase prop names from `kit.schema.json` to exclude those controls from the kit props list and count. Use this for props that cannot be exercised in the live playground (for example, non-JSON callbacks) or to reduce noise.

### JSON file references (authoring `_playground.overrides.json`)

Large table samples can stay in separate files next to the override (under the kit’s `docs/` folder). When you run `yarn generate:playground-configs`, the generator inlines them into `_playground.json`.

- **`requiredProps`**: optional `columnDefinitionsFile` and `tableDataFile` (string filenames relative to `docs/`) are read and written out as `columnDefinitions` and `tableData`.
- **`dataPresets.presets.\*`**: each preset may use `columnDefinitionsFile` / `tableDataFile` instead of embedding arrays. You can still mix inline `columnDefinitions` / `tableData` for small bundles.

Paths cannot escape the kit `docs/` directory. Custom column `header` render props cannot be represented as JSON; use nested `columns` only for grouped-header demos.

### Conditionals Format

```json
{
  "conditionals": {
    "propName": {
      "requires": "otherProp"
    },
    "propName2": {
      "requires": { "variant": "specific-value" }
    },
    "subcomponentOnlyProp": {
      "structureMode": "explicit"
    }
  }
}
```

Optional `structureMode` disables the control unless the playground’s active structure mode matches (same key as in `structureModes.modes`).

### Hints Format

Hints appear in a banner above the playground preview. Each hint can filter on **prop values** (`when`), on the active **feature preset** (`presetName` or `presetIndex`), or both.

```json
{
  "hints": {
    "hint_id": {
      "when": { "propName": true },
      "presetName": "My Preset",
      "message": "Displayed when this preset is active and props match",
      "type": "info"
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `when` | Optional. Compares **effective** prop values (including implicit `defaults`). Empty `{}` or omitted means “always true” for the prop side. |
| `presetName` | Optional. Name of a row in `presets` (same string as `"name"`). Hint shows only when that preset is selected. |
| `presetIndex` | Optional. 0-based index into the `presets` array. Use `presetName` if you reorder presets often. |
| `message` | Text shown in the hint banner. |
| `type` | Optional: `info` (default), `warning`, or `error`. |

If both `presetName` / `presetIndex` and `when` are set, **all** of those conditions must pass.

### Structure Modes

Use `structureModes` to let users toggle between different usage patterns:

1. **Subcomponent structures** (e.g., `Card` vs `Card.Header` + `Card.Body`)
2. **Hook patterns** (e.g., basic usage vs `useCollapsible` hook)

#### Example: Subcomponent Structure

```json
{
  "structureModes": {
    "default": "simple",
    "modes": {
      "simple": {
        "label": "Simple",
        "template": "<Card{{props}}>\n  {{children}}\n</Card>",
        "children": "Card content"
      },
      "header_body": {
        "label": "Header + Body",
        "template": "<Card{{props}}>\n  <Card.Header{{Card.Header.props}}>Header</Card.Header>\n  <Card.Body>{{children}}</Card.Body>\n</Card>",
        "children": "Body content",
        "props": { "padding": "none" },
        "propTargets": {
          "headerColor": "Card.Header.props"
        }
      }
    }
  }
}
```

#### Example: Hook Pattern

For components with associated hooks (like `useCollapsible`), show how to use the hook for programmatic control:

```json
{
  "structureModes": {
    "default": "basic",
    "modes": {
      "basic": {
        "label": "Basic Usage",
        "template": "<Collapsible{{props}}>\n  <Collapsible.Main>Title</Collapsible.Main>\n  <Collapsible.Content>{{children}}</Collapsible.Content>\n</Collapsible>",
        "children": "Content here"
      },
      "with_hook": {
        "label": "With useCollapsible Hook",
        "template": "<Collapsible collapsed={collapsed}{{props}}>\n  <Collapsible.Main>Title</Collapsible.Main>\n  <Collapsible.Content>{{children}}</Collapsible.Content>\n</Collapsible>",
        "children": "Hook-controlled content",
        "imports": ["useCollapsible"],
        "wrapper": "const Example = () => {\n  const [collapsed, toggle] = useCollapsible(true)\n\n  return (\n    <>\n      <Button onClick={toggle}>{collapsed ? 'Expand' : 'Collapse'}</Button>\n      {{component}}\n    </>\n  )\n}\n\n<Example />"
      }
    }
  }
}
```

#### Mode Configuration

| Field | Description |
|-------|-------------|
| `structureModes.default` | Key of the default mode |
| `structureModes.modes` | Object with mode configurations |
| `mode.label` | Display label in the UI selector |
| `mode.template` | JSX template for this mode |
| `mode.children` | Default children content for this mode |
| `mode.props` | Default props to apply when mode is selected |
| `mode.propTargets` | Route props to subcomponent markers (e.g., `headerColor` → `Card.Header.props`) |
| `mode.imports` | Additional imports to add (e.g., `["useCollapsible"]`) |
| `mode.wrapper` | Code that wraps the component (use `{{component}}` marker) |

**Subcomponent Props**: Use `propTargets` to route props to specific template markers. In the template, use markers like `{{Card.Header.props}}` and then in `propTargets`, map prop names to their target marker: `"headerColor": "Card.Header.props"`.

**Hook Patterns**: Use `imports` to add hooks to the import statement, and `wrapper` to wrap the generated component in a function component that demonstrates the hook usage. The `{{component}}` marker in the wrapper will be replaced with the generated component JSX.

When structure modes are defined, a selector appears in the playground UI allowing users to switch between different usage patterns.

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

## FAQs

### How do I add a data preset and link it to sample data?

Add an entry under `dataPresets.presets` in `docs/_playground.overrides.json`. Each preset needs a **key** (used in code), a **label** (shown in the “Sample data” UI), and either:

- **`columnDefinitionsFile` / `tableDataFile`**: filenames relative to the kit’s `docs/` folder (recommended for large tables), or  
- **`columnDefinitions` / `tableData`**: inline JSON arrays for small samples.

Run `yarn generate:playground-configs --kit=<kit> --overwrite` so the generator inlines file references into `_playground.json`.

Example:

```json
"dataPresets": {
  "presets": {
    "my_dataset": {
      "label": "My dataset",
      "columnDefinitionsFile": "my_columns.json",
      "tableDataFile": "my_table_data.json"
    }
  }
}
```

### How do I connect a prop to sample data?

Use **`propSyncOnEnable`**: when the author turns **on** a given prop in the props panel, the playground can automatically switch to a **`dataPreset`** and/or **`structureMode`**.

```json
"propSyncOnEnable": {
  "pagination": { "dataPreset": "pagination" },
  "enableSorting": { "structureMode": "explicit" }
}
```

Keys are **camelCase prop names** from `kit.schema.json`. Values are the **`dataPresets.presets` key** and/or the **`structureModes.modes` key**. The props panel can show a short hint under those controls explaining which sample data or structure mode applies.

A **feature preset** can also set `dataPreset` on the preset object so choosing that pill loads the right bundle:

```json
{ "name": "With Pagination", "dataPreset": "pagination", "props": { "pagination": true } }
```

### How do I add hints for props?

Use the **`hints`** object with **`when`** comparing prop names to values. Comparisons use **effective** values (including `defaults` and schema defaults), not only toggles that are explicitly enabled.

```json
"hints": {
  "pagination_tip": {
    "when": { "pagination": true },
    "message": "Use paginationProps to tune the pager.",
    "type": "info"
  }
}
```

See **Hints Format** above for optional `type` and for combining with presets.

### How do I add hints for presets?

Add **`presetName`** (recommended) or **`presetIndex`** on that hint. The hint shows only when that **feature preset** (the pills next to the playground) is active. You can still add **`when`** if the message should also depend on props.

```json
"hints": {
  "my_preset_tip": {
    "presetName": "Column Styling",
    "message": "This sample demonstrates columnStyling in column definitions.",
    "type": "info"
  }
}
```

### What is “structure” (structure mode)?

**Structure mode** is an alternate **JSX template** (and optional default props) for the same kit—used for patterns like “simple one-liner” vs “subcomponents” (`AdvancedTable` + `Header` / `Body`) or “basic” vs “with hook”. It is configured under **`structureModes`**: `default` picks the initial mode; each **`modes.<key>`** has a `label`, `template` (with `{{props}}`, `{{children}}`, and optional markers like `{{AdvancedTable.Header.props}}`), and optional `propTargets`, `imports`, `wrapper`, etc.

Changing structure mode can change which props apply to which part of the template. **`conditionals`** may use **`"structureMode": "<key>"`** so a control is only enabled in a given mode.

### Can I hide props from the list?

Yes. Set **`hiddenProps`** to an array of **camelCase** prop names from `kit.schema.json`. Those props are omitted from the playground props panel (and count); they remain in the schema and in generated code if required elsewhere. Use this for callbacks that cannot be edited as JSON, or to reduce clutter.
