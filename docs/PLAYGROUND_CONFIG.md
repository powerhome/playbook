# Playground Configs

Playground configs power the kit Playground tab on the docs site.

Do not hand-edit `docs/_playground.json` for normal kit work. That file is generated and will be overwritten. Put kit-specific choices in:

```text
playbook/app/pb_kits/playbook/<kit>/docs/_playground.overrides.json
```

Then regenerate:

```bash
cd playbook
yarn generate:playground-configs --kit=<kit_name> --overwrite
```

Example:

```bash
cd playbook
yarn generate:playground-configs --kit=button --overwrite
```

## Quick Start

Copy this into `docs/_playground.overrides.json` and edit from there:

```json
{
  "template": "<KitName{{props}}>\n  {{children}}\n</KitName>",
  "children": {
    "editable": true,
    "default": "Kit content"
  },
  "defaults": {},
  "groups": [
    {
      "name": "Content",
      "props": []
    },
    {
      "name": "Appearance",
      "props": []
    },
    {
      "name": "State",
      "props": []
    }
  ],
  "presets": [
    {
      "name": "Default",
      "props": {},
      "children": "Kit content"
    }
  ],
  "conditionals": {},
  "hints": {
    "usage": {
      "when": {},
      "message": "Add one short note that helps someone use this kit correctly.",
      "type": "info"
    }
  }
}
```

For a kit without children:

```json
{
  "template": "<KitName{{props}} />",
  "children": {
    "editable": false,
    "default": ""
  },
  "groups": [
    { "name": "Props", "props": [] }
  ],
  "presets": [
    { "name": "Default", "props": {} }
  ],
  "conditionals": {},
  "hints": {}
}
```

Replace `KitName` with the React component name, such as `Button`, `Overlay`, or `MultiLevelSelect`.

## Normal Workflow

1. Create or edit `docs/_playground.overrides.json`.
2. Run `yarn generate:playground-configs --kit=<kit_name> --overwrite` from `playbook/`.
3. Check both files:
   - `docs/_playground.overrides.json` is the source you maintain.
   - `docs/_playground.json` is the generated file the website reads.
4. Add the kit to the Playground allowlist if it is not already enabled:
   - `playbook-website/app/javascript/components/Website/src/pages/KitShow/index.tsx`
5. Validate generated examples when you add templates, wrappers, or complex children.

Pre-commit hooks also regenerate configs when schema or override files change, but running the command locally makes failures easier to understand.

## How Generation Works

The generator uses two layers:

1. Base config from `kit.schema.json`
2. Kit override from `docs/_playground.overrides.json`

The base layer can infer simple things like component name, schema defaults, and props. The override layer defines the actual playground experience: useful presets, prop groupings, children, subcomponent structures, hints, wrappers, and sample data.

## Common Fields

| Field | Purpose |
| --- | --- |
| `template` | JSX template. Use `{{props}}` where enabled props should be inserted and `{{children}}` where editable children should appear. |
| `children` | Controls the Children editor. Use multiline JSX for kits like `Nav`, `Flex`, or `List`. |
| `defaults` | Baseline values for controls. Defaults seed the UI but are not emitted until the prop is enabled, selected by a preset, required, or part of a structure mode. |
| `groups` | Sections in the props panel. Use camelCase prop names. Props not listed still appear under `Other` unless hidden. |
| `presets` | Feature pills. Each preset can set `props`, `children`, `structureMode`, or `dataPreset`. |
| `conditionals` | Disable controls until requirements are met. |
| `hints` | Info/warning/error banners above the preview. |
| `hiddenProps` | Props to omit from the props panel. |
| `requiredProps` | Props that should always be present and non-disableable. Useful for required arrays/data like `treeData`. |
| `customProps` | Playground-only controls not in the schema, often used for subcomponent props. |
| `propTargets` | Routes a prop into a template marker other than `{{props}}`. |
| `propAliases` | Renames a playground prop when emitted, such as `navItemText` -> `text`. |
| `structureModes` | Alternate templates for the same kit, such as default vs subcomponent usage. |
| `propSyncOnEnable` | Switches structure/data automatically when a prop is enabled. |
| `wrapper` | Wraps generated JSX with a function component or setup code. Can be top-level or per structure mode. |
| `externalImports` | Imports from packages outside `playbook-ui`, such as `maplibre-gl`. |
| `dataPresets` | Named sample datasets, usually for table-like kits. |

## Presets

Presets should demonstrate real kit usage, not every possible prop.

```json
"presets": [
  {
    "name": "Primary",
    "props": {
      "variant": "primary"
    },
    "children": "Submit"
  },
  {
    "name": "Disabled",
    "props": {
      "disabled": true,
      "variant": "secondary"
    },
    "children": "Unavailable"
  }
]
```

Preset values are emitted in generated code because they represent the selected example.

## Children

Use `children.editable` when the user should be able to edit nested JSX.

```json
"children": {
  "editable": true,
  "default": "<NavItem link=\"#\" text=\"Photos\" />\n<NavItem active link=\"#\" text=\"Video\" />"
}
```

Any template that includes `{{children}}` will show the Children editor. If a structure mode does not include `{{children}}`, the editor is hidden for that mode.

This is useful for kits where child rows/items matter, such as `Nav`, `Flex`, `List`, `Overlay`, and subcomponent examples.

## Defaults

Use `defaults` to make controls start with useful values.

```json
"defaults": {
  "size": "md",
  "showCheckedChildren": true,
  "inputProps": {
    "name": "passphrase"
  }
}
```

Defaults are not the same thing as emitted props. They seed the UI as implicit values. If you need a prop to always appear in generated code, use `requiredProps`, a preset, or structure mode `props`.

Object and array defaults prefill the JSON/JS-literal textareas when the prop is enabled.

## Required Props

Use `requiredProps` for props that the kit cannot render without.

```json
"requiredProps": {
  "treeData": [
    {
      "id": "people",
      "label": "People",
      "value": "people",
      "children": [
        { "id": "talent", "label": "Talent", "value": "talent" }
      ]
    }
  ]
}
```

Required props:

- are always enabled
- cannot be toggled off
- are injected into the live preview scope
- are emitted in display code as variable definitions

Templates should reference required data directly:

```json
"template": "<MultiLevelSelect\n  treeData={treeData}{{props}}\n/>"
```

## Groups

Groups organize the props panel.

```json
"groups": [
  { "name": "Content", "props": ["label", "placeholder"] },
  { "name": "State", "props": ["disabled", "error", "required"] },
  { "name": "Appearance", "props": ["size", "variant"] }
]
```

Use camelCase prop names from `kit.schema.json`.

For playground-only props from `customProps`, also use the custom prop key in groups.

## Conditionals

Conditionals disable controls that do not apply yet.

```json
"conditionals": {
  "requiredIndicator": {
    "requires": "label"
  },
  "extendedUnderline": {
    "requires": {
      "orientation": "horizontal",
      "variant": "normal"
    }
  },
  "sortIcon": {
    "structureMode": "explicit"
  }
}
```

Supported fields:

| Field | Purpose |
| --- | --- |
| `requires` | A prop must be truthy or match a value. Use a string or object. |
| `showWhen` | Extra gate with the same shapes as `requires`. |
| `structureMode` | The control is enabled only in this structure mode. |

Conditionals compare effective values, including schema defaults and override `defaults`.

## Hints

Hints show above the preview.

```json
"hints": {
  "controlled": {
    "presetName": "Controlled",
    "message": "Keep current in state and update it from onChange.",
    "type": "info"
  },
  "link_mode": {
    "when": { "link": true },
    "message": "Button renders as an anchor when link is set.",
    "type": "info"
  }
}
```

Use `presetName` for preset-specific help. Use `when` for prop-specific help. You can combine them.

`type` can be `info`, `warning`, or `error`.

## Structure Modes

Use `structureModes` when one kit has multiple JSX shapes.

```json
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
      "props": {
        "padding": "none"
      },
      "propTargets": {
        "headerColor": "Card.Header.props"
      }
    }
  }
}
```

Each mode can define:

| Field | Purpose |
| --- | --- |
| `label` | Label in the Structure selector. |
| `template` | JSX template for this structure. |
| `children` | Mode-specific default children. |
| `props` | Mode-specific props that are enabled by default. |
| `imports` | Additional imports from `playbook-ui`. |
| `externalImports` | Imports outside `playbook-ui`. |
| `wrapper` | Mode-specific wrapper. |
| `propTargets` | Mode-specific target routing. |
| `propAliases` | Mode-specific aliases. |

## Subcomponent Props

When the subcomponent has props but no schema, create playground-only controls with a prefix.

Example: control one `NavItem` from the Nav playground.

```json
{
  "structureModes": {
    "default": "nav_item_props",
    "modes": {
      "nav_item_props": {
        "label": "NavItem Props",
        "template": "<Nav{{props}}>\n  <NavItem{{NavItem.props}} />\n  {{children}}\n</Nav>",
        "children": "<NavItem link=\"#\" text=\"Music\" />",
        "props": {
          "navItemText": "Photos",
          "navItemLink": "#"
        }
      }
    }
  },
  "customProps": {
    "navItemText": {
      "type": "string",
      "platforms": ["react"],
      "default": "Photos"
    },
    "navItemLink": {
      "type": "string",
      "platforms": ["react"],
      "default": "#"
    },
    "navItemActive": {
      "type": "boolean",
      "platforms": ["react"],
      "default": false
    }
  },
  "propTargets": {
    "navItemText": "NavItem.props",
    "navItemLink": "NavItem.props",
    "navItemActive": "NavItem.props"
  },
  "propAliases": {
    "navItemText": "text",
    "navItemLink": "link",
    "navItemActive": "active"
  },
  "groups": [
    {
      "name": "NavItem Props",
      "props": ["navItemText", "navItemLink", "navItemActive"]
    }
  ]
}
```

Use `propSyncOnEnable` if turning on one of these props should switch to the matching structure:

```json
"propSyncOnEnable": {
  "navItemText": { "structureMode": "nav_item_props" },
  "navItemActive": { "structureMode": "nav_item_props" }
}
```

This same pattern works for `FlexItem`, `Map.Controls`, `AdvancedTable.Header`, or any child/subcomponent surface.

## Wrappers And State

Use `wrapper` when the example needs state, callbacks, refs, effects, or a provider.

```json
{
  "template": "<Passphrase\n  onChange={(event) => setInput(event.target.value)}\n  value={input}{{props}}\n/>",
  "wrapper": "const PassphrasePlayground = () => {\n  const [input, setInput] = useState('')\n\n  return {{component}}\n}\n\n<PassphrasePlayground />",
  "externalImports": [
    "import React, { useState } from 'react'"
  ],
  "hiddenProps": ["onChange", "value"]
}
```

Wrappers can be top-level, like above, or inside a structure mode.

The wrapper must include `{{component}}`; the generator replaces it with the generated JSX.

Use wrapper examples for:

- controlled inputs
- stateful pagination
- fullscreen open/close demos
- provider requirements
- third-party setup such as maps
- refs/effects

## Imports

Use `imports` for extra exports from `playbook-ui`:

```json
"imports": ["mapTheme"]
```

Use `externalImports` for packages outside `playbook-ui`:

```json
"externalImports": [
  "import React, { useEffect, useRef, useState } from 'react'",
  "import maplibregl from 'maplibre-gl'"
]
```

For live preview, the package must also be available in the Playground scope. If a kit needs a new third-party runtime in preview, update `PlaygroundPreview.tsx` or another shared scope path as needed.

## Data Presets

Use `dataPresets` for large sample data, especially tables.

```json
"dataPresets": {
  "presets": {
    "default": {
      "label": "Default",
      "columnDefinitionsFile": "advanced_table_column_definitions_standard.json",
      "tableDataFile": "advanced_table_mock_data.json"
    },
    "with_ids": {
      "label": "Data with row IDs",
      "columnDefinitionsFile": "advanced_table_column_definitions_standard.json",
      "tableDataFile": "advanced_table_mock_data_with_id.json"
    }
  }
}
```

Files are relative to the kit `docs/` folder and cannot escape that folder. The generator inlines file contents into `_playground.json`.

Use `propSyncOnEnable` to switch sample data when a prop needs it:

```json
"propSyncOnEnable": {
  "selectableRows": { "dataPreset": "with_ids" },
  "enableSorting": { "structureMode": "explicit" }
}
```

Presets can also select data:

```json
{
  "name": "Selectable Rows",
  "dataPreset": "with_ids",
  "props": {
    "selectableRows": true
  }
}
```

## Hiding Props

Use `hiddenProps` for props that should not be user-editable in the props panel.

```json
"hiddenProps": ["onChange", "value", "htmlOptions"]
```

Good reasons to hide props:

- the playground wrapper owns the prop
- the prop cannot be usefully edited in JSON
- the prop is internal/noisy
- the prop is represented by a custom playground control instead

## Gotchas

### Do not edit `_playground.json`

Edit `_playground.overrides.json`, then regenerate. Generated files are overwritten by the script and pre-commit hook.

### Use valid JSX in templates and children

The generator parses strings as JSX. If a snippet is complex, validate the generated output before shipping.

### Avoid raw JSX object literals in templates

The generator uses `{{...}}` markers. Inline JSX like this inside `template` can be mistaken for a marker:

```jsx
<div style={{ position: 'relative' }} />
```

Prefer a wrapper variable:

```json
{
  "template": "<div style={containerStyle}>{{children}}</div>",
  "wrapper": "const containerStyle = { position: 'relative' }\n\n{{component}}"
}
```

Object props generated from actual prop values are fine; this gotcha is only about raw `{{ ... }}` in template strings.

### If live preview says a variable is undefined, check wrappers

If the template uses `setInput`, `mapContainerRef`, `mapInstance`, or similar, the active wrapper must define it. A wrapper can live at the root config or inside a structure mode.

### If a prop belongs to a child component, use `customProps`

Do not add fake props to `kit.schema.json` just for the playground. Add them under `customProps`, target them with `propTargets`, and rename them with `propAliases`.

### If a kit needs required data, use `requiredProps`

Do not put required data only in `defaults`. Defaults seed controls but may not emit required props. Put required render data in `requiredProps` and reference it from the template.

## Manual Commands

```bash
# Generate one kit
cd playbook
yarn generate:playground-configs --kit=<kit_name> --overwrite

# Generate all kits
cd playbook
yarn generate:playground-configs --overwrite

# Debug base config without overrides
cd playbook
yarn generate:playground-configs --kit=<kit_name> --overwrite --base-only
```

## Review Checklist

Before handing off a playground override:

- The kit is in the website playground allowlist if it should be visible.
- `docs/_playground.overrides.json` is valid JSON.
- `docs/_playground.json` was regenerated.
- Presets demonstrate real usage patterns.
- Required data is in `requiredProps`, not just `defaults`.
- Subcomponent props use `customProps`, `propTargets`, and `propAliases`.
- Wrappers define every variable used by the template.
- Complex children/templates parse as JSX.
- `git diff --check` is clean.
