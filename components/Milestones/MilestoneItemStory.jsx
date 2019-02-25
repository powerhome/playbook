import React from "react"
import MilestoneItem from "./MilestoneItem"

import { text, select } from "@storybook/addon-knobs"

export default function MilestoneItemStory(stories) {
  stories.add("Milestone Item",
    () => {
      let props = {
        className: text("className", ""),
        name: text("name", "Milestone"),
        background: select("background", ["light", "dark"], "light"),
        status: select("status", ["done", "started", "none"], "done"),
      }
      return (
        <MilestoneItem
            background={props.background}
            className={props.className}
            name={props.name}
            status={props.status}
        />
      )
    }
  )
}
