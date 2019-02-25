import React from "react"

import UserStamp from "./UserStamp"

import { text } from "@storybook/addon-knobs"

export default function UserStampStory(stories) {
  stories.add("User Stamp",
    () => {
      let props = {
        thumbUrl: text('thumbUrl', 'http://i.pravatar.cc/46'),
        name: text('name', 'John Galt'),
        date: text('date', 'Nov 28, 2017'),
      }
      return (
        <div className="container">
          <UserStamp {...props} />
        </div>
      )
    }
  )
}
