For custom Rails result rows, pass `{ option, content }` entries to the async search event's `setResults` callback. Plain option objects and rich entries can appear in the same result array.

- `option` is the ordinary serializable Dropdown option object: `id`, `label`, `value`, and any custom data. `disabled: true` prevents selection.
- `content` is an `Element` or `DocumentFragment`, usually cloned from a Rails-rendered `<template>`. Dropdown clones it into its standard option wrapper; it does not consume or move your original nodes. Populate API text with `textContent`. HTML strings are not a rich-content input.

The explicit `option.label` is used in the selected input, even when the row contains additional text. Content is not serialized into option data or the existing `pb:dropdown:selected` payload. Nested content supports click selection and keyboard navigation, including when the menu is portaled.

Provide display content only: do not include another Dropdown option wrapper, interactive controls, or named form inputs in suggestions. Keep submitted fields outside the result content and update them from selection data. Cloning preserves markup and data attributes but does not copy JavaScript event listeners attached to the original nodes.

The example searches [DummyJSON’s public sample users API](https://dummyjson.com/docs/users) without credentials or an API key. Try `Emily` or `Michael`. It renders Rails Body and Detail kits for the name, job title, and department, retaining title and department in the selected option data. The same pattern works with a User kit or other custom display content.
