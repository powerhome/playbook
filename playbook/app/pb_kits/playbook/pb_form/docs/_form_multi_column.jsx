import React, { useState } from "react"

import Body from "../../pb_body/_body"
import Button from "../../pb_button/_button"
import Caption from "../../pb_caption/_caption"
import Card from "../../pb_card/_card"
import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import TextInput from "../../pb_text_input/_text_input"

import { Controller, useForm } from "react-hook-form"

const CODE_PREVIEW = `const { control, handleSubmit } = useForm({
  defaultValues: { firstName: "", lastName: "" },
})

<form onSubmit={handleSubmit(onSubmit)}>
  <Flex gap="sm" wrap>
    <FlexItem grow>
      <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextInput
                label="First Name"
                onChange={(event) => field.onChange(event.target.value)}
                value={field.value}
            />
          )}
      />
    </FlexItem>
    <FlexItem grow>
      <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextInput
                label="Last Name"
                onChange={(event) => field.onChange(event.target.value)}
                value={field.value}
            />
          )}
      />
    </FlexItem>
  </Flex>
  <Button htmlType="submit" text="Submit" />
  <Button htmlType="button" onClick={onReset} text="Cancel" variant="secondary" />
</form>`

const textField = (field, label) => (
  <TextInput
      label={label}
      onChange={(event) => field.onChange(event.target.value)}
      value={field.value}
  />
)

const FormMultiColumn = () => {
  const [submittedData, setSubmittedData] = useState(null)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { firstName: "", lastName: "" },
  })

  const onReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <div>
      <Flex align="stretch"
          gap="md"
          wrap
      >
        <Flex
            align="stretch"
            htmlOptions={{ style: { flex: "2 1" } }}
            orientation="column"
        >
          <Card
              htmlOptions={{ style: { minWidth: 0 } }}
              padding="md"
              shadow="deep"
          >
            <form onSubmit={handleSubmit(setSubmittedData)}>
              <Flex gap="sm"
                  wrap
              >
                <FlexItem grow>
                  <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => textField(field, "First Name")}
                  />
                </FlexItem>
                <FlexItem grow>
                  <Controller
                      control={control}
                      name="lastName"
                      render={({ field }) => textField(field, "Last Name")}
                  />
                </FlexItem>
              </Flex>
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
            align="stretch"
            htmlOptions={{ style: { flex: "1 1" } }}
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
          text="Submit the form to see the data on the right."
      />

      <Card background="dark"
          dark
          padding="none"
      >
        <pre style={{ fontSize: "12px", lineHeight: 1.5, margin: 0, overflow: "auto", padding: "16px", whiteSpace: "pre" }}>
          {CODE_PREVIEW}
        </pre>
      </Card>
    </div>
  )
}

export default FormMultiColumn
