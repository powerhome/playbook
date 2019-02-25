import React from "react"
import moment from "moment"
import DOBInput from "./"

import { boolean, text } from "@storybook/addon-knobs"

import 'react-datetime/css/react-datetime.css'

export default function Story(stories) {
  stories.add("DOBInput", () => {
    const props = {
      preventMinor: boolean("Prevent Minor", true),
      viewDate: text("Default Calendar Date", moment("2000-01-01"))
    }

    return (
      <DOBInput {...props} />
    )
  })
}
