import React from "react"

import { boolean, select } from "@storybook/addon-knobs"

import Banner from "./Banner"

export default function BannerStory(stories) {
  const props = {
    position: select("position", ["top", "bottom"], "top"),
    show: boolean("show", 1),
    style: select("style", ["info", "success", "warning", "danger"], "success"),
  }
  stories.add("Banner", () => {
    return (
      <Banner
          {...props}
      >
        {`You are a success!`}
      </Banner>
    )
  })
}