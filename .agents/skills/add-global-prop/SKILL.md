---
name: add-global-prop
description: >-
  Add a new Playbook global prop across Rails, React, SCSS, tests, docs site,
  and playground grouping. Use when introducing or extending global layout/style
  props available on all kits.
disable-model-invocation: true
---

# Add a global prop

Only for closed design-system value sets (or approved dynamic patterns). Prefer tokens over open-ended CSS.

## Checklist

```
Progress:
- [ ] 1. Rails prop module + kit_base + classnames
- [ ] 2. React globalProps.ts (+ domSafeProps)
- [ ] 3. SCSS utilities + playbook.scss import
- [ ] 4. Form helpers (if applicable)
- [ ] 5. React + Rails tests
- [ ] 6. Website Global Props examples + sidebar
- [ ] 7. Playground GLOBAL_PROP_GROUPS
- [ ] 8. yarn generate:docs-metadata
```

### 1. Rails

- Add `playbook/lib/playbook/<prop_name>.rb` (`base.prop`, frozen enums, class generation)
- `require` + include in `playbook/lib/playbook/kit_base.rb`
- Append class in `playbook/lib/playbook/classnames.rb`

### 2. React

In `playbook/app/pb_kits/playbook/utilities/globalProps.ts`:

- Types + `GlobalProps` intersection
- Class generator in `PROP_CATEGORIES`
- `domSafeProps` for non-DOM names
- Validate enums before emitting classes

### 3. Styles

- SCSS under `playbook/app/pb_kits/playbook/utilities/` using tokens
- Import from `playbook/app/entrypoints/playbook.scss`
- Kit overrides only when existing kit CSS fights the utility

### 4. Form helpers

If needed: `playbook/lib/playbook/pb_forms_global_props_helper.rb` (`extract_all_props`, `generate_prop_classes`).

### 5. Tests

- React: `utilities/test/globalProps/<prop>.test.js`
- Rails: `spec/playbook/global_props/<prop>_spec.rb`
- Cover valid, absent/nil/blank, invalid (no raw/unexpected classes), directional variants

### 6. Docs site

- Example page under `GlobalPropsAndTokens/ExamplesPage/Examples/`
- Wire into `GlobalPropsExamplesIndex.tsx`, `GlobalPropsCards.ts`
- Sidebar: `playbook-website/config/global_props_and_tokens.yml`

### 7. Playground groups

Update `GLOBAL_PROP_GROUPS` in:

`playbook-website/.../KitShow/Tabs/Playground/constants.ts`

Otherwise the prop lands under **Other**.

### 8. Regenerate

```bash
yarn generate:docs-metadata
```

## Final checks

- Rails and React emit the same class names
- SCSS uses tokens
- Schema/playground metadata regenerated
- Examples render locally

## Reference

`docs/ADDING_GLOBAL_PROPS.md`
