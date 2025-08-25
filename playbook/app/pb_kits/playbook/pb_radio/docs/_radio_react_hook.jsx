import React from "react"
import { useForm } from "react-hook-form"
import { Radio, Flex, Body } from "playbook-ui"

const RadioReactHook = () => {
  const { register, watch } = useForm({
    defaultValues: {
      size: "Small",
    },
  })

  const selectedSize = watch("size", "Small")

  return (
    <Flex orientation="row">
      <Flex
          align="start"
          orientation="column"
          paddingRight="lg"
        >
        <Radio
            label="Small"
            marginBottom='sm'
            name="size"
            value="Small"
            {...register("size")}
        />
        <br />
        <Radio
            label="Medium"
            marginBottom='sm'
            name="size"
            value="Medium"
            {...register("size")}
        />
        <br />
        <Radio
            label="Large"
            marginBottom='sm'
            name="size"
            value="Large"
            {...register("size")}
        />
      </Flex>
      <Flex
          align="start"
          orientation="column"
      >
        <Body
            text={`Selected Size: ${selectedSize}`}
        />
      </Flex>
    </Flex>
  )
}

export default RadioReactHook
