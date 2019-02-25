import React from "react"
import Text from "./Text"

import { text, select, boolean } from "@storybook/addon-knobs"

export default function TextStory(stories) {
  stories.add("Text",
    () => {
      let props = {
        className: text("className", ""),
        color: select("color", ["sky-lighter", "sky-light", "sky", "sky-dark", "ink-lightest", "ink-lighter", "ink-light", "ink", "ink-dark"], "ink"),
        size: select("size", ["base", "large", "larger", "largest", "small", "smaller", "smallest"], "base"),
        bold: boolean("bold", false),
        italic: boolean("italic", false),
      }
      return (
        <Text {...props}>
          {`She stared through the window at the stars.`}
        </Text>
      )
    }
  )
}
