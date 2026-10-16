import React, { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import Body from "../../pb_body/_body"
import Button from "../../pb_button/_button"
import Caption from "../../pb_caption/_caption"
import Card from "../../pb_card/_card"
import Checkbox from "../../pb_checkbox/_checkbox"
import DatePicker from "../../pb_date_picker/_date_picker"
import Dropdown from "../../pb_dropdown/_dropdown"
import Flex from "../../pb_flex/_flex"
import MultiLevelSelect from "../../pb_multi_level_select/_multi_level_select"
import PhoneNumberInput from "../../pb_phone_number_input/_phone_number_input"
import Pill from "../../pb_pill/_pill"
import Select from "../../pb_select/_select"
import StarRating from "../../pb_star_rating/_star_rating"
import Textarea from "../../pb_textarea/_textarea"
import TextInput from "../../pb_text_input/_text_input"
import TimePicker from "../../pb_time_picker/_time_picker"
import Typeahead from "../../pb_typeahead/_typeahead"

const INPUT_TYPES = [
  { key: "checkbox", label: "Checkbox" },
  { key: "date_picker", label: "Date Picker" },
  { key: "dropdown", label: "Dropdown: Default" },
  { key: "multi_select", label: "Dropdown: Multi Select" },
  { key: "multi_level_select", label: "Multi Level Select" },
  { key: "phone_number", label: "Phone Number" },
  { key: "select", label: "Select: Default" },
  { key: "star_rating", label: "Star Rating" },
  { key: "text_field", label: "Text Input: Default" },
  { key: "email_field", label: "Text Input: Email" },
  { key: "number_field", label: "Text Input: Number" },
  { key: "password_field", label: "Text Input: Password" },
  { key: "search_field", label: "Text Input: Search" },
  { key: "url_field", label: "Text Input: URL" },
  { key: "textarea", label: "Textarea" },
  { key: "time_picker", label: "Time Picker" },
  { key: "typeahead_default", label: "Typeahead: Default" },
  { key: "typeahead", label: "Typeahead: Multi" },
]

const DEFAULT_SELECTED_KEY = "text_field"
const REQUIRED_MESSAGE = "Please fill out this field."

const COLOR_SELECT_OPTIONS = [
  { text: "Red", value: "red" },
  { text: "Blue", value: "blue" },
  { text: "Green", value: "green" },
]

const COUNTRY_OPTIONS = [
  { id: "us-val", label: "United States", value: "United States" },
  { id: "ca-val", label: "Canada", value: "Canada" },
  { id: "pk-val", label: "Pakistan", value: "Pakistan" },
]

const TYPEAHEAD_COLOR_OPTIONS = [
  { label: "Orange", value: "#FFA500" },
  { label: "Red", value: "#FF0000" },
  { label: "Green", value: "#00FF00" },
  { label: "Blue", value: "#0000FF" },
]

const DEPARTMENT_TREE_DATA = [
  {
    children: [
      {
        children: [
          { id: "validation-102", label: "Talent Acquisition", value: "talentAcquisition" },
          { id: "validation-103", label: "People Experience", value: "peopleExperience" },
        ],
        id: "validation-101",
        label: "People",
        value: "people",
      },
      {
        children: [
          { id: "validation-105", label: "Customer Service", value: "customerService" },
          { id: "validation-106", label: "Energy", value: "energy" },
        ],
        id: "validation-104",
        label: "Contact Center",
        value: "contactCenter",
      },
    ],
    expanded: true,
    id: "validation-100",
    label: "Power Home Remodeling",
    value: "powerHomeRemodeling",
  },
]

const requireSelection = (message) => ({
  validate: (value) => {
    if (Array.isArray(value)) return value.length > 0 || message
    if (value && typeof value === "object") {
      return Boolean(value.id || value.value || value.label) || message
    }
    return (value !== undefined && value !== null && value !== "") || message
  },
})

const CODE_SNIPPETS = {
  checkbox: `<Controller
  control={control}
  name="newsletter"
  render={({ field, fieldState }) => (
    <Checkbox
        checked={!!field.value}
        error={!!fieldState.error}
        onChange={(event) => field.onChange(event.target.checked)}
        requiredIndicator
        text="Subscribe to newsletter"
    />
  )}
  rules={{ validate: (value) => value === true || "${REQUIRED_MESSAGE}" }}
/>`,
  date_picker: `<Controller
  control={control}
  name="startDate"
  render={({ field, fieldState }) => (
    <DatePicker
        allowInput
        error={fieldState.error?.message}
        initializeOnce
        key={resetKey}
        label="Start Date"
        onChange={(dateStr) => field.onChange(dateStr)}
        pickerId="form-validation-start-date"
        requiredIndicator
    />
  )}
  rules={{ required: "Start date is required" }}
/>`,
  dropdown: `<Dropdown
    error={errors.country?.message}
    label="Country"
    options={countryOptions}
    requiredIndicator
    {...register("country", requireSelection("${REQUIRED_MESSAGE}"))}
/>`,
  email_field: `<Controller
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
/>`,
  multi_level_select: `<Controller
  control={control}
  name="department"
  render={({ field, fieldState }) => (
    <MultiLevelSelect
        error={fieldState.error?.message}
        id="mls-validation"
        label="Department"
        onChange={(event) =>
          field.onChange(event.target.value.map((item) => item.id))
        }
        requiredIndicator
        selectedIds={field.value}
        treeData={departmentTreeData}
    />
  )}
  rules={requireSelection("${REQUIRED_MESSAGE}")}
/>`,
  multi_select: `<Dropdown
    error={errors.countries?.message}
    label="Countries"
    multiSelect
    options={countryOptions}
    requiredIndicator
    {...register("countries", requireSelection("${REQUIRED_MESSAGE}"))}
/>`,
  number_field: `<Controller
  control={control}
  name="quantity"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Quantity"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        type="number"
        value={field.value}
    />
  )}
  rules={{ required: "Quantity is required" }}
/>`,
  password_field: `<Controller
  control={control}
  name="password"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Password"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        type="password"
        value={field.value}
    />
  )}
  rules={{ required: "Password is required" }}
/>`,
  phone_number: `<Controller
  control={control}
  name="phone"
  render={({ field, fieldState }) => (
    <PhoneNumberInput
        error={fieldState.error?.message}
        label="Phone Number"
        onChange={(data) => field.onChange(data?.number || "")}
        ref={phoneNumberRef}
        required
        requiredIndicator
    />
  )}
  rules={{ validate: () => phoneNumberRef.current?.validate() ?? true }}
/>`,
  search_field: `<Controller
  control={control}
  name="projectNumber"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Project Number"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        type="search"
        value={field.value}
    />
  )}
  rules={{
    required: "Please enter a valid project number (example: 33-12345).",
    pattern: {
      value: /^[0-9]{2}-[0-9]{5}$/,
      message: "Please enter a valid project number (example: 33-12345).",
    },
  }}
/>`,
  select: `<Select
    blankSelection="Select one..."
    error={errors.favoriteColor?.message}
    label="Favorite Color"
    options={colorSelectOptions}
    required
    requiredIndicator
    {...register("favoriteColor", { required: "Please select a color" })}
/>`,
  star_rating: `<Controller
  control={control}
  name="rating"
  render={({ field, fieldState }) => (
    <>
      <StarRating
          label="Rating"
          onClick={(value) => field.onChange(value)}
          rating={field.value || 0}
          variant="interactive"
      />
      {fieldState.error && <Body status="negative" text={fieldState.error.message} />}
    </>
  )}
  rules={{ validate: (value) => Number(value) > 0 || "${REQUIRED_MESSAGE}" }}
/>`,
  text_field: `<Controller
  control={control}
  name="fullName"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Full Name"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        value={field.value}
    />
  )}
  rules={{ required: "Full name is required" }}
/>`,
  textarea: `<Controller
  control={control}
  name="bio"
  render={({ field, fieldState }) => (
    <Textarea
        error={fieldState.error?.message}
        label="Bio"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        value={field.value}
    />
  )}
  rules={{ required: "${REQUIRED_MESSAGE}" }}
/>`,
  time_picker: `<Controller
  control={control}
  name="startTime"
  render={({ field, fieldState }) => (
    <TimePicker
        error={fieldState.error?.message}
        key={resetKey}
        label="Start Time"
        onChange={(time) => field.onChange(time)}
        required
        requiredIndicator
    />
  )}
  rules={{ required: "Start time is required" }}
/>`,
  typeahead: `<Controller
  control={control}
  name="favoriteColors"
  render={({ field: { onChange: handleChange, value }, fieldState }) => (
    <Typeahead
        error={fieldState.error?.message}
        isMulti
        label="Favorite Color"
        onChange={handleChange}
        options={typeaheadColorOptions}
        pills
        placeholder="Search for a color"
        requiredIndicator
        value={value}
    />
  )}
  rules={requireSelection("Please select a color")}
/>`,
  typeahead_default: `<Controller
  control={control}
  name="favoriteColorSearch"
  render={({ field: { onChange: handleChange, value }, fieldState }) => (
    <Typeahead
        error={fieldState.error?.message}
        label="Favorite Color"
        onChange={handleChange}
        options={typeaheadColorOptions}
        placeholder="Search for a color"
        requiredIndicator
        value={value}
    />
  )}
  rules={requireSelection("Please select a color")}
/>`,
  url_field: `<Controller
  control={control}
  name="website"
  render={({ field, fieldState }) => (
    <TextInput
        error={fieldState.error?.message}
        label="Website"
        onChange={(event) => field.onChange(event.target.value)}
        required
        requiredIndicator
        type="url"
        value={field.value}
    />
  )}
  rules={{ required: "Website is required" }}
/>`,
}

const FORM_OPEN = `const { register, control, handleSubmit, formState: { errors } } = useForm({ shouldUnregister: true })

<form noValidate onSubmit={handleSubmit(onSubmit)}>`
const FORM_CLOSE = `  <Button htmlType="submit" text="Submit" />
  <Button htmlType="button" onClick={onReset} text="Cancel" variant="secondary" />
</form>`

const FormValidation = () => {
  const [selectedKeys, setSelectedKeys] = useState([DEFAULT_SELECTED_KEY])
  const [submittedData, setSubmittedData] = useState(null)
  const [resetKey, setResetKey] = useState(0)
  const phoneNumberRef = useRef(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      bio: "",
      department: null,
      email: "",
      favoriteColor: "",
      favoriteColors: [],
      favoriteColorSearch: null,
      fullName: "",
      password: "",
      projectNumber: "",
      quantity: "",
      website: "",
    },
    shouldUnregister: true,
  })

  const isSelected = (key) => selectedKeys.includes(key)

  const toggleKey = (key) => {
    setSelectedKeys((current) => {
      if (!current.includes(key)) return [...current, key]
      return current.length > 1 ? current.filter((selected) => selected !== key) : current
    })
  }

  const handlePillKeyDown = (event, key) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    toggleKey(key)
  }

  const onReset = () => {
    reset()
    setResetKey((current) => current + 1)
    setSubmittedData(null)
  }

  const codePreview = [FORM_OPEN]
    .concat(INPUT_TYPES.filter((inputType) => isSelected(inputType.key)).map((inputType) => CODE_SNIPPETS[inputType.key]))
    .concat([FORM_CLOSE])
    .join("\n\n")

  return (
    <div>
      <Body color="light"
          marginBottom="xs"
          text="Select one or more inputs to add them to the form."
      />
      <Flex gap="xs"
          marginBottom="md"
          wrap
      >
        {INPUT_TYPES.map((inputType) => (
          <Pill
              htmlOptions={{
                onClick: () => toggleKey(inputType.key),
                onKeyDown: (event) => handlePillKeyDown(event, inputType.key),
                role: "button",
                style: { cursor: "pointer" },
                tabIndex: 0,
              }}
              key={inputType.key}
              text={inputType.label}
              textTransform="none"
              variant={isSelected(inputType.key) ? "primary" : "neutral"}
          />
        ))}
      </Flex>

      <Flex align="stretch"
          gap="md"
          wrap
      >
        <Flex
            htmlOptions={{ style: { flex: "2 1 280px", minWidth: 0 } }}
            orientation="column"
        >
          <Card
              htmlOptions={{ style: { minWidth: 0 } }}
              padding="md"
              shadow="deep"
          >
            <form noValidate
                onSubmit={handleSubmit(setSubmittedData)}
            >
              {isSelected("checkbox") && (
                <Controller
                    control={control}
                    name="newsletter"
                    render={({ field, fieldState }) => (
                      <Checkbox
                          checked={!!field.value}
                          error={!!fieldState.error}
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.checked)}
                          requiredIndicator
                          text="Subscribe to newsletter"
                      />
                    )}
                    rules={{ validate: (value) => value === true || REQUIRED_MESSAGE }}
                />
              )}

              {isSelected("date_picker") && (
                <Controller
                    control={control}
                    name="startDate"
                    render={({ field, fieldState }) => (
                      <DatePicker
                          allowInput
                          defaultDate={field.value}
                          error={fieldState.error?.message}
                          initializeOnce
                          key={`date-${resetKey}`}
                          label="Start Date"
                          marginBottom="sm"
                          onChange={(dateStr) => field.onChange(dateStr)}
                          pickerId="form-validation-start-date"
                          requiredIndicator
                      />
                    )}
                    rules={{ required: "Start date is required" }}
                />
              )}

              {isSelected("dropdown") && (
                <Dropdown
                    error={errors.country?.message}
                    label="Country"
                    marginBottom="sm"
                    options={COUNTRY_OPTIONS}
                    requiredIndicator
                    {...register("country", requireSelection(REQUIRED_MESSAGE))}
                />
              )}

              {isSelected("multi_select") && (
                <Dropdown
                    error={errors.countries?.message}
                    label="Countries"
                    marginBottom="sm"
                    multiSelect
                    options={COUNTRY_OPTIONS}
                    requiredIndicator
                    {...register("countries", requireSelection(REQUIRED_MESSAGE))}
                />
              )}

              {isSelected("multi_level_select") && (
                <Controller
                    control={control}
                    name="department"
                    render={({ field, fieldState }) => (
                      <MultiLevelSelect
                          error={fieldState.error?.message}
                          id="mls-validation"
                          label="Department"
                          marginBottom="sm"
                          onChange={(event) =>
                            field.onChange(event.target.value.map((item) => item.id))
                          }
                          requiredIndicator
                          selectedIds={field.value}
                          treeData={DEPARTMENT_TREE_DATA}
                      />
                    )}
                    rules={requireSelection(REQUIRED_MESSAGE)}
                />
              )}

              {isSelected("phone_number") && (
                <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <PhoneNumberInput
                          error={fieldState.error?.message}
                          label="Phone Number"
                          onChange={(data) => field.onChange(data?.number || "")}
                          ref={phoneNumberRef}
                          required
                          requiredIndicator
                      />
                    )}
                    rules={{ validate: () => phoneNumberRef.current?.validate() ?? true }}
                />
              )}

              {isSelected("select") && (
                <Select
                    blankSelection="Select one..."
                    error={errors.favoriteColor?.message}
                    label="Favorite Color"
                    marginBottom="sm"
                    options={COLOR_SELECT_OPTIONS}
                    required
                    requiredIndicator
                    {...register("favoriteColor", { required: "Please select a color" })}
                />
              )}

              {isSelected("star_rating") && (
                <Controller
                    control={control}
                    name="rating"
                    render={({ field, fieldState }) => (
                      <>
                        <StarRating
                            label="Rating"
                            marginBottom="sm"
                            onClick={(value) => field.onChange(value)}
                            rating={field.value || 0}
                            variant="interactive"
                        />
                        {fieldState.error && (
                          <Body
                              marginBottom="sm"
                              status="negative"
                              text={fieldState.error.message}
                          />
                        )}
                      </>
                    )}
                    rules={{ validate: (value) => Number(value) > 0 || REQUIRED_MESSAGE }}
                />
              )}

              {isSelected("text_field") && (
                <Controller
                    control={control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Full Name"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          value={field.value}
                      />
                    )}
                    rules={{ required: "Full name is required" }}
                />
              )}

              {isSelected("email_field") && (
                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Email"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          type="email"
                          value={field.value}
                      />
                    )}
                    rules={{ required: "Email is required" }}
                />
              )}

              {isSelected("number_field") && (
                <Controller
                    control={control}
                    name="quantity"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Quantity"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          type="number"
                          value={field.value}
                      />
                    )}
                    rules={{ required: "Quantity is required" }}
                />
              )}

              {isSelected("password_field") && (
                <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Password"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          type="password"
                          value={field.value}
                      />
                    )}
                    rules={{ required: "Password is required" }}
                />
              )}

              {isSelected("search_field") && (
                <Controller
                    control={control}
                    name="projectNumber"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Project Number"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          type="search"
                          value={field.value}
                      />
                    )}
                    rules={{
                      pattern: {
                        message: "Please enter a valid project number (example: 33-12345).",
                        value: /^[0-9]{2}-[0-9]{5}$/,
                      },
                      required: "Please enter a valid project number (example: 33-12345).",
                    }}
                />
              )}

              {isSelected("url_field") && (
                <Controller
                    control={control}
                    name="website"
                    render={({ field, fieldState }) => (
                      <TextInput
                          error={fieldState.error?.message}
                          label="Website"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          type="url"
                          value={field.value}
                      />
                    )}
                    rules={{ required: "Website is required" }}
                />
              )}

              {isSelected("textarea") && (
                <Controller
                    control={control}
                    name="bio"
                    render={({ field, fieldState }) => (
                      <Textarea
                          error={fieldState.error?.message}
                          label="Bio"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          required
                          requiredIndicator
                          value={field.value}
                      />
                    )}
                    rules={{ required: REQUIRED_MESSAGE }}
                />
              )}

              {isSelected("time_picker") && (
                <Controller
                    control={control}
                    name="startTime"
                    render={({ field, fieldState }) => (
                      <TimePicker
                          error={fieldState.error?.message}
                          key={`time-${resetKey}`}
                          label="Start Time"
                          marginBottom="sm"
                          onChange={(time) => field.onChange(time)}
                          required
                          requiredIndicator
                      />
                    )}
                    rules={{ required: "Start time is required" }}
                />
              )}

              {isSelected("typeahead_default") && (
                <Controller
                    control={control}
                    name="favoriteColorSearch"
                    render={({ field: { onChange: handleChange, value }, fieldState }) => (
                      <Typeahead
                          error={fieldState.error?.message}
                          label="Favorite Color"
                          marginBottom="sm"
                          onChange={handleChange}
                          options={TYPEAHEAD_COLOR_OPTIONS}
                          placeholder="Search for a color"
                          requiredIndicator
                          value={value}
                      />
                    )}
                    rules={requireSelection("Please select a color")}
                />
              )}

              {isSelected("typeahead") && (
                <Controller
                    control={control}
                    name="favoriteColors"
                    render={({ field: { onChange: handleChange, value }, fieldState }) => (
                      <Typeahead
                          error={fieldState.error?.message}
                          isMulti
                          label="Favorite Color"
                          marginBottom="sm"
                          onChange={handleChange}
                          options={TYPEAHEAD_COLOR_OPTIONS}
                          pills
                          placeholder="Search for a color"
                          requiredIndicator
                          value={value}
                      />
                    )}
                    rules={requireSelection("Please select a color")}
                />
              )}

              <Flex gap="xs"
                  marginTop="sm"
              >
                <Button htmlType="submit"
                    text="Submit"
                />
                <Button
                    htmlType="button"
                    onClick={onReset}
                    text="Cancel"
                    variant="secondary"
                />
              </Flex>
            </form>
          </Card>
        </Flex>

        <Flex
            htmlOptions={{ style: { flex: "1 1 200px", minWidth: 0 } }}
            orientation="column"
        >
          <Caption marginBottom="xs"
              text="Submitted Form Data"
          />
          <Card background="light"
              padding="md"
          >
            {submittedData ? (
              <pre style={{ fontSize: "12px", lineHeight: 1.5, margin: 0, overflow: "auto", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            ) : (
              <Body color="light"
                  text="No data submitted yet."
              />
            )}
          </Card>
        </Flex>
      </Flex>

      <Body
          color="light"
          marginBottom="sm"
          marginTop="sm"
          text="Submit an empty form to see error states. A valid form shows its data on the right."
      />

      <Card background="dark"
          dark
          padding="none"
      >
        <pre style={{ fontSize: "12px", lineHeight: 1.5, margin: 0, overflow: "auto", padding: "16px", whiteSpace: "pre" }}>
          {codePreview}
        </pre>
      </Card>
    </div>
  )
}

export default FormValidation