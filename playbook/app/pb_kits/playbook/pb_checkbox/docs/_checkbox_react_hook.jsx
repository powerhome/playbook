import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from '../../pb_button/_button'
import Checkbox from '../../pb_checkbox/_checkbox'
import Flex from '../../pb_flex/_flex'
import Body from '../../pb_body/_body'

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
          <Checkbox padding="xs"
              text="Small"
              {...register("Small")}
          />
          <br />
          <Checkbox padding="xs"
              text="Medium"
              {...register("Medium")}
          />
          <br />
          <Checkbox padding="xs"
              text="Large"
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
        <Body padding="xs"
            text={`Small: ${submittedData.Small ? "true" : "false"}`}
        />
        <Body padding="xs"
            text={`Medium: ${submittedData.Medium ? "true" : "false"}`}
        />
        <Body padding="xs"
            text={`Large: ${submittedData.Large ? "true" : "false"}`}
        />
      </Flex>
    </Flex>
  )
}

export default CheckboxReactHook
