# How to Add a New Global Prop

Global props are styling and layout props that should work consistently across Playbook kits in Rails and React. Add them only when the API can be represented by a closed set of design-system values or an already-approved dynamic pattern. Do not introduce open-ended raw CSS values unless the global prop system already supports that pattern.

## 1. Define the Rails Prop

Add a Ruby module in `playbook/lib/playbook/<prop_name>.rb`.

- Register the prop with `base.prop`.
- For enum-style props, keep the approved values in a frozen constant.
- Generate class names only for approved values.
- Expose helper methods if form helpers or specs need shared class generation.

Then wire the module into `playbook/lib/playbook/kit_base.rb`:

- Add a `require "playbook/<prop_name>"`.
- Include the module in `Playbook::KitBase`.

Finally, append the generated class in `playbook/lib/playbook/classnames.rb`.

## 2. Define the React Prop

Update `playbook/app/pb_kits/playbook/utilities/globalProps.ts`.

- Add the TypeScript type for the prop and any directional or related variants.
- Add the type into the exported `GlobalProps` intersection.
- Add a class generator under `PROP_CATEGORIES`.
- Add DOM-unsafe prop names to `domSafeProps` so they are not spread onto native elements.
- Validate enum values before generating classes.

## 3. Add Styles

Add or update SCSS under `playbook/app/pb_kits/playbook/utilities/`.

- Use Playbook tokens from `tokens/` instead of hardcoded design values.
- Generate predictable utility classes that match Rails and React class generation.
- Add any kit-specific overrides only when a kit has existing styles that override the utility.

Import the new utility in `playbook/app/entrypoints/playbook.scss`.

## 4. Support Form Helpers

If the prop should work through Rails form helper options, update `playbook/lib/playbook/pb_forms_global_props_helper.rb`.

- Add the prop to `extract_all_props`.
- Add class generation in `generate_prop_classes`.
- Reuse shared class helpers from the Ruby global prop module when possible.

## 5. Add Tests

Add focused coverage in both platforms.

- React: add `playbook/app/pb_kits/playbook/utilities/test/globalProps/<prop>.test.js`.
- Rails: add `playbook/spec/playbook/global_props/<prop>_spec.rb`.
- Test valid values across representative kits.
- Test absence behavior for missing, nil/null, and blank values.
- Test invalid values do not generate raw or unexpected classes.
- Include directional variants when the prop supports them.

## 6. Create Example page

Add a Global Props page that demonstrates the prop in a Visual Guide and highlights the values and usage in a Prop Table.

- Create file: `playbook-website/app/javascript/components/Website/src/components/GlobalPropsAndTokens/ExamplesPage/Examples/{PropName}GlobalProps.tsx`.
- Add to GlobalProps index `playbook-website/app/javascript/components/Website/src/components/GlobalPropsAndTokens/ExamplesPage/GlobalPropsExamplesIndex.tsx`.
- Add to index page `playbook-website/app/javascript/components/Website/src/components/GlobalPropsAndTokens/Data/GlobalPropsCards.ts`.
- Add to Sidebar `playbook-website/config/global_props_and_tokens.yml`.


## 7. Regenerate Metadata

Run metadata generation after changing global prop types.

```bash
cd playbook
yarn generate:global-props-metadata
yarn generate:ai-metadata
```

This updates:

- `playbook/app/pb_kits/playbook/utilities/global-props.schema.json`
- `playbook/app/pb_kits/playbook/pb_*/kit.schema.json`

If website available-props values are generated from the schema, regenerate them from `playbook-website` as well.

## 8. Final Checklist

- The prop uses approved design-system values.
- Rails and React generate the same class names.
- Directional variants are supported where required.
- SCSS uses Playbook tokens.
- The prop is filtered from native DOM spreads.
- Form helpers support the prop if applicable.
- Schema and kit metadata are regenerated.
- Examples render in Rails and React tested locally doc examples.
- Global Props page contains information and demos.
- Tests cover valid, absent, and invalid values.
