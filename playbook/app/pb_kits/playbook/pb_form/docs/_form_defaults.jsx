import React, { useState } from "react"

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

import { useForm, Controller } from "react-hook-form"

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

const COLOR_SELECT_OPTIONS = [
  { value: "red", text: "Red" },
  { value: "blue", text: "Blue" },
  { value: "green", text: "Green" },
]

const COUNTRY_OPTIONS = [
  { label: "United States", value: "unitedStates", id: "us" },
  { label: "Canada", value: "canada", id: "ca" },
  { label: "Pakistan", value: "pakistan", id: "pk" },
]

const TYPEAHEAD_COLOR_OPTIONS = [
  { label: "Orange", value: "#FFA500" },
  { label: "Red", value: "#FF0000" },
  { label: "Green", value: "#00FF00" },
  { label: "Blue", value: "#0000FF" },
]

const DEPARTMENT_TREE_DATA = [
  {
    label: "Power Home Remodeling",
    value: "powerHomeRemodeling",
    id: "form-defaults-100",
    expanded: true,
    children: [
      {
        label: "People",
        value: "people",
        id: "form-defaults-101",
        children: [
          { label: "Talent Acquisition", value: "talentAcquisition", id: "form-defaults-102" },
          { label: "People Experience", value: "peopleExperience", id: "form-defaults-103" },
        ],
      },
      {
        label: "Contact Center",
        value: "contactCenter",
        id: "form-defaults-104",
        children: [
          { label: "Customer Service", value: "customerService", id: "form-defaults-105" },
          { label: "Energy", value: "energy", id: "form-defaults-106" },
        ],
      },
    ],
  },
]

// Static copies of the JSX rendered below, kept in sync by hand so the code
// preview can show only the fields currently selected (mirrors the Rails
// Defaults demo, which reads similarly static per-field snippet files).
const CODE_SNIPPETS = {
  checkbox: `<Controller
  control={control}
  name="newsletter"
  render={({ field }) => (
    <Checkbox
        checked={!!field.value}
        onChange={(event) => field.onChange(event.target.checked)}
        text="Subscribe to newsletter"
    />
  )}
/>`,
  date_picker: `<Controller
  control={control}
  name="startDate"
  render={({ field }) => (
    <DatePicker
        defaultDate={field.value}
        initializeOnce
        key={\`date-\${resetKey}\`}
        label="Start Date"
        onChange={(dateStr) => field.onChange(dateStr)}
        pickerId="form-defaults-start-date"
    />
  )}
/>`,
  dropdown: `<Dropdown
    key={\`dropdown-\${resetKey}\`}
    label="Country"
    options={countryOptions}
    {...register("country")}
/>`,
  multi_select: `<Dropdown
    key={\`multi-select-\${resetKey}\`}
    label="Countries"
    multiSelect
    options={countryOptions}
    {...register("countries")}
/>`,
  multi_level_select: `<Controller
  control={control}
  name="department"
  render={({ field }) => (
    <MultiLevelSelect
        id="mls-form-defaults"
        label="Department"
        onChange={(event) =>
          field.onChange(event.target.value.map((item) => item.id))
        }
        selectedIds={field.value}
        treeData={departmentTreeData}
    />
  )}
/>`,
  phone_number: `<Controller
  control={control}
  name="phone"
  render={({ field }) => (
    <PhoneNumberInput
        key={\`phone-\${resetKey}\`}
        label="Phone Number"
        onChange={(data) => field.onChange(data.number)}
    />
  )}
/>`,
  select: `<Select
    key={\`select-\${resetKey}\`}
    label="Favorite Color"
    options={colorSelectOptions}
    {...register("favoriteColor")}
/>`,
  star_rating: `<Controller
  control={control}
  name="rating"
  render={({ field }) => (
    <StarRating
        key={\`rating-\${resetKey}\`}
        label="Rating"
        onClick={(value) => field.onChange(value)}
        rating={field.value || 0}
        variant="interactive"
    />
  )}
/>`,
  text_field: `<Controller
  control={control}
  name="fullName"
  render={({ field }) => (
    <TextInput
        label="Full Name"
        onChange={(event) => field.onChange(event.target.value)}
        value={field.value}
    />
  )}
/>`,
  email_field: `<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <TextInput
        label="Email"
        onChange={(event) => field.onChange(event.target.value)}
        type="email"
        value={field.value}
    />
  )}
/>`,
  number_field: `<Controller
  control={control}
  name="quantity"
  render={({ field }) => (
    <TextInput
        label="Quantity"
        onChange={(event) => field.onChange(event.target.value)}
        type="number"
        value={field.value}
    />
  )}
/>`,
  password_field: `<Controller
  control={control}
  name="password"
  render={({ field }) => (
    <TextInput
        label="Password"
        onChange={(event) => field.onChange(event.target.value)}
        type="password"
        value={field.value}
    />
  )}
/>`,
  search_field: `<Controller
  control={control}
  name="projectNumber"
  render={({ field }) => (
    <TextInput
        label="Project Number"
        onChange={(event) => field.onChange(event.target.value)}
        type="search"
        value={field.value}
    />
  )}
/>`,
  url_field: `<Controller
  control={control}
  name="website"
  render={({ field }) => (
    <TextInput
        label="Website"
        onChange={(event) => field.onChange(event.target.value)}
        type="url"
        value={field.value}
    />
  )}
/>`,
  textarea: `<Controller
  control={control}
  name="bio"
  render={({ field }) => (
    <Textarea
        label="Bio"
        onChange={(event) => field.onChange(event.target.value)}
        value={field.value}
    />
  )}
/>`,
  time_picker: `<Controller
  control={control}
  name="startTime"
  render={({ field }) => (
    <TimePicker
        key={\`time-\${resetKey}\`}
        label="Start Time"
        onChange={(time) => field.onChange(time)}
    />
  )}
/>`,
  typeahead_default: `<Controller
  control={control}
  name="favoriteColorSearch"
  render={({ field: { onChange: handleChange, value } }) => (
    <Typeahead
        key={\`typeahead-default-\${resetKey}\`}
        label="Favorite Color"
        onChange={handleChange}
        options={typeaheadColorOptions}
        placeholder="Search for a color"
        value={value}
    />
  )}
/>`,
  typeahead: `<Controller
  control={control}
  name="favoriteColors"
  render={({ field: { onChange: handleChange, value } }) => (
    <Typeahead
        isMulti
        key={\`typeahead-multi-\${resetKey}\`}
        label="Favorite Color"
        onChange={handleChange}
        options={typeaheadColorOptions}
        pills
        placeholder="Search for a color"
        value={value}
    />
  )}
/>`,
}

const FORM_OPEN = `const { register, control, handleSubmit } = useForm({ shouldUnregister: true })

<form onSubmit={handleSubmit(onSubmit)}>`
const FORM_CLOSE = `  <Button htmlType="submit" text="Submit" />
  <Button htmlType="button" onClick={onReset} text="Cancel" variant="secondary" />
</form>`

const FormDefaults = () => {
  const [selectedKeys, setSelectedKeys] = useState([DEFAULT_SELECTED_KEY])
  const [submittedData, setSubmittedData] = useState(null)
  const [resetKey, setResetKey] = useState(0)

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      bio: "",
      department: null,
      email: "",
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
      // Always keep at least one field selected, matching the Rails demo.
      return current.length > 1 ? current.filter((selected) => selected !== key) : current
    })
  }

  const handlePillKeyDown = (event, key) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    toggleKey(key)
  }

  const onSubmit = (data) => setSubmittedData(data)

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
            <form onSubmit={handleSubmit(onSubmit)}>
              {isSelected("checkbox") && (
                <Controller
                    control={control}
                    name="newsletter"
                    render={({ field }) => (
                      <Checkbox
                          checked={!!field.value}
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.checked)}
                          text="Subscribe to newsletter"
                      />
                    )}
                />
              )}

              {isSelected("date_picker") && (
                <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                          defaultDate={field.value}
                          initializeOnce
                          key={`date-${resetKey}`}
                          label="Start Date"
                          marginBottom="sm"
                          onChange={(dateStr) => field.onChange(dateStr)}
                          pickerId="form-defaults-start-date"
                      />
                    )}
                />
              )}

              {isSelected("dropdown") && (
                <Dropdown
                    key={`dropdown-${resetKey}`}
                    label="Country"
                    marginBottom="sm"
                    options={COUNTRY_OPTIONS}
                    {...register("country")}
                />
              )}

              {isSelected("multi_select") && (
                <Dropdown
                    key={`multi-select-${resetKey}`}
                    label="Countries"
                    marginBottom="sm"
                    multiSelect
                    options={COUNTRY_OPTIONS}
                    {...register("countries")}
                />
              )}

              {isSelected("multi_level_select") && (
                <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                      <MultiLevelSelect
                          id="mls-form-defaults"
                          label="Department"
                          marginBottom="sm"
                          onChange={(event) =>
                            field.onChange(event.target.value.map((item) => item.id))
                          }
                          selectedIds={field.value}
                          treeData={DEPARTMENT_TREE_DATA}
                      />
                    )}
                />
              )}

              {isSelected("phone_number") && (
                <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneNumberInput
                          key={`phone-${resetKey}`}
                          label="Phone Number"
                          onChange={(data) => field.onChange(data.number)}
                      />
                    )}
                />
              )}

              {isSelected("select") && (
                <Select
                    key={`select-${resetKey}`}
                    label="Favorite Color"
                    marginBottom="sm"
                    options={COLOR_SELECT_OPTIONS}
                    {...register("favoriteColor")}
                />
              )}

              {isSelected("star_rating") && (
                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <StarRating
                          key={`rating-${resetKey}`}
                          label="Rating"
                          marginBottom="sm"
                          onClick={(value) => field.onChange(value)}
                          rating={field.value || 0}
                          variant="interactive"
                      />
                    )}
                />
              )}

              {isSelected("text_field") && (
                <Controller
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <TextInput
                          label="Full Name"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("email_field") && (
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <TextInput
                          label="Email"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          type="email"
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("number_field") && (
                <Controller
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                      <TextInput
                          label="Quantity"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          type="number"
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("password_field") && (
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <TextInput
                          label="Password"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          type="password"
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("search_field") && (
                <Controller
                    control={control}
                    name="projectNumber"
                    render={({ field }) => (
                      <TextInput
                          label="Project Number"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          type="search"
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("url_field") && (
                <Controller
                    control={control}
                    name="website"
                    render={({ field }) => (
                      <TextInput
                          label="Website"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          type="url"
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("textarea") && (
                <Controller
                    control={control}
                    name="bio"
                    render={({ field }) => (
                      <Textarea
                          label="Bio"
                          marginBottom="sm"
                          onChange={(event) => field.onChange(event.target.value)}
                          value={field.value}
                      />
                    )}
                />
              )}

              {isSelected("time_picker") && (
                <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <TimePicker
                          key={`time-${resetKey}`}
                          label="Start Time"
                          marginBottom="sm"
                          onChange={(time) => field.onChange(time)}
                      />
                    )}
                />
              )}

              {isSelected("typeahead_default") && (
                <Controller
                    control={control}
                    name="favoriteColorSearch"
                    render={({ field: { onChange: handleChange, value } }) => (
                      <Typeahead
                          key={`typeahead-default-${resetKey}`}
                          label="Favorite Color"
                          marginBottom="sm"
                          onChange={handleChange}
                          options={TYPEAHEAD_COLOR_OPTIONS}
                          placeholder="Search for a color"
                          value={value}
                      />
                    )}
                />
              )}

              {isSelected("typeahead") && (
                <Controller
                    control={control}
                    name="favoriteColors"
                    render={({ field: { onChange: handleChange, value } }) => (
                      <Typeahead
                          isMulti
                          key={`typeahead-multi-${resetKey}`}
                          label="Favorite Color"
                          marginBottom="sm"
                          onChange={handleChange}
                          options={TYPEAHEAD_COLOR_OPTIONS}
                          pills
                          placeholder="Search for a color"
                          value={value}
                      />
                    )}
                />
              )}

              <Flex gap="xs"
                  marginTop="sm"
              >
                <Button htmlType="submit"
                    text="Submit"
                />
                <Button htmlType="button"
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
              <pre style={{ margin: 0, overflow: "auto", fontSize: "12px", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
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

      <Body color="light"
          marginBottom="sm"
          marginTop="sm"
          text="Submit the form to see the data on the right."
      />

      <Card background="dark"
          dark
          padding="none"
      >
        <pre style={{ margin: 0, overflow: "auto", fontSize: "12px", lineHeight: 1.5, whiteSpace: "pre", padding: "16px" }}>
          {codePreview}
        </pre>
      </Card>
    </div>
  )
}

export default FormDefaults