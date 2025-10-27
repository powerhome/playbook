import React from 'react'

import Typeahead from '../_typeahead'

const groupedOptions = [
  {
    label: "Warm Colors",
    options: [
      { label: "Red", value: "#FF0000" },
        { label: "Orange", value: "#FFA500" },
        { label: "Yellow", value: "#FFFF00" },
        { label: "Coral", value: "#FF7F50" },
        { label: "Gold", value: "#FFD700" }
      ]
    },
    {
      label: "Cool Colors",
      options: [
        { label: "Blue", value: "#0000FF" },
        { label: "Teal", value: "#008080" },
        { label: "Cyan", value: "#00FFFF" },
        { label: "Navy", value: "#000080" },
        { label: "Turquoise", value: "#40E0D0" }
      ]
    },
    {
      label: "Neutrals",
      options: [
        { label: "White", value: "#FFFFFF" },
        { label: "Black", value: "#000000" },
        { label: "Gray", value: "#808080" },
        { label: "Beige", value: "#F5F5DC" },
        { label: "Silver", value: "#C0C0C0" }
      ]
    },
    {
      label: "Earth Tones",
      options: [
        { label: "Brown", value: "#A52A2A" },
        { label: "Olive", value: "#808000" },
        { label: "Forest Green", value: "#228B22" },
        { label: "Tan", value: "#D2B48C" },
        { label: "Maroon", value: "#800000" }
      ]
    },
    {
      label: "Fun Shades",
      options: [
        { label: "Pink", value: "#FFC0CB" },
        { label: "Magenta", value: "#FF00FF" },
        { label: "Lime", value: "#00FF00" },
        { label: "Purple", value: "#800080" },
        { label: "Indigo", value: "#4B0082" }
      ]
    }
  ]

const TypeaheadCustomOptions = (props) => {
  return (
    <Typeahead
        defaultValue={[{ label: "Pink", value: "#FFC0CB" }]}
        label="Colors"
        options={groupedOptions}
        {...props}
    />
  )
}

export default TypeaheadCustomOptions

