Toggle pills to add or remove inputs from the form. Submit to see values for the selected fields on the right. The code snippet updates to match the current selection.

The form calls `useForm()` with `defaultValues` only — `shouldUnregister` is left at its default (`false`). A field's value therefore stays in form state when its pill is turned off, and is restored if the pill is turned back on. Deselected fields are removed in `onSubmit` instead, so only the selected fields appear in the submitted payload.

Every field is bound through `Controller`. A few kits need special handling because their `onChange` (or `onClick`) doesn't fire a DOM event, and their stored shape isn't a plain string.

### Kits that emit non-string values

`Dropdown`, `Select`, `Typeahead`, and `Multi Level Select` need a little extra care, because the value they emit isn't always a plain string.

- **`Dropdown`** calls `onChange({ target: { name, value } })`. For a single-select Dropdown, `event.target.value` is the selected option **node** (`{ id, label, value }`). For a multi-select Dropdown, it's an **array of nodes**. Store that node (or array) in form state so `value={field.value}` feeds the same shape back to the component — the Dropdown compares by `id` / `value` / `label` to determine which option is selected.

  ```jsx
  <Controller
    control={control}
    name="country"
    render={({ field, fieldState }) => (
      <Dropdown
          error={fieldState.error?.message}
          label="Country"
          onChange={(event) => field.onChange(event.target.value)}
          options={countryOptions}
          requiredIndicator
          value={field.value}
      />
    )}
    rules={{ validate: (value) => Boolean(value?.value || value?.label) || "Please select a country" }}
  />
  ```