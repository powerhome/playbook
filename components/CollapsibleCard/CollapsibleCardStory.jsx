import React from "react"
import CollapsibleCard from "./CollapsibleCard"

import { text } from "@storybook/addon-knobs"

export default function CollapsibleCardStory(stories) {
  stories.add("Collapsible Card", () => {
    const props = {
      className: text("className", ""),
    }
    return (
      <CollapsibleCard {...props} >
        <CollapsibleCard.Main>
          <div className={'p-5'}>
            {`I am a card. Now build something amazing!`}
          </div>
        </CollapsibleCard.Main>
        <CollapsibleCard.Content>
          <div className={'p-5'}>
            {`I am some hidden content!`}
          </div>
        </CollapsibleCard.Content>
      </CollapsibleCard>
    )
  })
}
