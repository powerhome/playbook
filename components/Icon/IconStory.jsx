import React from "react"
import Icon from "./Icon"

import { text, boolean } from "@storybook/addon-knobs"

export default function IconStory(stories) {
  stories.add("Icon",
    () => {
      let props = {
        className: text("className", ""),
        name: text("name", "battery-half"),
        label: text("label", "50%"),
        size: text("size", "lg"),
        spin: boolean("spin", false),
        onClick: () => {
          alert("Whaa? Why u click me?!")
        },
        title: text("title", "Battery Percentage")
      }
      return (
        <Icon {...props}/>
      )
    }
  )
}
