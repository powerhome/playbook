---
name: kit-playground
description: >-
  Author or update a Playbook kit playground via _playground.overrides.json.
  Use when adding presets, structure modes, wrappers, hints, requiredProps,
  externalDependencies, or enabling a kit on the website Playground tab.
disable-model-invocation: true
---

# Kit playground authoring

## Source of truth

```text
playbook/app/pb_kits/playbook/pb_<kit>/docs/_playground.overrides.json
```

Do **not** edit `_playground.json` — it is generated.

## Workflow

```
Progress:
- [ ] 1. Create/edit _playground.overrides.json
- [ ] 2. Regenerate metadata
- [ ] 3. Allowlist kit on website if needed
- [ ] 4. Validate generated examples / live preview
```

### 1. Edit overrides

Minimal shell (with children):

```json
{
  "template": "<KitName{{props}}>\n  {{children}}\n</KitName>",
  "children": { "editable": true, "default": "Kit content" },
  "defaults": {},
  "groups": [
    { "name": "Content", "props": [] },
    { "name": "Appearance", "props": [] },
    { "name": "State", "props": [] }
  ],
  "presets": [
    { "name": "Default", "props": {}, "children": "Kit content" }
  ],
  "conditionals": {},
  "hints": {}
}
```

Self-closing kits: `"template": "<KitName{{props}} />"` and `"children": { "editable": false, "default": "" }`.

### 2. Regenerate

Repo root (preferred):

```bash
yarn generate:docs-metadata
```

One kit:

```bash
cd playbook && yarn generate:playground-configs --kit=<kit_name> --overwrite
```

### 3. Website allowlist

If the Playground tab should show the kit, add it in:

`playbook-website/app/javascript/components/Website/src/pages/KitShow/index.tsx`

### 4. Patterns to prefer

| Need | Field |
|------|--------|
| Always-required data | `requiredProps` (not only `defaults`) |
| Alternate JSX shapes | `structureModes` |
| State / refs / providers | `wrapper` + `externalImports` |
| Child/subcomponent props | `customProps` + `propTargets` (real prop names) |
| Same props on every list child | `children.propInjection` |
| Host peer packages | `externalDependencies` |
| Schema default ≠ React runtime default | `codegenDefaultProps` |
| Hide noisy/owned props | `hiddenProps` |

Presets should show real usage, not every prop combo.

### Gotchas

- Templates/children must be valid JSX.
- Do not put raw `style={{ ... }}` in `template` strings — use a wrapper variable.
- Wrappers must define every variable the template references and include `{{component}}`.
- Do not fake props in `kit.schema.json` for playground-only controls — use `customProps`.

## Checklist

- [ ] Overrides JSON valid
- [ ] `_playground.json` regenerated
- [ ] Allowlisted if user-facing
- [ ] Presets / required data / wrappers correct
- [ ] `git diff --check` clean

## Reference

Full field docs: `docs/PLAYGROUND_CONFIG.md`
