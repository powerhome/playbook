Set `enableFormSupport` to opt into React native form submission, required validation, and reset handling. The prop defaults to `false`. Passing `name` or `required` alone does not enable native form behavior. Option creation is a separate feature controlled by `allowOptionCreation`.

With `enableFormSupport` enabled and `name` provided, Dropdown renders named hidden inputs. Each selected option submits its `id`, falling back to `value`. For `multiSelect`, each selection gets a separate input and the name ends in `[]`; an existing `[]` suffix is preserved. Disabled Dropdowns do not submit values. An empty selection submits an empty string.

The example below requires at least one tag. Submit an empty selection to see validation, select tags and submit to see the values from `FormData`, or use Reset to restore the default selection.

Use `required` for native form constraint validation, `validationMessage` for the inline required message, and `requiredIndicator` for the visual asterisk. Invalid submissions focus the trigger or autocomplete input. Typing a query does not satisfy required validation; select an option first. The unnamed validation input never submits query text.

Native form reset restores `defaultValue`, clears the query and validation message, and closes the menu. A controlled Dropdown reports that reset through its normal selection callbacks; the parent must update `value`. Canceling the reset event preserves the selection. In a controlled form library, pass `value`, `name`, and `onChange`; Dropdown sends `{ target: { name, value } }`, with an option object or array as `value`. The forwarded ref exposes `clearSelected`, rather than a native input ref.
