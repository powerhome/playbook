import React from "react"
import Badge from "./Badge"

import { text, select } from "@storybook/addon-knobs"

export default function BadgeStory(stories) {
  stories.add("Badge",
    () => {
      let props = {
        className: text("className", ""),
        style: select("style", ["primary", "default", "success", "danger", "warning", "info", "inverse"], "primary")
      }
      return (
        <div className="row">
          <div className="col-sm-1">
            <Badge {...props}>Primary</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="default">Default</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="success">Success</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="danger">Danger</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="warning">Warning</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="info">Info</Badge>
          </div>
          <div className="col-sm-1">
            <Badge style="inverse">Inverse</Badge>
          </div>
        </div>
      )
    }
  )
}
