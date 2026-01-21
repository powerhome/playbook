import React from "react"
import Typeahead from "../../pb_typeahead/_typeahead"

const options = [
  {label: "Orange", value: "#FFA500"},
  {label: "Red", value: "#FF0000"},
  {label: "Green", value: "#00FF00"},
  {label: "Blue", value: "#0000FF"},
]

const TypeaheadRequiredIndicator = (props) => {
  return (
    <Typeahead
        id="typeahead_required_indicator"
        label="Colors"
        options={options}
        requiredIndicator
        {...props}
    />
  )
}

export default TypeaheadRequiredIndicator
