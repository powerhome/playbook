Toggle pills to compose a validated form. Submit an empty form to see error states.

> **Note on `resetKey`:** several snippets below pass `key={resetKey}` to controls that only read their initial value on mount (Date Picker, Time Picker, Star Rating). `resetKey` is a counter incremented by the Cancel button so those controls remount and repaint from form state after a reset.

### Validation rules

Attach react-hook-form rules (`required`, `pattern`, or `validate`) to the field, and pass the message to the kit's `error` prop from `fieldState`:

```jsx
<Controller
  control={control}
  name="email"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Email"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        type="email"
        value={field.value}
    />
  )}
  rules={{ required: "Email is required" }}
/>
```