import React from "react"
import CircleButton from "./CircleButton"
import { text, select,} from "@storybook/addon-knobs"




export default function CircleButtonStory(stories) {
  stories.add("Circle Button",
    () => {
      const props = {
        className: text("className", "circlebutton"),
        size: select("sizeOption",['md','lg',],'md'),
        iconColor:text("iconColor","text-white"),
        iconName: text("iconName","plus"),
        color:text("color","bg-power-green"),
      }



      return (<CircleButton {...props}/>
      )
    }
  )
}
