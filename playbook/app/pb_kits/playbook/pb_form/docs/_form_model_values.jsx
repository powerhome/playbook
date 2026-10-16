import React from "react"
import { Controller, useForm } from "react-hook-form"

import Button from "../../pb_button/_button"
import Card from "../../pb_card/_card"
import DatePicker from "../../pb_date_picker/_date_picker"
import Dropdown from "../../pb_dropdown/_dropdown"
import Flex from "../../pb_flex/_flex"
import PhoneNumberInput from "../../pb_phone_number_input/_phone_number_input"
import TextInput from "../../pb_text_input/_text_input"

const STATUS_OPTIONS = [
  { id: "status-open", label: "Open", value: "open" },
  { id: "status-closed", label: "Closed", value: "closed" },
]

const OPEN_STATUS = STATUS_OPTIONS[0]

const SERVER_ERRORS = {
  name: "Name cannot contain emoji",
  spots: "Spots must be 20 or fewer",
  startsAt: "Starts at must be before ends at",
}

const FormModelValues = () => {
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      endsAt: "08/20/2026",
      name: "Gary 🎉",
      phone: "+15551234567",
      spots: 42,
      startsAt: "08/22/2026",
      status: OPEN_STATUS,
    },
  })

  return (
    <Card padding="md"
        shadow="deep"
    >
      <form onSubmit={handleSubmit(() => undefined)}>
        <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                  error={SERVER_ERRORS.name}
                  label="Name"
                  onChange={(event) => field.onChange(event.target.value)}
                  value={field.value}
              />
            )}
        />
        <Controller
            control={control}
            name="spots"
            render={({ field }) => (
              <TextInput
                  error={SERVER_ERRORS.spots}
                  label="Spots"
                  onChange={(event) => field.onChange(event.target.value)}
                  type="number"
                  value={field.value}
              />
            )}
        />
        <Controller
            control={control}
            name="startsAt"
            render={({ field }) => (
              <DatePicker
                  defaultDate={field.value}
                  error={SERVER_ERRORS.startsAt}
                  label="Starts at"
                  onChange={(dateStr) => field.onChange(dateStr)}
                  pickerId="form-model-starts-at"
              />
            )}
        />
        <Controller
            control={control}
            name="endsAt"
            render={({ field }) => (
              <DatePicker
                  defaultDate={field.value}
                  label="Ends at"
                  onChange={(dateStr) => field.onChange(dateStr)}
                  pickerId="form-model-ends-at"
              />
            )}
        />
        <Dropdown
            defaultValue={OPEN_STATUS}
            label="Status"
            options={STATUS_OPTIONS}
            {...register("status")}
        />
        <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneNumberInput
                  label="Phone"
                  onChange={(data) => field.onChange(data?.number || "")}
                  value={field.value}
              />
            )}
        />
        <Flex gap="xs"
            marginTop="sm"
        >
          <Button htmlType="submit"
              text="Submit"
          />
          <Button
              htmlType="button"
              onClick={() => reset()}
              text="Cancel"
              variant="secondary"
          />
        </Flex>
      </form>
    </Card>
  )
}

export default FormModelValues
