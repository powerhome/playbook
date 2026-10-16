Toggle pills to compose a validated form. Submit an empty form to see error states.

### Validation rules

Use react-hook-form rules (`required`, `pattern`, or `validate`) and pass the message to the kit's `error` prop:

```jsx
<Controller
  control={control}
  name="email"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Email"
        onChange={(event) => field.onChange(event.target.value)}
        value={field.value}
    />
  )}
  rules={{ required: "Email is required" }}
/>
```

For kits used with `register`, read the message from `formState.errors`:

```jsx
<Select
    error={errors.favoriteColor?.message}
    label="Favorite Color"
    options={options}
    {...register("favoriteColor", { required: "Please select a color" })}
/>
```

Dropdown, Typeahead, and Multi Level Select return objects or arrays, so use a `validate` rule instead of `required`.

Checkbox `error` is a boolean that only styles the kit, and Star Rating has no `error` prop. For both, render the message next to the kit.

### Required indicator

The `requiredIndicator` prop adds a red asterisk (*) to the input label. It is purely visual and does not enforce validation. Pair it with a react-hook-form rule. Support follows the underlying kit (for example Text Input, Textarea, Select, Dropdown, Typeahead, Multi Level Select, Phone Number Input, Date Picker, Time Picker, and Checkbox).
