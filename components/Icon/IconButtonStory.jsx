import React from "react"
import Icon from "./Icon"
import { Button } from "react-bootstrap"

import { text, boolean } from "@storybook/addon-knobs"

export default function IconStory(stories) {
  stories.add("Button With Icon",
    () => {
      let props = {
        className: text("className", ""),
        name: text("name", "plus-circle"),
        label: text("label", "Add User"),
      }
      return (
        <Button><Icon {...props}/></Button>
      )
    }
  )
}
