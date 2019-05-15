import React from "react"
import Milestones from "./Milestones"

import { text, select } from "@storybook/addon-knobs"

export default function MilestonesStory(stories) {
  stories.add("Milestones",
    () => {
      let props = {
        className: text("className", ""),
        background: select("background", ["dark", "light"], "light"),
        steps: [
          {
            name: "First",
            status: select("1 Status", ["done", "started", "none"], "done")
          },
          {
            name: "Second",
            status: select("2 Status", ["done", "started", "none"], "started")
          },
          {
            name: "Third",
            status: select("3 Status", ["done", "started", "none"], "none")
          }
        ]
      }
      return <Milestones {...props}/>
    }
  )
}
