import React from "react"
import TextInput from "./TextInput"

// import FormControl from 'react-bootstrap/lib/FormControl'

import { text, select, boolean } from "@storybook/addon-knobs"

export default function TextInputStory(stories) {
  stories.add("Text Input",
    () => {
      let props = {
        className: text("className", ""),
        kind: select("kind", ["input", "select", "textarea"], "input"),
        disabled: boolean("disabled", false),
      }
      return (
        <div className="container my-5">
          <TextInput {...props} />
        </div>
      )
    }
  )
}
