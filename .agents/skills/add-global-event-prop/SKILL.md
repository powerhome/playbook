---
name: add-global-event-prop
description: >-
  Add a new Playbook global event prop (React-only handlers) across the shared
  helper, kit opt-in, tests, docs site, and metadata regeneration. Use when
  introducing or extending GlobalEventProps for opted-in kits.
disable-model-invocation: true
---

# Add a global event prop

React-only event handlers for opted-in kits. Keep them off `GlobalProps` so kits with kit-specific handler signatures do not conflict.

## Checklist

```
Progress:
- [ ] 1. Type + globalEventProps() helper
- [ ] 2. Opt kits in (type intersection + spread)
- [ ] 3. Handler placement / precedence
- [ ] 4. React tests (helper, kits, precedence, non-opted-in)
- [ ] 5. Website Global Event Props example + sidebar
- [ ] 6. yarn generate:docs-metadata
```

### 1. Type and helper

In `playbook/app/pb_kits/playbook/utilities/globalEventProps.ts`:

- Add the handler to `GlobalEventProps`
- Return only defined handlers from `globalEventProps()`
- Do not add handlers to `globalProps.ts`

### 2. Kit opt-in

For each supported kit’s `_kit.tsx`:

- `} & GlobalProps & GlobalEventProps` (or equivalent)
- `{...globalEventProps(props)}` on the intended host element

Skip kits that already own the same handler name with different typing or target.

Schema sets `globalEventProps: true` when the props type includes `GlobalEventProps` — do not hand-edit `kit.schema.json`.

### 3. Placement and precedence

Spread after `htmlOptions` / `htmlProps` so the first-class prop wins. Omit the first-class prop to leave `htmlOptions` behavior unchanged. Never attach duplicate callbacks for the same event.

### 4. Tests

- React: `utilities/test/globalProps/<prop>.test.js` (or `globalEventProps/`)
- Cover helper, opted-in kits, first-class vs `htmlOptions`, and unchanged kit-specific handlers

### 5. Docs site

- Example under `GlobalPropsAndTokens/ExamplesPage/Examples/`
- Wire `GlobalEventPropsExamplesIndex.tsx`, `GlobalEventPropsCards.ts`
- Sidebar: `playbook-website/config/global_props_and_tokens.yml` → `global_event_props`

### 6. Regenerate

```bash
yarn generate:docs-metadata
```

Stages schema, kit `globalEventProps` flags, and `AvailableProps/globalEventPropsValues.ts`.

## Final checks

- Handlers are React-only and opt-in
- Kit-specific handlers elsewhere are preserved
- Supported kit show pages show the Global Event Props tab; unsupported pages do not
- Generated metadata is regenerated (never hand-edited)

## Reference

`docs/ADDING_GLOBAL_EVENT_PROPS.md`
