import React from "react"
import IconToggle from "./IconToggle"

import { text, select, } from "@storybook/addon-knobs"


export default function IconToggleStory(stories) {
  stories.add("IconToggle",
    () => {
      let props = {
        className: text("className", ""),
        size: select("size", ["text-smallest", "text-smaller", "text-small","text-base","text-large","text-larger","text-largest","text-jumbo"],"text-larger"),
        iconOption1:text("iconOption1","minus-circle"),
        iconOption2:text("iconOption2","plus-circle"),
        color:text("defaultColor","text-sky")
      }
      return (

        <IconToggle {...props}/>

      )
    }
  )
}
