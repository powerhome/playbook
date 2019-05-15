import React from "react"
import Panel from "./Panel"
import Text from "../Text/Text"

import { boolean, text } from "@storybook/addon-knobs"

export default function PanelStory(stories) {
  stories.add("Panel",
    () => {
      let props = {
        collapsible: boolean("collapsible", false),
        title: text("title", "Hi, World."),
        titleIcon: text("titleIcon", "apple"),
        subTitle: text("subTitle", null),
      }
      return (
        <Panel {...props}>
          <Text>{`It's gunna be yuge!`}</Text>
        </Panel>
      )
    }
  )
}
