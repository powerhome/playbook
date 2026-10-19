import React, { useState } from "react"

import Button from "../../pb_button/_button"
import Flex from "../../pb_flex/_flex"
import TextInput from "../../pb_text_input/_text_input"

import { Controller, useForm } from "react-hook-form"

const LOADING_MS = 5000

const FormLoading = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { exampleTextField: "" },
  })

  const onSubmit = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), LOADING_MS)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
          control={control}
          name="exampleTextField"
          render={({ field }) => (
            <TextInput
                label="Example text field"
                onChange={(event) => field.onChange(event.target.value)}
                value={field.value}
            />
          )}
      />
      <Flex gap="xs"
          marginTop="sm"
      >
        <Button
            disabled={loading}
            htmlType="submit"
            loading={loading}
            text="Submit"
        />
        <Button
            disabled={loading}
            htmlType="button"
            onClick={() => reset()}
            text="Cancel"
            variant="secondary"
        />
      </Flex>
    </form>
  )
}

export default FormLoading
