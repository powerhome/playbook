import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Select from "../_select"
import Body from "../../pb_body/_body"
import Button from "../../pb_button/_button"

const SelectReactHook = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      "food-react-hook": '',
    },
  })

  const [submittedData, setSubmittedData] = useState({
    "food-react-hook": '',
  })

  const onSubmit = (data) => {
    setSubmittedData(data)
  }

  const options = [
    {
      value: 1,
      text: 'Burgers',
    },
    {
      value: 2,
      text: 'Pizza',
    },
    {
      value: 3,
      text: 'Tacos',
    },
  ]

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
            {...props}
            {...register("food-react-hook", { required: true })}
            error={errors["food-react-hook"] ? "Please select a food." : null}
            label="Favorite Food"
            options={options}
        />
        <br />
        <Button htmlType="submit"
            marginTop="sm"
            text="Submit"
          />
      </form>
      <Body padding="xs"
          text={`Food: ${submittedData["food-react-hook"]}`}
      />
    </>
  )
}

export default SelectReactHook
