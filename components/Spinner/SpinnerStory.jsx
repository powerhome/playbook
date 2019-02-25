import React from "react"

import Spinner from './Spinner'

import { boolean, number, select } from "@storybook/addon-knobs"

export default function SpinnerStory(stories) {
  stories.add("Spinner",
    () => {
      const props = {
        active: boolean("active", true),
        position: select("position", [null, "centered"], null),
        top: number("top", null),
        right: number("right", null),
        bottom: number("bottom", null),
        left: number("left", null),
      }
      return <Spinner {...props} />
    }
  )
}
