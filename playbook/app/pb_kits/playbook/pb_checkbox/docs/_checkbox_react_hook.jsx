import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Checkbox, Flex, Body } from "playbook-ui"

const CheckboxReactHook = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      Small: false,
      Medium: false,
      Large: false,
    },
  })

  const [submittedData, setSubmittedData] = useState({
    Small: false,
    Medium: false,
    Large: false,
  })

  const onSubmit = (data) => {
    setSubmittedData(data)
  }

  return (
    <Flex orientation="row">
      <Flex align="start"
          orientation="column"
          paddingRight="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Checkbox text="Small"
              {...register("Small")}
          />
          <br />
          <Checkbox text="Medium"
              {...register("Medium")}
          />
          <br />
          <Checkbox text="Large"
              {...register("Large")}
          />
          <br />
          <Button htmlType="submit"
              marginTop="sm"
              text="submit"
          />
        </form>
      </Flex>
      <Flex align="start"
          orientation="column"
      >
        <Body text={`Small: ${submittedData.Small ? "true" : "false"}`} />
        <Body text={`Medium: ${submittedData.Medium ? "true" : "false"}`} />
        <Body text={`Large: ${submittedData.Large ? "true" : "false"}`} />
      </Flex>
    </Flex>
  )
}

export default CheckboxReactHook
