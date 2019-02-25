import React from "react"
import Card from "./Card"

import { text, boolean } from "@storybook/addon-knobs"

export default function CardStory(stories) {
  stories.add("Card", () => {
    const props = {
      className: text("className", "p-5"),
    }
    return (
      <Card
          {...props}
      >
        {`I am a card. Now build something amazing!`}
      </Card>
    )
  })
}
