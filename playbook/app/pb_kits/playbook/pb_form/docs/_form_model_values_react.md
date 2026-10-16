This example is an edit form after a failed server validation. React kits do not read a model, so pass saved values through `useForm({ defaultValues })` and pass each server error string to the kit's `error` prop.

| Kit | Initial value | Error |
| --- | --- | --- |
| Text Input / Textarea / Select | `defaultValues` | `error` |
| Date Picker | `defaultDate` | `error` |
| Time Picker | `defaultTime` | `error` |
| Dropdown | `defaultValue` (an option object from `options`) | `error` |
| Multi Level Select | `selectedIds` | `error` |
| Phone Number Input | `value` | `error` |
| Typeahead | `defaultValue` (an option object or array) | `error` |
| Star Rating | `rating` | n/a |

**Notes**
- Dropdown and Typeahead need the full option object (`{ label, value }`), not a bare id. Look up the option in `options` before passing it.
- To map errors from a server response into react-hook-form, call `setError(name, { message })` and read `fieldState.error` or `formState.errors`.
