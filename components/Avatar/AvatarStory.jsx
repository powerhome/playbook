import React from "react"
import Avatar from "./Avatar"

import { select, text, boolean } from "@storybook/addon-knobs"

export default function AvatarStory(stories) {
  stories.add("Avatar",
    () => {
      let props = {
        disableLink: boolean("disableLink", false),
        showPopover: boolean("showPopover", true),
        size: select("size", ["smaller", "small", "base", "large", "larger"], "base"),
        thumb: text("url", "https://i.giphy.com/l46CjoMYO5n2hQnWE.gif"),
        url: text("url", "https://i.giphy.com/l46CjoMYO5n2hQnWE.gif"),
      }
      return <Avatar {...props}/>
    }
  )
}
