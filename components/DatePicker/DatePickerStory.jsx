import React from "react"
import DatePicker from "./DatePicker"

import { text, boolean } from "@storybook/addon-knobs"

export default function DatePickerStory(stories) {
  stories.add("DatePicker",
    () => {
      const props = {
        labelText: text("Label", "Date"),
        disabled: boolean("Disabled", false),
        floatAbove: boolean("Float Above", false),
        timeFormat: text("Time Format", undefined),
        errorMessage: text("Error Message", undefined),
        onChange: () => {},
      }
      return (
        <DatePicker {...props}/>
      )
    }
  )
}
