import React from "react"
import Color from "./Color"

import { text, select, boolean } from "@storybook/addon-knobs"

export default function ColorStory(stories) {
  stories.add("Colors",
    () => {
      let props = {
      }
      return (
        <Color {...props} />
      )
    }
  )
}
