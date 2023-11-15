import React from "react"

import Select from "../_select"

const SelectMultiple = props => {
  const options = [
    {
      value: "1",
      text: "Burgers",
    },
    {
      value: "2",
      text: "Pizza",
    },
    {
      value: "3",
      text: "Tacos",
    },
    {
      value: "3",
      text: "BBQ",
    },
    {
      value: "3",
      text: "Sushi",
    },
    {
      value: "3",
      text: "Chinese",
    },
    {
      value: "3",
      text: "Hot Dogs",
    },
  ]

  return (
    <div>
      <Select
        label="Favorite Food"
        multiple
        name="food"
        options={options}
        {...props}
      />
    </div>
  )
}

export default SelectMultiple
