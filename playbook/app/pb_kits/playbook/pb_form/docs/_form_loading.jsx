import React, { useEffect, useRef, useState } from "react"

import Button from "../../pb_button/_button"
import Flex from "../../pb_flex/_flex"
import TextInput from "../../pb_text_input/_text_input"

import { Controller, useForm } from "react-hook-form"

const LOADING_MS = 5000

const FormLoading = () => {
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { exampleTextField: "" },
  })

  // Clear any pending timeout on unmount so switching to another playground
  // example mid-loading doesn't call setState on an unmounted component
  // (React 17 logs a warning for that).
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const onSubmit = () => {
    setLoading(true)
    // If the user submits again before the previous timeout fires, drop the
    // old one so only the latest submit controls when `loading` flips back.
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setLoading(false)
      timeoutRef.current = null
    }, LOADING_MS)
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